const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");

const checkOnSearch = async (data, msgIdSet) => {
  let onSearchObj = {};
  let onSearch = data;
  onSearch = onSearch?.message?.catalog;
  const fulfillments = onSearch?.fulfillments || [];
  const categories = onSearch?.providers?.[0]?.categories || [];
  const items = onSearch?.providers?.[0]?.items || [];
  const contextTimestamp = new Date(data?.context?.timestamp || "");

  /**
   * Extracts the number of days from a duration string in ISO 8601 format.
   *
   * @param {string} duration - The duration string to parse (e.g. "P30D").
   * @returns {number} The number of days extracted from the duration string, or 0 if the string is invalid.
   */
  const getDurationInDays = (duration) => {
    // Regular expression to match the duration string in ISO 8601 format (PXD)
    const match = duration.match(/^P(\d+)D$/);

    // If the string matches the pattern, return the extracted number of days as an integer
    return match ? parseInt(match[1], 10) : 0;
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  /**
   * Validates the timestamp of an item in the on_search response.
   *
   * @param {object} item - The item to validate.
   * @returns {boolean} Whether the timestamp is valid.
   *
   * The timestamp is considered valid if the duration is not provided or is invalid.
   * If the duration is valid, the timestamp is considered valid if it is equal to the
   * current timestamp plus the duration.
   */
  const validateTimestamp = (item) => {
    const duration = item.time?.duration || "";
    const expectedDays = getDurationInDays(duration);

    if (expectedDays === 0) return true; // No duration or invalid format

    const currentTimestamp = new Date(contextTimestamp);
    currentTimestamp.setUTCDate(contextTimestamp.getUTCDate() + expectedDays);
    const expectedDate = formatDate(currentTimestamp);

    const itemTimestamp = new Date(item.time?.timestamp || "");
    const itemDate = formatDate(itemTimestamp);

    return itemDate === expectedDate;
  };
  try {
    console.log("Validating items timestamp");
    if (items) {
      items.forEach((item, i) => {
        if (!validateTimestamp(item)) {
          let itemKey = `itemTimestampErr${i}`;
          onSearchObj[
            itemKey
          ] = `Item timestamp '${item.time.timestamp}' is not as expected`;
        }
      });
    }
  } catch (e) {
    console.log("Error while validating item timestamps");
  }
  try {
    console.log("Validating item ids");
    const fulfillmentMap = new Map(fulfillments.map((f) => [f.id, f]));
    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    /**
     * Validates the category_ids and fulfillment_ids of an item in the on_search response.
     *
     * @param {object} item - The item to validate.
     * @returns {boolean} Whether the category_ids and fulfillment_ids are valid.
     *
     * The function goes over each item and makes sure the category IDs and fulfillment IDs
     *  provided in the item match the ones provided in on_search.message.catalog.fulfillments and
     * on_search.message.catalog.providers[0].categories.
     */
    const validateItemIds = (item) => {
      const validCategoryIds = item.category_ids || [];
      const validFulfillmentIds = item.fulfillment_ids || [];

      return (
        validCategoryIds.every((id) => categoryMap.has(id)) &&
        validFulfillmentIds.every((id) => fulfillmentMap.has(id))
      );
    };

    if (items) {
      items.forEach((item, i) => {
        if (!validateItemIds(item)) {
          let itemKey = `itemIdErr${i}`;
          onSearchObj[
            itemKey
          ] = `Fulfillment id / category id for '${item.id}' is not as expected`;
        }
      });
    }
  } catch (e) {
    console.log("Error while validating item ids");
  }
  try {
    console.log("Validating effective date");
    /**
     * Finds the value of the "Effective_Date" tag in the on_search response.
     *
     * @returns {string|null} The value of the "Effective_Date" tag, or null if not found.
     */
    const getEffectiveDate = () => {
      const tags = onSearch?.descriptor?.tags;
      if (tags) {
        for (let tag of tags) {
          if (tag?.descriptor?.code === "BPP_Terms") {
            for (let item of tag.list) {
              if (item?.descriptor?.code === "Effective_Date") {
                return item?.value;
              }
            }
          }
        }
      }

      return null; // Return null if not found
    };
    if (!getEffectiveDate()) {
      onSearchObj["effectiveDateErr"] = "Effective date is missing";
    } else {
      const effectiveDate = new Date(getEffectiveDate());
      if (!effectiveDate || effectiveDate > contextTimestamp) {
        onSearchObj["effectiveDateErr"] =
          "Effective date should not be greater than context timestamp";
      }
    }
  } catch (e) {
    console.log("Error while validating effective date");
  }

// For each provider in the on_search response, iterate over its items.
// Check if each item has tags and if those tags follow the required structure
// of Cargo_Details, which includes a specific list of tags.
  try {
    console.log("Validating item tags");
    const requiredTagStructure = {
      descriptor: {
        code: "Cargo_Details",
      },
      list: [
        { descriptor: { code: "Delivery_Mode" } },
        { descriptor: { code: "Vehicle_Type" } },
        { descriptor: { code: "Vehicle_Size" } },
        { descriptor: { code: "Load_Type" } },
      ],
    };
    const deliveryFulfillmentIds = fulfillments
      .filter((fulfillment) => fulfillment.type === "Delivery")
      .map((fulfillment) => fulfillment.id);

    for (let provider of onSearch.providers) {
      if (!provider.items) {
        continue;
      }
      for (let item of provider.items) {
        if (
          item.fulfillment_ids.some((id) => deliveryFulfillmentIds.includes(id))
        ) {
          if (!item.tags || item.tags.length === 0) {
            onSearchObj["itemTagsErr"] = `Tags are missing for item ${item.id}`;
          } else {
            const cargoDetailsTag = item.tags.find(
              (tag) => tag.descriptor && tag.descriptor.code === "Cargo_Details"
            );

            if (!cargoDetailsTag || !cargoDetailsTag.list) {
              onSearchObj[
                "itemTagsErr"
              ] = `Cargo_Details tag or its list is missing for item ${item.id}`;
            } else {
              const missingTags = requiredTagStructure.list.filter(
                (requiredTag) =>
                  !cargoDetailsTag.list.some(
                    (actualTag) =>
                      actualTag.descriptor &&
                      actualTag.descriptor.code === requiredTag.descriptor.code
                  )
              );

              if (missingTags.length > 0) {
                onSearchObj["itemTagsErr"] = `Tags ${missingTags
                  .map((t) => t.descriptor.code)
                  .join(", ")} are missing for item ${item.id}`;
              }
            }
          }
        }
      }
    }
  } catch (e) {
    console.log("Error while validating item tags", e);
  }
  dao.setValue("onSearchObj", onSearch);
  return onSearchObj;
};

module.exports = checkOnSearch;

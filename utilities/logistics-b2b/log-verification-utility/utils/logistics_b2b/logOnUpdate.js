const _ = require("lodash");
const dao = require("../../dao/dao");

const checkOnUpdate = (data, msgIdSet) => {
  let onUpdateObj = {};
  let on_update = data;
  let contextTimestamp = on_update?.context?.timestamp;
  on_update = on_update.message.order;
  dao.setValue("onUpdateObj", on_update);
  let on_confirm = dao.getValue("onConfirmObj");
  let update = dao.getValue("updateObj");
  let fulfillments = on_update.fulfillments;
  let items = on_update.items;

  if (on_update?.updated_at > contextTimestamp) {
    onUpdateObj.updatedAtErr =
      "order/updated_at cannot be future dated w.r.t context/timestamp";
  }

  /**
   * Compares the value of a tag in onConfirm with the same tag in confirm.
   * If the values don't match, sets an error in onUpdateObj at the given path
   * @param {Object} confirmItem - The tag from confirm
   * @param {Object} onConfirmItem - The tag from onConfirm
   * @param {String} path - The path to set the error at in onUpdateObj
   */
  const compareTagValues = (confirmItem, onConfirmItem, path) => {
    if (confirmItem.value !== onConfirmItem.value) {
      onUpdateObj[
        `${path}.value`
      ] = `Mismatch: ${confirmItem.value} != ${onConfirmItem.value}`;
    }
  };

  /**
   * Maps confirmList and onConfirmList by descriptor.code, and then compares the values
   * of the tags in confirm and on_confirm. If the values don't match, sets an error in the
   * onUpdateObj.
   * @param {Array} confirmList - The list of tags from confirm.
   * @param {Array} onConfirmList - The list of tags from on_confirm.
   * @param {String} path - The path of the tag in the onUpdateObj.
   */
  const mapAndCompareTags = (confirmList, onConfirmList, path) => {
    const confirmMap = new Map();
    const onConfirmMap = new Map();

    // Map confirmList and onConfirmList by descriptor.code
    confirmList.forEach((obj) => {
      obj.list.forEach((item) => confirmMap.set(item.descriptor.code, item));
    });
    onConfirmList.forEach((obj) => {
      obj.list.forEach((item) => onConfirmMap.set(item.descriptor.code, item));
    });

    // Compare objects based on descriptor.code
    confirmMap.forEach((confirmItem, code) => {
      const onConfirmItem = onConfirmMap.get(code);
      if (!onConfirmItem) {
        onUpdateObj[`${path}.list.${code}`] = `Missing in on_confirm: ${code}`;
      } else {
        compareTagValues(confirmItem, onConfirmItem, `${path}.list.${code}`);
      }
    });

    // Check for any tags present in onConfirm but missing in confirm
    onConfirmMap.forEach((onConfirmItem, code) => {
      if (!confirmMap.has(code)) {
        onUpdateObj[`${path}.list.${code}`] = `Missing in confirm: ${code}`;
      }
    });
  };

  const validateTags = (confirm, on_confirm) => {
    mapAndCompareTags(confirm.tags, on_confirm.tags, "tags");
  };

  try {
    console.log("Comparing the payment.tags in /on_confirm and /on_update");

    validateTags(on_confirm?.payments[0], on_update?.payments[0]);
  } catch (e) {
    console.log(e);
  }

  const validateQuote = (data) => {
    return (
      data?.message?.order?.payments[0]?.params?.amount ===
      data?.message?.order?.quote?.price?.value
    );
  };

  try {
    console.log("Validating quote");
    if (!validateQuote(data)) {
      onUpdateObj["quoteErr"] =
        "payment.params.amount is not equal to quote.price.value";
    }
  } catch (e) {
    console.log("Error while validating quote");
    console.log(e);
  }

  /**
   * Compares the tags in /update and /on_update.
   * Maps both lists of tags by descriptor.code and then compares the values.
   * If the values don't match, sets an error in the onUpdateObj.
   * @param {Array} updateTags - The list of tags from /update.
   * @param {Array} onUpdateTags - The list of tags from /on_update.
   */
  function compareTags(updateTags, onUpdateTags) {
    try {
      const updateMap = new Map();
      const onUpdateMap = new Map();

      // Map updateTags and onUpdateTags by descriptor.code
      updateTags.forEach((tag) => {
        tag.list.forEach((item) => updateMap.set(item.descriptor.code, item));
      });
      onUpdateTags.forEach((tag) => {
        tag.list.forEach((item) => onUpdateMap.set(item.descriptor.code, item));
      });

      // Compare objects based on descriptor.code
      updateMap.forEach((updateItem, code) => {
        const onUpdateItem = onUpdateMap.get(code);
        if (!onUpdateItem) {
          onUpdateObj[
            `fulfillments[0].tags.${code}`
          ] = `Missing in on_update: ${code}`;
        } else if (updateItem.value !== onUpdateItem.value) {
          onUpdateObj[
            `fulfillments[0].tags.${code}.value`
          ] = `Mismatch: ${updateItem.value} != ${onUpdateItem.value}`;
        }
      });
    } catch (error) {
      onUpdateObj.general_error = `Error during fulfillment tags validation: ${error.message}`;
    }
  }

  try {
    console.log(
      "Checking if fulfillments tags in /update and /on_update are the same"
    );
    compareTags(
      update?.fulfillments[0]?.tags || [],
      on_update?.fulfillments[0]?.tags || []
    );
  } catch (error) {
    onUpdateObj.general_error = `Error during fulfillment tags validation: ${error.message}`;
  }
  console.log(onUpdateObj);
  return onUpdateObj;
};

module.exports = checkOnUpdate;

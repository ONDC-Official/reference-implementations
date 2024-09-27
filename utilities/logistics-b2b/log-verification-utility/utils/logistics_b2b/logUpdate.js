const _ = require("lodash");
const dao = require("../../dao/dao");

const checkUpdate = (data, msgIdSet) => {
  let updateObj = {};
  let update = data;
  let contextTimestamp = update.context.timestamp;
  update = update.message.order;
  dao.setValue("updateObj", update);
  if (update?.updated_at > contextTimestamp) {
    updateObj.updatedAtErr = `order/updated_at cannot be future dated w.r.t context/timestamp`;
  }
  let items = update?.items;
  let fulfillments = update?.fulfillments;
  let confirmFulfillments = dao.getValue("confirmObj")?.fulfillments;
  try {
    console.log("Checking if fulfillments are actually updated in /update");
    if (JSON.stringify(fulfillments) === JSON.stringify(confirmFulfillments)) {
      updateObj.fulfillmentsErr = `fulfillments in /update are same as in /confirm`;
    }
  } catch (error) {
    console.log(`Error checking fulfillments in /update`);
  }
  let onConfirmTags = dao.getValue("onConfirmObj")?.fulfillments[0]?.tags;
  let updateTags = update?.fulfillments[0]?.tags;

  /**
   * Finds the first item in the given list which has a descriptor with the given
   * code. If no such item is found, returns undefined.
   * @param {Array<{descriptor: {code: string}}>} list
   * @param {string} code
   * @returns {undefined|{descriptor: {code: string}}}
   */
  function findMatchingDescriptor(list, code) {
    return list.find((item) => item.descriptor.code === code);
  }

  /**
   * Compares the tags in onConfirmTags with updateTags.
   * @param {Array<{descriptor: {code: string}, list: Array<{descriptor: {code: string}}>}>} onConfirmTags
   * @param {Array<{descriptor: {code: string}, list: Array<{descriptor: {code: string}}>}>} updateTags
   * @returns {void}
   */
  function compareTags(onConfirmTags, updateTags) {
    try {
      // Iterate over each tag in onConfirmTags
      onConfirmTags.forEach((confirmTag, index) => {
        const updateTag = updateTags[index];

        // Validate the descriptor code matches
        if (confirmTag.descriptor.code !== updateTag.descriptor.code) {
          updateObj[
            `tags[${index}].descriptor.code`
          ] = `Mismatch: ${confirmTag.descriptor.code} != ${updateTag.descriptor.code}`;
          return;
        }

        // Iterate over each item in the list
        confirmTag.list.forEach((confirmItem, itemIndex) => {
          const matchingUpdateItem = findMatchingDescriptor(
            updateTag.list,
            confirmItem.descriptor.code
          );

          if (!matchingUpdateItem) {
            updateObj[
              `tags[${index}].list[${itemIndex}]`
            ] = `Missing in updateTags: ${confirmItem.descriptor.code}`;
            return;
          }
        });
      });
    } catch (error) {
      updateObj.general_error = `Error during validation: ${error.message}`;
    }
  }

  try {
    console.log("Checking if tags present in /on_confirm are present in /update");
    compareTags(onConfirmTags, updateTags);
  } catch (error) {
    updateObj.general_error = `Error during validation: ${error.message}`;
  }
  return updateObj;
};

module.exports = checkUpdate;

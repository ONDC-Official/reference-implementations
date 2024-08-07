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

  function findMatchingDescriptor(list, code) {
    return list.find((item) => item.descriptor.code === code);
  }
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

          // Compare values
          if (confirmItem.value !== matchingUpdateItem.value) {
            updateObj[
              `tags[${index}].list[${itemIndex}].value`
            ] = `Mismatch: ${confirmItem.value} != ${matchingUpdateItem.value}`;
          }
        });
      });
    } catch (error) {
      updateObj.general_error = `Error during validation: ${error.message}`;
    }
  }

  try {
    console.log("Checking if tags are same between /on_confirm and /update");
    compareTags(onConfirmTags, updateTags);
  } catch (error) {
    updateObj.general_error = `Error during validation: ${error.message}`;
  }
  return updateObj;
};

module.exports = checkUpdate;

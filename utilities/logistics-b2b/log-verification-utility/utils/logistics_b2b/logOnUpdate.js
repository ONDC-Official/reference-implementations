const _ = require("lodash");
const dao = require("../../dao/dao");

const checkOnUpdate = (data, msgIdSet) => {
  let onUpdateObj = {};
  let on_update = data;
  let contextTimestamp = on_update?.context?.timestamp;
  on_update = on_update.message.order;
  dao.setValue("onUpdateObj", on_update);
  let on_confirm = dao.getValue("onConfirmObj");
  let fulfillments = on_update.fulfillments;
  let items = on_update.items;

  if (on_update?.updated_at > contextTimestamp) {
    onUpdateObj.updatedAtErr =
      "order/updated_at cannot be future dated w.r.t context/timestamp";
  }

  const compareTagValues = (confirmItem, onConfirmItem, path) => {
    if (confirmItem.value !== onConfirmItem.value) {
      onUpdateObj[
        `${path}.value`
      ] = `Mismatch: ${confirmItem.value} != ${onConfirmItem.value}`;
    }
  };

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

  function validateFulfillments(update, on_update) {
    function mapAndCompareObjects(updateList, onUpdateList, path) {
      const updateMap = new Map();
      updateList.forEach((obj) => updateMap.set(obj.id, obj)); // Assuming each fulfillment has a unique 'id' field

      onUpdateList.forEach((obj, index) => {
        const updateObj = updateMap.get(obj.id);
        if (!updateObj) {
          onUpdateObj[`${path}[${index}]`] = "Missing fulfillment";
          return;
        }
        compareObjects(updateObj, obj, `${path}[${index}]`);
      });
    }

    mapAndCompareObjects(
      update.fulfillments,
      on_update.fulfillments,
      "fulfillments"
    );
  }

  let update = dao.getValue("updateObj");
  try {
    console.log("Validating fulfillments");
    validateFulfillments(update, on_update);
  } catch (e) {
    console.log(e);
  }
  console.log(onUpdateObj);
  return onUpdateObj;
};

module.exports = checkOnUpdate;

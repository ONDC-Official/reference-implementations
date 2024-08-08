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

  function compareObjects(obj1, obj2, path = "") {
    if (typeof obj1 !== typeof obj2) {
      onUpdateObj[path] = `Type mismatch: ${typeof obj1} != ${typeof obj2}`;
      return;
    }

    if (obj1 === null || obj2 === null) {
      if (obj1 !== obj2) {
        onUpdateObj[path] = `Mismatch: ${obj1} != ${obj2}`;
      }
      return;
    }

    if (typeof obj1 !== "object") {
      if (obj1 !== obj2) {
        onUpdateObj[path] = `Mismatch: ${obj1} != ${obj2}`;
      }
      return;
    }

    // Exclude 'updated_at' and 'status' from validation
    const excludedKeys = ["updated_at", "status"];
    const keys1 = Object.keys(obj1).filter(
      (key) => !excludedKeys.includes(key)
    );
    const keys2 = Object.keys(obj2).filter(
      (key) => !excludedKeys.includes(key)
    );

    // Check for missing keys in onUpdate
    keys1.forEach((key) => {
      if (!obj2.hasOwnProperty(key)) {
        onUpdateObj[`${path}.${key}`] = `Missing in onUpdate: ${key}`;
        return;
      }
      compareObjects(obj1[key], obj2[key], `${path}.${key}`);
    });
  }

  try {
    console.log("Comparing the payment.tags in /on_confirm and /on_update");

    compareObjects(on_confirm?.payments[0]?.tags, on_update?.payments[0]?.tags);
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

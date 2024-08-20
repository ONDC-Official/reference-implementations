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
    function mapAndCompareTags(updateList, onUpdateList, path) {
      const updateMap = new Map();
      const onUpdateMap = new Map();

      // Map updateList and onUpdateList by descriptor.code
      updateList.forEach((obj) => {
        obj.list.forEach((item) => updateMap.set(item.descriptor.code, item));
      });
      onUpdateList.forEach((obj) => {
        obj.list.forEach((item) => onUpdateMap.set(item.descriptor.code, item));
      });

      // Compare objects based on descriptor.code
      updateMap.forEach((updateItem, code) => {
        const onUpdateItem = onUpdateMap.get(code);
        if (!onUpdateItem) {
          onUpdateObj[`${path}.list.${code}`] = `Missing in onUpdate: ${code}`;
        } else {
          compareTagValues(updateItem, onUpdateItem, `${path}.list.${code}`);
        }
      });

      // Check for any tags present in onUpdate but missing in update
      onUpdateMap.forEach((onUpdateItem, code) => {
        if (!updateMap.has(code)) {
          onUpdateObj[`${path}.list.${code}`] = `Missing in update: ${code}`;
        }
      });
    }

    function compareTagValues(updateItem, onUpdateItem, path) {
      if (updateItem.value !== onUpdateItem.value) {
        onUpdateObj[
          `${path}.value`
        ] = `Mismatch: ${updateItem.value} != ${onUpdateItem.value}`;
      }
    }

    mapAndCompareTags(
      update.fulfillments[0].tags,
      on_update.fulfillments[0].tags,
      "fulfillments[0].tags"
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

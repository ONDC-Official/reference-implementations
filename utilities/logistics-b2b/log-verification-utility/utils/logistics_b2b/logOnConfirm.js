const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const utils = require("../utils");

const checkOnConfirm = (data, msgIdSet) => {
  let on_confirm = data;
  let confirm = dao.getValue("confirmObj");
  const onConfirmObj = {};
  const contextTimestamp = on_confirm?.context?.timestamp;
  on_confirm = on_confirm?.message?.order;
  dao.setValue("onConfirmObj", on_confirm);
  let items = on_confirm?.items;
  let fulfillments = on_confirm?.fulfillments;
  if (on_confirm?.updated_at > contextTimestamp) {
    onConfirmObj.updatedAtErr = `order/updated_at cannot be future dated w.r.t context/timestamp`;
  }
  if (on_confirm?.created_at > contextTimestamp) {
    onConfirmObj.createdAtErr = `order/created_at cannot be future dated w.r.t context/timestamp`;
  }
  if (on_confirm?.created_at > on_confirm?.updated_at) {
    onConfirmObj.createdAtErr = `order/created_at cannot be future dated w.r.t order/updated_at`;
  }
  if (on_confirm?.updated_at < confirm?.updatedAt) {
    onConfirmObj.updatedAtErr = `order/updated_at should be updated w.r.t context/timestamp`;
  }

  function compareObjects(obj1, obj2, path = "") {
    if (typeof obj1 !== typeof obj2) {
      onConfirmObj[path] = `Type mismatch: ${typeof obj1} != ${typeof obj2}`;
      return;
    }

    if (obj1 === null || obj2 === null) {
      if (obj1 !== obj2) {
        onConfirmObj[path] = `Mismatch: ${obj1} != ${obj2}`;
      }
      return;
    }

    if (typeof obj1 !== "object") {
      if (obj1 !== obj2) {
        onConfirmObj[path] = `Mismatch: ${obj1} != ${obj2}`;
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

    // Check for missing keys in onConfirm
    keys1.forEach((key) => {
      if (!obj2.hasOwnProperty(key)) {
        onConfirmObj[`${path}.${key}`] = `Missing in onConfirm: ${key}`;
        return;
      }
      compareObjects(obj1[key], obj2[key], `${path}.${key}`);
    });
  }

  // Assuming confirm and onConfirm are your data objects
  try {
    console.log("Validating /on_confirm with /confirm");
    compareObjects(confirm, on_confirm);
  } catch (error) {
    onConfirmObj.general_error = `Error during validation: ${error.message}`;
  }
  return onConfirmObj;
};

module.exports = checkOnConfirm;

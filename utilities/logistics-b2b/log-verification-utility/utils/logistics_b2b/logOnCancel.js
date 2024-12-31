const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils.js");

const checkOnCancel = (data, msgIdSet) => {
  let on_cancel = data;
  let onCancelObj = {};
  let contextTime = on_cancel.context.timestamp;
  on_cancel = on_cancel.message.order;

  if (on_cancel?.updated_at < contextTime) {
    onCancelObj.updatedAtErr = `order/updated_at should be updated w.r.t context/timestamp`;
  }

  let reference = dao.getValue("onUpdateObj")
    ? dao.getValue("onUpdateObj")
    : dao.getValue("onConfirmObj");
  /**
   * Recursively compares two objects and logs any type mismatches or value differences
   * to the onCancelObj object. Excludes 'updated_at', 'status', 'quote', 'cancellation_terms',
   * 'payments' and 'fulfillments' from validation.
   * @param {Object} obj1 first object to compare
   * @param {Object} obj2 second object to compare
   * @param {String} path current path being compared
   */
  function compareObjects(obj1, obj2, path = "") {
    if (typeof obj1 !== typeof obj2) {
      onCancelObj[path] = `Type mismatch: ${typeof obj1} != ${typeof obj2}`;
      return;
    }

    if (obj1 === null || obj2 === null) {
      if (obj1 !== obj2) {
        onCancelObj[path] = `Mismatch: ${obj1} != ${obj2}`;
      }
      return;
    }

    if (typeof obj1 !== "object") {
      if (obj1 !== obj2) {
        onCancelObj[path] = `Mismatch: ${obj1} != ${obj2}`;
      }
      return;
    }

    // Exclude 'updated_at' and 'status' from validation
    const excludedKeys = [
      "updated_at",
      "status",
      "quote",
      "cancellation_terms",
      "payments",
      "fulfillments",
    ];
    const keys1 = Object.keys(obj1).filter(
      (key) => !excludedKeys.includes(key)
    );
    const keys2 = Object.keys(obj2).filter(
      (key) => !excludedKeys.includes(key)
    );

    // Check for missing keys in onConfirm   
    keys1.forEach((key) => {
      if (!obj2.hasOwnProperty(key)) {
        const parentKey = path || "order"; // 'path' keeps track of the hierarchy
        onCancelObj[`${path}.${key}`] = `Object "${key}" is missing in onCancel under parent "${parentKey}"`;
        return;
      }
      compareObjects(obj1[key], obj2[key], `${path}.${key}`);
    });
  }
  try {
    console.log("Comparing /on_confirm or /on_update with /on_cancel");
    compareObjects(reference, on_cancel);
  } catch (error) {
    onCancelObj.general_error = `Error during validation: ${error.message}`;
  }
  dao.setValue("onCancelObj", on_cancel);
  return onCancelObj;
};

module.exports = checkOnCancel;

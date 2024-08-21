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

  const compareTagValues = (confirmItem, onConfirmItem, path) => {
    if (confirmItem.value !== onConfirmItem.value) {
      onConfirmObj[
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
        onConfirmObj[`${path}.list.${code}`] = `Missing in on_confirm: ${code}`;
      } else {
        compareTagValues(confirmItem, onConfirmItem, `${path}.list.${code}`);
      }
    });

    // Check for any tags present in onConfirm but missing in confirm
    onConfirmMap.forEach((onConfirmItem, code) => {
      if (!confirmMap.has(code)) {
        onConfirmObj[`${path}.list.${code}`] = `Missing in confirm: ${code}`;
      }
    });
  };

  const validateTags = (confirm, on_confirm) => {
    mapAndCompareTags(confirm.tags, on_confirm.tags, "tags");
  };

  const validatePayments = (confirm, on_confirm) => {
    const compareParams = (confirmParams, onConfirmParams, path) => {
      // Compare each parameter in confirmParams with onConfirmParams
      for (const [key, value] of Object.entries(confirmParams)) {
        if (value !== onConfirmParams[key]) {
          onConfirmObj[
            `${path}.${key}`
          ] = `Mismatch: ${value} != ${onConfirmParams[key]}`;
        }
      }

      // Check for any parameters present in onConfirm but missing in confirm
      for (const [key, value] of Object.entries(onConfirmParams)) {
        if (!(key in confirmParams)) {
          onConfirmObj[`${path}.${key}`] = `Missing in confirm: ${key}`;
        }
      }
    };

    const validatePaymentsArray = (confirmArray, onConfirmArray) => {
      const confirmMap = new Map();
      const onConfirmMap = new Map();

      // Map confirmArray and onConfirmArray by id
      confirmArray.forEach((payment) => confirmMap.set(payment.id, payment));
      onConfirmArray.forEach((payment) =>
        onConfirmMap.set(payment.id, payment)
      );

      // Compare payments based on id
      confirmMap.forEach((confirmPayment, id) => {
        const onConfirmPayment = onConfirmMap.get(id);
        if (!onConfirmPayment) {
          onConfirmObj[`payments.${id}`] = `Missing in on_confirm: ${id}`;
        } else {
          // Compare collected_by
          if (confirmPayment.collected_by !== onConfirmPayment.collected_by) {
            onConfirmObj[
              `payments.${id}.collected_by`
            ] = `Mismatch: ${confirmPayment.collected_by} != ${onConfirmPayment.collected_by}`;
          }

          // Compare params
          compareParams(
            confirmPayment.params,
            onConfirmPayment.params,
            `payments.${id}.params`
          );

          // Compare tags
          mapAndCompareTags(
            confirmPayment.tags,
            onConfirmPayment.tags,
            `payments.${id}.tags`
          );
        }
      });

      // Check for any payments present in onConfirm but missing in confirm
      onConfirmMap.forEach((onConfirmPayment, id) => {
        if (!confirmMap.has(id)) {
          onConfirmObj[`payments.${id}`] = `Missing in confirm: ${id}`;
        }
      });
    };

    validatePaymentsArray(confirm.payments, on_confirm.payments);
  };

  try {
    console.log("Validating tags");
    validateTags(confirm, on_confirm);
  } catch (error) {
    onConfirmObj.general_error = `Error during validation: ${error.message}`;
  }
  try {
    console.log("Validating payments");
    validatePayments(confirm, on_confirm);
  } catch (error) {
    onConfirmObj.general_error = `Error during validation: ${error.message}`;
  }
  // function compareObjects(obj1, obj2, path = "") {
  //   if (typeof obj1 !== typeof obj2) {
  //     onConfirmObj[path] = `Type mismatch: ${typeof obj1} != ${typeof obj2}`;
  //     return;
  //   }

  //   if (obj1 === null || obj2 === null) {
  //     if (obj1 !== obj2) {
  //       onConfirmObj[path] = `Mismatch: ${obj1} != ${obj2}`;
  //     }
  //     return;
  //   }

  //   if (typeof obj1 !== "object") {
  //     if (obj1 !== obj2) {
  //       onConfirmObj[path] = `Mismatch: ${obj1} != ${obj2}`;
  //     }
  //     return;
  //   }

  //   // Exclude 'updated_at' and 'status' from validation
  //   const excludedKeys = ["updated_at", "status"];
  //   const keys1 = Object.keys(obj1).filter(
  //     (key) => !excludedKeys.includes(key)
  //   );
  //   const keys2 = Object.keys(obj2).filter(
  //     (key) => !excludedKeys.includes(key)
  //   );

  //   // Check for missing keys in onConfirm
  //   keys1.forEach((key) => {
  //     if (!obj2.hasOwnProperty(key)) {
  //       onConfirmObj[`${path}.${key}`] = `Missing in onConfirm: ${key}`;
  //       return;
  //     }
  //     compareObjects(obj1[key], obj2[key], `${path}.${key}`);
  //   });
  // }

  // // Assuming confirm and onConfirm are your data objects
  // try {
  //   console.log("Validating /on_confirm with /confirm");
  //   compareObjects(confirm, on_confirm);
  // } catch (error) {
  //   onConfirmObj.general_error = `Error during validation: ${error.message}`;
  // }
  return onConfirmObj;
};

module.exports = checkOnConfirm;

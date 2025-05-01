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
    if (confirmItem?.value !== onConfirmItem?.value) {
      onConfirmObj[
        `${path}.value`
      ] = `Mismatch: ${confirmItem?.value} != ${onConfirmItem?.value}`;
    }
  };

  const mapAndCompareTags = (confirmList, onConfirmList, path) => {
    const confirmMap = new Map();
    const onConfirmMap = new Map();

    confirmList?.forEach((obj) => {
      obj.list?.forEach((item) => confirmMap.set(item.descriptor.code, item));
    });
    onConfirmList?.forEach((obj) => {
      obj.list?.forEach((item) => onConfirmMap.set(item.descriptor.code, item));
    });

    confirmMap.forEach((confirmItem, code) => {
      const onConfirmItem = onConfirmMap.get(code);
      if (!onConfirmItem) {
        onConfirmObj[`${path}.list.${code}`] = `Missing in on_confirm: ${code}`;
      } else {
        compareTagValues(confirmItem, onConfirmItem, `${path}.list.${code}`);
      }
    });

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
      for (const [key, value] of Object.entries(confirmParams || {})) {
        if (value !== onConfirmParams?.[key]) {
          onConfirmObj[
            `${path}.${key}`
          ] = `Mismatch: ${value} != ${onConfirmParams?.[key]}`;
        }
      }
      for (const [key] of Object.entries(onConfirmParams || {})) {
        if (!(key in (confirmParams || {}))) {
          onConfirmObj[`${path}.${key}`] = `Missing in confirm: ${key}`;
        }
      }
    };

    const validatePaymentsArray = (confirmArray, onConfirmArray) => {
      const confirmMap = new Map();
      const onConfirmMap = new Map();

      confirmArray?.forEach((payment) => confirmMap.set(payment.id, payment));
      onConfirmArray?.forEach((payment) =>
        onConfirmMap.set(payment.id, payment)
      );

      confirmMap.forEach((confirmPayment, id) => {
        const onConfirmPayment = onConfirmMap.get(id);
        if (!onConfirmPayment) {
          onConfirmObj[`payments.${id}`] = `Missing in on_confirm: ${id}`;
        } else {
          if (confirmPayment?.collected_by !== onConfirmPayment?.collected_by) {
            onConfirmObj[
              `payments.${id}.collected_by`
            ] = `Mismatch: ${confirmPayment?.collected_by} != ${onConfirmPayment?.collected_by}`;
          }
          compareParams(
            confirmPayment?.params,
            onConfirmPayment?.params,
            `payments.${id}.params`
          );
          mapAndCompareTags(
            confirmPayment?.tags || [],
            onConfirmPayment?.tags || [],
            `payments.${id}.tags`
          );
        }
      });

      onConfirmMap.forEach((onConfirmPayment, id) => {
        if (!confirmMap.has(id)) {
          onConfirmObj[`payments.${id}`] = `Missing in confirm: ${id}`;
        }
      });
    };

    validatePaymentsArray(confirm?.payments, on_confirm?.payments);
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
  return onConfirmObj;
};

module.exports = checkOnConfirm;

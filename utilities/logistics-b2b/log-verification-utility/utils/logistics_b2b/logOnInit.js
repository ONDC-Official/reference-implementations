const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");

const checkOnInit = async (data, msgIdSet) => {
  let onInitObj = {};
  let onInit = data;
  onInit = onInit?.message?.order;
  let init = dao.getValue("initObj");

  let items = init?.items || [];

  const validateQuote = (data) => {
    return (
      data.message.order.payments.params.amount ===
      data.message.order.quote.price.value
    );
  };

  try {
    console.log("Validating quote");
    if (!validateQuote(data)) {
      onInitObj["quoteErr"] =
        "payment.params.amount is not equal to quote.price.value";
    }
  } catch (e) {
    console.log("Error while validating quote");
  }

  function validateItems(orderItems, referenceItems, initObj) {
    try {
      console.log("Validating order items");

      orderItems.forEach((orderItem) => {
        const matchingItem = referenceItems.find(
          (refItem) => refItem.id === orderItem.id
        );

        if (!matchingItem) {
          initObj[
            `itemNotFoundErr_${orderItem.id}`
          ] = `Item with id ${orderItem.id} not found in the /init items.`;
          return;
        }

        Object.keys(orderItem).forEach((key) => {
          if (key === "tags") {
            if (!_.isEqual(orderItem.tags, matchingItem.tags)) {
              initObj[
                `itemTagsMismatchErr_${orderItem.id}`
              ] = `Mismatch in tags for item ${orderItem.id}`;
            }
          } else if (
            typeof orderItem[key] === "object" &&
            orderItem[key] !== null
          ) {
            Object.keys(orderItem[key]).forEach((nestedKey) => {
              if (
                !_.isEqual(
                  orderItem[key][nestedKey],
                  matchingItem[key]?.[nestedKey]
                )
              ) {
                initObj[
                  `itemFieldMismatchErr_${orderItem.id}_${key}_${nestedKey}`
                ] = `Mismatch in ${key}.${nestedKey} for item ${orderItem.id}`;
              }
            });
          } else if (!_.isEqual(orderItem[key], matchingItem[key])) {
            initObj[
              `itemFieldMismatchErr_${orderItem.id}_${key}`
            ] = `Mismatch in ${key} for item ${orderItem.id}`;
          }
        });
      });
    } catch (e) {
      console.log("Error while validating order items", e);
      initObj["itemValidationError"] =
        "An error occurred while validating order items";
    }
  }
  validateItems(data.message.order.items, items, onInitObj);
  dao.setValue("onInitObj", onInit);
  return onInitObj;
};

module.exports = checkOnInit;

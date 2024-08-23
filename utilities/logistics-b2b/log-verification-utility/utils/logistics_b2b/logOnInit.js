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

  /**
   * Validates that the amount in payment params matches the value in quote price.
   * @param {Object} data - The data object from the message.
   * @returns {boolean} - True if the amounts match, false otherwise.
   */
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

  /**
   * Validates order items against a set of reference items.
   *
   * @param {Array} orderItems - The items to be validated.
   * @param {Array} referenceItems - The reference items to validate against.
   * @param {Object} initObj - An object to store error messages in.
   *
   * Performs the following validations:
   * 1. Checks if each order item exists in the reference items by ID.
   * 2. Compares the 'tags' property of each order item with the corresponding reference item.
   * 3. Recursively compares the properties of nested objects in each order item with the corresponding reference item.
   * 4. Compares simple property values (non-objects) of each order item with the corresponding reference item.
   *
   * If any discrepancies are found, adds an error message to the initObj with a specific key indicating the type of error and the affected item ID.
   */
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
  try{
    validateItems(data.message.order.items, items, onInitObj);
  }catch(e){
    console.log("Error while validating order items", e);
    onInitObj["itemValidationError"] =
      "An error occurred while validating order items";
  }
  dao.setValue("onInitObj", onInit);
  return onInitObj;
};

module.exports = checkOnInit;

const fs = require("fs");
const _ = require("lodash");
const dao = require("../../../dao/dao");
const constants = require("../../constants");
const utils = require("../../utils");

const checkOnInit = (data, msgIdSet) => {
  let on_init = data;
  const onInitObj = {};

  on_init = on_init.message.order;
  let provId = on_init.provider.id;
  const orderTags = on_init?.tags;
  let bppTerms = false;

  let onSearchProvArr = dao.getValue("providersArr");

  console.log(dao.getValue("providerLoc"), on_init.provider_location);
  if (dao.getValue("providerLoc") === false && on_init.provider_location) {
    onInitObj.prvdrLocErr = `Provider location should be provided only if returned in /on_search, also it is used where the shipment has to be dropped at LSP location`;
  }

  try {
    console.log(
      `Comparing order quote price and break up  in ${constants.LOG_ONINIT}`
    );
    if (on_init.hasOwnProperty("quote")) {
      if (!utils.hasTwoOrLessDecimalPlaces(on_init.quote.price.value)) {
        onInitObj.qteDecimalErr = `Quote price value should not have more than 2 decimal places`;
      }
      let totalBreakup = 0;
      let tax_present = false;
      on_init.quote.breakup.forEach((breakup, i) => {
        if (!utils.hasTwoOrLessDecimalPlaces(breakup.price.value)) {
          let itemkey = `itemPriceErr${i}`;

          onInitObj[
            itemkey
          ] = `Price value for '${breakup["@ondc/org/title_type"]}' should not have more than 2 decimal places`;
        }
        totalBreakup += parseFloat(breakup?.price?.value);
        totalBreakup = parseFloat(totalBreakup.toFixed(2));
        if (breakup["@ondc/org/title_type"] === "tax") tax_present = true;
        onSearchProvArr?.forEach((provider) => {
          if (provider.id === provId) {
            provider?.items.forEach((item, i) => {
              if (
                item.id === breakup["@ondc/org/item_id"] &&
                breakup["@ondc/org/title_type"] === "delivery"
              ) {
                if (
                  parseFloat(on_init.quote.price.value) !==
                  parseFloat(item.price.value)
                ) {
                  let itemKey = `priceArr${i}`;
                  onInitObj[itemKey] = `Quote price ${parseFloat(
                    on_init?.quote?.price?.value
                  )} for item id '${
                    breakup["@ondc/org/item_id"]
                  }' does not match item price ${
                    item.price.value
                  } in /on_search`;
                }
              }
            });
          }
        });
      });

      if (!tax_present)
        onInitObj.taxErr = `fulfillment charges will have separate quote line item for taxes`;
      if (parseFloat(on_init?.quote?.price?.value) !== totalBreakup)
        onInitObj.quotePriceErr = `Quote price ${parseFloat(
          on_init.quote.price.value
        )} does not match the breakup total  ${totalBreakup} in ${
          constants.LOG_ONINIT
        }`;
    }
  } catch (err) {
    console.log(
      `!!Error fetching order quote price in ${constants.LOG_ONINIT}`,
      err
    );
  }

  try {
    console.log("Checking order tags in /on_init");
    if (orderTags) {
      orderTags.forEach((tag) => {
        if (tag?.code === "bpp_terms") {
          bppTerms = true;
        }
      });
    }
    dao.setValue("bppTerms", bppTerms);
  } catch (error) {
    console.log(error);
    
  }

  return onInitObj;
};

module.exports = checkOnInit;

const fs = require("fs");
const _ = require("lodash");
const dao = require("../../../dao/dao");
const constants = require("../../constants");
const utils = require("../../utils");
const init = require("../../../schema/keywords/init");
const { on } = require("events");

const checkOnInit = (data, msgIdSet) => {
  const initCategoryId = JSON.stringify(dao.getValue("init_item_category_id"));
  const initLinkedProviderTags = JSON.stringify(
    dao.getValue("init_linked_provider")
  );
  let on_init = data;
  const onInitObj = {};

  on_init = on_init.message.order;
  let provId = on_init.provider.id;
  const cod_order = dao.getValue("cod_order");
  const COD_ITEM = dao.getValue("COD_ITEM");
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
    if (on_init?.hasOwnProperty("quote")) {
      if (!utils.hasTwoOrLessDecimalPlaces(on_init.quote.price.value)) {
        onInitObj.qteDecimalErr = `Quote price value should not have more than 2 decimal places`;
      }
      let totalBreakup = 0;
      let tax_present = false;
      on_init?.quote?.breakup.forEach((breakup, i) => {
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

      if (cod_order) {
        const hasCodBreakup = on_init?.quote?.breakup?.some(
          (b) => b["@ondc/org/title_type"] === "cod"
        );
        if (!hasCodBreakup) {
          onInitObj.codErr = `title_type "cod" is mandatory in /on_init breakup array when order type is COD`;
        }
      }

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
    const onInitItem = [];
    on_init?.items?.forEach((item) => onInitItem.push(item?.id));
    if (cod_order) {
      COD_ITEM?.forEach((item) => {
        if (!onInitItem.includes(item?.id)) {
          onInitObj.codOrderItemErr = `Item with id '${item.id}' does not exist in /on_init when order type is COD`;
        }
      });
    }
  } catch (error) {
    console.log(`!!Error fetching order item  in${constants.LOG_ONINIT}`, err);
  }

  try {
    let riderCheck = false;
    on_init?.fulfillments?.forEach((fulfillment) => {
      fulfillment?.tags?.forEach((item) => {
        if (item?.code === "linked_provider") {
          if (!_.isEqual(JSON.stringify(item), initLinkedProviderTags)) {
            onInitObj.linkedPrvdrErr = `linked_provider tag in /on_init does not match with the one provided in /init`;
          }
        }

        if (item?.code === "rider_check") riderCheck = true;
      });
      if (cod_order) {
        const linkedOrderTag = fulfillment?.tags?.find(
          (tag) => tag.code === "linked_order"
        );
        const codOrderItem = linkedOrderTag.list?.find(
          (item) => item.code === "cod_order"
        );
        if (!linkedOrderTag) {
          onInitObj.codOrderErr = `linked_order tag is mandatory in /init when order type is COD`;
        } else if (!codOrderItem) {
          onInitObj.codOrderErr = `cod_order code must be present inside linked_order for COD`;
        } else if (codOrderItem?.value !== cod_order)
          onInitObj.codOrderErr = `cod_order value '${codOrderItem?.value}' in linked_order does not match with the one provided in /search (${cod_order})`;
      }
    });

    if (JSON.parse(initCategoryId) === "Immediate Delivery" && !riderCheck) {
      onInitObj.riderCheckErr = `rider_check tag is mandatory in /on_init when category_id is Immediate Delivery`;
    }
  } catch (error) {
    console.log(
      `!!Error while checking fulfillment array in /${constants.LOG_ONINIT}`,
      error
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

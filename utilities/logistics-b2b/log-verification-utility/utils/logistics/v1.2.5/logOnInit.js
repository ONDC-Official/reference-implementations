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
  const paymentWallet = dao.getValue("payment_wallet");
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

  if (paymentWallet) {
    const collectedBy = on_init?.payment?.collected_by;
    const paymentTags = on_init?.payment?.tags || [];

    if (!collectedBy) {
      onInitObj.paymentCollectedByErr = `payment/collected_by is mandatory for payment_wallet flow`;
    } else if (collectedBy !== "BPP") {
      onInitObj.paymentCollectedByErr = `payment/collected_by should be 'BPP' for payment_wallet flow`;
    }

    if (!paymentTags || paymentTags.length < 1) {
      onInitObj.paymentTagsErr = `payment/tags is mandatory for payment_wallet flow`;
    } else {
      const payment_wallet = on_init?.payment?.tags.find(
        (i) => i.code === "wallet_balance"
      );
      if (!payment_wallet) {
        onInitObj.paymentWalletErr = `payment/tags must contain 'wallet_balance' for payment_wallet flow`;
      } else {
        const currency = payment_wallet?.list.some(
          (item) => item?.code === "currency"
        );
        const amount = payment_wallet?.list.find(
          (item) => item?.code === "value"
        );
        if (!currency) {
          onInitObj.paymentWalletErr = `payment/tags/wallet_balance must contain 'currency' code`;
        } else if (!amount) {
          onInitObj.paymentWalletErr = `payment/tags/wallet_balance must contain 'value' code`;
        } else if (!amount?.value) {
          onInitObj.paymentWalletErr = `payment/tags/wallet_balance value must be present or not empty`;
        } else {
          dao.setValue("payment_wallet_amount", amount?.value);
        }
      }
    }
  }

  if (on_init?.payment?.type === "POST-FULFILLMENT") {
    const requiredFields = {
      "@ondc/org/settlement_basis":
        "payment/@ondc/org/settlement_basis is mandatory for POST-FULFILLMENT payment type",
      "@ondc/org/settlement_window":
        "payment/@ondc/org/settlement_window is mandatory for POST-FULFILLMENT payment type",
    };

    for (const [field, errorMessage] of Object.entries(requiredFields)) {
      if (!on_init?.payment?.[field]) {
        const errorKey = `payment${field.replace(/[^a-zA-Z]/g, "")}Err`;
        onInitObj[errorKey] = errorMessage;
      }
    }
  }

  try {
    const onInitItem = [];
    on_init?.items?.forEach((item) => onInitItem.push(item?.id));
    if (cod_order) {
      if (COD_ITEM && !onInitItem.includes(COD_ITEM[0]?.id)) {
        onInitObj.codOrderItemErr = `Item with id '${COD_ITEM[0]?.id}' does not exist in /on_init when order type is COD`;
      }
      // COD_ITEM?.forEach((item) => {
      //   if (!onInitItem.includes(item?.id)) {
      //     onInitObj.codOrderItemErr = `Item with id '${item.id}' does not exist in /on_init when order type is COD`;
      //   }
      // });
    }
  } catch (error) {
    console.log(`!!Error fetching order item  in${constants.LOG_ONINIT}`, err);
  }

  try {
    let riderCheck = undefined;
    on_init?.fulfillments?.forEach((fulfillment) => {
      fulfillment?.tags?.forEach((item) => {
        if (item?.code === "linked_provider") {
          if (!_.isEqual(JSON.stringify(item), initLinkedProviderTags)) {
            onInitObj.linkedPrvdrErr = `linked_provider tag in /on_init does not match with the one provided in /init`;
          }
        }

        if (item?.code === "rider_check") riderCheck = item?.list;
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
    if (on_init?.hasOwnProperty("cancellation_terms")) {
      console.log("validating cancellation terms" + initCategoryId);
      const cancellationTerms = on_init?.cancellation_terms;
      if (!Array.isArray(cancellationTerms)) {
        onInitObj.cancellationTerms = "cancellation_terms must be an array";
      } else {
        cancellationTerms.forEach((term, index) => {
          const path = `cancellation_terms[${index}]`;

          // fulfillment_state
          const descriptor = term?.fulfillment_state?.descriptor;
          if (!descriptor) {
            onInitObj.cancellationTerms = `${path}.fulfillment_state.descriptor is missing`;
          } else {
            if (!descriptor.code) {
              onInitObj.cancellationTerms = `${path}.fulfillment_state.descriptor.code is missing`;
            } else {
              if (!constants.fulfillment_state.includes(descriptor.code)) {
                onInitObj.cancellationTerms = `${path}.fulfillment_state.descriptor.code is Invalid`;
              }
            }
            if (!descriptor.short_desc) {
              onInitObj.cancellationTerms = `${path}.fulfillment_state.descriptor.short_desc is missing`;
            }
          }

          // cancellation_fee
          const fee = term?.cancellation_fee;
          if (!fee) {
            onInitObj.cancellationTerms = `${path}.cancellation_fee is missing`;
          } else {
            if (!fee.percentage) {
              onInitObj.cancellationTerms = `${path}.cancellation_fee.percentage is missing`;
            }
            if (!fee.amount) {
              onInitObj.cancellationTerms = `${path}.cancellation_fee.amount is missing`;
            } else {
              if (!fee.amount.currency) {
                onInitObj.cancellationTerms = `${path}.cancellation_fee.amount.currency is missing`;
              }
              if (!fee.amount.value) {
                onInitObj.cancellationTerms = `${path}.cancellation_fee.amount.value is missing`;
              }
            }
          }
        });
      }
    }
    if (
      initCategoryId != undefined &&
      initCategoryId != null &&
      initCategoryId != "null" &&
      initCategoryId != "undefined"
    ) {
      if (JSON.parse(initCategoryId) === "Immediate Delivery") {
        const inlineRiderCheck = riderCheck?.find(
          (i) => i.code === "inline_check_for_rider"
        );
        if (!riderCheck)
          onInitObj.riderCheckErr = `rider_check tag is mandatory in /on_init when category_id is Immediate Delivery`;
        else if (!inlineRiderCheck)
          onInitObj.riderCheckErr = `inline_check_for_rider tag is mandatory in /on_init when category_id is Immediate Delivery`;
        else if (inlineRiderCheck?.value !== "yes")
          onInitObj.riderCheckErr = `inline_check_for_rider value should be "yes" in /on_init when category_id is Immediate Delivery`;
      }
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

const fs = require("fs");
const _ = require("lodash");
const dao = require("../../../dao/dao");
const utils = require("../../utils");

const constants = require("../../constants");

const checkOnConfirm = (data, msgIdSet) => {
  let on_confirm = data;
  const onCnfrmObj = {};
  const domain = data?.context?.domain;
  const contextTimestamp = on_confirm.context.timestamp;
  const confirm_fulfillment_tags = dao.getValue("confirm_fulfillment_tags");
  on_confirm = on_confirm.message.order;
  let items = on_confirm.items;
  const cod_order = dao.getValue("cod_order");
  const COD_ITEM = dao.getValue("COD_ITEM");
  let fulfillments = on_confirm.fulfillments;
  let linkedOrder = on_confirm["@ondc/org/linked_order"];
  let onCnfrmItemId = [];
  let rts = dao.getValue("rts");
  let p2h2p = dao.getValue("p2h2p");
  let awbNo = dao.getValue("awbNo");
  const surgeItem = dao.getValue("is_surge_item");
  const surgeItemData = dao.getValue("surge_item");
  let surgeItemFound = null;

  if (on_confirm?.updated_at > contextTimestamp) {
    onCnfrmObj.updatedAtErr = `order/updated_at cannot be future dated w.r.t context/timestamp`;
  }
  if (on_confirm?.created_at > contextTimestamp) {
    onCnfrmObj.createdAtErr = `order/created_at cannot be future dated w.r.t context/timestamp`;
  }
  if (on_confirm?.created_at > on_confirm?.updated_at) {
    onCnfrmObj.createdAtErr = `order/created_at cannot be future dated w.r.t order/updated_at`;
  }

  if (on_confirm?.updated_at < dao.getValue("cnfrmTimestamp")) {
    onCnfrmObj.updatedAtErr = `order/updated_at should be updated w.r.t context/timestamp`;
  }
  let categoryId;
  let descriptor_code;
  items?.forEach((item, i) => {
    if (domain === "ONDC:LOG10" && !item?.time?.timestamp) {
      onCnfrmObj[
        `Item${i}_timestamp`
      ] = `Timestamp is mandatory inside time object for item ${item.id} in ${constants.LOG_ONSEARCH} api in order type P2P (ONDC:LOG10)`;
    }
    onCnfrmItemId.push(item?.id);
    categoryId = item.category_id;
    descriptor_code = item.descriptor?.code;

    if (
      surgeItem &&
      item?.id === surgeItemData?.id &&
      Array.isArray(item.tags) &&
      item.tags.length > 0
    ) {
      surgeItemFound = item;
    }
  });

  if (!surgeItemFound) {
    onCnfrmObj.surgeItemErr = `Surge item is missing in the order`;
  } else if (!_.isEqual(surgeItemFound.price, surgeItemData?.price)) {
    onCnfrmObj.surgeItemErr = `Surge item price does not match the one sent in on_search call`;
  }

  dao.setValue("item_descriptor_code", descriptor_code);

  try {
    if (cod_order) {
      COD_ITEM?.forEach((item) => {
        if (!onCnfrmItemId.includes(item?.id)) {
          onCnfrmObj.codOrderItemErr = `Item with id '${item.id}' does not exist in /on_confirm when order type is COD`;
        }
      });
    }
  } catch (error) {
    console.log(
      `!!Error fetching order item  in${constants.LOG_ONCONFIRM}`,
      err
    );
  }

  try {
    console.log(`checking start and end time range in fulfillments`);
    fulfillments.forEach((fulfillment) => {
      let fulfillment_tags = [];
      let extra_tag = [];
      fulfillment.tags.forEach((tag) => {
        if (tag?.code === "shipping_label" || tag?.code === "weather_check") {
          extra_tag.push(tag);
        } else fulfillment_tags.push(tag);
      });
      if (
        !_.isEqual(JSON.stringify(fulfillment_tags), confirm_fulfillment_tags)
      ) {
        onCnfrmObj.fulfillmentTagsErr = `fulfillments/tags mismatch between /confirm and /on_confirm`;
      }

      if (cod_order) {
        const cod_settlement_tags = fulfillment?.tags?.some(
          (item) => item?.code === "cod_settlement_detail"
        );
        if (!cod_settlement_tags) {
          onCnfrmObj.codSettlementErr = `cod_settlement_detail tag is mandatory in /on_confirm inside fulfillment/tags when order type is COD`;
        }
        const linkedOrderTag = fulfillment?.tags?.find(
          (tag) => tag.code === "linked_order"
        );
        const codOrderItem = linkedOrderTag.list?.find(
          (item) => item.code === "cod_order"
        );
        if (!linkedOrderTag) {
          onCnfrmObj.codOrderErr = `linked_order tag is mandatory in /on_confirm when order type is COD`;
        } else if (!codOrderItem) {
          onCnfrmObj.codOrderErr = `cod_order code must be present inside linked_order for COD`;
        } else if (codOrderItem?.value !== cod_order)
          onCnfrmObj.codOrderErr = `cod_order value '${codOrderItem?.value}' in linked_order does not match with the one provided in /search (${cod_order})`;
      }

      let ffState = fulfillment?.state?.descriptor?.code;
      let avgPickupTime = fulfillment?.start?.time?.duration;
      console.log(
        avgPickupTime,
        dao.getValue(`${fulfillment?.id}-avgPickupTime`)
      );
      if (
        avgPickupTime &&
        dao.getValue(`${fulfillment?.id}-avgPickupTime`) &&
        avgPickupTime !== dao.getValue(`${fulfillment?.id}-avgPickupTime`)
      ) {
        onCnfrmObj.avgPckupErr = `Average Pickup Time ${avgPickupTime} (fulfillments/start/time/duration) mismatches from the one provided in /on_search (${dao.getValue(
          `${fulfillment?.id}-avgPickupTime`
        )})`;
      }

      if (fulfillment?.start?.time?.timestamp) {
        onCnfrmObj.flflmentTmstmpErr = `Pickup timestamp cannot be provided when the fulfillment is in '${ffState}' state`;
      }
      if (!p2h2p && fulfillment.tracking !== true) {
        onCnfrmObj.trckErr = `tracking should be enabled (true) for hyperlocal P2P orders`;
      }

      if (fulfillment?.type === "Delivery" && descriptor_code === "P2H2P") {
        if (
          !fulfillment?.start?.instructions?.images ||
          fulfillment?.start?.instructions?.images.includes("") ||
          fulfillment?.start?.instructions?.images.length === 0
        )
          dao.setValue("shipping_label", false);
        else dao.setValue("shipping_label", true);
      }

      if (fulfillment["@ondc/org/awb_no"] && p2h2p) awbNo = true;
      console.log("rts", rts);

      if (rts === "yes" && !fulfillment?.start?.time?.range) {
        onCnfrmObj.strtRangeErr = `start/time/range is required in /fulfillments when ready_to_ship = yes in /confirm`;
      }
      // if (rts === "yes" && !fulfillment?.end?.time?.range) {
      //   onCnfrmObj.endRangeErr = `end/time/range is required in /fulfillments when ready_to_ship = yes in /confirm`;
      // }
    });
  } catch (error) {
    console.log(`Error checking fulfillment object in /on_confirm`);
  }

  try {
    if (cod_order && Array.isArray(on_confirm?.quote?.breakup)) {
      const hasCodTitle = on_confirm.quote.breakup.some(
        (item) => item?.["@ondc/org/title_type"] === "cod"
      );
      if (!hasCodTitle) {
        onCnfrmObj.quotebreakupErr = `title_type "cod" is mandatory in /on_confirm breakup array when order type is COD`;
      }
    }
  } catch (error) {
    console.error(`Error checking quote object in /confirm:`, error);
  }

  try {
    if (surgeItem) {
      const breakup = on_confirm?.quote?.breakup || [];

      const hasSurgeItem = breakup.find(
        (item) => item?.["@ondc/org/title_type"] === "surge"
      );

      const hasSurgeTax = breakup.find(
        (item) =>
          item?.["@ondc/org/title_type"] === "tax" &&
          item?.["@ondc/org/item_id"] === surgeItemData?.id
      );

      if (!hasSurgeItem) {
        onCnfrmObj.surgequoteItembreakupErr = `Missing title_type "surge" in /on_confirm breakup when surge item was sent in /on_search`;
      } else if (!_.isEqual(hasSurgeItem?.price, surgeItemData?.price)) {
        onCnfrmObj.surgequoteItembreakupErr = `Surge item price mismatch: received ${JSON.stringify(
          hasSurgeItem?.price
        )}, expected ${JSON.stringify(surgeItemData?.price)}`;
      }

      if (!hasSurgeTax) {
        onCnfrmObj.surgequoteTaxbreakupErr = `Missing tax item with item_id "${surgeItemData?.id}" in /on_confirm breakup when surge item was sent in /on_search`;
      }
    }
  } catch (error) {
    console.error("Error checking quote object in /confirm:", error);
  }

  try {
    console.log("checking linked order in /confirm");

    let orderWeight = linkedOrder?.order?.weight?.value;
    const unit = linkedOrder?.order?.weight?.unit;

    if (unit === "kilogram") {
      orderWeight = orderWeight * 1000;
    }

    let totalUnitWeight = 0;
    let quantityUnit;
    linkedOrder?.items.forEach((item) => {
      let quantity = item?.quantity?.measure?.value;
      quantityUnit = item?.quantity?.measure?.unit;
      if (quantityUnit === "kilogram") {
        quantity = quantity * 1000;
      }
      const count = item?.quantity?.count;

      const unitWeight = quantity * count;
      totalUnitWeight += unitWeight;
    });

    if (
      totalUnitWeight.toFixed(2) != orderWeight.toFixed(2) &&
      quantityUnit !== "unit"
    ) {
      onCnfrmObj.weightErr = `Total order weight '${orderWeight}' does not match the total unit weight of items '${totalUnitWeight}'`;
    }
  } catch (error) {
    console.log(error);
  }
    if (on_confirm?.hasOwnProperty("cancellation_terms")) {
          console.log("validating cancellation terms"+on_confirm);
          const cancellationTerms= on_confirm?.cancellation_terms;
          if (!Array.isArray(cancellationTerms)) {
            onCnfrmObj.cancellationTerms='cancellation_terms must be an array';
          } else {
            cancellationTerms.forEach((term, index) => {
              const path = `cancellation_terms[${index}]`;
          
              // fulfillment_state
              const descriptor = term?.fulfillment_state?.descriptor;
              if (!descriptor) {
                onCnfrmObj.cancellationTerms=`${path}.fulfillment_state.descriptor is missing`;
              } else {
                if (!descriptor.code) {
                  onCnfrmObj.cancellationTerms=`${path}.fulfillment_state.descriptor.code is missing`;
                } 
                else
                {
                  if(!constants.fulfillment_state.includes.descriptor.code)
                  {
                    onCnfrmObj.cancellationTerms=`${path}.fulfillment_state.descriptor.code is Invalid`;
                  }
                }
                if (!descriptor.short_desc) {
                  onCnfrmObj.cancellationTerms=`${path}.fulfillment_state.descriptor.short_desc is missing`;
                }
              }
          
              // cancellation_fee
              const fee = term?.cancellation_fee;
              if (!fee) {
                onCnfrmObj.cancellationTerms=`${path}.cancellation_fee is missing`;
              } else {
                if (!fee.percentage) {
                  onCnfrmObj.cancellationTerms=`${path}.cancellation_fee.percentage is missing`;
                }
                if (!fee.amount) {
                  onCnfrmObj.cancellationTerms=`${path}.cancellation_fee.amount is missing`;
                } else {
                  if (!fee.amount.currency) {
                    onCnfrmObj.cancellationTerms=`${path}.cancellation_fee.amount.currency is missing`;
                  }
                  if (!fee.amount.value) {
                    onCnfrmObj.cancellationTerms=`${path}.cancellation_fee.amount.value is missing`;
                  }
                }
              }
            });
          }
      
    }
  dao.setValue("awbNo", awbNo);
  return onCnfrmObj;
};
module.exports = checkOnConfirm;

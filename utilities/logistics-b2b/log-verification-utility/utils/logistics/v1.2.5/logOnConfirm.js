const fs = require("fs");
const _ = require("lodash");
const dao = require("../../../dao/dao");
const utils = require("../../utils");

const constants = require("../../constants");

const checkOnConfirm = (data, msgIdSet) => {
  let on_confirm = data;
  const onCnfrmObj = {};
  const contextTimestamp = on_confirm.context.timestamp;
  const confirm_fulfillment_tags = dao.getValue("confirm_fulfillment_tags");
  on_confirm = on_confirm.message.order;
  let items = on_confirm.items;
  let fulfillments = on_confirm.fulfillments;
  let linkedOrder = on_confirm["@ondc/org/linked_order"];
  let rts = dao.getValue("rts");
  let p2h2p = dao.getValue("p2h2p");
  let awbNo = dao.getValue("awbNo");

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
  items.forEach((item) => {
    categoryId = item.category_id;
    descriptor_code = item.descriptor?.code;
  });
  dao.setValue("item_descriptor_code", descriptor_code);

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
  dao.setValue("awbNo", awbNo);
  return onCnfrmObj;
};
module.exports = checkOnConfirm;

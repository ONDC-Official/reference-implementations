const _ = require("lodash");
const dao = require("../../../dao/dao");
const constants = require("../../constants");
const utils = require("../../utils.js");

const checkOnUpdate = (data, msgIdSet) => {
  let onUpdtObj = {};
  const domain = data?.context?.domain;
  let item_descriptor_code = dao.getValue("item_descriptor_code");
  const shipping_label = dao.getValue("shipping_label");
  let on_update = data;
  const contextDomain = data?.context?.domain;
  let contextTimestamp = on_update?.context?.timestamp;
  let rts = dao.getValue("rts");
  on_update = on_update.message.order;
  let fulfillments = on_update.fulfillments;
  let items = on_update.items;
  let p2h2p = dao.getValue("p2h2p");
  let awbNo = dao.getValue("awbNo");
  let locationsPresent = dao.getValue("confirm_locations");

  if (on_update?.updated_at > contextTimestamp) {
    onUpdtObj.updatedAtErr = `order/updated_at cannot be future dated w.r.t context/timestamp`;
  }

  if (locationsPresent) {
    if (!_.isEqual(on_update?.provider?.locations, locationsPresent)) {
      onUpdtObj.locationsErr = `order/provider/locations mismatch between /confirm and /on_update`;
    }
  }

  try {
    items?.map((item, i) => {
      if (domain === "ONDC:LOG10" && !item?.time?.timestamp) {
        onUpdtObj[
          `Item${i}_timestamp`
        ] = `Timestamp is mandatory inside time object for item ${item.id} in ${constants.LOG_ONSEARCH} api in order type P2P (ONDC:LOG10)`;
      }
    });
  } catch (error) {
    console.error("Error while checking on update:", error.stack);
  }

  try {
    console.log(
      `Checking if start and end time range required in /on_update api`
    );
    fulfillments?.forEach((fulfillment) => {
      const ffState = fulfillment?.state?.descriptor?.code;
      let avgPickupTime = fulfillment?.start?.time?.duration;
      console.log(
        avgPickupTime,
        dao.getValue(`${fulfillment?.id}-avgPickupTime`)
      );

      if (contextDomain === "ONDC:LOG11") {
        const fulfillment_delay = fulfillment?.tags?.find(
          (tag) => tag.code === "fulfillment_delay"
        );
        const list = fulfillment_delay?.list || [];
        const getByCode = (code) => list.find((item) => item.code === code);

        const state = getByCode("state");

        if (
          fulfillment_delay &&
          state &&
          ["Order-picked-up", "Order-delivered"].includes(state?.value)
        ) {
          const reason_id = getByCode("reason_id");
          const timestamp = getByCode("timestamp");
          const attempt = getByCode("attempt");
          if (ffState !== "Pickup-rescheduled")
            onUpdtObj.fulfillment_delay_fulfillmentState = `fulfillment state should be "Pickup-rescheduled" if there is fulfillment_delay tags.`;
          if (!reason_id) {
            onUpdtObj.fulfillment_delay_reasonErr = `reason_id is required for fulfillment_delay state ${state.value}`;
          } else if (
            !constants?.fulfillment_delay_reason_id?.includes(reason_id.value)
          ) {
            onUpdtObj.fulfillment_delay_reasonErr = `reason_id ${
              reason_id.value
            } is not valid for fulfillment_delay state. Should be one of: ${constants?.fulfillment_delay_reason_id.join(
              ", "
            )}`;
          }

          if (!timestamp) {
            onUpdtObj.fulfillment_delay_timestampErr = `fulfillment_delay timestamp is required for fulfillment_delay state ${state.value}`;
          } else if (timestamp.value > contextTimestamp) {
            onUpdtObj.fulfillment_delay_timestampErr = `fulfillment_delay timestamp cannot be future dated w.r.t context/timestamp`;
          }

          if (!attempt) {
            onUpdtObj.fulfillment_delay_attemptErr = `fulfillment_delay attempt is required for fulfillment_delay state ${state.value}`;
          } else if (!["yes", "no"].includes(attempt.value)) {
            onUpdtObj.fulfillment_delay_attemptErr = `fulfillment_delay attempt should be 'yes' or 'no' for fulfillment_delay state ${state.value}`;
          }
        }
      }

      if (
        avgPickupTime &&
        dao.getValue(`${fulfillment?.id}-avgPickupTime`) &&
        avgPickupTime !== dao.getValue(`${fulfillment?.id}-avgPickupTime`)
      ) {
        onUpdtObj.avgPckupErr = `Average Pickup Time ${avgPickupTime} (fulfillments/start/time/duration) mismatches from the one provided in /on_search (${dao.getValue(
          `${fulfillment?.id}-avgPickupTime`
        )})`;
      }
      if (fulfillment["@ondc/org/awb_no"]) {
        awbNo = true;
      }
      if (!awbNo && p2h2p) {
        onUpdtObj.awbNoErr =
          "AWB No (@ondc/org/awb_no) is required in /fulfillments for P2H2P shipments (may be provided in /confirm or /update by logistics buyer or /on_confirm or /on_update by LSP)";
      }
      if (awbNo && !p2h2p) {
        onUpdtObj.awbNoErr =
          "AWB No (@ondc/org/awb_no) is not required for P2P fulfillments";
      }
      if (rts === "yes" && !fulfillment?.start?.time?.range) {
        onUpdtObj.strtRangeErr = `start/time/range is required in /fulfillments when ready_to_ship = yes in /update`;
      }
      if (
        fulfillment?.start?.time?.timestamp ||
        fulfillment?.end?.time?.timestamp
      ) {
        onUpdtObj.tmpstmpErr = `start/time/timestamp or end/time/timestamp cannot be provided in /fulfillments when fulfillment state is ${ffState}`;
      }
      if (rts === "yes" && !fulfillment?.end?.time?.range) {
        onUpdtObj.endRangeErr = `end/time/range is required in /fulfillments when ready_to_ship = yes in /update`;
      }

      if (
        fulfillment?.type === "Delivery" &&
        item_descriptor_code === "P2H2P" &&
        !shipping_label &&
        (!fulfillment?.start?.instructions?.images ||
          (Array.isArray(fulfillment.start.instructions.images) &&
            (fulfillment.start.instructions.images.length === 0 ||
              fulfillment.start.instructions.images.includes(""))))
      ) {
        onUpdtObj.shipLblErr = `Shipping label (/start/instructions/images) is required for P2H2P shipments.`;
      }

      // if (p2h2p && !fulfillment?.start?.instructions?.images) {
      //   onUpdtObj.shipLblErr = `Shipping label (/start/instructions/images) is required for P2H2P shipments`;
      // }
    });
  } catch (error) {
    console.log(`!!Error while checking fulfillments in /on_update api`, error);
  }

  return onUpdtObj;
};

module.exports = checkOnUpdate;

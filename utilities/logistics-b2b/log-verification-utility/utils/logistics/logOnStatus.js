const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils.js");

const checkOnStatus = (data, msgIdSet) => {
  let onStatusObj = {};
  let on_status = data;
  let contextTime = on_status.context.timestamp;
  let messageId = on_status.context.message_id;

  on_status = on_status.message.order;
  let ffState;
  let orderState = on_status.state;
  let items = on_status.items;
  let fulfillments = on_status.fulfillments;
  let pickupTime, deliveryTime, RtoPickupTime, RtoDeliveredTime;
  let paymentStatus = on_status?.payment?.status;
  let trackingEnabled = false;

  if (on_status.state === "Complete" && payment.type === "ON-FULFILLMENT") {
    if (paymentStatus !== "PAID") {
      onStatusObj.pymntStatusErr = `Payment status should be 'PAID' once the order is complete for payment type 'ON-FULFILLMENT'`;
    }
    if (!on_status?.payment?.time) {
      onStatusObj.pymntTimeErr = `Payment time should be recorded once the order is complete for payment type 'ON-FULFILLMENT'`;
    }
  }

  let categoryId;
  items.forEach((item) => {
    categoryId = item.category_id;
  });
  try {
    if (fulfillments?.length > 1) {
      console.log(
        `Checking for a valid 'Cancelled' fulfillment state for type 'Delivery' in case of RTO`
      );
      fulfillments.forEach((fulfillment) => {
        ffState = fulfillment?.state?.descriptor?.code;
        if (
          (fulfillment.type === "Prepaid" || fulfillment.type === "Delivery") &&
          ffState !== "Cancelled"
        ) {
          onStatusObj.flflmntstErr = `In case of RTO, fulfillment with type 'Delivery/Prepaid' needs to in 'Cancelled' state`;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const isRtoFulfillment = fulfillments.find(
      (fulfillment) => fulfillment.type === "RTO"
    );

    if (isRtoFulfillment) {
      const RtoItemId = items?.find(
        (item) => item.id === isRtoFulfillment.id
      );

      if (!RtoItemId) {
        onStatusObj.itemIdErr = "RTO Item is missing in the order";
      }

      const breakupItems = quote?.breakup || [];
      let RtoQuoteItem = null;
      let RtoTax = null;
      let foundDeliveryItem = false;
      let foundDeliveryTax = false;

      for (const item of breakupItems) {
        if (item?.item?.id === RtoItemId) {
          if (item.title === "rto") {
            RtoQuoteItem = item;
          }
          if (item.title === "tax") {
            RtoTax = item;
          }
        }

        if (item?.title === "delivery") {
          foundDeliveryItem = true;
        }

        if (item?.title === "tax" && item?.item?.id !== RtoItemId) {
          foundDeliveryTax = true;
        }
      }

      if (!foundDeliveryItem) {
        onStatusObj.deliveryItem =
          "Delivery Quote Item is missing in the breakup array.";
      }

      if (!foundDeliveryTax) {
        onStatusObj.deliveryTax =
          "Delivery Tax is missing in the breakup array.";
      }

      if (!RtoQuoteItem) {
        onStatusObj.rtoQuoteItemErr =
          "RTO Quote Item is missing in the breakup array.";
      }

      if (!RtoTax) {
        onStatusObj.rtoTaxErr = "RTO Tax is missing in the breakup array.";
      }
    }
  } catch (error) {
    console.log("Error processing RTO fulfillment:", error);
  }

  try {
    fulfillments.forEach((fulfillment) => {
      ffState = fulfillment?.state?.descriptor?.code;
      let fulfillmentTags = fulfillment?.tags;
      console.log(
        `Comparing pickup and delivery timestamps for on_status_${ffState}`
      );
      if (
        fulfillment.type === "Prepaid" ||
        fulfillment.type === "CoD" ||
        fulfillment.type === "Delivery"
      ) {
        if (fulfillmentTags) {
          fulfillmentTags.forEach((tag) => {
            if (tag.code === "tracking") trackingEnabled = true;
          });
        }
        if (
          categoryId === "Immediate Delivery" &&
          fulfillment.tracking !== true &&
          ffState !== "Cancelled"
        ) {
          onStatusObj.trckErr = `tracking should be enabled (true) for hyperlocal (Immediate Delivery)`;
        }
        if (ffState === "Pending" || ffState === "Agent-assigned") {
          if (fulfillment?.start?.time?.timestamp) {
            onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
          }
          if (fulfillment?.end?.time?.timestamp) {
            onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
          }
        }

        if (ffState === "Agent-assigned" || ffState === "Searching-for-Agent") {
          if (orderState !== "In-progress") {
            onStatusObj.ordrStatErr = `Order state should be 'In-progress' for fulfillment state - ${ffState}`;
          }
        }
        if (ffState === "Order-picked-up") {
          if (!trackingEnabled && fulfillment.tracking === true) {
            onStatusObj.trackingTagErr = `tracking tag to be provided in fulfillments/tags`;
          }
          if (orderState !== "In-progress") {
            onStatusObj.ordrStatErr = `Order state should be 'In-progress' for fulfillment state - ${ffState}`;
          }
          pickupTime = fulfillment?.start?.time?.timestamp;
          dao.setValue("pickupTime", pickupTime);
          if (!pickupTime) {
            onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
          }

          if (_.gt(pickupTime, contextTime)) {
            onStatusObj.tmstmpErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be future dated w.r.t context/timestamp for fulfillment state - ${ffState}`;
          }
          if (fulfillment?.end?.time?.timestamp) {
            onStatusObj.delvryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
          }
        }
        if (ffState === "Out-for-delivery") {
          if (orderState !== "In-progress") {
            onStatusObj.ordrStatErr = `Order state should be 'In-progress' for fulfillment state - ${ffState}`;
          }
          if (!fulfillment?.start?.time?.timestamp) {
            {
              onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is missing for fulfillment state - ${ffState}`;
            }
          } else if (
            dao.getValue("pickupTime") &&
            fulfillment?.start?.time?.timestamp !== dao.getValue("pickupTime")
          ) {
            onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
          }

          if (fulfillment?.end?.time?.timestamp) {
            onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
          }
        }
        if (ffState === "Order-delivered") {
          if (orderState !== "Completed") {
            onStatusObj.ordrStatErr = `Order state should be 'Completed' for fulfillment state - ${ffState}`;
          }
          deliveryTime = fulfillment?.end?.time?.timestamp;

          dao.setValue("deliveryTime", deliveryTime);
          if (!fulfillment?.start?.time?.timestamp) {
            {
              onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is missing for fulfillment state - ${ffState}`;
            }
          } else if (
            fulfillment?.start?.time?.timestamp !== dao.getValue("pickupTime")
          ) {
            onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
          }

          if (!deliveryTime) {
            onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) is required for fulfillment state - ${ffState}`;
          }
          if (_.gt(deliveryTime, contextTime)) {
            onStatusObj.tmstmpErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be future dated w.r.t context/timestamp for fulfillment state - ${ffState}`;
          }

          if (_.gte(dao.getValue("pickupTime"), deliveryTime)) {
            onStatusObj.tmstmpErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be greater than or equal to  delivery timestamp (fulfillments/end/time/timestamp) for fulfillment state - ${ffState}`;
          }
        }
        if (ffState === "Cancelled") {
          if (orderState !== "Cancelled") {
            onStatusObj.ordrStatErr = `Order state should be 'Cancelled' for fulfillment state - ${ffState}`;
          }
          if (fulfillments.length > 1) {
            if (!fulfillment.start.time.timestamp) {
              onStatusObj.msngPickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is missing for fulfillment state - ${ffState}`;
            }
          }

          if(fulfillment.end.time.timestamp) {
            onStatusObj.delvryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
          }

          if (fulfillment.start.time.timestamp && dao.getValue("pickupTime")) {
            if (
              !_.isEqual(
                dao.getValue("pickupTime"),
                fulfillment.start.time.timestamp
              )
            ) {
              onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
            }
          }
          if (fulfillment.end.time.timestamp && dao.getValue("deliveryTime")) {
            if (
              !_.isEqual(
                dao.getValue("delivryTime"),
                fulfillment.end.time.timestamp
              )
            ) {
              onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot change for fulfillment state - ${ffState}`;
            }
          }
        }
      } else if (fulfillment.type === "RTO" || fulfillment.type === "Return") {
        const startTimestamp = fulfillment?.start?.time?.timestamp;
        const endTimestamp = fulfillment?.end?.time?.timestamp;

        if (orderState !== "Cancelled") {
          onStatusObj.ordrStatErr = `Order state should be 'Cancelled' for fulfillment state - ${ffState}`;
        }
        if (ffState === "RTO-Initiated") {
          if (!startTimestamp) {
            onStatusObj.rtoPickupTimeErr = `RTO Pickup (fulfillments/start/time/timestamp) time is missing for fulfillment state - ${ffState}`;
          }
          if (endTimestamp) {
            onStatusObj.rtoDeliveryTimeErr = `RTO Delivered Timestamp (fulfillments/end/time/timestamp) time is not required in end state because item is not delivered yet for fulfillment state - ${ffState}`;
          }
          if (startTimestamp) {
            dao.setValue("RtoPickupTime", RtoPickupTime);
          } else {
            onStatusObj.rtoPickupTimeErr = `RTO Pickup (fulfillments/start/time/timestamp) time is missing for fulfillment state - ${ffState}`;
          }
          if (_.gt(startTimestamp, contextTime)) {
            onStatusObj.rtoPickupErr = `RTO Pickup (fulfillments/start/time/timestamp) time cannot be future dated for fulfillment state - ${ffState}`;
          }
        }

        if (ffState === "RTO-Delivered" || ffState === "RTO-Disposed") {
          if (!startTimestamp && ffState === "RTO-Delivered") {
            onStatusObj.rtoPickupTimeErr = `RTO Pickup timestamp (fulfillments/start/time/timestamp) is missing for fulfillment state - ${ffState}`;
          }
          if (!endTimestamp && ffState === "RTO-Delivered")
            onStatusObj.rtoDlvryTimeErr = `RTO Delivery timestamp (fulfillments/end/time/timestamp) is missing for fulfillment state - ${ffState}`;
          if (startTimestamp && dao.getValue("RtoPickupTime")) {
            if (!_.isEqual(RtoPickupTime, dao.getValue("RtoPickupTime"))) {
              onStatusObj.rtoPickupErr = `RTO Pickup time (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
            }
          }
          if (endTimestamp && _.gt(startTimestamp, contextTime)) {
            onStatusObj.rtoDeliveredErr = `RTO Delivery time (fulfillments/end/time/timestamp) cannot be future dated for fulfillment state - ${ffState}`;
          }
        }
      }
    });
  } catch (error) {
    console.log(`Error checking fulfillments/start in /on_status`);
  }

  return onStatusObj;
};

module.exports = checkOnStatus;

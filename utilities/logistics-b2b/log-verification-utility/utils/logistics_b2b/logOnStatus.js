const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");

const checkOnStatus = (data, msgIdSet) => {
  let onStatusObj = {};
  let on_status = data;
  let contextTime = on_status.context.timestamp;
  let messageId = on_status.context.message_id;

  on_status = on_status.message.order;
  let ffState;
  let orderState = on_status?.status;
  let items = on_status.items;
  let fulfillments = on_status.fulfillments;
  let pickupTime, deliveryTime, RtoPickupTime, RtoDeliveredTime;
  let paymentStatus = on_status?.payments?.status;
  let trackingEnabled = false;

  if (on_status?.status === "Complete" && payments.type === "ON-FULFILLMENT") {
    if (paymentStatus !== "PAID") {
      onStatusObj.pymntStatusErr = `Payment status should be 'PAID' once the order is complete for payment type 'ON-FULFILLMENT'`;
    }
    if (!on_status?.payments?.time) {
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
    fulfillments.forEach((fulfillment) => {
      let fulfillmentTags = fulfillment?.tags;

      ffState = fulfillment?.state?.descriptor?.code;
      console.log(
        `Comparing pickup and delivery timestamps for on_status_${ffState}`
      );
      //Pending,Packed,Agent-assigned
      if (fulfillment.type === "Delivery") {
        if (
          ffState === "Pending" ||
          ffState === "Agent-assigned" ||
          ffState === "Packed"
        ) {
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              if (stop?.time?.timestamp) {
                onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (stop?.time?.timestamp) {
                onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
          if (!invoice && rfq)
            onStatusObj.invoiceErr = `/documents (Proforma Invoice) is required before order is picked up for RFQ Flow.`;
          if (invoice && !rfq)
            onStatusObj.invoiceErr = `/documents (Invoice) is not required before order is picked up for Non RFQ Flow.`;
        }
        //Order-picked-up

        if (ffState === "Order-picked-up") {
          if (orderState !== "In-progress") {
            onStatusObj.ordrStatErr = `Order state should be 'In-progress' for fulfillment state - ${ffState}`;
          }
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              if (!stop?.time?.range) {
                onStatusObj.rangeErr1 = `Pickup time range (fulfillments/start/time/range) is required for fulfillment state - ${ffState}`;
              }
              pickupTime = stop?.time?.timestamp;
              dao.setValue("pickupTime", pickupTime);
              if (!pickupTime) {
                onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
              }

              if (_.gt(pickupTime, contextTime)) {
                onStatusObj.tmstmpErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be future dated w.r.t context/timestamp for fulfillment state - ${ffState}`;
              }
              if (!stop?.instructions?.images) {
                onStatusObj.pickupProofErr = `Pickup proof (fulfillments/stops/start/instructions/images) is required once the order is picked-up`;
              }
            }

            if (stop.type === "end") {
              if (!stop?.time?.range) {
                onStatusObj.rangeErr2 = `Delivery time range (fulfillments/end/time/range) is required for fulfillment state - ${ffState}`;
              }
              if (stop?.time?.timestamp) {
                onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });

          if (!invoice)
            onStatusObj.invoiceErr = `/documents (Invoice) is required once the order is picked up`;
        }

        //Out-for-delivery
        if (ffState === "Out-for-delivery") {
          if (orderState !== "In-progress") {
            onStatusObj.ordrStatErr = `Order state should be 'In-progress' for fulfillment state - ${ffState}`;
          }
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              pickupTime = stop?.time?.timestamp;
              if (!stop?.time?.range) {
                onStatusObj.rangeErr1 = `Pickup time range (fulfillments/start/time/range) is required for fulfillment state - ${ffState}`;
              }
              if (!pickupTime) {
                onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
              } else if (
                dao.getValue("pickupTime") &&
                pickupTime !== dao.getValue("pickupTime")
              ) {
                onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (!stop?.time?.range) {
                onStatusObj.rangeErr2 = `Delivery time range (fulfillments/end/time/range) is required for fulfillment state - ${ffState}`;
              }
              if (stop?.time?.timestamp) {
                onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
          if (!invoice)
            onStatusObj.invoiceErr = `/documents (Invoice) is required once the order is picked up`;
        }

        //Order-delivered
        if (ffState === "Order-delivered") {
          if (orderState !== "Completed") {
            onStatusObj.ordrStatErr = `Order state should be 'Completed' for fulfillment state - ${ffState}`;
          }
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              pickupTime = stop?.time?.timestamp;
              if (!stop?.time?.range) {
                onStatusObj.rangeErr1 = `Pickup time range (fulfillments/start/time/range) is required for fulfillment state - ${ffState}`;
              }
              if (!pickupTime) {
                onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
              } else if (
                dao.getValue("pickupTime") &&
                pickupTime !== dao.getValue("pickupTime")
              ) {
                onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              deliveryTime = stop?.time?.timestamp;
              dao.setValue("deliveryTime", deliveryTime);

              if (!stop?.time?.range) {
                onStatusObj.rangeErr2 = `Delivery time range (fulfillments/end/time/range) is required for fulfillment state - ${ffState}`;
              }
              if (!deliveryTime) {
                onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) is required for fulfillment state - ${ffState}`;
              }
              if (_.gt(deliveryTime, contextTime)) {
                onStatusObj.tmstmpErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be future dated w.r.t context/timestamp for fulfillment state - ${ffState}`;
              }
              if (_.gte(pickupTime, deliveryTime)) {
                onStatusObj.tmstmpErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be greater than or equal to  delivery timestamp (fulfillments/end/time/timestamp) for fulfillment state - ${ffState}`;
              }
              if (!stop?.instructions?.images) {
                onStatusObj.pickupProofErr = `Delivery proof (fulfillments/stops/end/instructions/images) is required once the order is delivered`;
              }
            }
          });
          if (!invoice)
            onStatusObj.invoiceErr = `/documents (Invoice) is required once the order is picked up`;
        }
      }
      if (fulfillment.type === "Self-Pickup") {
        if (ffState === "Pending" || ffState === "Packed") {
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              if (stop?.time?.timestamp) {
                onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (stop?.time?.timestamp) {
                onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
        }

        if (ffState === "Order-picked-up") {
          if (orderState !== "Completed") {
            onStatusObj.ordrStatErr = `Order state should be 'Completed' once the order is picked up`;
          }
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              pickupTime = stop?.time?.timestamp;
              dao.setValue("pickupTime", pickupTime);
              if (!pickupTime) {
                onStatusObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
              }

              if (_.gt(pickupTime, contextTime)) {
                onStatusObj.tmstmpErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be future dated w.r.t context/timestamp for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (stop?.time?.timestamp) {
                onStatusObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
        }
      } else if (fulfillment.type === "RTO" || fulfillment.type === "Return") {
        if (orderState !== "Cancelled") {
          onStatusObj.ordrStatErr = `Order state should be 'Cancelled' for fulfillment state - ${ffState}`;
        }
        if (ffState === "RTO-Initiated" && fulfillment.type === "Prepaid") {
          RtoPickupTime = fulfillment?.start?.time?.timestamp;
          console.log(RtoPickupTime);
          if (RtoPickupTime) {
            dao.setValue("RtoPickupTime", RtoPickupTime);
          } else {
            onStatusObj.rtoPickupTimeErr = `RTO Pickup (fulfillments/start/time/timestamp) time is missing for fulfillment state - ${ffState}`;
          }
          if (_.gt(RtoPickupTime, contextTime)) {
            onStatusObj.rtoPickupErr = `RTO Pickup (fulfillments/start/time/timestamp) time cannot be future dated for fulfillment state - ${ffState}`;
          }
        }

        if (ffState === "RTO-Delivered" || ffState === "RTO-Disposed") {
          RtoDeliveredTime = fulfillment?.end?.time?.timestamp;
          if (!RtoDeliveredTime && ffState === "RTO-Delivered")
            onStatusObj.rtoDlvryTimeErr = `RTO Delivery timestamp (fulfillments/end/time/timestamp) is missing for fulfillment state - ${ffState}`;
          if (
            fulfillment.start.time.timestamp &&
            dao.getValue("RtoPickupTime")
          ) {
            if (
              !_.isEqual(
                fulfillment.start.time.timestamp,
                dao.getValue("RtoPickupTime")
              )
            ) {
              onStatusObj.rtoPickupErr = `RTO Pickup time (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
            }
          }
          if (RtoDeliveredTime && _.gt(RtoDeliveredTime, contextTime)) {
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

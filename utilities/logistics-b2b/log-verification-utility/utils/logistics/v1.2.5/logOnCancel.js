const _ = require("lodash");
const dao = require("../../../dao/dao");
const constants = require("../../constants");
const utils = require("../../utils.js");

const checkOnCancel = (data, msgIdSet) => {
  let onCancelObj = {};
  let on_cancel = data;
  const domain = data?.context?.domain;
  let contextTime = on_cancel.context.timestamp;
  let version = on_cancel.context.core_version;
  let messageId = on_cancel.context.message_id;
  const providerId = on_cancel.message?.provider?.id;
  let selectedItem;
  on_cancel = on_cancel.message.order;
  let onSearchItemsArr = dao.getValue(`${on_cancel?.provider?.id}itemsArr`);
  let ffState;
  let orderState = on_cancel.state;
  let items = on_cancel.items;
  let fulfillments = on_cancel.fulfillments;
  let RtoPickupTime;
  RtoDeliveryTime = "";
  let missingTags = [];
  const surgeItem = dao.getValue("is_surge_item");
  const surgeItemData = dao.getValue("surge_item");
  const eWayBill = dao.getValue("eWayBill");
  const partialRTO1 = dao.getValue(`confirm_return_to_origin_1`);
  const partialRTO2 = dao.getValue(`confirm_return_to_origin_2`);
  const partialRto = dao.getValue("partial_rto");

  let rtoID, reasonId, preCnclState;
  let surgeItemFound = null;
  const created_at = on_cancel.created_at;
  const updated_at = on_cancel.updated_at;

  if (created_at > contextTime || updated_at > contextTime) {
    onCancelObj.crtdAtTimeErr = `order/created_at or updated_at should not be future dated w.r.t context/timestamp`;
  }

  try {
    items?.map((item, i) => {
      if (domain === "ONDC:LOG10" && !item?.time?.timestamp) {
        onCancelObj[
          `Item${i}_timestamp`
        ] = `Timestamp is mandatory inside time object for item ${item.id} in ${constants.LOG_ONSEARCH} api in order type P2P (ONDC:LOG10)`;
      }

      if (
        surgeItem &&
        item?.id === surgeItemData?.id &&
        Array.isArray(item.tags) &&
        item.tags.length > 0
      ) {
        surgeItemFound = item;
      }
    });

    if (surgeItem && !surgeItemFound) {
      onCancelObj.surgeItemErr = `Surge item is missing in the order`;
    } else if (!_.isEqual(surgeItemFound?.price, surgeItemData?.price)) {
      onCancelObj.surgeItemErr = `Surge item price does not match the one sent in on_search call`;
    }
  } catch (error) {
    console.log("Error while checking items object/array", error?.stack);
  }

  try {
    if (fulfillments?.length > 1) {
      let rtoFulfillment_id = "";
      let RtoItemId = {};
      console.log(
        `Checking for a valid 'Cancelled' fulfillment state for type 'Delivery' in case of RTO`
      );
      fulfillments.forEach((fulfillment) => {
        if (fulfillment.type === "RTO") {
          rtoFulfillment_id = fulfillment?.id;
          RtoItemId = items?.find(
            (item) => item?.fulfillment_id === rtoFulfillment_id
          );

          if (!RtoItemId) {
            onCancelObj.itemIdErr = "RTO Item is missing in the order";
          }

          if (partialRto) {
            if (!fulfillment?.tags) {
              onCancelObj.tagsErr =
                "Fulfillment tags are missing in the order of RTO fulfillment for partial RTO flow";
            } else {
              const linkedOrderItems = fulfillment.tags.filter(
                (tag) => tag.code === "linked_order_item"
              );

              if (linkedOrderItems.length !== 2) {
                onCancelObj.linkedOrderItemCountErr = `There should be exactly 2 linked_order_item tags in fulfillment.tags for partial RTO flow`;
              } else {
                const requiredKeys = [
                  "category",
                  "name",
                  "currency",
                  "value",
                  "quantity",
                  "weight_unit",
                  "weight_value",
                  "return_to_origin",
                  "returned",
                ];

                let returnedYes = false;
                let returnedNo = false;

                linkedOrderItems.forEach((tag, idx) => {
                  const keysPresent = tag.list.map((item) => item.code);
                  const missing = requiredKeys.filter(
                    (key) => !keysPresent.includes(key)
                  );
                  if (missing.length > 0) {
                    onCancelObj[
                      `linkedOrderItemMissingKeys${idx}`
                    ] = `Missing keys in linked_order_item tag at index ${idx}: ${missing.join(
                      ", "
                    )}`;
                  }
                  const returnedObj = tag.list.find(
                    (item) => item.code === "returned"
                  );
                  if (returnedObj) {
                    if (returnedObj.value === "yes") returnedYes = true;
                    if (returnedObj.value === "no") returnedNo = true;
                  }
                });

                if (!returnedYes || !returnedNo) {
                  onCancelObj.linkedOrderItemReturnedErr = `Among the two linked_order_item tags, one must have returned="yes" and one must have returned="no" for partial RTO flow`;
                }
              }
            }
          }
        }

        ffState = fulfillment?.state?.descriptor?.code;
        if (fulfillment.type === "Delivery" && ffState !== "RTO") {
          onCancelObj.flflmntstErr = `In case of RTO, fulfillment with type 'Delivery' needs to in 'RTO' state`;
        }
        if (
          fulfillment.type === "RTO" &&
          (ffState == "RTO-Initiated" || ffState == "RTO-Disposed") &&
          on_cancel?.order !== "In-progress"
        ) {
          onCancelObj.stateErr = `In case of RTO-Initiated fulfillment state, order state should be 'In-progress'`;
        }
        if (
          fulfillment.type === "RTO" &&
          ffState == "RTO-Delivered" &&
          on_cancel?.order !== "Completed"
        ) {
          onCancelObj.stateErr = `In case of RTO-Delivered fulfillment state, order state should be 'Completed'`;
        }
      });

      const breakupItems = on_cancel?.quote?.breakup || [];
      let RtoQuoteItem = null;
      let RtoTax = null;
      let foundDeliveryItem = false;
      let foundDeliveryTax = false;

      for (const item of breakupItems) {
        if (item["@ondc/org/item_id"] === RtoItemId?.id) {
          if (item["@ondc/org/title_type"] === "rto") {
            RtoQuoteItem = item;
          }
          if (item["@ondc/org/title_type"] === "tax") {
            RtoTax = item;
          }
        }

        if (item["@ondc/org/title_type"] === "delivery") {
          foundDeliveryItem = true;
        }

        if (
          item["@ondc/org/title_type"] === "tax" &&
          item["@ondc/org/item_id"] !== RtoItemId?.id
        ) {
          foundDeliveryTax = true;
        }
      }

      if (!foundDeliveryItem) {
        onCancelObj.deliveryItem =
          "Delivery Quote Item is missing in the breakup array.";
      }

      if (!foundDeliveryTax) {
        onCancelObj.deliveryTax =
          "Delivery Tax is missing in the breakup array.";
      }

      if (!RtoQuoteItem) {
        onCancelObj.rtoQuoteItemErr =
          "RTO Quote Item is missing in the breakup array.";
      }

      if (!RtoTax) {
        onCancelObj.rtoTaxErr = "RTO Tax is missing in the breakup array.";
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (eWayBill) {
    const rtoFulfillment = fulfillments?.find(
      (fulfillment) => fulfillment?.type === "RTO"
    );

    const linkedProvider = rtoFulfillment?.tags?.find(
      (tag) => tag.code === "linked_provider"
    );

    if (!linkedProvider) {
      onCancelObj.linkedProviderErr = `linked_provider code is mandatory in fulfillment tags for eWayBill flow`;
    } else {
      const taxIdEntry = linkedProvider?.list?.find(
        (entry) => entry.code === "tax_id"
      );

      if (!taxIdEntry?.value) {
        onCancelObj.taxIdErr = `tax_id code is mandatory in linked_provider tag for eWayBill flow`;
      }
    }
  }

  try {
    if (surgeItem) {
      const breakup = on_cancel?.quote?.breakup || [];

      const hasSurgeItem = breakup.find(
        (item) => item?.["@ondc/org/title_type"] === "surge"
      );

      const hasSurgeTax = breakup.find(
        (item) =>
          item?.["@ondc/org/title_type"] === "tax" &&
          item?.["@ondc/org/item_id"] === surgeItemData?.id
      );

      if (!hasSurgeItem) {
        onCancelObj.surgequoteItembreakupErr = `Missing title_type "surge" in /on_cancel breakup when surge item was sent in /on_search`;
      } else if (!_.isEqual(hasSurgeItem?.price, surgeItemData?.price)) {
        onCancelObj.surgequoteItembreakupErr = `Surge item price mismatch: received ${JSON.stringify(
          hasSurgeItem?.price
        )}, expected ${JSON.stringify(surgeItemData?.price)}`;
      }

      if (!hasSurgeTax) {
        onCancelObj.surgequoteTaxbreakupErr = `Missing tax item with item_id "${surgeItemData?.id}" in /on_cancel breakup when surge item was sent in /on_search`;
      }
    }
  } catch (error) {
    console.error("Error checking quote object in /confirm:", error);
  }

  if (onSearchItemsArr) {
    selectedItem = onSearchItemsArr.filter(
      (element) => element?.parent_item_id === dao.getValue("selectedItem")
    );
    selectedItem = selectedItem[0];
  }
  let fulfillmentTagSet = new Set();
  try {
    fulfillments.forEach((fulfillment, i) => {
      let fulfillmentTags = fulfillment?.tags;

      ffState = fulfillment?.state?.descriptor?.code;
      console.log(
        `Comparing pickup and delivery timestamps for on_cancel_${ffState}`
      );

      if (fulfillment.type === "COD" || fulfillment.type === "Delivery") {
        if (ffState === "Cancelled") {
          if (orderState !== "Cancelled") {
            onCancelObj.ordrStatErr = `Order state should be 'Cancelled' for fulfillment state - ${ffState}`;
          }
          if (fulfillments.length > 1) {
            if (!fulfillment?.start?.time?.timestamp) {
              onCancelObj.msngPickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is missing for fulfillment state - ${ffState}`;
            }
          }

          if (fulfillment.end.time.timestamp) {
            onCancelObj.delvryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
          }

          if (
            fulfillment?.start?.time?.timestamp &&
            dao.getValue("pickupTime")
          ) {
            if (
              !_.isEqual(
                dao.getValue("pickupTime"),
                fulfillment.start.time.timestamp
              )
            ) {
              onCancelObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
            }
          }
          console.log("comparing RTO fulfillment id with /on_search");
          //checking RTO id matching with /on_search
          if (version === "1.2.0") {
            if (dao.getValue("rts") === "yes") {
              if (!fulfillment?.start?.time) {
                onCancelObj.msngStrtTime = `Pickup time range (fulfillments/start/time) is missing for fulfillment type - '${fulfillment.type}'`;
              }
              if (!fulfillment?.end?.time) {
                onCancelObj.msngDlvryTime = `Delivery time range (fulfillments/end/time) is missing for fulfillment type - '${fulfillment.type}'`;
              }
            }
            let fulTags = fulfillment?.tags;
            if (!fulTags) {
              onCancelObj.msngflfllmntTags = `fulfillments/tags are required in case of RTO (rto_event, precancel_state)`;
            } else {
              fulTags.forEach((tag) => {
                if (tag.code === "rto_event") {
                  const lists = tag.list;
                  lists.forEach((list) => {
                    if (list.code === "rto_id") {
                      rtoID = list.value;

                      if (rtoID !== selectedItem?.fulfillment_id) {
                        onCancelObj.rtoIdTagsErr = `rto_id '${rtoID}' in fulfillments/tags does not match with the one provided in on_search '${selectedItem?.fulfillment_id}' in /fulfillments`;
                      }
                    }
                    if (list.code === "cancellation_reason_id") {
                      reasonId = list.value;
                      if (reasonId !== on_cancel?.cancellation?.reason?.id) {
                        onCancelObj.rsnIdTagsErr = `Cancellation reason id in /fulfillments/tags does not match with order/cancellation/reason/id`;
                      }
                    }
                  });
                }
                if (tag.code === "precancel_state") {
                  const lists = tag.list;
                  lists.forEach((list) => {
                    if (list.code === "fulfillment_state") {
                      preCnclState = list.value;

                      if (!constants.FULFILLMENT_STATE.includes(preCnclState)) {
                        onCancelObj.preCnclStateErr = `${preCnclState} is not a valid precancel state in fulfillments/tags`;
                      }
                    }
                  });
                }
              });
            }
          }
        }
      } else if (fulfillment.type === "RTO" || fulfillment.type === "Return") {
        if (orderState !== "Cancelled") {
          onCancelObj.ordrStatErr = `Order state should be 'Cancelled' for fulfillment state - ${ffState}`;
        }
        console.log(fulfillment.id, selectedItem?.fulfillment_id);
        if (fulfillment.id !== selectedItem?.fulfillment_id) {
          onCancelObj.rtoIdErr = `RTO id - '${fulfillment.id}' of fulfillment type 'RTO' does not match with the one provided in on_search '${selectedItem?.fulfillment_id}' in /fulfillments`;
        }
        if (ffState === "RTO-Initiated") {
          RtoPickupTime = fulfillment?.start?.time?.timestamp;
          RtoDeliveryTime = fulfillment?.end?.time?.timestamp;
          console.log(RtoPickupTime);
          if (RtoPickupTime) {
            dao.setValue("RtoPickupTime", RtoPickupTime);
          } else {
            onCancelObj.rtoPickupTimeErr = `RTO Pickup (fulfillments/start/time/timestamp) time is missing for fulfillment state - ${ffState}`;
          }
          if (RtoDeliveryTime)
            onCancelObj.rtoDeliveryTimeErr = `RTO Delivery (fulfillments/end/time/timestamp) time is not required for fulfillment state - ${ffState}`;
          if (_.gt(RtoPickupTime, contextTime)) {
            onCancelObj.rtoPickupErr = `RTO Pickup (fulfillments/start/time/timestamp) time cannot be future dated for fulfillment state - ${ffState}`;
          }
        }
      }

      //checking tags
      let rtoEventTagSet = new Set();
      if (fulfillmentTags) {
        fulfillmentTags.forEach((tag, i) => {
          let { code, list } = tag;
          fulfillmentTagSet.add(code);
          if (code === "rto_event") {
            list.forEach((childTag) => {
              rtoEventTagSet.add(childTag.code);
            });

            missingTags = utils.findRequiredTags(
              rtoEventTagSet,
              constants.RTO_EVENT_TAGS
            );
            if (missingTags.length > 0) {
              let itemKey = `missingRtoEventTags-${i}-err`;
              onCancelObj[
                itemKey
              ] = `'${missingTags}' tag/s required in rto_event tag in /fulfillments/tags`;
            }
          }
        });
        const REQUIRED_TAGS = ["rto_event", "precancel_state"];
        missingTags = utils.findRequiredTags(fulfillmentTagSet, REQUIRED_TAGS);

        if (
          missingTags.includes("rto_event") &&
          constants.PRECANCEL_BEFORE_RTO.includes(preCnclState)
        ) {
          missingTags = missingTags.filter((item) => item !== "rto_event");
        }
        if (missingTags.length > 0) {
          let itemKey = `missingFlmntTags-${i}-err`;
          onCancelObj[
            itemKey
          ] = `'${missingTags}' tag/s required in /fulfillments/tags`;
        }
      }
    });
  } catch (error) {
    console.trace(`Error checking fulfillments/start in /on_cancel`, error);
  }

  return onCancelObj;
};

module.exports = checkOnCancel;

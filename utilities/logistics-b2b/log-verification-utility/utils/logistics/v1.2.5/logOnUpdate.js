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
  let ePod = dao.getValue("ePod");
  let items = on_update.items;
  const surgeItem = dao.getValue("is_surge_item");
  const surgeItemData = dao.getValue("surge_item");
  let p2h2p = dao.getValue("p2h2p");
  const eWayBill = dao.getValue("eWayBill");
  const callMasking = dao.getValue("call_masking");
  let awbNo = dao.getValue("awbNo");
  let surgeItemFound = null;
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
      onUpdtObj.surgeItemErr = `Surge item is missing in the order`;
    } else if (!_.isEqual(surgeItemFound?.price, surgeItemData?.price)) {
      onUpdtObj.surgeItemErr = `Surge item price does not match the one sent in on_search call`;
    }
  } catch (error) {
    console.error("Error while checking on update:", error.stack);
  }

  if (
    on_update?.payment?.type === "POST-FULFILLMENT" &&
    on_update?.payment?.status === "PAID"
  ) {
    onUpdtObj.paymentErr = `payment/status should be "NOT-PAID" instead of ${on_update?.payment?.status} for POST-FULFILLMENT payment type`;
  }

  try {
    if (surgeItem) {
      const breakup = on_update?.quote?.breakup || [];

      const hasSurgeItem = breakup.find(
        (item) => item?.["@ondc/org/title_type"] === "surge"
      );

      const hasSurgeTax = breakup.find(
        (item) =>
          item?.["@ondc/org/title_type"] === "tax" &&
          item?.["@ondc/org/item_id"] === surgeItemData?.id
      );

      if (!hasSurgeItem) {
        onUpdtObj.surgequoteItembreakupErr = `Missing title_type "surge" in /on_update breakup when surge item was sent in /on_search`;
      } else if (!_.isEqual(hasSurgeItem?.price, surgeItemData?.price)) {
        onUpdtObj.surgequoteItembreakupErr = `Surge item price mismatch: received ${JSON.stringify(
          hasSurgeItem?.price
        )}, expected ${JSON.stringify(surgeItemData?.price)}`;
      }

      if (!hasSurgeTax) {
        onUpdtObj.surgequoteTaxbreakupErr = `Missing tax item with item_id "${surgeItemData?.id}" in /on_update breakup when surge item was sent in /on_search`;
      }
    }
  } catch (error) {
    console.error("Error checking quote object in /on_update:", error);
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

      if (fulfillment?.type === "Delivery") {
        const state = fulfillment?.tags?.find((tag) => tag.code === "state");
        const ready_to_ship = state?.list?.find(
          (item) => item.code === "ready_to_ship"
        );

        if (ready_to_ship && ready_to_ship?.value.toLowerCase() !== "yes") {
          const timeRanges = {
            "start/time/range": fulfillment?.start?.time?.range,
            "end/time/range": fulfillment?.end?.time?.range,
          };

          for (const [key, value] of Object.entries(timeRanges)) {
            if (value) {
              onUpdtObj[
                key
              ] = `${key} is not allowed in fulfillments when ready_to_ship is ${ready_to_ship.value}`;
            }
          }
        }
      }

      if (
        domain === "ONDC:LOG10" &&
        fulfillment?.tags?.some((tag) => tag.code === "shipping_label")
      ) {
        onUpdtObj.shippingLabelErr = `shipping_label tag is not allowed in fulfillments for P2P order type (ONDC:LOG10)`;
      }

      if (callMasking) {
        if (fulfillment?.type === "Delivery") {
          // START CONTACT

          if (!fulfillment?.start?.contact?.phone) {
            const allowedMaskedTypes = [
              "ivr_pin",
              "ivr_without_pin",
              "api_endpoint",
            ];
            const maskedTag = fulfillment?.tags?.find(
              (tag) => tag.code === "masked_contact"
            );

            if (!maskedTag) {
              onUpdtObj.maskedContactErr = `'masked_contact' tag is required in /fulfillments in start object.`;
            } else {
              const list = maskedTag.list || [];
              const requiredCodes = ["type", "setup", "token"];
              const foundCodes = new Set();

              for (const item of list) {
                if (!item.code || item.value == null) {
                  onUpdtObj.listmaskedContactErr = `Each item in 'masked_contact' must contain both 'code' and 'value'.`;
                }

                foundCodes.add(item.code);

                if (
                  item.code === "type" &&
                  !allowedMaskedTypes.includes(item.value)
                ) {
                  onUpdtObj.typemaskedContactErr = `'type' in 'masked_contact' must be one of: ${allowedMaskedTypes.join(
                    ", "
                  )}. Found: '${item.value}'`;
                }

                if (
                  (item.code === "setup" || item.code === "token") &&
                  (!item.value || typeof item.value !== "string")
                ) {
                  onUpdtObj.setupmaskedContactErr = `'${item.code}' in 'masked_contact' must be a non-empty string.`;
                }
              }

              for (const code of requiredCodes) {
                if (!foundCodes.has(code)) {
                  onUpdtObj.codemaskedContactErr = `'masked_contact' tag must contain '${code}' in its list.`;
                }
              }
            }
          }

          // END CONTACT

          if (!fulfillment?.end?.contact?.phone) {
            const allowedMaskedTypes = [
              "ivr_pin",
              "ivr_without_pin",
              "api_endpoint",
            ];
            const maskedTag = fulfillment?.tags?.find(
              (tag) => tag.code === "masked_contact"
            );

            if (!maskedTag) {
              onUpdtObj.endmaskedContactErr = `'masked_contact' tag is required in /fulfillments in end object.`;
            } else {
              const list = maskedTag.list || [];
              const requiredCodes = ["type", "setup", "token"];
              const foundCodes = new Set();

              for (const item of list) {
                if (!item.code || item.value == null) {
                  onUpdtObj.listendmaskedContactErr = `Each item in 'masked_contact' must contain both 'code' and 'value'.`;
                }

                foundCodes.add(item.code);

                if (
                  item.code === "type" &&
                  !allowedMaskedTypes.includes(item.value)
                ) {
                  onUpdtObj.typeendmaskedContactErr = `'type' in 'masked_contact' must be one of: ${allowedMaskedTypes.join(
                    ", "
                  )}. Found: '${item.value}'`;
                }

                if (
                  (item.code === "setup" || item.code === "token") &&
                  (!item.value || typeof item.value !== "string")
                ) {
                  onUpdtObj.setupendmaskedContactErr = `'${item.code}' in 'masked_contact' must be a non-empty string.`;
                }
              }

              for (const code of requiredCodes) {
                if (!foundCodes.has(code)) {
                  onUpdtObj.codeendmaskedContactErr = `'masked_contact' tag must contain '${code}' in its list.`;
                }
              }
            }
          }
        }
      }

      if (ePod) {
        if (fulfillment?.type === "Delivery") {
          const allowedTypes = ["webp", "png", "jpeg", "pdf"];
          const tags = fulfillment?.tags || [];

          const proofTags = tags.filter(
            (tag) => tag.code === "fulfillment_proof"
          );

          if (proofTags.length === 0) {
            onUpdtObj.epodErr = `ePOD flow requires 'fulfillment_proof' tag in /fulfillments.`;
          } else {
            const requiredStates = ["Order-picked-up", "Order-delivered"];
            const foundStates = new Set();
            if (proofTags.length < 2) {
              onUpdtObj.epodErr = `ePOD flow requires two separate 'fulfillment_proof' tags: one with state 'Order-picked-up' and another with state 'Order-delivered'.`;
            } else {
              for (const tag of proofTags) {
                const list = tag.list || [];
                let state, type, url;

                for (const item of list) {
                  if (!item.code || item.value == null) {
                    onUpdtObj.epodErr = `Each item inside 'fulfillment_proof' in ePOD flow must contain both 'code' and 'value'.`;
                  }

                  if (item.code === "state") state = item.value;
                  if (item.code === "type") type = item.value;
                  if (item.code === "url") url = item.value;
                }

                if (!state || !requiredStates.includes(state)) {
                  onUpdtObj.stateepodErr = `Each 'fulfillment_proof' tag in ePOD flow must have a valid 'state' — expected 'Order-picked-up' or 'Order-delivered'. Found: '${
                    state || "undefined"
                  }'.`;
                }

                if (!type || !allowedTypes.includes(type)) {
                  onUpdtObj.typeepodErr = `Invalid 'type' in 'fulfillment_proof' for state '${state}'. Allowed file types for ePOD flow are: ${allowedTypes.join(
                    ", "
                  )}.`;
                }

                if (
                  !url ||
                  typeof url !== "string" ||
                  !url.startsWith("http")
                ) {
                  onUpdtObj.urlepodErr = `Missing or invalid 'url' in 'fulfillment_proof' for state '${state}'. A public URL is required for ePOD flow.`;
                }

                foundStates.add(state);
              }

              for (const state of requiredStates) {
                if (!foundStates.has(state)) {
                  onUpdtObj.epodErr = `Missing 'fulfillment_proof' tag with state '${state}' required for ePOD flow.`;
                }
              }
            }
          }
        }
      }

      if (eWayBill) {
        if (fulfillment.type === "Delivery") {
          if (!fulfillment?.tags) {
            onUpdtObj.eWayBillErr = `eWayBill tag is required in /fulfillments for eWayBill flow.`;
          }

          const ebn = fulfillment?.tags?.find((tag) => tag.code === "ebn");
          if (!ebn) {
            onUpdtObj.eWayBillErr = `ebn tag is required in /fulfillments for eWayBill flow.`;
          }

          ebn?.list?.forEach((item) => {
            if (!item?.id) {
              onUpdtObj.eWayBillErr = `ebn tag in /fulfillments should have id code.`;
            }
            if (!item?.value) {
              onUpdtObj.eWayBillErr = `ebn tag in /fulfillments should have value.`;
            }
            if (!item?.expiry_date) {
              onUpdtObj.eWayBillErr = `ebn tag in /fulfillments should have expiry_date code.`;
            } else if (!item.expiry_date?.value) {
              onUpdtObj.eWayBillErr = `ebn tag in /fulfillments should have expiry_date value.`;
            }
          });
        }
      }

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

      if (fulfillment?.type == "Delivery") {
        if (fulfillment?.hasOwnProperty("tags")) {
          fulfillment?.tags?.forEach((tag) => {
            if (tag.code === "linked_provider") {
              // if (!_.isEqual(JSON.stringify(tag), shipping_label)) {
              //   onUpdtObj.linkedPrvdrErr = `linked_provider tag in /on_update does not match with the one provided in /init`;
              // }
              if (tag?.list?.length > 0) {
                var found = false;
                tag.list.forEach((item) => {
                  if (item.code === "id") {
                    found = true;
                  }
                });
                if (!found) {
                  onUpdtObj.linkedPrvdrErr = `linked_provider tag in /on_update does not have id code`;
                }
              }
            }
            if (tag.code === "linked_order_diff") {
              const requiredCodes = [
                "id",
                "weight_unit",
                "weight_value",
                "dim_unit",
                "length",
                "breadth",
                "height",
              ];
              requiredCodes.forEach((key) => {
                const found = input.list.find((item) => item.code === key);
                if (!found) {
                  onUpdtObj.linkedPrvdrErr = `${key} code is missing in list of linked_order_diff tag`;
                }
              });
            }
            if (tag.code === "linked_order_diff_proof") {
              const requiredCodes = ["id", "url"];
              requiredCodes.forEach((key) => {
                const found = input.list.find((item) => item.code === key);
                if (!found) {
                  onUpdtObj.linkedPrvdrErr = `${key} code is missing in list of linked_order_diff_proof tag`;
                }
              });
            }
          });
        }
      }

      // if (p2h2p && !fulfillment?.start?.instructions?.images) {
      //   onUpdtObj.shipLblErr = `Shipping label (/start/instructions/images) is required for P2H2P shipments`;
      // }
    });
  } catch (error) {
    console.log(`!!Error while checking fulfillments in /on_update api`, error);
  }
  if (on_update?.hasOwnProperty("cancellation_terms")) {
    const cancellationTerms = on_update?.cancellation_terms;
    if (!Array.isArray(cancellationTerms)) {
      onUpdtObj.cancellationTerms = "cancellation_terms must be an array";
    } else {
      cancellationTerms.forEach((term, index) => {
        const path = `cancellation_terms[${index}]`;

        // fulfillment_state
        const descriptor = term?.fulfillment_state?.descriptor;
        if (!descriptor) {
          onUpdtObj.cancellationTerms = `${path}.fulfillment_state.descriptor is missing`;
        } else {
          if (!descriptor.code) {
            onUpdtObj.cancellationTerms = `${path}.fulfillment_state.descriptor.code is missing`;
          } else {
            if (!constants.FULFILLMENT_STATE.includes(descriptor.code)) {
              onUpdtObj.cancellationTerms = `${path}.fulfillment_state.descriptor.code is Invalid`;
            }
          }
          if (!descriptor.short_desc) {
            onUpdtObj.cancellationTerms = `${path}.fulfillment_state.descriptor.short_desc is missing`;
          }
        }

        // cancellation_fee
        const fee = term?.cancellation_fee;
        if (!fee) {
          onUpdtObj.cancellationTerms = `${path}.cancellation_fee is missing`;
        } else {
          if (!fee.percentage) {
            onUpdtObj.cancellationTerms = `${path}.cancellation_fee.percentage is missing`;
          }
          if (!fee.amount) {
            onUpdtObj.cancellationTerms = `${path}.cancellation_fee.amount is missing`;
          } else {
            if (!fee.amount.currency) {
              onUpdtObj.cancellationTerms = `${path}.cancellation_fee.amount.currency is missing`;
            }
            if (!fee.amount.value) {
              onUpdtObj.cancellationTerms = `${path}.cancellation_fee.amount.value is missing`;
            }
          }
        }
      });
    }
  }
  return onUpdtObj;
};

module.exports = checkOnUpdate;

const _ = require("lodash");
const dao = require("../../../dao/dao");
const constants = require("../../constants");
const utils = require("../../utils.js");

const checkOnStatus = (data, msgIdSet) => {
  let onStatusObj = {};
  let on_status = data;
  const domain = data?.context?.domain;
  let contextTime = on_status?.context?.timestamp;
  let messageId = on_status?.context?.message_id;

  on_status = on_status?.message?.order;
  let ffState;
  const cod_order = dao.getValue("cod_order");
  const COD_ITEM = dao.getValue("COD_ITEM");
  let orderState = on_status?.state;
  let items = on_status?.items;
  let onStatusItemId = [];
  let fulfillments = on_status?.fulfillments;
  let pickupTime, deliveryTime, RtoPickupTime, RtoDeliveredTime;
  let paymentStatus = on_status?.payment?.status;
  const confirm_fulfillment_tags = dao.getValue("confirm_fulfillment_tags");
  const surgeItem = dao.getValue("is_surge_item");
  const surgeItemData = dao.getValue("surge_item");
  const ePod = dao.getValue("ePod");
  const callMasking = dao.getValue("call_masking");
  const quick_commerce = dao.getValue("quick_commerce");
  const search_fulfill_request = dao.getValue("search_fulfill_request");
  const onSearchFulfillResponse = dao.getValue("on_search_fulfill_response");
  let trackingEnabled = false;
  let surgeItemFound = null;

  let confirmFulfillmentTag = JSON.parse(confirm_fulfillment_tags)?.filter(
    (i) => i.code !== "state" && i.code !== "rto_action"
  );

  if (on_status?.state === "Complete" && payment?.type === "ON-FULFILLMENT") {
    if (paymentStatus !== "PAID") {
      onStatusObj.pymntStatusErr = `Payment status should be 'PAID' once the order is complete for payment type 'ON-FULFILLMENT'`;
    }
    if (!on_status?.payment?.time) {
      onStatusObj.pymntTimeErr = `Payment time should be recorded once the order is complete for payment type 'ON-FULFILLMENT'`;
    }
  }

  if (on_status?.state === "Cancelled" && !on_status?.cancellation)
    onStatusObj.cancellationErr = `Cancellation object is mandatory for order state 'Cancelled'`;

  let categoryId;
  items?.forEach((item, i) => {
    if (domain === "ONDC:LOG10" && !item?.time?.timestamp) {
      onStatusObj[
        `Item${i}_timestamp`
      ] = `Timestamp is mandatory inside time object for item ${item.id} in ${constants.LOG_ONSEARCH} api in order type P2P (ONDC:LOG10)`;
    }
    onStatusItemId?.push(item?.id);
    categoryId = item?.category_id;

    if (surgeItem && item?.id === surgeItemData?.id) {
      surgeItemFound = item;
    }

    if (quick_commerce) {
      if (item?.category_id !== "Instant Delivery")
        onStatusObj.itemCatIdErr = `Item category id should be 'Instant Delivery' for quick commerce flow`;
    }
  });

  if (surgeItem && !surgeItemFound) {
    onStatusObj.surgeItemErr = `Surge item is missing in the order`;
  }
  // else if (!_.isEqual(surgeItemFound?.price, surgeItemData?.price)) {
  //   onStatusObj.surgeItemErr = `Surge item price does not match the one sent in on_search call`;
  // }

  try {
    if (cod_order) {
      if (COD_ITEM && !onStatusItemId.includes(COD_ITEM[0]?.id)) {
        onStatusObj.codOrderItemErr = `Item with id '${COD_ITEM[0]?.id}' does not exist in /on_status when order type is COD`;
      }
      // COD_ITEM?.forEach((item) => {
      //   if (!onStatusItemId.includes(item?.id)) {
      //     onStatusObj.codOrderItemErr = `Item with id '${item.id}' does not exist in /on_status when order type is COD`;
      //   }
      // });
    }
  } catch (error) {
    console.log(
      `!!Error fetching order item  in${constants.LOG_ONSTATUS}`,
      err
    );
  }

  if (quick_commerce) {
    const breakupItems = on_status?.quote?.breakup || [];
    const fulfillmentBatch = on_status?.fulfillments?.find(
      (i) => i.type === "Batch"
    );
    if (!fulfillmentBatch) {
      onStatusObj[
        `quick_commerce_fulfillmentType_Err`
      ] = `Fulfillment type "Batch" should be there is fulfillments array for quick commerce logistics`;
    } else {
      if (fulfillmentBatch?.tags) {
        const fulfillRequestTag = fulfillmentBatch.tags.find(
          (tag) => tag.code === "fulfill_request"
        );
        let fulfillResponseTag = fulfillmentBatch.tags.find(
          (tag) => tag.code === "fulfill_response"
        );

        if (!fulfillRequestTag) {
          onStatusObj[
            `quick_commerce_fulfillRequestTag_Err`
          ] = `Fulfillment tags should include a code 'fulfill_request' for quick commerce logistics`;
        } else {
          const sortedList1 = _.sortBy(search_fulfill_request, "code");
          const sortedList2 = _.sortBy(fulfillRequestTag, "code");

          const areEqual =
            _.isEqual(sortedList1, sortedList2) &&
            search_fulfill_request.code === fulfillRequestTag.code;

          if (!areEqual) {
            onStatusObj[
              `quick_commerce_fulfillReuqest`
            ] = `Fulfillment tags code 'fulfill_request' doesnot match with the one provided in search payload for quick commerce logistics`;
          }
        }

        if (!fulfillResponseTag) {
          onStatusObj[
            `quick_commerce_fulfillResponseTag_Err`
          ] = `Fulfillment tags should include a code 'fulfill_response' for quick commerce logistics`;
        } else {
          const index = fulfillResponseTag?.list?.findIndex(
            (i) => i.code === "diff_value"
          );
          if (index === -1 || index === undefined) {
            onStatusObj[
              `quick_commerce_fulfillResponseTag_Err`
            ] = `Fulfillment tags should include a code 'diff_value' in list for quick commerce logistics`;
          } else fulfillResponseTag.list.splice(index, 1);

          const sortedList1 = _.sortBy(onSearchFulfillResponse, "code");
          const sortedList2 = _.sortBy(fulfillResponseTag, "code");
          const areEqual =
            _.isEqual(sortedList1, sortedList2) &&
            onSearchFulfillResponse.code === fulfillResponseTag.code;

          if (!areEqual) {
            onStatusObj[
              `quick_commerce_fulfillReuqest`
            ] = `Fulfillment tags code 'fulfill_response' doesnot match with the one provided in search payload for quick commerce logistics`;
          }
        }
      } else
        onStatusObj[
          `quick_commerce_fulfillmenttags`
        ] = `Fulfillment tags is missing.`;
    }

    if (
      !breakupItems?.some((item) => item?.["@ondc/org/title_type"] === "diff")
    ) {
      onStatusObj.quotebreakupErr_Diff = `title_type "diff" is mandatory in /on_status breakup array when order type is quick commerce`;
    }
    if (
      !breakupItems?.some(
        (item) => item?.["@ondc/org/title_type"] === "tax_diff"
      )
    ) {
      onStatusObj.quotebreakupErr_taxDiff = `title_type "tax_diff" is mandatory in /on_status breakup array when order type is quick commerce`;
    }
  }

  try {
    if (fulfillments?.length > 1) {
      console.log(
        `Checking for a valid 'Cancelled' fulfillment state for type 'Delivery' in case of RTO`
      );
      fulfillments.forEach((fulfillment) => {
        ffState = fulfillment?.state?.descriptor?.code;
        if (fulfillment.type === "Delivery" && ffState !== "RTO") {
          onStatusObj.flflmntstErr = `In case of RTO, fulfillment with type 'Delivery' needs to in 'RTO' state`;
        }
        if (
          fulfillment.type === "RTO" &&
          (ffState == "RTO-Initiated" || ffState == "RTO-Disposed") &&
          on_status?.order !== "In-progress"
        ) {
          onStatusObj.stateErr = `In case of RTO-Initiated fulfillment state, order state should be 'In-progress'`;
        }
        if (
          fulfillment.type === "RTO" &&
          ffState == "RTO-Delivered" &&
          on_status?.order !== "Completed"
        ) {
          onStatusObj.stateErr = `In case of RTO-Delivered fulfillment state, order state should be 'Completed'`;
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
        (item) => item.fulfillment_id === isRtoFulfillment.id
      );

      if (!RtoItemId) {
        onStatusObj.itemIdErr = "RTO Item is missing in the order";
      }

      const breakupItems = on_status?.quote?.breakup || [];
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
    if (surgeItem) {
      const breakup = on_status?.quote?.breakup || [];

      const hasSurgeItem = breakup.find(
        (item) => item?.["@ondc/org/title_type"] === "surge"
      );

      const hasSurgeTax = breakup.find(
        (item) =>
          item?.["@ondc/org/title_type"] === "tax" &&
          item?.["@ondc/org/item_id"] === surgeItemData?.id
      );

      if (!hasSurgeItem) {
        onStatusObj.surgequoteItembreakupErr = `Missing title_type "surge" in /on_status breakup when surge item was sent in /on_search`;
      } else if (!_.isEqual(hasSurgeItem?.price, surgeItemData?.price)) {
        onStatusObj.surgequoteItembreakupErr = `Surge item price mismatch: received ${JSON.stringify(
          hasSurgeItem?.price
        )}, expected ${JSON.stringify(surgeItemData?.price)}`;
      }

      if (!hasSurgeTax) {
        onStatusObj.surgequoteTaxbreakupErr = `Missing tax item with item_id "${surgeItemData?.id}" in /on_status breakup when surge item was sent in /on_search`;
      }
    }
  } catch (error) {
    console.error("Error checking quote object in /confirm:", error);
  }

  try {
    if (cod_order && Array.isArray(on_status?.quote?.breakup)) {
      const hasCodTitle = on_status?.quote?.breakup.some(
        (item) => item?.["@ondc/org/title_type"] === "cod"
      );
      if (!hasCodTitle) {
        onStatusObj.quotebreakupErr = `title_type "cod" is mandatory in /on_status breakup array when order type is COD`;
      }
    }
  } catch (error) {
    console.error(`Error checking quote object in /on_status:`, error);
  }

  try {
    fulfillments?.forEach((fulfillment) => {
      ffState = fulfillment?.state?.descriptor?.code;

      if (ffState === "Order-delivered") {
        if (
          !fulfillment?.tags.some(
            (item) => item.code === "cod_collection_detail"
          )
        )
          onStatusObj.codCollectionErr = `cod_collection_detail tag is mandatory in /on_status inside fulfillment/tags when fulfillment state is Order-delivered`;
      }

      let fulfillmentTags = fulfillment?.tags;
      console.log(
        `Comparing pickup and delivery timestamps for on_status_${ffState}`
      );

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
              onStatusObj.maskedContactErr = `'masked_contact' tag is required in /fulfillments in start object.`;
            } else {
              const list = maskedTag.list || [];
              const requiredCodes = ["type", "setup", "token"];
              const foundCodes = new Set();

              for (const item of list) {
                if (!item.code || item.value == null) {
                  onStatusObj.listmaskedContactErr = `Each item in 'masked_contact' must contain both 'code' and 'value'.`;
                }

                foundCodes.add(item.code);

                if (
                  item.code === "type" &&
                  !allowedMaskedTypes.includes(item.value)
                ) {
                  onStatusObj.typemaskedContactErr = `'type' in 'masked_contact' must be one of: ${allowedMaskedTypes.join(
                    ", "
                  )}. Found: '${item.value}'`;
                }

                if (
                  (item.code === "setup" || item.code === "token") &&
                  (!item.value || typeof item.value !== "string")
                ) {
                  onStatusObj.setupmaskedContactErr = `'${item.code}' in 'masked_contact' must be a non-empty string.`;
                }
              }

              for (const code of requiredCodes) {
                if (!foundCodes.has(code)) {
                  onStatusObj.codemaskedContactErr = `'masked_contact' tag must contain '${code}' in its list.`;
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
              onStatusObj.endmaskedContactErr = `'masked_contact' tag is required in /fulfillments in end object.`;
            } else {
              const list = maskedTag.list || [];
              const requiredCodes = ["type", "setup", "token"];
              const foundCodes = new Set();

              for (const item of list) {
                if (!item.code || item.value == null) {
                  onStatusObj.listendmaskedContactErr = `Each item in 'masked_contact' must contain both 'code' and 'value'.`;
                }

                foundCodes.add(item.code);

                if (
                  item.code === "type" &&
                  !allowedMaskedTypes.includes(item.value)
                ) {
                  onStatusObj.typeendmaskedContactErr = `'type' in 'masked_contact' must be one of: ${allowedMaskedTypes.join(
                    ", "
                  )}. Found: '${item.value}'`;
                }

                if (
                  (item.code === "setup" || item.code === "token") &&
                  (!item.value || typeof item.value !== "string")
                ) {
                  onStatusObj.setupendmaskedContactErr = `'${item.code}' in 'masked_contact' must be a non-empty string.`;
                }
              }

              for (const code of requiredCodes) {
                if (!foundCodes.has(code)) {
                  onStatusObj.codeendmaskedContactErr = `'masked_contact' tag must contain '${code}' in its list.`;
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
            onStatusObj.epodErr = `ePOD flow requires 'fulfillment_proof' tag in /fulfillments.`;
          } else {
            const requiredStates = ["Order-picked-up", "Order-delivered"];
            const foundStates = new Set();
            if (proofTags.length < 2) {
              onStatusObj.epodErr = `ePOD flow requires two separate 'fulfillment_proof' tags: one with state 'Order-picked-up' and another with state 'Order-delivered'.`;
            } else {
              for (const tag of proofTags) {
                const list = tag.list || [];
                let state, type, url;

                for (const item of list) {
                  if (!item.code || item.value == null) {
                    onStatusObj.epodErr = `Each item inside 'fulfillment_proof' in ePOD flow must contain both 'code' and 'value'.`;
                  }

                  if (item.code === "state") state = item.value;
                  if (item.code === "type") type = item.value;
                  if (item.code === "url") url = item.value;
                }

                if (!state || !requiredStates.includes(state)) {
                  onStatusObj.stateepodErr = `Each 'fulfillment_proof' tag in ePOD flow must have a valid 'state' — expected 'Order-picked-up' or 'Order-delivered'. Found: '${
                    state || "undefined"
                  }'.`;
                }

                if (!type || !allowedTypes.includes(type)) {
                  onStatusObj.typeepodErr = `Invalid 'type' in 'fulfillment_proof' for state '${state}'. Allowed file types for ePOD flow are: ${allowedTypes.join(
                    ", "
                  )}.`;
                }

                if (
                  !url ||
                  typeof url !== "string" ||
                  !url.startsWith("http")
                ) {
                  onStatusObj.urlepodErr = `Missing or invalid 'url' in 'fulfillment_proof' for state '${state}'. A public URL is required for ePOD flow.`;
                }

                foundStates.add(state);
              }

              for (const state of requiredStates) {
                if (!foundStates.has(state)) {
                  onStatusObj.epodErr = `Missing 'fulfillment_proof' tag with state '${state}' required for ePOD flow.`;
                }
              }
            }
          }
        }
      }

      if (fulfillment.type === "COD" || fulfillment.type === "Delivery") {
        if (fulfillmentTags) {
          fulfillmentTags?.forEach((tag) => {
            if (tag.code === "tracking") trackingEnabled = true;
          });
        }

        const checkFulfillmentTags = fulfillmentTags?.filter(
          (i) => i.code !== "shipping_label"
        );
        // if (
        //   !_.isEqual(
        //     JSON.stringify(checkFulfillmentTags),
        //     JSON.stringify(confirmFulfillmentTag)
        //   )
        // ) {
        //   onStatusObj.fulfillmentTagsErr = `Fulfillment tags in /on_status does not match with the one provided in /confirm`;
        // }

        if (cod_order) {
          const cod_settlement_tags = fulfillment?.tags?.some(
            (item) => item?.code === "cod_settlement_detail"
          );
          if (!cod_settlement_tags) {
            onStatusObj.codSettlementErr = `cod_settlement_detail tag is mandatory in /on_status inside fulfillment/tags when order type is COD`;
          }
          const linkedOrderTag = fulfillment?.tags?.find(
            (tag) => tag.code === "linked_order"
          );
          const codOrderItem = linkedOrderTag.list?.find(
            (item) => item.code === "cod_order"
          );
          if (!linkedOrderTag) {
            onStatusObj.codOrderErr = `linked_order tag is mandatory in /on_status when order type is COD`;
          } else if (!codOrderItem) {
            onStatusObj.codOrderErr = `cod_order code must be present inside linked_order for COD`;
          } else if (codOrderItem?.value !== cod_order)
            onStatusObj.codOrderErr = `cod_order value '${codOrderItem?.value}' in linked_order does not match with the one provided in /search (${cod_order})`;
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

          if (fulfillment.end.time.timestamp) {
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

      if (fulfillment?.type == "Delivery") {
        if (fulfillment?.hasOwnProperty("tags")) {
          fulfillment?.tags?.forEach((tag) => {
            if (tag.code === "linked_provider") {
              if (!_.isEqual(JSON.stringify(tag), shipping_label)) {
                onStatusObj.linkedPrvdrErr = `linked_provider tag in /on_update does not match with the one provided in /init`;
              }
              if (tag?.list?.length > 0) {
                var found = false;
                tag.list.forEach((item) => {
                  if (item.code === "id") {
                    found = true;
                  }
                });
                if (!found) {
                  onStatusObj.linkedPrvdrErr = `linked_provider tag in /on_update does not have id code`;
                }
              }
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(`Error checking fulfillments/start in /on_status`);
  }
  if (on_status?.hasOwnProperty("cancellation_terms")) {
    console.log("validating cancellation terms" + on_status);
    const cancellationTerms = on_confirm?.cancellation_terms;
    if (!Array.isArray(cancellationTerms)) {
      onStatusObj.cancellationTerms = "cancellation_terms must be an array";
    } else {
      cancellationTerms.forEach((term, index) => {
        const path = `cancellation_terms[${index}]`;

        // fulfillment_state
        const descriptor = term?.fulfillment_state?.descriptor;
        if (!descriptor) {
          onStatusObj.cancellationTerms = `${path}.fulfillment_state.descriptor is missing`;
        } else {
          if (!descriptor.code) {
            onStatusObj.cancellationTerms = `${path}.fulfillment_state.descriptor.code is missing`;
          } else {
            if (!constants.FULFILLMENT_STATE.includes(descriptor.code)) {
              onStatusObj.cancellationTerms = `${path}.fulfillment_state.descriptor.code is Invalid`;
            }
          }
          if (!descriptor.short_desc) {
            onStatusObj.cancellationTerms = `${path}.fulfillment_state.descriptor.short_desc is missing`;
          }
        }

        // cancellation_fee
        const fee = term?.cancellation_fee;
        if (!fee) {
          onStatusObj.cancellationTerms = `${path}.cancellation_fee is missing`;
        } else {
          if (!fee.percentage) {
            onStatusObj.cancellationTerms = `${path}.cancellation_fee.percentage is missing`;
          }
          if (!fee.amount) {
            onStatusObj.cancellationTerms = `${path}.cancellation_fee.amount is missing`;
          } else {
            if (!fee.amount.currency) {
              onStatusObj.cancellationTerms = `${path}.cancellation_fee.amount.currency is missing`;
            }
            if (!fee.amount.value) {
              onStatusObj.cancellationTerms = `${path}.cancellation_fee.amount.value is missing`;
            }
          }
        }
      });
    }
  }
  return onStatusObj;
};

module.exports = checkOnStatus;

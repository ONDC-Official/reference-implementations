const _ = require("lodash");
const dao = require("../../../dao/dao");
const constants = require("../../constants");
const utils = require("../../utils.js");

const checkConfirm = (data, msgIdSet) => {
  let cnfrmObj = {};
  let confirm = data;
  const initLinkedProviderTags = JSON.stringify(
    dao.getValue("init_linked_provider")
  );
  let confirmItemId = [];
  const domain = data?.context?.domain;
  const contextTimestamp = confirm.context.timestamp;
  dao.setValue("cnfrmTimestamp", contextTimestamp);
  let version = confirm.context.core_version;
  let missingTags = [];
  let onSearchProvArr = dao.getValue("providersArr");
  const cod_order = dao.getValue("cod_order");
  const COD_ITEM = dao.getValue("COD_ITEM");
  const Update_delivery_address = dao.getValue("Update_delivery_address");
  const initCategoryId = JSON.stringify(dao.getValue("init_item_category_id"));
  const reverseQC = dao.getValue("Reverse_QC");
  const eWayBill = dao.getValue("eWayBill");
  const callMasking = dao.getValue("call_masking");
  const statisOtpVerificationRto = dao.getValue("static_otp_verification_rto");
  const partialRto = dao.getValue("partial_rto");
  confirm = confirm.message.order;
  const orderTags = confirm?.tags;
  let bpp_terms = false;
  let bap_terms = false;
  let rts;
  let linkedOrder = confirm["@ondc/org/linked_order"];
  if (confirm?.updated_at > contextTimestamp) {
    cnfrmObj.updatedAtErr = `order/updated_at cannot be future dated w.r.t context/timestamp`;
  }
  if (confirm?.created_at > contextTimestamp) {
    cnfrmObj.createdAtErr = `order/created_at cannot be future dated w.r.t context/timestamp`;
  }

  if (confirm.provider.locations && confirm.provider.locations.length > 1)
    dao.setValue("confirm_locations", confirm.provider.locations);

  if (version === "1.1.0")
    rts = confirm?.fulfillments[0]?.tags["@ondc/org/order_ready_to_ship"];
  else {
    let fulTags = confirm?.fulfillments[0].tags;
    fulTags.forEach((tag) => {
      if (tag.code === "state") {
        const lists = tag.list;
        lists.forEach((list) => {
          if (list.code === "ready_to_ship") {
            rts = list.value;
          }
        });
      }
    });
  }

  try {
    if (JSON.parse(initCategoryId) === "Immediate Delivery") {
      const state = confirm?.fulfillments[0].tags?.find(
        (tag) => tag?.code === "state"
      );
      const linked_order = confirm?.fulfillments[0].tags?.find(
        (tag) => tag?.code === "linked_order"
      );
      const readyToShip = state?.list?.some(
        (item) => item?.code === "ready_to_ship"
      );
      if (!state)
        cnfrmObj.stateErr = `state tag is mandatory in /confirm when category_id is Immediate Delivery`;
      else if (!readyToShip)
        cnfrmObj.stateErr = `ready_to_ship code is mandatory in state tag in /confirm when category_id is Immediate Delivery`;
      else if (readyToShip?.value !== "yes")
        cnfrmObj.stateErr = `ready_to_ship value "yes" is mandatory in state tag in /confirm when category_id is Immediate Delivery`;

      if (linked_order) {
        const reatilId = linked_order?.list?.find((i) => i.code === "id");
        const orderPrepTime = linked_order?.list?.find(
          (i) => i.code === "prep_time"
        );
        if (!reatilId)
          cnfrmObj.retailId = `id code is mandatory in linked_order tag in /confirm when category_id is Immediate Delivery`;
        if (!orderPrepTime)
          cnfrmObj.orderPrepTime = `prep_time code is mandatory in linked_order tag in /confirm when category_id is Immediate Delivery`;
      } else {
        cnfrmObj.linkedOrderErr = `linked_order tag is mandatory in /confirm when category_id is Immediate Delivery`;
      }
    }
  } catch (error) {
    console.log(
      `!!Error fetching immediaste Delivery fulfillment in${constants.LOG_CONFIRM}`,
      error
    );
  }

  if (confirm?.payment?.type === "POST-FULFILLMENT") {
    const requiredFields = {
      "@ondc/org/settlement_basis":
        "payment/@ondc/org/settlement_basis is mandatory for POST-FULFILLMENT payment type",
      "@ondc/org/settlement_window":
        "payment/@ondc/org/settlement_window is mandatory for POST-FULFILLMENT payment type",
    };

    for (const [field, errorMessage] of Object.entries(requiredFields)) {
      if (!confirm?.payment?.[field]) {
        const errorKey = `payment${field.replace(/[^a-zA-Z]/g, "")}Err`;
        cnfrmObj[errorKey] = errorMessage;
      }
    }
  }

  if (eWayBill) {
    const deliveryFulfillment = confirm?.fulfillments?.find(
      (fulfillment) => fulfillment?.type === "Delivery"
    );

    const linkedProvider = deliveryFulfillment?.tags?.find(
      (tag) => tag.code === "linked_provider"
    );

    if (!linkedProvider) {
      cnfrmObj.linkedProviderErr = `linked_provider code is mandatory in fulfillment tags for eWayBill flow`;
      return;
    }

    const taxIdEntry = linkedProvider?.list?.find(
      (entry) => entry.code === "tax_id"
    );

    if (!taxIdEntry?.value) {
      cnfrmObj.taxIdErr = `tax_id code is mandatory in linked_provider tag for eWayBill flow`;
    }
  }

  let provId = confirm.provider.id;
  let items = confirm.items;

  try {
    console.log(
      `Comparing item duration and timestamp in /on_search and /confirm`
    );
    2;
    items?.forEach((item, i) => {
      if (domain === "ONDC:LOG10" && !item?.time?.timestamp) {
        cnfrmObj[
          `Item${i}_timestamp`
        ] = `Timestamp is mandatory inside time object for item ${item.id} in ${constants.LOG_ONSEARCH} api in order type P2P (ONDC:LOG10)`;
      }
      confirmItemId?.push(item?.id);
      if (item.time) {
        onSearchProvArr.forEach((provider) => {
          if (provider.id === provId) {
            const onSearchItemsObj = provider.items;
            onSearchItemsObj.forEach((onSrchItem) => {
              if (onSrchItem.id === item.id) {
                if (onSrchItem?.time?.duration !== item?.time?.duration)
                  cnfrmObj.itemDurationErr = `item duration does not match with the one provided in /on_search (LSP can send NACK)`;
                if (onSrchItem?.time?.timestamp !== item?.time?.timestamp)
                  cnfrmObj.itemTmstmpErr = `item timestamp does not match with the one provided in /on_search (LSP can send NACK)`;
              }
            });
          }
        });
      }
    });
  } catch (error) {}

  try {
    if (cod_order) {
      const item = confirm?.items?.find((item, i) => {
        if (!item?.tags)
          cnfrmObj[
            `itemTagsErr${i}`
          ] = `tags are mandatory in item for item id ${item.id} when order type is COD`;
      });

      if (COD_ITEM && !confirmItemId.includes(COD_ITEM[0]?.id)) {
        cnfrmObj.codOrderItemErr = `Item with id '${COD_ITEM[0]?.id}' does not exist in /confirm when order type is COD`;
      }
      // COD_ITEM?.forEach((item) => {
      //   if (!confirmItemId.includes(item?.id)) {
      //     cnfrmObj.codOrderItemErr = `Item with id '${item.id}' does not exist in /confirm when order type is COD`;
      //   }
      // });
    }
  } catch (error) {
    console.log(`!!Error fetching order item  in${constants.LOG_CONFIRM}`, err);
  }

  dao.setValue("rts", rts);
  const cnfrmOrdrId = confirm.id;
  dao.setValue("cnfrmOrdrId", cnfrmOrdrId);
  let awbNo = false;
  let fulfillments = confirm.fulfillments;

  let p2h2p = dao.getValue("p2h2p");
  let fulfillmentTagSet = new Set();
  fulfillments.forEach((fulfillment, i) => {
    if (partialRto) {
      const linkedOrderItemTags =
        fulfillment?.tags?.filter((tag) => tag.code === "linked_order_item") ||
        [];

      if (linkedOrderItemTags.length !== 2) {
        cnfrmObj[
          `linkedOrderItemTagCountErr-${i}`
        ] = `'linked_order_item' tag must be present exactly twice in fulfillment/tags for partial RTO flow. Found: ${linkedOrderItemTags.length}`;
      } else {
        let count = 1;
        linkedOrderItemTags.forEach((linkedOrderItemTag, idx) => {
          const requiredCodes = [
            "category",
            "name",
            "currency",
            "value",
            "quantity",
            "weight_unit",
            "weight_value",
            "return_to_origin",
          ];
          requiredCodes.forEach((code) => {
            const item = linkedOrderItemTag.list?.find((l) => l.code === code);
            if (
              !item ||
              item.value === undefined ||
              item.value === null ||
              item.value === ""
            ) {
              cnfrmObj[
                `linkedOrderItemTag_${code}_Err-${i}-${idx}`
              ] = `'${code}' is required and must have a non-empty value in linked_order_item tag list for partial RTO flow (object ${
                idx + 1
              }).`;
            }
            if (code === "return_to_origin" && item && item.value) {
              dao.setValue(`confirm_return_to_origin_${String(count)}`, item.value);
              // console.log("=====",`confirm_return_to_origin_${String(count)}`, item.value)
              count++;
            }
          });
        });
      }
    }
    console.log("^^^^^^",dao.getValue(`confirm_return_to_origin_1`))
    console.log("^^^^^^",dao.getValue(`confirm_return_to_origin_2`))

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
            cnfrmObj.maskedContactErr = `'masked_contact' tag is required in /fulfillments in start object.`;
          } else {
            const list = maskedTag.list || [];
            const requiredCodes = ["type", "setup", "token"];
            const foundCodes = new Set();

            for (const item of list) {
              if (!item.code || item.value == null) {
                cnfrmObj.listmaskedContactErr = `Each item in 'masked_contact' must contain both 'code' and 'value'.`;
              }

              foundCodes.add(item.code);

              if (
                item.code === "type" &&
                !allowedMaskedTypes.includes(item.value)
              ) {
                cnfrmObj.typemaskedContactErr = `'type' in 'masked_contact' must be one of: ${allowedMaskedTypes.join(
                  ", "
                )}. Found: '${item.value}'`;
              }

              if (
                (item.code === "setup" || item.code === "token") &&
                (!item.value || typeof item.value !== "string")
              ) {
                cnfrmObj.setupmaskedContactErr = `'${item.code}' in 'masked_contact' must be a non-empty string.`;
              }
            }

            for (const code of requiredCodes) {
              if (!foundCodes.has(code)) {
                cnfrmObj.codemaskedContactErr = `'masked_contact' tag must contain '${code}' in its list.`;
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
            cnfrmObj.endmaskedContactErr = `'masked_contact' tag is required in /fulfillments in end object.`;
          } else {
            const list = maskedTag.list || [];
            const requiredCodes = ["type", "setup", "token"];
            const foundCodes = new Set();

            for (const item of list) {
              if (!item.code || item.value == null) {
                cnfrmObj.listendmaskedContactErr = `Each item in 'masked_contact' must contain both 'code' and 'value'.`;
              }

              foundCodes.add(item.code);

              if (
                item.code === "type" &&
                !allowedMaskedTypes.includes(item.value)
              ) {
                cnfrmObj.typeendmaskedContactErr = `'type' in 'masked_contact' must be one of: ${allowedMaskedTypes.join(
                  ", "
                )}. Found: '${item.value}'`;
              }

              if (
                (item.code === "setup" || item.code === "token") &&
                (!item.value || typeof item.value !== "string")
              ) {
                cnfrmObj.setupendmaskedContactErr = `'${item.code}' in 'masked_contact' must be a non-empty string.`;
              }
            }

            for (const code of requiredCodes) {
              if (!foundCodes.has(code)) {
                cnfrmObj.codeendmaskedContactErr = `'masked_contact' tag must contain '${code}' in its list.`;
              }
            }
          }
        }
      }
    }

    if (statisOtpVerificationRto && fulfillment?.tags) {
      const rtoTag = fulfillment.tags.find(
        (tag) => tag.code === "rto_verification"
      );
      if (!rtoTag) {
        cnfrmObj[
          `rtoVerificationTagErr-${i}`
        ] = `'rto_verification' tag is required in fulfillment/tags for static OTP verification RTO flow.`;
      } else {
        const codeObj = rtoTag.list?.find((item) => item.code === "code");
        if (!codeObj || codeObj.value !== "5") {
          cnfrmObj[
            `rtoVerificationCodeErr-${i}`
          ] = `'rto_verification' tag must have an item with code: "code" and value: "5".`;
        }
        const shortDescObj = rtoTag.list?.find(
          (item) => item.code === "short_desc"
        );
        if (
          !shortDescObj ||
          shortDescObj.value == null ||
          shortDescObj.value === ""
        ) {
          cnfrmObj[
            `rtoVerificationShortDescErr-${i}`
          ] = `'rto_verification' tag must have an item with code: "short_desc" and a non-empty value.`;
        }
      }
    }

    if (Update_delivery_address)
      dao.setValue("confirm_end_location", fulfillment?.end?.location?.address);

    if (reverseQC) {
      if (fulfillment?.type === "Return") {
        const deliveryTags = fulfillment?.tags;
        if (!deliveryTags || !Array.isArray(deliveryTags)) {
          cnfrmObj[
            `deliveryTagsErr-${i}`
          ] = `Tags are missing or invalid in fulfillment of type 'Return' for Reverse QC flow.`;
        } else {
          const reverseQCInputTag = deliveryTags.find(
            (tag) => tag.code === "reverseqc_input"
          );
          if (!reverseQCInputTag) {
            cnfrmObj[
              `reverseQCInputTagErr-${i}`
            ] = `reverseqc_input tag is missing in fulfillment of type 'Return' in Reverse QC flow.`;
          } else if (
            !Array.isArray(reverseQCInputTag.list) ||
            reverseQCInputTag.list.length === 0
          ) {
            cnfrmObj[
              `reverseQCInputListErr-${i}`
            ] = `list array inside reverseqc_input tag is missing or empty in fulfillment of type 'Return' in Reverse QC flow.`;
          }
        }
      }
    }

    let fulfillmentTags = fulfillment?.tags;
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
      cnfrmObj.avgPckupErr = `Average Pickup Time (fulfillments/start/time/duration) mismatches from the one provided in /on_search`;
    }
    if (fulfillment["@ondc/org/awb_no"] && p2h2p) awbNo = true;
    if (rts === "yes" && !fulfillment?.start?.instructions?.short_desc) {
      cnfrmObj.instructionsErr = `fulfillments/start/instructions are required when ready_to_ship = 'yes'`;
    }
    reqFulTags = ["rto_action", "state"];
    //checking tags
    if (fulfillmentTags) {
      let linked_provider = {};
      dao.setValue("confirm_fulfillment_tags", JSON.stringify(fulfillmentTags));
      fulfillmentTags.forEach((tag) => {
        // dao.setValue(`confirm_${tag?.code}`, tag)
        if (tag?.code === "linked_provider") {
          const filtereed_provider = tag?.list?.filter(
            (item) => item.code !== "address"
          );

          linked_provider = {
            code: "linked_provider",
            list: filtereed_provider,
          };
        }

        // if (
        //   !_.isEqual(JSON.stringify(linked_provider), initLinkedProviderTags)
        // ) {
        //   cnfrmObj.linkedPrvdrErr = `linked_provider tag in /confirm does not match with the one provided in /init`;
        // }

        let { code, list } = tag;
        fulfillmentTagSet.add(code);
      });

      if (cod_order) {
        const cod_settlement_tags = fulfillmentTags?.some(
          (item) => item?.code === "cod_settlement_detail"
        );
        if (!cod_settlement_tags) {
          cnfrmObj.codSettlementErr = `cod_settlement_detail tag is mandatory in /confirm inside fulfillment/tags when order type is COD`;
        }
        const linkedOrderTag = fulfillment?.tags?.find(
          (tag) => tag.code === "linked_order"
        );
        const codOrderItem = linkedOrderTag.list?.find(
          (item) => item.code === "cod_order"
        );
        if (!linkedOrderTag) {
          cnfrmObj.codOrderErr = `linked_order tag is mandatory in /init when order type is COD`;
        } else if (!codOrderItem) {
          cnfrmObj.codOrderErr = `cod_order code must be present inside linked_order for COD`;
        } else if (codOrderItem?.value !== cod_order)
          cnfrmObj.codOrderErr = `cod_order value '${codOrderItem?.value}' in linked_order does not match with the one provided in /search (${cod_order})`;
      }

      missingTags = utils.findRequiredTags(fulfillmentTagSet, reqFulTags);
      if (missingTags.length > 0) {
        let itemKey = `missingFlmntTags-${i}-err`;
        cnfrmObj[
          itemKey
        ] = `'${missingTags}' tag/s required in /fulfillments/tags`;
      }
    }
  });

  try {
    if (cod_order && Array.isArray(confirm?.quote?.breakup)) {
      const hasCodTitle = confirm.quote.breakup.some(
        (item) => item?.["@ondc/org/title_type"] === "cod"
      );

      if (!hasCodTitle) {
        cnfrmObj.quotebreakupErr = `title_type "cod" is mandatory in /confirm breakup array when order type is COD`;
      }
    }
  } catch (error) {
    console.error(`Error checking quote object in /confirm:`, error);
  }

  try {
    console.log("checking linked order in /confirm");
    let orderPrice = 0;
    let orderItems = linkedOrder?.items;

    orderItems.forEach((item) => {
      console.log(parseFloat(item?.price?.value));
      orderPrice += parseFloat(item?.price?.value);
    });
    if (orderPrice > dao.getValue("orderPrice")) {
      cnfrmObj.ordrPrice = `Linked order price value - ${orderPrice} cannot be more than the one provided in /search in Payload details - ${dao.getValue(
        "orderPrice"
      )}`;
    }
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

    console.log(totalUnitWeight, orderWeight);
    if (
      totalUnitWeight.toFixed(2) != orderWeight.toFixed(2) &&
      quantityUnit !== "unit"
    ) {
      cnfrmObj.weightErr = `Total order weight '${orderWeight}' does not match the total unit weight of items '${totalUnitWeight}'`;
    }
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("Checking order tags in /confirm");
    if (orderTags) {
      orderTags.forEach((tag) => {
        if (tag?.code === "bpp_terms") {
          bpp_terms = true;
        }
        if (tag?.code === "bap_terms") {
          bap_terms = true;
        }
      });
    }
    console.log(bpp_terms, bap_terms);
    if (confirm?.hasOwnProperty("cancellation_terms")) {
      console.log("validating cancellation terms" + confirm);
      const cancellationTerms = confirm?.cancellation_terms;
      if (!Array.isArray(cancellationTerms)) {
        cnfrmObj.cancellationTerms = "cancellation_terms must be an array";
      } else {
        cancellationTerms.forEach((term, index) => {
          const path = `cancellation_terms[${index}]`;

          // fulfillment_state
          const descriptor = term?.fulfillment_state?.descriptor;
          if (!descriptor) {
            cnfrmObj.cancellationTerms = `${path}.fulfillment_state.descriptor is missing`;
          } else {
            if (!descriptor.code) {
              cnfrmObj.cancellationTerms = `${path}.fulfillment_state.descriptor.code is missing`;
            } else {
              if (!constants.FULFILLMENT_STATE.includes(descriptor.code)) {
                cnfrmObj.cancellationTerms = `${path}.fulfillment_state.descriptor.code is Invalid`;
              }
            }
            if (!descriptor.short_desc) {
              cnfrmObj.cancellationTerms = `${path}.fulfillment_state.descriptor.short_desc is missing`;
            }
          }

          // cancellation_fee
          const fee = term?.cancellation_fee;
          if (!fee) {
            cnfrmObj.cancellationTerms = `${path}.cancellation_fee is missing`;
          } else {
            if (!fee.percentage) {
              cnfrmObj.cancellationTerms = `${path}.cancellation_fee.percentage is missing`;
            }
            if (!fee.amount) {
              cnfrmObj.cancellationTerms = `${path}.cancellation_fee.amount is missing`;
            } else {
              if (!fee.amount.currency) {
                cnfrmObj.cancellationTerms = `${path}.cancellation_fee.amount.currency is missing`;
              }
              if (!fee.amount.value) {
                cnfrmObj.cancellationTerms = `${path}.cancellation_fee.amount.value is missing`;
              }
            }
          }
        });
      }
    }

    if (bpp_terms && !dao.getValue("bppTerms")) {
      cnfrmObj.bppTermsErr = `Which terms LBNP is providing as LSP did not provide bpp_terms in on_init?`;
    }
    if (!bpp_terms && bap_terms) {
      cnfrmObj.bapTermsErr = `What terms are being accepted by LBNP here?`;
    }
    if (!bpp_terms && dao.getValue("bppTerms")) {
      cnfrmObj.bppTermsErr1 = `BPP terms are missing which were provided by LSP in /on_init`;
    }
  } catch (error) {}
  dao.setValue("awbNo", awbNo);
  return cnfrmObj;
};

module.exports = checkConfirm;

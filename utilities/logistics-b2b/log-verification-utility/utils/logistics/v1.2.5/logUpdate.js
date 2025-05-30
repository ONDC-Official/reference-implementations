const _ = require("lodash");
const dao = require("../../../dao/dao");
const constants = require("../../constants");
const utils = require("../../utils.js");

const checkUpdate = (data, msgIdSet) => {
  let updtObj = {};
  let update = data;
  let version = update.context.core_version;
  let contextTimestamp = update.context.timestamp;
  const initCategoryId = JSON.stringify(dao.getValue("init_item_category_id"));
  let p2h2p = dao.getValue("p2h2p");
  let awbNo = dao.getValue("awbNo");
  const Update_delivery_address = dao.getValue("Update_delivery_address");
  const confirmdeliveryAddress = dao.getValue("confirm_end_location");
  const dymanicOtpVerificationRto = dao.getValue(
    "Dynamic_otp_verification_rto"
  );
  const reverseQC = dao.getValue("Reverse_QC");

  dao.setValue("updateApi", true);

  update = update?.message?.order;
  // if (update?.updated_at > contextTimestamp) {
  //   updtObj.updatedAtErr = `order/updated_at cannot be future dated w.r.t context/timestamp`;
  // }
  // if (version === "1.1.0")
  //   rts = update?.fulfillments[0]?.tags["@ondc/org/order_ready_to_ship"];
  // else {
  //   let fulTags = update?.fulfillments[0].tags;
  //   fulTags.forEach((tag) => {
  //     if (tag.code === "state") {
  //       const lists = tag.list;
  //       lists.forEach((list) => {
  //         if (list.code === "ready_to_ship") {
  //           rts = list.value;
  //         }
  //       });
  //     }
  //   });
  // }

  // try {
  //   if (JSON.parse(initCategoryId) === "Immediate Delivery") {
  //     const state = update?.fulfillments[0].tags?.find(
  //       (item) => item?.code === "state"
  //     );
  //     const orderready = state?.list?.find(
  //       (item) => item?.code === "order_ready"
  //     );
  //     if (!state)
  //       updtObj.stateErr = `state tag is required in fulfillments for immediate delivery`;
  //     else if (!orderready)
  //       updtObj.orderReadyErr = `order_ready tag is required inside state tag in fulfillments for immediate delivery`;
  //   }
  // } catch (error) {
  //   console.error("Error while immmediate Delivery flow:", error.stack);
  // }

  const fulfillment = update?.fulfillments?.[0];
  const tags = fulfillment?.tags;
  if (update?.updated_at > contextTimestamp) {
    updtObj.updatedAtErr = `order/updated_at cannot be future dated w.r.t context/timestamp`;
  }

  if (version === "1.1.0") {
    rts = tags?.["@ondc/org/order_ready_to_ship"];
  } else if (Array.isArray(tags)) {
    const stateTag = tags.find((tag) => tag.code === "state");
    const readyToShipEntry = stateTag?.list?.find(
      (item) => item.code === "ready_to_ship"
    );
    rts = readyToShipEntry?.value;
  }

  try {
    if (JSON.parse(initCategoryId) === "Immediate Delivery") {
      const stateTag = tags?.find((tag) => tag?.code === "state");
      const orderReadyTag = stateTag?.list?.find(
        (item) => item?.code === "order_ready"
      );

      if (!stateTag) {
        updtObj.stateErr = `state tag is required in fulfillments for immediate delivery`;
      } else if (!orderReadyTag) {
        updtObj.orderReadyErr = `order_ready tag is required inside state tag in fulfillments for immediate delivery`;
      }
    }
  } catch (error) {
    console.error("Error while immediate Delivery flow:", error.stack);
  }

  try {
    try {
      if (dymanicOtpVerificationRto) {
        update?.fulfillments?.forEach((fulfillment) => {
          const startAuth = fulfillment?.start?.authorization;
          const endAuth = fulfillment?.end?.authorization;

          if (!startAuth || startAuth.type !== "OTP") {
            updtObj.startAuthErr = `start.authorization must have type 'OTP' when flow is dymanicOtpVerificationRto.`;
          } else if (!startAuth.valid_from || !startAuth.valid_to) {
            updtObj.startAuthKeysErr = `start.authorization must include 'valid_from' and 'valid_until' keys in dymanicOtpVerificationRto flow.`;
          }

          if (!endAuth || endAuth.type !== "OTP") {
            updtObj.endAuthErr = `end.authorization must have type 'OTP' when flow is dymanicOtpVerificationRto.`;
          } else if (!endAuth.valid_from || !endAuth.valid_to) {
            updtObj.endAuthKeysErr = `end.authorization must include 'valid_from' and 'valid_until' keys in dymanicOtpVerificationRto flow.`;
          }
        });
      }
    } catch (error) {
      console.error(
        "Error while checking OTP authorization in fulfillments:",
        error.stack
      );
    }
  } catch (error) {
    console.error("Error while immediate Delivery flow:", error.stack);
  }

  dao.setValue("rts", rts);
  let items = update.items;
  let fulfillments = update?.fulfillments;

  try {
    console.log(`Checking if PCC code required in case of P2P/P2H2P shipments`);

    fulfillments.forEach((fulfillment) => {
      if (Update_delivery_address) {
        if (!fulfillment?.end?.location?.address) {
          updtObj.deliveryAddressErr = `Delivery address in fulfillments/end is missing in Update Delivery Address Flow`;
        } else if (
          _.isEqual(fulfillment.end.location.address, confirmdeliveryAddress)
        ) {
          updtObj.deliveryAddressErr = `Delivery address in fulfillments/end should not be the same as the one provided in /confirm in Update Delivery Address Flow`;
        }
      }

      if (reverseQC) {
        if (fulfillment?.type === "Return") {
          const deliveryTags = fulfillment?.tags;
          if (!deliveryTags || !Array.isArray(deliveryTags)) {
            updtObj[
              `deliveryTagsErr`
            ] = `Tags are missing or invalid in fulfillment of type 'Return' for Reverse QC flow.`;
          } else {
            const reverseQCInputTag = deliveryTags.find(
              (tag) => tag.code === "reverseqc_output"
            );
            if (!reverseQCInputTag) {
              updtObj[
                `reverseQCInputTagErr`
              ] = `reverseqc_input tag is missing in fulfillment of type 'Return' for Reverse QC flow.`;
            } else if (
              !Array.isArray(reverseQCInputTag.list) ||
              reverseQCInputTag.list.length === 0
            ) {
              updtObj[
                `reverseQCInputListErr`
              ] = `list array inside reverseqc_input tag is missing or empty in fulfillment of type 'Return' for Reverse QC flow.`;
            }
          }
        }
      }

      if (fulfillment["@ondc/org/awb_no"] && p2h2p) awbNo = true;
      if (rts === "yes" && !fulfillment?.start) {
        updtObj.startErr = `/fulfillments/start is required when ready_to_ship = yes`;
      } else if (
        rts === "yes" &&
        !fulfillment?.start?.instructions?.short_desc
      ) {
        updtObj.instrctnsErr = `Pickup code is missing in fulfillments/start/instructions`;
      }
    });
  } catch (error) {
    console.log(`Error checking fulfillments/start in /update`);
  }
  dao.setValue("awbNo", awbNo);
  return updtObj;
};

module.exports = checkUpdate;

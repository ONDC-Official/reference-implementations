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

  dao.setValue("rts", rts);
  let items = update.items;
  let fulfillments = update.fulfillments;

  try {
    console.log(`Checking if PCC code required in case of P2P/P2H2P shipments`);

    fulfillments.forEach((fulfillment) => {
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

const checkOnStatusDelivered = require("./retOnStatusDelivered");
const checkOnStatusPending = require("./retOnStatusPending");
const checkOnStatusPicked = require("./retOnStatusPicked");
const dao = require("../../dao/dao");

const checkUnsolicitedStatus = (dirPath, msgIdSet) => {
  let onStatObj = {};

  onStatObj.pending = checkOnStatusPending(dirPath, msgIdSet, "pending");
  // console.log("TESTING", onStatObj.pending);

  onStatObj.pickedup = checkOnStatusPicked(dirPath, msgIdSet, "picked");

  onStatObj.delivered = checkOnStatusDelivered(dirPath, msgIdSet, "delivered");

  dao.setValue("onStatObj", onStatObj);
};

module.exports = checkUnsolicitedStatus;

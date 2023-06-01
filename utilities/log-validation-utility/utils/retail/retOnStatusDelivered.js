const checkOnStatus = require("./retOnStatus");
const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");

const checkOnStatusDelivered = (dirPath, msgIdSet, state) => {
  try {
    let on_status = fs.readFileSync(
      dirPath + `/${constants.RET_ONSTATUS}_${state}.json`
    );
    on_status = JSON.parse(on_status);
    let deliveredObj = {};
    deliveredObj = checkOnStatus(msgIdSet, on_status, state);

    //timestamp validations
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(
        `!!File not found for /${constants.RET_ONSTATUS}_${state} API!`
      );
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONSTATUS}_${state} API`,
        err
      );
    }
  }
};

module.exports = checkOnStatusDelivered;

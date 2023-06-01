// Order picked on status

const checkOnStatus = require("./retOnStatus");
const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");

const checkOnStatusPicked = (dirPath, msgIdSet, state) => {
  try {
    let on_status = fs.readFileSync(
      dirPath + `/${constants.RET_ONSTATUS}_${state}.json`
    );
    on_status = JSON.parse(on_status);
    dao.setValue("pickedOnStatus", true);
    let pickedupObj = {};
    pickedupObj = checkOnStatus(msgIdSet, on_status, state);

    //timestamp validations

    // if (dao.getValue("pendingOnStatus")) {
    // }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(
        `!!File not found for /${constants.RET_ONSTATUS}_${state} API!`
      );
      dao.setValue("pickedOnStatus", false);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONSTATUS}_${state} API`,
        err
      );
    }
  }
};

module.exports = checkOnStatusPicked;

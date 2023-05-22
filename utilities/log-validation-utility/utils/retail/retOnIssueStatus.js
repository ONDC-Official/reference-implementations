const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkOnIssueStatus = (dirPath, msgIdSet) => {
  let onIssueStatusObj = {};
  try {
    let onIssueStatus = fs.readFileSync(
      dirPath + `/${constants.RET_ONISSUE_STATUS}.json`
    );
    onIssueStatus = JSON.parse(onIssueStatus);

    try {
      console.log(`Validating Schema for ${constants.RET_ONISSUE_STATUS} API`);
      const vs = validateSchema(
        "retail",
        constants.RET_ONISSUE_STATUS,
        onIssueStatus
      );
      console.log("DEBUGGG", vs);
      if (vs != "error") {
        Object.assign(onIssueStatusObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE_STATUS}`,
        error
      );
    }

    try {
      console.log(`Checking context for /${constants.RET_ONISSUE_STATUS} API`); //checking context
      res = checkContext(onIssueStatus.context, constants.RET_ONISSUE_STATUS);
      if (!res.valid) {
        Object.assign(onIssueStatusObj, res.ERRORS);
      }
    } catch (error) {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONISSUE_STATUS} context`,
        error
      );
    }

    dao.setValue("onIssueStatusObj", onIssueStatusObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONISSUE_STATUS} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONISSUE_STATUS} API`,
        err
      );
    }
  }
};

module.exports = checkOnIssueStatus;

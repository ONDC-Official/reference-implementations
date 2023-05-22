const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkOnIssue = (dirPath) => {
  let onissueObj = {};

  try {
    let on_issue = fs.readFileSync(dirPath + `/${constants.RET_ONISSUE}.json`);
    on_issue = JSON.parse(on_issue);

    try {
      console.log(`Validating Schema for ${constants.RET_ONISSUE} API`);
      const vs = validateSchema("retail", constants.RET_ONISSUE, on_issue);
      if (vs != "error") {
        Object.assign(onissueObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE}`,
        error
      );
    }

    console.log(`Checking context for ${constants.RET_ONISSUE} API`); //checking context
    try {
      res = checkContext(on_issue.context, constants.RET_ONISSUE);
      if (!res.valid) {
        Object.assign(onissueObj, res.ERRORS);
      }
    } catch (error) {
      console.log(
        `Some error occurred while checking /${constants.RET_ONISSUE} context`,
        error
      );
    }

    try {
      console.log(
        `Comparing city of /${constants.RET_SEARCH} and /${constants.RET_ONISSUE}`
      );
      if (!_.isEqual(dao.getValue("city"), on_issue.context.city)) {
        onissueObj.city = `City code mismatch in /${constants.RET_SEARCH} and /${constants.RET_ONISSUE}`;
      }
    } catch (error) {
      console.log(
        `Error while comparing city in /${constants.RET_SEARCH} and /${constants.RET_ONISSUE}`,
        error
      );
    }

    try {
      console.log(
        `Comparing timestamp of /${constants.RET_ONSEARCH} and /${constants.RET_ONISSUE}`
      );
      if (_.gte(dao.getValue("tmpstmp"), on_issue.context.timestamp)) {
        onissueObj.tmpstmp = `Timestamp for /${constants.RET_ONSEARCH} api cannot be greater than or equal to /${constants.RET_ONISSUE} api`;
      }
      dao.setValue("tmpstmp", on_issue.context.timestamp);
    } catch (error) {
      console.log(
        `Error while comparing timestamp for /${constants.RET_ONSEARCH} and /${constants.RET_ONISSUE} api`,
        error
      );
    }

    try {
      console.log(
        `Comparing transaction Ids of /${constants.RET_ONSEARCH} and /${constants.RET_ONISSUE}`
      );
      dao.setValue("txnId", on_issue.context.transaction_id);
    } catch (error) {
      console.log(
        `Error while comparing transaction ids for /${constants.RET_ONSEARCH} and /${constants.RET_ONISSUE} api`,
        error
      );
    }

    try {
      console.log(
        `Comparing Message Ids of /${constants.RET_ONSEARCH} and /${constants.RET_ONISSUE}`
      );
      if (_.isEqual(dao.getValue("msgId"), on_issue.context.message_id)) {
        onissueObj.msgId = `Message Id for /${constants.RET_ONSEARCH} and /${constants.RET_ONISSUE} api cannot be same`;
      }
      dao.setValue("msgId", on_issue.context.message_id);
    } catch (error) {
      console.log(
        `Error while comparing message ids for /${constants.RET_ONSEARCH} and /${constants.RET_ONISSUE} api`,
        error
      );
    }

    dao.setValue("onissueObj", onissueObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONISSUE} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONISSUE} API`,
        err
      );
    }
  }
};

module.exports = checkOnIssue;

const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkIssue = (dirPath) => {
  let issueObj = {};

  try {
    let issue = fs.readFileSync(dirPath + `/${constants.RET_ISSUE}.json`);
    issue = JSON.parse(issue);

    try {
      console.log(`Validating Schema for ${constants.RET_ISSUE} API`);
      const vs = validateSchema("retail", constants.RET_ISSUE, issue);
      if (vs != "error") {
        Object.assign(issueObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ISSUE}`,
        error
      );
    }

    console.log(`Checking context for ${constants.RET_ISSUE} API`); //checking context
    try {
      res = checkContext(issue.context, constants.RET_ISSUE);
      if (!res.valid) {
        Object.assign(issueObj, res.ERRORS);
      }
    } catch (error) {
      console.log(
        `Some error occurred while checking /${constants.RET_ISSUE} context`,
        error
      );
    }

    try {
      console.log(
        `Comparing city of /${constants.RET_SEARCH} and /${constants.RET_ISSUE}`
      );
      if (!_.isEqual(dao.getValue("city"), issue.context.city)) {
        issueObj.city = `City code mismatch in /${constants.RET_SEARCH} and /${constants.RET_ISSUE}`;
      }
    } catch (error) {
      console.log(
        `Error while comparing city in /${constants.RET_SEARCH} and /${constants.RET_ISSUE}`,
        error
      );
    }

    try {
      console.log(
        `Comparing timestamp of /${constants.RET_ONSEARCH} and /${constants.RET_ISSUE}`
      );
      if (_.gte(dao.getValue("tmpstmp"), issue.context.timestamp)) {
        issueObj.tmpstmp = `Timestamp for /${constants.RET_ONSEARCH} api cannot be greater than or equal to /${constants.RET_ISSUE} api`;
      }
      dao.setValue("tmpstmp", issue.context.timestamp);
    } catch (error) {
      console.log(
        `Error while comparing timestamp for /${constants.RET_ONSEARCH} and /${constants.RET_ISSUE} api`,
        error
      );
    }

    try {
      console.log(
        `Comparing transaction Ids of /${constants.RET_ONSEARCH} and /${constants.RET_ISSUE}`
      );
      dao.setValue("txnId", issue.context.transaction_id);
    } catch (error) {
      console.log(
        `Error while comparing transaction ids for /${constants.RET_ONSEARCH} and /${constants.RET_ISSUE} api`,
        error
      );
    }

    try {
      console.log(
        `Comparing Message Ids of /${constants.RET_ONSEARCH} and /${constants.RET_ISSUE}`
      );
      if (_.isEqual(dao.getValue("msgId"), issue.context.message_id)) {
        issueObj.msgId = `Message Id for /${constants.RET_ONSEARCH} and /${constants.RET_ISSUE} api cannot be same`;
      }
      dao.setValue("msgId", issue.context.message_id);
    } catch (error) {
      console.log(
        `Error while comparing message ids for /${constants.RET_ONSEARCH} and /${constants.RET_ISSUE} api`,
        error
      );
    }

    dao.setValue("issueObj", issueObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ISSUE} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ISSUE} API`,
        err
      );
    }
  }
};

module.exports = checkIssue;

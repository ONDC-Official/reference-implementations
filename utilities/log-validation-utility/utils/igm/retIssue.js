const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const logger = require("../logger");
const checkIssue = (dirPath) => {
  let issueObj = {};

  try {
    let issue = fs.readFileSync(dirPath + `/${constants.RET_ISSUE}.json`);
    issue = JSON.parse(issue);

    try {
      logger.info(`Validating Schema for ${constants.RET_ISSUE} API`);
      const vs = validateSchema("igm", constants.RET_ISSUE, issue);
      if (vs != "error") {
        Object.assign(issueObj, vs);
      }
    } catch (error) {
      logger.error(
        `!!Error occurred while performing schema validation for /${constants.RET_ISSUE}`,
        error
      );
    }
    try {
      logger.info(`Checking context for ${constants.RET_ISSUE} API`); //checking context
      res = checkContext(issue.context, constants.RET_ISSUE);
      if (!res.valid) {
        Object.assign(issueObj, res.ERRORS);
      }
    } catch (error) {
      logger.error(
        `Some error occurred while checking /${constants.RET_ISSUE} context`,
        error
      );
    }

    try {
      logger.info(
        `Storing igmTxnID igmTmpstmp igmType igmCoreVersion igmDomain igmIssueMesgId in /${constants.RET_ISSUE}`
      ); //storing IgmTxnId IgmTmpstmp igmType igmCoreVersion igmDomain
      dao.setValue("igmTxnId", issue.context.transaction_id);
      dao.setValue("igmTmpstmp", issue.context.timestamp);
      dao.setValue("igmCoreVersion", issue.context.core_version);
      dao.setValue("igmDomain", issue.context.domain);
      dao.setValue("igmIssueMsgId", issue.context.message_id);
      if (issue.message) {
        dao.setValue("igmIssueType", issue.message.issue.issue_type);
      }
      // msgIdSet.add(issue.context.message_id);
      if (!res.valid) {
        Object.assign(issueObj, res.ERRORS);
      }
    } catch (error) {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ISSUE} context`,
        error
      );
    }

    try {
      logger.info(`Phone Number Check for /${constants.RET_ISSUE}`);
      // on_issue.message.issue.issue_actions.respondent_actions[0].updated_by.contact.phone
      if (
        !_.inRange(
          issue.message.issue.complainant_info.contact.phone,
          1000000000,
          99999999999
        )
      ) {
        issueObj.Phn = `Phone Number for /${constants.RET_ISSUE} api is not in the valid Range`;
      }
      dao.setValue(
        "igmPhn",
        issue.message.issue.complainant_info.contact.phone
      );
    } catch (error) {
      logger.error(
        `Error while checking phone number for /${constants.RET_ISSUE} api`,
        error
      );
    }

    try {
      logger.info(
        `Checking time of creation and updation for /${constants.RET_ISSUE}`
      );
      if (
        !_.isEqual(
          issue.message.issue.created_at,
          issue.message.issue.updated_at
        )
      ) {
        if (!_.lte(issue.context.timestamp, issue.message.issue.created_at)) {
          issueObj.updatedTime = `Time of Creation for /${constants.RET_ISSUE} api should be less than current timestamp`;
        }
        issueObj.respTime = `Time of Creation and time of updation for /${constants.RET_ISSUE} api should be same`;
      }
      dao.setValue("igmCreatedAt", issue.message.issue.created_at);
    } catch (error) {
      logger.error(
        `Error while checking time of creation and updation for /${constants.RET_issue} api`,
        error
      );
    }

    try {
      logger.info(`Checking organization's name for /${constants.RET_ISSUE}`);
      let org_name =
        issue.message.issue.issue_actions.complainant_actions[0].updated_by.org
          .name;
      let org_id = org_name.split("::");
      if (!_.isEqual(issue.context.bap_id, org_id[0])) {
        issueObj.org_name = `Organization's Name for /${constants.RET_ISSUE} api mismatched with bap id`;
      }
      if (!_.lte(issue.context.domain, org_id[1])) {
        issueObj.org_domain = `Domain of organization for /${constants.RET_ISSUE} api mismatched with domain in context`;
      }
    } catch (error) {
      logger.error(
        `Error while checking organization's name for /${constants.RET_ISSUE} api`,
        error
      );
    }
    dao.setValue("issueObj", issueObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      logger.info(`!!File not found for /${constants.RET_ISSUE} API!`);
    } else {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ISSUE} API`,
        err
      );
    }
  }
};

module.exports = checkIssue;
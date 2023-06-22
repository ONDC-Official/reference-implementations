const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const logger = require("../logger");

const checkOnIssue = (dirPath) => {
  let onissueObj = {};

  try {
    let on_issue = fs.readFileSync(dirPath + `/${constants.RET_ONISSUE}.json`);
    on_issue = JSON.parse(on_issue);
    let issue = fs.readFileSync(dirPath + `/${constants.RET_ISSUE}.json`);
    issue = JSON.parse(issue);

    try {
      logger.info(`Validating Schema for ${constants.RET_ONISSUE} API`);
      const vs = validateSchema("igm", constants.RET_ONISSUE, on_issue);
      if (vs != "error") {
        Object.assign(onissueObj, vs);
      }
    } catch (error) {
      logger.error(
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE}`,
        error
      );
    }

    logger.info(`Checking context for ${constants.RET_ONISSUE} API`); //checking context
    try {
      res = checkContext(on_issue.context, constants.RET_ONISSUE);
      if (!res.valid) {
        Object.assign(onissueObj, res.ERRORS);
      }
    } catch (error) {
      logger.error(
        `Some error occurred while checking /${constants.RET_ONISSUE} context`,
        error
      );
    }

    try {
      logger.info(
        `Comparing transaction ID of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`
      );
      if (
        !_.isEqual(dao.getValue("igmTxnId"), on_issue.context.transaction_id)
      ) {
        onissueObj.igmTxnId = `transaction  ID mismatch in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`;
      }
    } catch (error) {
      logger.error(
        `Error while comparing transaction ID in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`,
        error
      );
    }

    try {
      logger.info(
        `Comparing MESSAGE ID of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`
      );
      if (
        !_.isEqual(dao.getValue("igmIssueMsgId"), on_issue.context.message_id)
      ) {
        onissueObj.igmIssueMsgId = `Message  ID mismatch in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`;
      }
    } catch (error) {
      logger.error(
        `Error while comparing Message ID in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`,
        error
      );
    }

    try {
      logger.info(
        `Comparing Domain of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`
      );
      if (!_.isEqual(dao.getValue("igmDomain"), on_issue.context.domain)) {
        onissueObj.igmDomain = `Domain for /${constants.RET_ISSUE} api should be equal to /${constants.RET_ONISSUE} api`;
      }
    } catch (error) {
      logger.error(
        `Error while comparing Domain for /${constants.RET_ISSUE} and /${constants.RET_ONISSUE} api`,
        error
      );
    }

    try {
      logger.info(
        `Comparing core version of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`
      );
      dao.setValue("core_version", on_issue.context.core_version);
    } catch (error) {
      logger.error(
        `Error while comparing core version for /${constants.RET_ISSUE} and /${constants.RET_ONISSUE} api`,
        error
      );
    }

    try {
      logger.info(`Phone Number Check for /${constants.RET_ONISSUE}`);

      if (
        !_.inRange(
          on_issue?.message?.issue?.issue_actions?.respondent_actions?.[0]
            ?.updated_by?.contact?.phone,
          1000000000,
          99999999999
        )
      ) {
        onissueObj.Phn = `Phone Number for /${constants.RET_ONISSUE} api is not in the valid Range`;
      }
    } catch (error) {
      logger.error(
        `Error while checking phone number for /${constants.RET_ONISSUE} api`,
        error
      );
    }

    try {
      logger.info(
        `Checking time of creation and updation for /${constants.RET_ONISSUE}`
      );
      if (!_.lte(on_issue.message.issue.created_at, issue.context.timestamp)) {
        onissueObj.updatedTime = `Time of Creation for /${constants.RET_ONISSUE} api should be less than current timestamp`;
      }
      dao.setValue("igmCreatedAt", on_issue.message.issue.created_at);
    } catch (error) {
      logger.error(
        `Error while checking time of creation and updation for /${constants.RET_ONISSUE} api`,
        error
      );
    }

    try {
      logger.info(`Checking organization's name for /${constants.RET_ONISSUE}`);
      let org_name =
        on_issue.message.issue.issue_actions.respondent_actions?.[0].updated_by
          .org.name;
      let org_id = org_name.split("::");
      if (!_.isEqual(on_issue.context.bpp_id, org_id?.[0])) {
        onissueObj.org_name = `Organization's Name for /${constants.RET_ONISSUE} api mismatched with bpp_id`;
      }
      if (!_.lte(on_issue.context.domain, org_id[1])) {
        onissueObj.org_domain = `Domain of organization for /${constants.RET_ONISSUE} api mismatched with domain in context`;
      }
    } catch (error) {
      logger.error(
        `Error while checking organization's name for /${constants.RET_ONISSUE} api`,
        error
      );
    }

    dao.setValue("onissueObj", onissueObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      logger.info(`!!File not found for /${constants.RET_ONISSUE} API!`);
    } else {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ONISSUE} API`,
        err
      );
    }
  }
};

module.exports = checkOnIssue;

const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const logger = require("../logger");
const igmHelper = require("./igmHelpers");
const DomainType = require("../enums");

const checkOnIssueStatUsunsolicited = (dirPath, msgIdSet) => {
  let onIssueStatusObj = {};
  try {
    let onIssueStatus = fs.readFileSync(
      dirPath + `/${DomainType.retail}_${constants.RET_ONISSUE_STATUS}(unsolicited).json`
    );
    onIssueStatus = JSON.parse(onIssueStatus);

    let issue = fs.readFileSync(dirPath + `/${DomainType.retail}_${constants.RET_ISSUE}.json`);
    issue = JSON.parse(issue);

    try {
      logger.info(`Validating Schema for ${constants.RET_ONISSUE_STATUS} API`);
      const vs = validateSchema(
        "igm",
        constants.RET_ONISSUE_STATUS,
        onIssueStatus
      );
      if (vs != "error") {
        Object.assign(onIssueStatusObj, vs);
      }
    } catch (error) {
      logger.error(
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE_STATUS}, ${error.stack}`
      );
    }

    try {
      logger.info(`Checking context for /${constants.RET_ONISSUE_STATUS} API`); //checking context
      res = checkContext(onIssueStatus.context, constants.RET_ONISSUE_STATUS);
      if (!res.valid) {
        Object.assign(onIssueStatusObj, res.ERRORS);
      }
    } catch (error) {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ONISSUE_STATUS} context, ${error.stack}`
      );
    }

    try {
      logger.info(`Phone Number Check for /${constants.RET_ONISSUE_STATUS}`);

      if (
        !_.inRange(
          onIssueStatus?.message?.issue?.issue_actions?.respondent_actions?.[0]
            ?.updated_by?.contact?.phone,
          1000000000,
          99999999999
        )
      ) {
        onIssueStatusObj.Phn = `Phone Number for /${constants.RET_ONISSUE_STATUS} api is not in the valid Range`;
      }
    } catch (error) {
      logger.error(
        `Error while checking phone number for /${constants.RET_ONISSUE_STATUS} api, ${error.stack}`
      );
    }

    try {
      logger.info(
        `Comparing transaction ID of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE_STATUS}`
      );
      if (
        !_.isEqual(
          dao.getValue("igmTxnId"),
          onIssueStatus.context.transaction_id
        )
      ) {
        onIssueStatusObj.igmTxnId = `transaction ID mismatch in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE_STATUS}`;
      }
    } catch (error) {
      logger.error(
        `Error while comparing transaction ID in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE_STATUS}, ${error.stack}`
      );
    }

    try {
      logger.info(
        `Comparing MESSAGE ID of /${constants.RET_ISSUE_STATUS} and /${constants.RET_ONISSUE_STATUS}`
      );
      if (
        !_.isEqual(
          dao.getValue("igmIssueStatMsgId"),
          onIssueStatus.context.message_id
        )
      ) {
        onIssueStatusObj.igmIssueMsgId = `Message  ID mismatch in /${constants.RET_ISSUE_STATUS} and /${constants.RET_ONISSUE_STATUS}`;
      }
    } catch (error) {
      logger.error(
        `Error while comparing Message ID in /${constants.RET_ISSUE_STATUS} and /${constants.RET_ONISSUE_STATUS}, ${error.stack}`
      );
    }

    try {
      logger.info(
        `Checking refund amount for /${constants.RET_ONISSUE_STATUS}`
      );
      if (
        onIssueStatus?.message?.issue?.resolution?.refund_amount &&
        onIssueStatus?.message?.issue.resolution.action_triggered != "REFUND"
      ) {
        onIssueStatusObj.refund_amt = `Refund Amount for /${constants.RET_ONISSUE_STATUS} should only be when action type is REFUND `;
      }
    } catch (error) {
      logger.error(
        `Error while checking refund amount for /${constants.RET_ONISSUE_STATUS} api, ${error.stack}`
      );
    }

    try {
      logger.info(
        `Comparing Domain of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE_STATUS}`
      );
      if (!_.isEqual(dao.getValue("igmDomain"), onIssueStatus.context.domain)) {
        onIssueStatusObj.igmDomain = `Domain for /${constants.RET_ISSUE} api should be equal to /${constants.RET_ONISSUE_STATUS} api`;
      }
    } catch (error) {
      logger.error(
        `Error while comparing Domain for /${constants.RET_ISSUE} and /${constants.RET_ONISSUE_STATUS} api, ${error.stack}`
      );
    }

    try {
      logger.info(`Phone Number Check for /${constants.RET_ONISSUE_STATUS}`);

      if (
        !_.inRange(
          onIssueStatus?.message?.issue?.issue_actions?.respondent_actions?.[0]
            ?.updated_by?.contact?.phone,
          1000000000,
          99999999999
        )
      ) {
        onIssueStatusObj.Phn = `Phone Number for /${constants.RET_ONISSUE_STATUS} api is not in the valid Range`;
      }
    } catch (error) {
      logger.error(
        `Error while checking phone number for /${constants.RET_ONISSUE_STATUS} api, ${error.stack}`
      );
    }

    const respondent_actions =
      onIssueStatus.message.issue.issue_actions.respondent_actions;

    igmHelper.checkOrganizationNameandDomain(
      constants.RET_ONISSUE_STATUS,
      respondent_actions,
      onIssueStatus.context.bpp_id,
      onIssueStatus.context.domain,
      onIssueStatusObj
    );

    igmHelper.compareUpdatedAtAndContextTimeStamp(
      constants.RET_ONISSUE_STATUS,
      respondent_actions,
      onIssueStatus.message.issue.updated_at,
      onIssueStatusObj
    );

    igmHelper.checkCreatedAtInAll(
      constants.RET_ONISSUE_STATUS,
      onIssueStatus.message.issue.created_at,
      onIssueStatusObj
    );

    igmHelper.checkDomainInAll(
      constants.RET_ONISSUE_STATUS,
      onIssueStatus.context.domain,
      onIssueStatusObj
    );

    dao.setValue("onIssueStatusObj", onIssueStatusObj);
    return onIssueStatusObj;
  } catch (err) {
    if (err.code === "ENOENT") {
      logger.error(
        `!!File not found for /${DomainType.retail}_${constants.RET_ONISSUE_STATUS}(unsolicited) API!`
      );
    } else {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ONISSUE_STATUS} API`,
        err
      );
    }
  }
};

module.exports = checkOnIssueStatUsunsolicited;

const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const logger = require("../logger");
const igmHelper = require("./igmHelpers");

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
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE}, ${error.stack}`
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
        `Some error occurred while checking /${constants.RET_ONISSUE} context, ${error.stack}`
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
        `Error while comparing transaction ID in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}, ${error.stack}`
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
        `Error while comparing Message ID in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}, ${error.stack}`
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
        `Error while comparing Domain for /${constants.RET_ISSUE} and /${constants.RET_ONISSUE} api, ${error.stack}`
      );
    }

    try {
      logger.info(
        `Comparing core version of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`
      );
      dao.setValue("core_version", on_issue.context.core_version);
    } catch (error) {
      logger.error(
        `Error while comparing core version for /${constants.RET_ISSUE} and /${constants.RET_ONISSUE} api, ${error.stack}`
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
        `Error while checking phone number for /${constants.RET_ONISSUE} api, ${error.stack}`
      );
    }

    // try {
    //   logger.info(
    //     `Checking time of creation and updation for /${constants.RET_ONISSUE}`
    //   );
    //   if (!_.lte(issue.context.timestamp, on_issue.message.issue.created_at)) {
    //     onissueObj.updatedTime = `Time of Creation for /${constants.RET_ONISSUE} api should be less than context timestamp`;
    //   }
    // } catch (error) {
    //   logger.error(
    //     `Error while checking time of creation and updation for /${constants.RET_ONISSUE} api, ${error.stack}`
    //   );
    // }
    dao.setValue("igmCreatedAt", on_issue.message.issue.created_at);

    const respondent_actions =
      on_issue.message.issue.issue_actions.respondent_actions;

    igmHelper.checkOrganizationNameandDomain(
      constants.RET_ONISSUE,
      respondent_actions,
      on_issue.context.bpp_id,
      on_issue.context.domain,
      onissueObj
    );

    igmHelper.compareUpdatedAtAndContextTimeStamp(
      constants.RET_ONISSUE,
      respondent_actions,
      on_issue.message.issue.updated_at,
      onissueObj
    );

    igmHelper.checkCreatedAtInAll(
      constants.RET_ONISSUE,
      on_issue.message.issue.created_at,
      onissueObj
    );
    
    igmHelper.checkDomainInAll(
      constants.RET_ONISSUE,
      on_issue.context.domain,
      onissueObj
    );

    dao.setValue("onissueObj", onissueObj);
    return onissueObj;
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

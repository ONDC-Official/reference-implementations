const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const logger = require("../logger");
const getLspIssueMessage = require("../messages_constants");


const checkLspOnIssue = (dirPath) => {
  let issueObj = {};

  const message = getLspIssueMessage(constants.RET_ISSUE);

  try {
    let issue = fs.readFileSync(
      dirPath + `/${constants.RET_ONISSUE}_to_lsp.json`
    );
    issue = JSON.parse(issue);

    try {
      logger.info(`Validating Schema for ${constants.RET_ONISSUE} API`);

      const vs = validateSchema("igm", constants.RET_ONISSUE, issue);

      if (vs != "error") {
        Object.assign(issueObj, vs);
      }
    } catch (error) {
      logger.error(
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE}_lsp, ${error.stack}`
      );
    }

    try {
      logger.info(`Checking context for ${constants.RET_ONISSUE} API`); //checking context
      res = checkContext(issue.context, constants.RET_ONISSUE);
      if (!res.valid) {
        Object.assign(issueObj, res.ERRORS);
      }
    } catch (error) {
      logger.error(
        `Some error occurred while checking /${constants.RET_ONISSUE} context, ${error.stack}`
      );
    }

    try {
      logger.info(
        `comparing transaction id with stored id in the db in /${constants.RET_ONISSUE}`
      );

      // msgIdSet.add(issue.context.message_id);
      if (!res.valid) {
        Object.assign(issueObj, res.ERRORS);
      }

      // checking transaction id
      const transaction_id = dao.getValue("igmTxnId");

      if (transaction_id === issue.context.transaction_id) {
        issueObj.transaction_id = message.transaction_id_issue_message;
      }
      const sellerBppId = dao.getValue("seller_bpp_id");

      const sellerBppuri = dao.getValue("seller_bpp_uri");

      if (sellerBppId !== issue.context.bap_id) {
        issueObj.bpp_id = message.bap_id;
      }
      if (sellerBppuri !== issue.context.bap_uri) {
        issueObj.bpp_uri = message.bap_uri;
      }
    } catch (error) {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ONISSUE} context, ${error.stack}`
      );
    }

    // try {
    //   logger.info(
    //     `checking updated_at and last respondent_action's updated_at /${constants.RET_ONISSUE}`
    //   );

    //   const respondent_action =
    //     issue.message.issue.issue_actions.respondent_actions;

    //   if (
    //     respondent_action[respondent_action.length - 1].updated_at !==
    //     issue.message.issue.updated_at
    //   ) {
    //     issueObj.updated_at = message.updatedAtInRespondentAction;
    //   }
    // } catch (error) {
    //   logger.error(
    //     `!!Some error occurred while checking /${constants.RET_ONISSUE} message, ${error.stack}`
    //   );
    // }

    try {
      logger.info(
        `checking the length of respondent action must be greater than 0 in /${constants.RET_ONISSUE}`
      );
      if (issue.message.issue.issue_actions.respondent_actions.length === 0) {
        issueObj.respondent_action = message.respondent_action_required;
      }
    } catch (error) {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ONISSUE} message, ${error.stack}`
      );
    }

    return issueObj;
  } catch (err) {
    if (err.code === "ENOENT") {
      logger.info(`!!File not found for /${constants.RET_ONISSUE}_lsp API!`);
    } else {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ONISSUE} API`,
        err
      );
    }
  }
};

module.exports = checkLspOnIssue;

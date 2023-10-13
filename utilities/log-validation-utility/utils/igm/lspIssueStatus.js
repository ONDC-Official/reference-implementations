const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const logger = require("../logger");
const getLspIssueMessage = require("../messages_constants");
const DomainType = require("../enums");

const checkLspIssueStatus = (dirPath) => {
  let issueObj = {};
  const message = getLspIssueMessage(constants.RET_ISSUE_STATUS);
  try {
    let issue = fs.readFileSync(
      dirPath + `/${DomainType.lsp}_${constants.RET_ISSUE_STATUS}.json`
    );
    issue = JSON.parse(issue);

    try {
      logger.info(`Validating Schema for ${constants.RET_ISSUE_STATUS} API`);

      const vs = validateSchema("igm", constants.RET_ISSUE_STATUS, issue);

      if (vs != "error") {
        Object.assign(issueObj, vs);
      }
    } catch (error) {
      logger.error(
        `!!Error occurred while performing schema validation for /${constants.RET_ISSUE_STATUS}_lsp, ${error.stack}`
      );
    }

    try {
      logger.info(`Checking context for ${constants.RET_ISSUE_STATUS} API`); //checking context
      res = checkContext(issue.context, constants.RET_ISSUE_STATUS);
      if (!res.valid) {
        Object.assign(issueObj, res.ERRORS);
      }
    } catch (error) {
      logger.error(
        `Some error occurred while checking /${constants.RET_ISSUE_STATUS} context, ${error.stack}`
      );
    }

    try {
      logger.info(
        `comparing transaction i with stored id in the db in /${constants.RET_ISSUE_STATUS}`
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
        `!!Some error occurred while checking /${constants.RET_ISSUE_STATUS} context, ${error.stack}`
      );
    }

    return issueObj;
  } catch (err) {
    if (err.code === "ENOENT") {
      logger.info(
        `!!File not found for /${DomainType.lsp}_${constants.RET_ISSUE_STATUS}_lsp API!`
      );
    } else {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ISSUE_STATUS} API`,
        err
      );
    }
  }
};

module.exports = checkLspIssueStatus;

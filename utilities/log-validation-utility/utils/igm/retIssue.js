const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const logger = require("../logger");
const utils = require("../utils");
const igmHelper = require("./igmHelpers");
const DomainType = require("../enums");

const checkIssue = (dirPath) => {
  let issueObj = {};

  try {
    let issue = fs.readFileSync(
      dirPath + `/${DomainType.retail}_${constants.RET_ISSUE}.json`
    );
    issue = JSON.parse(issue);
    try {
      logger.info(`Validating Schema for ${constants.RET_ISSUE} API`);
      const vs = validateSchema("igm", constants.RET_ISSUE, issue);
      if (vs != "error") {
        Object.assign(issueObj, vs);
      }
    } catch (error) {
      logger.error(
        `!!Error occurred while performing schema validation for /${constants.RET_ISSUE}, ${error.stack}`
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
        `Some error occurred while checking /${constants.RET_ISSUE} context, ${error.stack}`
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
      dao.setValue("seller_bpp_id", issue.context.bpp_id);
      dao.setValue("seller_bpp_uri", issue.context.bpp_uri);

      if (issue.message) {
        dao.setValue("igmIssueType", issue.message.issue.issue_type);
      }
      // msgIdSet.add(issue.context.message_id);
      if (!res.valid) {
        Object.assign(issueObj, res.ERRORS);
      }
    } catch (error) {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ISSUE} context, ${error.stack}`
      );
    }

    try {
      logger.info(
        `Validating category and subcategory in /${constants.RET_ISSUE}`
      );

      if (
        (issue.message.category === "ITEM" &&
          !utils.issueItmSubCategories.includes(issue.message.sub_category)) ||
        (issue.message.category === "FULFILLMENT" &&
          !utils.issueFlmSubcategories.includes(issue.message.sub_category))
      ) {
        issueObj.ctgrySubCategory = `Invalid sub_category ${issue.sub_category} for issue category "${issue.category}"`;
      }

      if (issue.message.issue.category === "ITEM") {
        if (issue.message.issue.order_details.items.length === 0) {
          issueObj.items = `Items in issue.message.issue.order_details.items should not be empty when message category is ITEM`;
        }
      }
      if (issue.message.issue.category === "FULFILLMENT") {
        if (issue.message.issue.order_details.fulfillments.length === 0) {
          issueObj.items = `Fulfillments in issue.message.issue.order_details.fulfillments should not be empty when message category is FULFILLMENT`;
        }
      }
    } catch (error) {
      logger.error(
        `!!Error while validating category and subcategory in /${constants.RET_ISSUE}, ${error.stack}`
      );
    }

    const complainant_actions =
      issue.message.issue.issue_actions.complainant_actions;

    igmHelper.checkOrganizationNameandDomain(
      constants.RET_ISSUE,
      complainant_actions,
      issue.context.bap_id,
      issue.context.domain,
      issueObj
    );

    igmHelper.compareUpdatedAtAndContextTimeStamp(
      constants.RET_ISSUE,
      complainant_actions,
      issue.message.issue.updated_at,
      issueObj
    );

    igmHelper.compareCreatedAtAndUpdationTime(
      constants.RET_ISSUE,
      issue.message.issue.created_at,
      issue.context.timestamp,
      issue.message.issue.updated_at,
      issue.message.issue.issue_actions.respondent_actions,
      issue.context.domain,
      issueObj
    );

    igmHelper.compareContextTimeStampAndUpdatedAt(
      constants.RET_ISSUE,
      issue.context.timestamp,
      issue.message.issue.updated_at,
      issueObj
    );

    try {
      logger.info(
        `Checking conditional mandatory images for certain issue sub-categories`
      );
      if (
        ["ITM02", "ITM03", "ITM04", "ITM05", "FLM04"].includes(
          issue.sub_category
        )
      ) {
        const has = Object.prototype.hasOwnProperty;
        if (
          !has.call(issue.description, "images") ||
          !issue.description.images.length
        ) {
          issueObj.mndtryImages = `issue/description/images are mandatory for issue sub_category ${issue.sub_category}`;
        }
      }
    } catch (error) {
      logger.error(
        `Error while checking conditional mandatory images for certain issue sub-categories, ${error.stack}`
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
        `Error while checking phone number for /${constants.RET_ISSUE} api, ${error.stack}`
      );
    }

    dao.setValue("igmCreatedAt", issue.message.issue.created_at);
    return issueObj;
  } catch (err) {
    if (err.code === "ENOENT") {
      logger.info(
        `!!File not found for /${DomainType.retail}_${constants.RET_ISSUE} API!`
      );
    } else {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ISSUE} API`,
        err
      );
    }
  }
};

module.exports = checkIssue;

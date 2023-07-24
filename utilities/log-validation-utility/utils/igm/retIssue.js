const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const logger = require("../logger");
const utils = require("../utils");

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
        (issue.category === "ITEM" &&
          !utils.issueItmSubCategories.includes(issue.sub_category)) ||
        (issue.category === "FULFILLMENT" &&
          !utils.issueFlmSubcategories.includes(issue.sub_category))
      ) {
        issueObj.ctgrySubCategory = `Invalid sub_category ${issue.sub_category} for issue category "${issue.category}"`;
      }
    } catch (error) {
      logger.error(
        `!!Error while validating category and subcategory in /${constants.RET_ISSUE}, ${error.stack}`
      );
    }

    try {
      logger.info(
        `checking updated_at and last complainent_action's updated_at /${constants.RET_ONISSUE}`
      );

      const complainant_actions =
        issue.message.issue.issue_actions.complainant_actions;

      console.log(
        "complainant_actions[complainant_actions.length - 1]",
        complainant_actions[complainant_actions.length - 1]
      );

      if (
        complainant_actions[complainant_actions.length - 1].updated_at ===
        issue.message.issue.updated_at
      ) {
        issueObj.updated_at = message.updatedAtInRespondentAction;
      }
    } catch (error) {
      logger.error(
        `!!Some error occurred while checking /${constants.RET_ONISSUE} message, ${error.stack}`
      );
    }

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

    try {
      logger.info(
        `Checking time of creation and updation for /${constants.RET_ISSUE}`
      );
      if (
        !_.isEqual(
          issue.message.issue.created_at,
          issue.message.issue.updated_at
        ) &&
        issue.message.issue.issue_actions.responsdent_actions.length === 0
      ) {
        if (!_.lte(issue.message.issue.created_at, issue.context.timestamp)) {
          issueObj.updatedTime = `Time of Creation for /${constants.RET_ISSUE} api should be less than context timestamp`;
        }
        issueObj.respTime = `Time of Creation and time of updation for /${constants.RET_ISSUE} api should be same`;
      }
      dao.setValue("igmCreatedAt", issue.message.issue.created_at);
    } catch (error) {
      logger.error(
        `Error while checking time of creation and updation for /${constants.RET_issue} api, ${error.stack}`
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
        `Error while checking organization's name for /${constants.RET_ISSUE} api, ${error.stack}`
      );
    }
    // dao.setValue("issueObj", issueObj);
    return issueObj;
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

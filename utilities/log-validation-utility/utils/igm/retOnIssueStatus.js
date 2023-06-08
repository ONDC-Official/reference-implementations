const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkOnIssueStatus = (dirPath, msgIdSet) => {
  let onIssueStatusObj = {};
  try {
    let onIssueStatus = fs.readFileSync(
      dirPath + `/${constants.RET_ONISSUE_STATUS}.json`
    );
    onIssueStatus = JSON.parse(onIssueStatus);
    let issue = fs.readFileSync(dirPath + `/${constants.RET_ISSUE}.json`);
    issue = JSON.parse(issue);

    try {
      console.log(`Validating Schema for ${constants.RET_ONISSUE_STATUS} API`);
      const vs = validateSchema(
        "igm",
        constants.RET_ONISSUE_STATUS,
        onIssueStatus
      );
      if (vs != "error") {
        Object.assign(onIssueStatusObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE_STATUS}`,
        error
      );
    }

    try {
      console.log(`Checking context for /${constants.RET_ONISSUE_STATUS} API`); //checking context
      res = checkContext(onIssueStatus.context, constants.RET_ONISSUE_STATUS);
      if (!res.valid) {
        Object.assign(onIssueStatusObj, res.ERRORS);
      }
    } catch (error) {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONISSUE_STATUS} context`,
        error
      );
    }

    try {
      console.log(`Phone Number Check for /${constants.RET_ONISSUE_STATUS}`);

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
      console.log(
        `Error while checking phone number for /${constants.RET_ONISSUE_STATUS} api`,
        error
      );
    }

    try {
      console.log(
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
      console.log(
        `Error while comparing transaction ID in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE_STATUS}`,
        error
      );
    }

            try {
              console.log(
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
              console.log(
                `Error while comparing Message ID in /${constants.RET_ISSUE_STATUS} and /${constants.RET_ONISSUE_STATUS}`,
                error
              );
            }


    try {
      console.log(
        `Checking refund amount for /${constants.RET_ONISSUE_STATUS}`
      );
      if (
        onIssueStatus?.message?.issue?.resolution?.refund_amount &&
        onIssueStatus?.message?.issue.resolution.action_triggered != "REFUND"
      ) {
        onIssueStatusObj.refund_amt = `Refund Amount for /${constants.RET_ONISSUE_STATUS} should only be when action type is REFUND `;
      }
    } catch (error) {
      console.log(
        `Error while checking refund amount for /${constants.RET_ONISSUE_STATUS} api`,
        error
      );
    }

    try {
      console.log(
        `Comparing Domain of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE_STATUS}`
      );
      if (!_.isEqual(dao.getValue("igmDomain"), onIssueStatus.context.domain)) {
        onIssueStatusObj.igmDomain = `Domain for /${constants.RET_ISSUE} api should be equal to /${constants.RET_ONISSUE_STATUS} api`;
      }
    } catch (error) {
      console.log(
        `Error while comparing Domain for /${constants.RET_ISSUE} and /${constants.RET_ONISSUE_STATUS} api`,
        error
      );
    }

    try {
      console.log(`Phone Number Check for /${constants.RET_ONISSUE_STATUS}`);

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
      console.log(
        `Error while checking phone number for /${constants.RET_ONISSUE_STATUS} api`,
        error
      );
    }

    try {
      console.log(
        `Checking organization's name for /${constants.RET_ONISSUE_STATUS}`
      );
      let org_name =
        onIssueStatus.message.issue.issue_actions.respondent_actions?.[0]
          .updated_by.org.name;
      let org_id = org_name.split("::");
      if (!_.isEqual(onIssueStatus.context.bpp_id, org_id?.[0])) {
        onIssueStatusObj.org_name = `Organization's Name for /${constants.RET_ONISSUE_STATUS} api mismatched with bpp_id`;
      }
      if (!_.lte(onIssueStatus.context.domain, org_id[1])) {
        onIssueStatusObj.org_domain = `Domain of organization for /${constants.RET_ONISSUE_STATUS} api mismatched with domain in context`;
      }
    } catch (error) {
      console.log(
        `Error while checking organization's name for /${constants.RET_ONISSUE_STATUS} api`,
        error
      );
    }

    try {
      console.log(
        `Checking time of creation and updation for /${constants.RET_ONISSUE_STATUS}`
      );
      if (
        !_.lte(onIssueStatus.message.issue.created_at, issue.context.timestamp)
      ) {
        onIssueStatusObj.updatedTime = `Time of Creation for /${constants.RET_ONISSUE_STATUS} api should be less than current timestamp`;
      }
      dao.setValue("igmCreatedAt", onIssueStatus.message.issue.created_at);
    } catch (error) {
      console.log(
        `Error while checking time of creation and updation for /${constants.RET_ONISSUE_STATUS} api`,
        error
      );
    }

    dao.setValue("onIssueStatusObj", onIssueStatusObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONISSUE_STATUS} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONISSUE_STATUS} API`,
        err
      );
    }
  }
};

module.exports = checkOnIssueStatus;

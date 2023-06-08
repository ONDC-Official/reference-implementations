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

      console.log(
        "on_issue?.message?.issue?.issue_actions?.respondent_actions?.[0]",
        onIssueStatus?.message?.issue?.issue_actions?.respondent_actions?.[0]
          ?.updated_by?.contact?.phone?.phone
      );
      if (
        !_.inRange(
          onIssueStatus?.message?.issue?.issue_actions?.respondent_actions?.[0]
            ?.updated_by?.contact?.phone,
          1000000000,
          99999999999
        )
      ) {
        onissueObj.Phn = `Phone Number for /${constants.RET_ONISSUE_STATUS} api is not in the valid Range`;
      }
    } catch (error) {
      console.log(
        `Error while checking phone number for /${constants.RET_ONISSUE_STATUS} api`,
        error
      );
    }



    try {
      console.log(`Checking refund amount for /${constants.RET_ONISSUE_STATUS}`);
      if (onIssueStatus.message.issue.resolution.refund_amount && onIssueStatus.message.issue.resolution.action_triggered != 'REFUND' ) {
        onIssueStatusObj.refund_amt = `Refund Amount for /${constants.RET_ONISSUE_STATUS} should only be when action type is REFUND `;
      }
    } catch (error) {
      console.log(
        `Error while checking refund amount for /${constants.RET_ONISSUE_STATUS} api`,
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

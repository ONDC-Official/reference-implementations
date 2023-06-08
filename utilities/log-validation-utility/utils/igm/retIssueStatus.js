const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkIssueStatus = (dirPath, msgIdSet) => {
  let issueStatusObj = {};
  try {
    let issueStatus = fs.readFileSync(
      dirPath + `/${constants.RET_ISSUE_STATUS}.json`
    );
    issueStatus = JSON.parse(issueStatus);
    try {
      console.log(`Validating Schema for ${constants.RET_ISSUE_STATUS} API`);
      const vs = validateSchema("igm", constants.RET_ISSUE_STATUS, issueStatus);

      if (vs != "error") {
        Object.assign(issueStatusObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ISSUE_STATUS}`,
        error
      );
    }

        try {
          console.log(
            `Storing igmIssueStatMesgId in /${constants.RET_ONISSUE_STATUS}`
          ); 
          dao.setValue("igmIssueStatMsgId", issueStatus.context.message_id);
          if (!res.valid) {
            Object.assign(issueStatusObj, res.ERRORS);
          }
        } catch (error) {
          console.log(
            `!!Some error occurred while checking /${constants.RET_ISSUE_STATUS} context`,
            error
          );
        }


    try {
      console.log(
        `Checking context for /${constants.RET_ISSUE_STATUS}rack API`
      ); //checking context
      res = checkContext(issueStatus.context, constants.RET_ISSUE_STATUS);
      if (!res.valid) {
        Object.assign(issueStatusObj, res.ERRORS);
      }
    } catch (error) {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ISSUE_STATUS} context`
      );
    }


        try {
          console.log(
            `Comparing transaction ID of /${constants.RET_ISSUE} and /${constants.RET_ISSUE_STATUS}`
          );
          if (
            !_.isEqual(
              dao.getValue("igmTxnId"),
              issueStatus.context.transaction_id
            )
          ) {
            issueStatusObj.igmTxnId = `transaction ID mismatch in /${constants.RET_ISSUE} and /${constants.RET_ISSUE_STATUS}`;
          }
        } catch (error) {
          console.log(
            `Error while comparing transaction ID in /${constants.RET_ISSUE} and /${constants.RET_ISSUE_STATUS}`,
            error
          );
        }


    dao.setValue("issueStatusObj", issueStatusObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ISSUE_STATUS} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ISSUE_STATUS} API`,
        err
      );
    }
  }
};

module.exports = checkIssueStatus;

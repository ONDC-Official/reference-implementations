const fs = require("fs");
const _ = require("lodash");
const dao = require("../dao/dao");
const checkIssue = require("./igm/retIssue");
const checkOnIssue = require("./igm/retOnIssue");
const checkIssueStatus = require("./igm/retIssueStatus");
const checkOnIssueStatus = require("./igm/retOnIssueStatus");
const checkIssueClose = require("./igm/retIssueClose");
const logger = require("../utils/logger");
const { getObjValues } = require("./utils");

const validateIgmLogs = (dirPath) => {
  let msgIdSet = new Set();

  //ISSUE API
  let issueResp = checkIssue(dirPath, msgIdSet);

  //ON_ISSUE API
  let onIssueResp = checkOnIssue(dirPath, msgIdSet);

  //ISSUE_STATUS API
  let issueStatusResp = checkIssueStatus(dirPath, msgIdSet);

  //ON_ISSUE_STATUS API
  let onissueStatusResp = checkOnIssueStatus(dirPath, msgIdSet);

  //ISSUE_CLOSE API
  let issueCloseResp = checkIssueClose(dirPath, msgIdSet);

  let logReport = "";

  // let issueObj = dao.getValue("issueObj");
  // let onissueObj = dao.getValue("onissueObj");
  // let issueStatusObj = dao.getValue("issueStatusObj");
  // let onIssueStatusObj = dao.getValue("onIssueStatusObj");
  try {
    logger.info("Flushing DB Data");
    dao.dropDB();
  } catch (error) {
    logger.error(`Error while removing LMDB, ${error.stack}`);
  }

  if (!_.isEmpty(issueResp)) {
    logReport += `**/issue** \n${getObjValues(issueResp)}\n`;
  }

  if (!_.isEmpty(onIssueResp)) {
    logReport += `**/on_issue** \n${getObjValues(onIssueResp)}\n`;
  }

  if (!_.isEmpty(issueStatusResp)) {
    logReport += `**/issue_status** \n${getObjValues(issueStatusResp)}\n`;
  }

  if (!_.isEmpty(onissueStatusResp)) {
    logReport += `**/on_issue_status** \n${getObjValues(onissueStatusResp)}\n`;
  }

  if (!_.isEmpty(issueCloseResp)) {
    logReport += `**/issue_close** \n${getObjValues(issueCloseResp)}\n`;
  }

  fs.writeFileSync("log_report.md", logReport);

  logger.info("Report Generated Successfully!!");
};
module.exports = { validateIgmLogs };

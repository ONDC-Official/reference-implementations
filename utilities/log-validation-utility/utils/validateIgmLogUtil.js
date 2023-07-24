const fs = require("fs");
const _ = require("lodash");
const dao = require("../dao/dao");
const checkIssue = require("./igm/retIssue");
const checkOnIssue = require("./igm/retOnIssue");
const checkIssueStatus = require("./igm/retIssueStatus");
const checkOnIssueStatus = require("./igm/retOnIssueStatus");
const checkIssueClose = require("./igm/retIssueClose");
const checkLspIssue = require("./igm/lspIssue");
const checkLspOnIssue = require("./igm/lspOnIssue");
const checkLspIssueStatus = require("./igm/lspIssueStatus");
const checkLspOnIssueStatus = require("./igm/lspOnIssueStatus");
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

  let issueLspResp = checkLspIssue(dirPath, msgIdSet);

  let onIssueLspResp = checkLspOnIssue(dirPath, msgIdSet);

  let issueStatusRespLsp = checkLspIssueStatus(dirPath, msgIdSet);

  let onIssueStatusLsp = checkLspOnIssueStatus(dirPath, msgIdSet);

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
  if (!_.isEmpty(issueLspResp)) {
    logReport += `**/lsp_issue** \n${getObjValues(issueLspResp)}\n`;
  }
  if (!_.isEmpty(onIssueLspResp)) {
    logReport += `**/lsp_on_issue** \n${getObjValues(onIssueLspResp)}\n`;
  }
  if (!_.isEmpty(issueStatusRespLsp)) {
    logReport += `**/lsp_issue_status** \n${getObjValues(
      issueStatusRespLsp
    )}\n`;
  }

  if (!_.isEmpty(onIssueStatusLsp)) {
    logReport += `**/lsp_on_issue_status** \n${getObjValues(onIssueStatusLsp)}\n`;
  }

  fs.writeFileSync("log_report.md", logReport);

  logger.info("Report Generated Successfully!!");
};
module.exports = { validateIgmLogs };

const checkConfirm = require("./b2cExpConfirm");
const checkInit = require("./b2cExpInit");
const checkSelect = require("./b2cExpSelect");
const checkOnInit = require("./b2cExpOnInit");
const checkOnConfirm = require("./b2cExpOnConfirm");
const checkCancel = require("./b2cExpCancel");
const checkOnCancel = require("./b2cExpOnCancel");
const checkOnSelect = require("./b2cExpOnSelect");
// const checkOnUpdate = require("./b2cExpOnUpdate");
// const checkUpdate = require("./b2cExpUpdate");
const checkOnStatus = require("./b2cExpOnStatus");
const checkSearch = require("./b2cExpSearch");
const checkOnSearch = require("./b2cExpOnSearch");
const checkStatus = require("./b2cExpStatus");
const _ = require("lodash");

const b2cExpVal = (element, action, msgIdSet) => {
  const busnsErr = {};
  switch (action) {
    case "search":
      return checkSearch(element, msgIdSet);

    case "on_search":
      return checkOnSearch(element, msgIdSet);

    case "select":
      return checkSelect(element, msgIdSet);

    case "on_select":
      return checkOnSelect(element, msgIdSet);

    case "init":
      return checkInit(element, msgIdSet);

    case "on_init":
      return checkOnInit(element, msgIdSet);

    case "confirm":
      return checkConfirm(element, msgIdSet);

    case "on_confirm":
      return checkOnConfirm(element, msgIdSet);

    case "on_cancel":
      return checkOnCancel(element, msgIdSet);

    case "cancel":
      return checkCancel(element, msgIdSet);

    // case "update":
    //   return checkUpdate(element,msgIdSet);

    // case "on_update":
    //   return checkOnUpdate(element,msgIdSet)

    case "status":
      return checkStatus(element, msgIdSet);

    case "on_status":
      return checkOnStatus(element, msgIdSet);
  }
  return busnsErr;
};

module.exports = { b2cExpVal };

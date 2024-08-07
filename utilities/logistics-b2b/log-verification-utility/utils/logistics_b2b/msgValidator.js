const checkSearch = require("./logSearch");
const checkOnSearch = require("./logOnSearch");
const checkInit = require("./logInit");
const _ = require("lodash");
const checkOnInit = require("./logOnInit");
const checkConfirm = require("./logConfirm");

const logisticsB2BVal = async (element, action, msgIdSet) => {
  const busnsErr = {};
  switch (action) {
    case "search":
      return checkSearch(element, msgIdSet);
    case "on_search":
      return checkOnSearch(element, msgIdSet);
    case "init":
      return checkInit(element, msgIdSet);
    case "on_init":
      return checkOnInit(element, msgIdSet);
    case "confirm":
      return checkConfirm(element, msgIdSet);
  }
  return busnsErr;
};
module.exports = { logisticsB2BVal };

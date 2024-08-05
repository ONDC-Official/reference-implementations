const checkSearch = require("./logSearch");
const _ = require("lodash");

const logisticsB2BVal = async (element, action, msgIdSet) => {
  const busnsErr = {};
  switch (action) {
    case "search":
      return checkSearch(element, msgIdSet);
  }
  return busnsErr;
};
module.exports = { logisticsB2BVal };
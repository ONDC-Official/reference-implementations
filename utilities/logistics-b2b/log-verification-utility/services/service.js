const { logisticsVal } = require("../utils/logistics/msgValidator");
const {logisticsVal_1_2_5} = require("../utils/logistics/v1.2.5/msgValidator");
const { b2bVal } = require("../utils/b2b/msgValidator");
const _ = require("lodash");
const { srvVal } = require("../utils/services/msgValidator");
const { logisticsB2BVal } = require("../utils/logistics_b2b/msgValidator");
const { b2cExpVal } = require("../utils/b2c-exports/msgValidator");

const checkMessage = async (domain, element, action, msgIdSet) => {
  const busnsErr = {};
  switch (domain) {
    case "logistics":
      if (element?.context?.version === "2.0.0")
        return logisticsB2BVal(element, action, msgIdSet);
      if(element?.context?.version === "1.2.5")
        return logisticsVal_1_2_5(element, action, msgIdSet);
      else return logisticsVal(element, action, msgIdSet);
    case "b2b":
      return b2bVal(element, action, msgIdSet);
    case "services":
      return srvVal(element, action, msgIdSet);
    case "b2c-exports":
      return b2cExpVal(element, action, msgIdSet);
  }
  return busnsErr;
};
module.exports = { checkMessage };

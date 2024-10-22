const utility = require('./utility');
const repo = require('./repo');
const dao = require('../../dao/dao');

const checkSearch = (data, msgId) => {
    let srchObj = {};
    try {
        // srchObj = utility.isCityCodeValidForExport(data, srchObj);
        // srchObj = utility.doesNotHaveBuyerIdInTags(data, srchObj);
        repo.setBuyerAppFinderFeeValue(data);     
        srchObj = utility.checkValidDestination(data, srchObj);
        dao.setValue("searchObj", srchObj);
    } catch (error) {
        console.log("Exception occured while processing search ", error);
    }
   
    return srchObj;
};

module.exports = checkSearch;


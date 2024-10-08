const utility = require('./utility');
const repo = require('./repo');
const dao = require("../../dao/dao");

function checkOnSearch (data, msgId) {
    let onSrchObj = {};
    try {
        onSrchObj = utility.isCityCodeValidForExport(data, onSrchObj);
        let onSearch = data.message.catalog;
        const fulfillments = onSearch?.fulfillments;
        dao.setValue("fulfillmentsArr", fulfillments);
        onSrchObj = repo.setProviderValue(data, onSrchObj);
        onSrchObj = utility.checkParameters(data, onSrchObj);
        onSrchObj = utility.mandatoryAttributes(data, onSrchObj);
    } catch (error) {
        console.log("Exception occured while processing on_search ", error);
    }
    
    return onSrchObj;
};

module.exports = checkOnSearch;
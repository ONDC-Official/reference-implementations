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
        const provider = data?.message?.catalog?.providers;
        domain = data?.context?.domain.split(":")[1];

        console.log("provider -- " , provider)

        provider.forEach((element, i) => {
            console.log("element -- " , element.items)
            onSrchObj = utility.mandatoryAttributes(i, domain, element.items, onSrchObj);
        });
    } catch (error) {
        console.log("Exception occured while processing on_search ", error);
    }
    
    return onSrchObj;
};

module.exports = checkOnSearch;
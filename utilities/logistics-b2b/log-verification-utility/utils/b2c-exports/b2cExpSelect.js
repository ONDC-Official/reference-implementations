const utility = require('./utility');
const dao = require("../../dao/dao");

function checkSelect(data, msgId) {
    let selectObj = {};
    try {
        selectObj = utility.isCityCodeValidForExport(data, selectObj);

        let select = data;
        let rfq = false;
        if (select?.context?.ttl!=='PT30S') rfq = true;
        select = select.message.order;
    
        dao.getValue("providersArr");
        dao.getValue("fulfillmentsArr");
        dao.setValue("slctdItemsArray", select.items);
        dao.setValue("rfq", rfq);

        selectObj = utility.checkProviderForSelect(select, selectObj);
        selectObj = utility.checkItemsAndFulfillmentsForSelect(data, selectObj);
        selectObj = utility.doesNotHaveBuyerIdInTags(data, selectObj);
        selectObj = utility.hasNoBuyerTerms(data, selectObj);
            
    } catch (error) {
        console.log("Exception occured while processing select ", error);
    }
    
    return selectObj;
};

module.exports = checkSelect;
const utility = require('./utility');
const dao = require("../../dao/dao");


const checkOnSelect = (data, msgId) => {
        
    let onSelectObj = {};
    try {
        let error = data.error
        let outOfStock = false;
        onSelectObj = utility.isCityCodeValidForExport(data, onSelectObj);
        
        // data = data.message.order;
        dao.setValue("onSlctdItemsArray", data.items);
        
        if(error && error.code ==='40002') outOfStock= true;
        
        onSelectObj = utility.checkFulfillmentForOnSelect(data, onSelectObj);
        data = data.message.order;
        onSelectObj = utility.checkItemFromSelect(data, onSelectObj);
        onSelectObj = utility.checkQuotationBreakup(data, onSelectObj);
    } catch (error) {
        console.log("Exception occured while processing on_select ", error);
    }
    
    return onSelectObj;
};

module.exports = checkOnSelect;
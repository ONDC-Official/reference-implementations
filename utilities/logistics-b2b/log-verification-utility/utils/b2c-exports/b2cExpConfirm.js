const utility = require('./utility');

function checkConfirm(data, msgId) {
    let cnfrmObj = {};

    try {  
        // cnfrmObj = utility.isCityCodeValidForExport(data, cnfrmObj);
        data = data.message.order;
        cnfrmObj = utility.comparingItemsData(data, cnfrmObj);
        cnfrmObj = utility.checkPaymentForConfirm(data, cnfrmObj);
        cnfrmObj = utility.checkOrderTags(data, cnfrmObj);
    } catch (error) {
        console.log("Exception occured while processing confirm ", error);
    }

    return cnfrmObj;
}

module.exports = checkConfirm;
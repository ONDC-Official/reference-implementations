const utility = require('./utility');

function checkOnConfirm(data, msgId) {
    let onCnfmObj = {};

    try {

        if(data.message.order.state==='Cancelled' && !errorObj){
            onCnfmObj.errObj=`Error object is missing in case of PO rejection`
        }
    
        // onCnfmObj = utility.isCityCodeValidForExport(data, onCnfmObj);
        data = data.message.order;
        onCnfmObj = utility.checkFulfillmentForOnConfirm(data, onCnfmObj);
        onCnfmObj = utility.checkPaymentForOnConfirm(data, onCnfmObj);    

    } catch (error) {
        console.log("Exception occured while processing on_confirm ", error);
    }

    return onCnfmObj;
}

module.exports = checkOnConfirm;
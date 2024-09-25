const utility = require('./utility');

function checkOnInit(data, msgId) {
    let onInitObj = {};
    
    try {
        onInitObj = utility.isCityCodeValidForExport(data, onInitObj);
        let onInit = data;
        let citycode = onInit?.context?.location?.city?.code;
        onInit = onInit.message.order;

        // let fulfillments = onInit.fulfillments
        // fulfillments.forEach((fulfillment, i) => {
        //     let fulfillmentTags = fulfillment?.tags;
        //     if (citycode === "std:999" && !fulfillmentTags) {
        //         onInitObj.fullfntTagErr = `Delivery terms (INCOTERMS) are required for exports in /fulfillments/tags`;
        //     }
        // });
    
        onInitObj = utility.checkPaymentForOnInit(onInit, onInitObj);
        
    } catch (error) {
        console.log("Exception occured while processing on_init ", error);
    }
    
    return onInitObj;
}

module.exports = checkOnInit;
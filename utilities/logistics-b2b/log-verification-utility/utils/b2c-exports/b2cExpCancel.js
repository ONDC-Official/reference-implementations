const dao = require("../../dao/dao");

function checkCancel(data, msgId) {
    let cancelObj = {};
    let cancel = data;
    cancel = cancel.message;
    let bap_cancel=false

    try {  
        if(cancel.order_id && cancel.cancellation_reason_id) bap_cancel=true
            dao.setValue("bap_cancel",bap_cancel)
        console.log("Inside Cancel", cancelObj);

    } catch (error) {
        console.log("Exception occured while processing confirm ", error);
    }

    return cancelObj;
}

module.exports = checkCancel;
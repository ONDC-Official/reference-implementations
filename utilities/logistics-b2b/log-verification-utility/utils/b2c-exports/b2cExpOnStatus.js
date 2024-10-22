const utility = require('./utility');

function checkOnStatus(data, msgId) {
    let onStatusObj = {};

    try {
        // onStatusObj = utility.isCityCodeValidForExport(data, onStatusObj);
        data = data.message.order;
        onStatusObj = utility.checkPaymentOfOnStatus(data, onStatusObj);
        onStatusObj = utility.checkTimestampForOnStatus(data, onStatusObj);
    } catch (error) {
        console.log("Exception occured while processing on_status ", error);
    }

    return onStatusObj;
}

module.exports = checkOnStatus;
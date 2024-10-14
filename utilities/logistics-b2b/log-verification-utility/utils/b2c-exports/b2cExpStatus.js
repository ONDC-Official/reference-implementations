const utility = require('./utility');


function checkStatus(data, msgId) {
    console.log("Inside Status");
    try {

    } catch (error) {
        console.log("Exception occured while processing confirm ", error);
    }
    let statusObj = {};
    statusObj = utility.isCityCodeValidForExport(data, statusObj);
    return statusObj;

}

module.exports = checkStatus;
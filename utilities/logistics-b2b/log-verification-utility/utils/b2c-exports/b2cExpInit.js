const utility = require('./utility');

function checkInit(data, msgId) {
    let initObj = {};
    try {
        initObj = utility.isCityCodeValidForExport(data, initObj);
        initObj = utility.checkFulfillmentForInit(data, initObj);
    }  catch (error) {
        console.log("Exception occured while processing init ", error);
    }
    return initObj;
}

module.exports = checkInit;
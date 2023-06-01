const checkOnStatus = require("./retOnStatus");
const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");

const checkOnStatusPending=(dirPath, msgIdSet,state)=>{

    try {
        
        let on_status = fs.readFileSync(
          dirPath + `/${constants.RET_ONSTATUS}_${state}.json`
        );
        on_status = JSON.parse(on_status);
        dao.setValue("pendingOnStatus",true)
        let pendingObj={};
        pendingObj = checkOnStatus(dirPath, msgIdSet, on_status);
        //timestamp validation
        
        
      } catch (error) {
        if (err.code === "ENOENT") {
            console.log(`!!File not found for /${constants.RET_ONSTATUS}_${state} API!`);
            dao.setValue("pendingOnStatus",false)
          } else {
            console.log(
              `!!Some error occurred while checking /${constants.RET_ONSTATUS}_${state} API`,
              err
            );
          }
      }

}

module.exports = checkOnStatusPending
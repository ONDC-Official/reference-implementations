const  checkOnStatusDelivered  = require("./retOnStatusDelivered");
const  checkOnStatusPending  = require("./retOnStatusPending");
const  checkOnStatusPickedUp  = require("./retOnStatusPicked");

const checkUnsolicitedStatus=(dirPath, msgIdSet)=>{
  let onStatObj={};

  onStatObj.pending=  checkOnStatusPending(dirPath, msgIdSet,"pending")

  onStatObj.pickedup=  checkOnStatusPickedUp(dirPath, msgIdSet,"pickedup")

   onStatObj.delivered= checkOnStatusDelivered(dirPath, msgIdSet,"delivered")

   dao.setValue("onStatObj", onStatObj);

}

module.exports= checkUnsolicitedStatus
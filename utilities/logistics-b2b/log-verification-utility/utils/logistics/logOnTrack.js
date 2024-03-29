const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils.js");

const checkOnTrack = (data, msgIdSet) => {
  let onTrackObj = {};
  let on_track = data;
  let contextTimestamp = on_track?.context?.timestamp;

  on_track = on_track?.message?.tracking;


  if (on_track?.location?.updated_at > contextTimestamp) {
    onTrackObj.updatedAtErr = `tracking/location/updated_at cannot be future dated w.r.t context/timestamp`;
  }

  
  if (on_track?.location?.time?.timestamp > contextTimestamp) {
    onTrackObj.lctnTimeAtErr = `tracking/location/time/timestamp cannot be future dated w.r.t context/timestamp`;
  }

  console.log(on_track?.location?.updated_at, on_track?.location?.time?.timestamp);
  if(on_track?.location?.updated_at < on_track?.location?.time?.timestamp){
    onTrackObj.updatedAtLctnErr = `tracking/location/time/timestamp cannot be future dated w.r.t tracking/location/updated_at`;
  }

  return onTrackObj;
};

module.exports = checkOnTrack;

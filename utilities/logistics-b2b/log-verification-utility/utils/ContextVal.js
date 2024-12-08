const _ = require("lodash");
const dao = require("../dao/dao");
const utils = require("./utils");

const checkContextVal = (payload, msgIdSet) => {
  let Obj = {};
  const { context } = payload;
  const { action, domain, timestamp, message_id ,version, ttl} = context;

  try {
    console.log(`Checking context validations for ${action}`);

    // Determine max time difference based on the domain
    let maxTimeDiff = domain === "nic2004:60232" ? 3000 : 5000; // 3 seconds or 5 seconds in milliseconds

    if (timestamp) {
      let date = timestamp;
      result = utils.timestampCheck(date);
      if (result && result.err === "FORMAT_ERR") {
        Obj.tmstmpFrmt_err =
          "Timestamp not in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format";
      } else if (result && result.err === "INVLD_DT") {
        Obj.tmstmpFrmt_err = "Timestamp should be in date-time format";
      }
    }

       // If version is 2.0.2, handle select and on_select differently
       if (version === "2.0.2") {
        if (action === "select" && ttl!='PT30S') {
          maxTimeDiff = utils.iso8601DurationToSeconds(ttl);
          dao.setValue("maxTimeDiff", maxTimeDiff);
        } else if (action === "on_select") {
          maxTimeDiff = dao.getValue("maxTimeDiff") || maxTimeDiff; // Use stored maxTimeDiff or fallback to default
        }
      }
    try {
      console.log(`Comparing Message Id of /${action}`);
      if (action.includes("on_")) {
        if (msgIdSet.has(payload.context.message_id)) {
          Obj.msgIdErr = "Message Id cannot be same for different sets of APIs";
        } else {
          msgIdSet.add(payload.context.message_id);
        }
      }
    } catch (error) {
      console.log(error);
    }

    if (
      [
        "select",
        "on_select",
        "init",
        "on_init",
        "confirm",
        "on_confirm",
        "update",
        "on_update",
        "track",
        "on_track"
      ].includes(action)
    ) {
      if (action === "select") {
        dao.setValue(`select_${message_id}_timestamp`, timestamp);
      } else if (action === "on_select") {
        if (!message_id || !dao.getValue(`select_${message_id}_timestamp`)) {
          Obj.msgIdErr = `No matching select call found for on_select with message_id ${message_id}`;
        } else {
          const selectTimestamp = dao.getValue(
            `select_${message_id}_timestamp`
          );

          // Compare timestamps: select should be less than on_select
          if (selectTimestamp && _.gte(selectTimestamp, timestamp)) {
            Obj.tmpstmpErr = `Timestamp for /select API must be less than the /on_select API for message_id ${message_id}`;
          } else {
            const timeDiff = utils.timeDiff(timestamp, selectTimestamp);
            if (timeDiff > maxTimeDiff) {
              Obj.tmpstmpErr = `Timestamp difference between /select and /on_select should be within ${
                maxTimeDiff / 1000
              } seconds for message_id ${message_id}`;
            }
          }
        }
      }
      // Handle timestamp checks for action/on_action APIs
      else if (action.startsWith("on_")) {
        const baseAction = action.replace("on_", "");
        console.log(baseAction);

        const correspondingTimestamp = dao.getValue(`${baseAction}_timestamp`);
        console.log(correspondingTimestamp);

        if (!correspondingTimestamp) {
          Obj.tmpstmpErr = `No corresponding action found for ${action}`;
        } else {
          const timeDiff = utils.timeDiff(timestamp, correspondingTimestamp);
          if (timeDiff > maxTimeDiff) {
            Obj.tmpstmpErr = `Timestamp difference for ${action} exceeds ${
              maxTimeDiff / 1000
            } seconds`;
          }
        }
      } else {
        // Store the timestamp for action APIs
        console.log(`${action}_timestamp`);

        dao.setValue(`${action}_timestamp`, timestamp);
      }
    }

    return Obj;
  } catch (err) {
    console.error(`Error occurred while checking ${action} API`, err);
    return Obj;
  }
};

module.exports = checkContextVal;

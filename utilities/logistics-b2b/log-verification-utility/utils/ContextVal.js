// const fs = require("fs");
// const _ = require("lodash");
// const dao = require("../dao/dao");
// const utils = require("./utils");
// const { error } = require("console");

// const checkContextVal = (payload, msgIdSet, i) => {
//   try {
//     action = payload.context.action;
//     console.log(`Checking context validations for ${action}`);
//     // if (!Obj.hasOwnProperty(action)) {
//     //   Obj = {};
//     // }
//     let Obj = {};
//     let data = payload.context;
//     let domain = payload.context.domain;
//     let maxTimeDiff = 5000;
//     if (payload?.context?.version === "2.0.1") {
//       if (action === "init") {
//         maxTimeDiff = utils.iso8601DurationToSeconds(payload.context.ttl);
//         dao.setValue("maxTimeDiff", maxTimeDiff);
//       } else if (action === "on_init") {
//         maxTimeDiff = dao.getValue("maxTimeDiff");
//       }
//     } else if (domain === "nic2004:60232") {
//       maxTimeDiff = 1000;
//     } else if (
//       payload?.context?.version === "2.0.2"
//     ) {
//       if (action === "select") {
//         maxTimeDiff = utils.iso8601DurationToSeconds(payload.context.ttl);
//         dao.setValue("maxTimeDiff", maxTimeDiff);
//       } else if (action === "on_select") {
//         maxTimeDiff = dao.getValue("maxTimeDiff");
//       }
//     }

//     console.log("time difference", maxTimeDiff);
//     if (data.timestamp) {
//       let date = data.timestamp;
//       result = utils.timestampCheck(date);
//       if (result && result.err === "FORMAT_ERR") {
//         Obj.tmstmpFrmt_err =
//           "Timestamp not in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format";
//       } else if (result && result.err === "INVLD_DT") {
//         Obj.tmstmpFrmt_err = "Timestamp should be in date-time format";
//       }
//     }
//     try {
//       console.log(`Comparing Message Id of /${action}`);
//       if (action.includes("on_")) {
//         if (msgIdSet.has(payload.context.message_id)) {
//           Obj.msgIdErr = "Message Id cannot be same for different sets of APIs";
//         } else {
//           msgIdSet.add(payload.context.message_id);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     try {
//       if (action !== "on_status") {
//         console.log(`Comparing timestamp of /${action}`);
//         if (_.gte(dao.getValue("tmpstmp"), payload.context.timestamp)) {
//           if (
//             action === "support" ||
//             action === "track" ||
//             action === "update" ||
//             action === "cancel"
//           ) {
//             dao.setValue(`${action}Tmpstmp`, payload.context.timestamp);
//           } else if (
//             action === "on_support" ||
//             action === "on_track" ||
//             action === "on_update" ||
//             action === "on_cancel"
//           ) {
//             console.log(
//               dao.getValue(`${action.replace("on_", "")}Tmpstmp`),
//               payload.context.timestamp
//             );
//             if (
//               _.gte(
//                 dao.getValue(`${action.replace("on_", "")}Tmpstmp`),
//                 payload.context.timestamp
//               )
//             ) {
//               Obj.tmpstmpErr = `Timestamp for /${action.replace(
//                 "on_",
//                 ""
//               )} api cannot be greater than or equal to /${action} api`;
//             }
//           }
//           Obj.tmpstmpErr = `Timestamp mismatch for /${action} `;
//         } else {
//           if (
//             action === "on_select" ||
//             action === "on_init" ||
//             action === "on_confirm" ||
//             action === "on_update"
//           ) {
//             const timeDiff = utils.timeDiff(
//               payload.context.timestamp,
//               dao.getValue("tmpstmp")
//             );
//             //console.log(timeDiff);
//             if (timeDiff > maxTimeDiff) {
//               Obj.tmpstmpErr = `context/timestamp difference between ${action} and ${action.replace(
//                 "on_",
//                 ""
//               )} should be within ${maxTimeDiff / 1000} seconds`;
//             }
//           }
//         }
//         dao.setValue("tmpstmp", payload.context.timestamp);
//       }
//     } catch (error) {
//       console.log(`Error while comparing timestamp for /${action} api`);
//       console.trace(error);
//     }
//     return Obj;
//   } catch (err) {
//     if (err.code === "ENOENT") {
//       console.log(`!!File not found for /${action} API!`);
//     } else {
//       console.log(`!!Some error occurred while checking /${action} API`, err);
//     }
//   }
// };
// module.exports = checkContextVal;
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

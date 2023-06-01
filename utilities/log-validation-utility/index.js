const { validateLog } = require("./services/cbCheck.service");
const fs = require("fs");
require("dotenv").config();
const rG = require("./utils/reverseGeocodeUtil");

try {
  if (process.argv.length < 3) {
    console.log(
      "Need arguments in the format: node index.js 'domain' '/path/to/logs/folder/'"
    );
    return;
  }

  const domain = process.argv[2] || "retail";
  const path = process.argv[3] || "./public/logs/";

  fs.readdir(path, function (err, files) {
    try {
      if (err) {
        console.log(`Some error occurred while reading files from ${path}`);
      } else if (!files.length) {
        console.log(`${path} folder is empty!!`);
      } else {
        validateLog(domain, path);
      }
    } catch (error) {
      console.log(`Error while reading logs folder`, error);
    }
  });

  // rG.getReverseGeocode("28.457523", "77.026344");
} catch (error) {
  console.log("!!Some Unexpected Error Occurred", error);
}

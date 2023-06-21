const schemaValidator = require("../schema/main");
const { validate_schema_for_igm_json } = require("../schema/main");
const path = require("path");
const fs = require("fs");
const logger = require("./logger");

const validateSchema = (domain, api, data) => {
  logger.info(`Inside Schema Validation for domain: ${domain}, api: ${api}`);
  let errObj = {};
  var schmaVldtr;
  if (domain == "retail") {
    schmaVldtr = validate_schema_for_retail_json(domain, api, data);
  } else if (domain == "igm") {
    schmaVldtr = validate_schema_for_igm_json(domain, api, data);
  }
  const datavld = schmaVldtr;
  if (datavld.status === "fail") {
    let res = datavld.errors;
    let i = 0;
    const len = res.length;
    while (i < len) {
      let key = `schemaErr${i}`;
      errObj[key] = `${res[i].details} ${res[i].message}`;
      i++;
    }
    return errObj;
  } else return "error";
};

module.exports = validateSchema;

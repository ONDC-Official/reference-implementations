const fs = require("fs");

const {
  isEndTimeGreater,
  hasStartAndEndStops,
  isStartTimeValid,
} = require("./v2.0/keywords/search");
const { hasRequiredFulfillments } = require("./v2.0/keywords/onSearch");
const { isQuoteMatching } = require("./v2.0/keywords/onInit");
const {
  validateTime,
  validateAcceptBPP_Terms,
} = require("./v2.0/keywords/confirm");
const { validateBillDetails } = require("./v2.0/keywords/onConfirm");
const formatted_error = (errors) => {
  error_list = [];
  let status = "";
  errors.forEach((error) => {
    error_dict = {
      message: `${error.message}${
        error.params.allowedValues ? ` (${error.params.allowedValues})` : ""
      }${error.params.allowedValue ? ` (${error.params.allowedValue})` : ""}${
        error.params.additionalProperty
          ? ` (${error.params.additionalProperty})`
          : ""
      }`,
      details: error.instancePath,
    };
    error_list.push(error_dict);
  });
  if (error_list.length === 0) status = "pass";
  else status = "fail";
  error_json = { errors: error_list, status: status };
  return error_json;
};

const loadSchema = (schemaType, version) => {
  try {
    return require(`./${version}/${schemaType}Schema.js`);
  } catch (error) {
    console.log("Error Occurred while importing", error);
  }
};

const validate_schema = (data, schema, version) => {
  const searchSchema = loadSchema("search", version);
  const onSearchSchema = loadSchema("onSearch", version);

  const initSchema = loadSchema("init", version);
  const onInitSchema = loadSchema("onInit", version);

  const confirmSchema = loadSchema("confirm", version);
  const onConfirmSchema = loadSchema("onConfirm", version);

  const updateSchema = loadSchema("update", version);
  const onUpdateSchema = loadSchema("onUpdate", version);

  const statusSchema = loadSchema("status", version);
  const onStatusSchema = loadSchema("onStatus", version);

  const cancelSchema = loadSchema("cancel", version);
  const onCancelSchema = loadSchema("onCancel", version);

  const commonSchemaV2_0 = require("./v2.0/common/commonSchema");

  const Ajv = require("ajv");
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    strictRequired: false,
    strictTypes: false,
    verbose: true,
    $data: true,
    schemaIs: "id",
  });

  const addFormats = require("ajv-formats");

  addFormats(ajv);
  require("ajv-errors")(ajv);
  require("ajv-merge-patch")(ajv);
  let error_list = [];
  try {
    validate = ajv
      .addSchema(searchSchema)
      .addSchema(onSearchSchema)
      .addSchema(initSchema)
      .addSchema(onInitSchema)
      .addSchema(confirmSchema)
      .addSchema(onConfirmSchema)
      .addSchema(updateSchema)
      .addSchema(onUpdateSchema)
      .addSchema(statusSchema)
      .addSchema(onStatusSchema)
      .addSchema(cancelSchema)
      .addSchema(onCancelSchema)
      .addSchema(commonSchemaV2_0)
      .addKeyword("isEndTimeGreater", {
        validate: (schema, data) => isEndTimeGreater(data),
      })
      .addKeyword("hasStartAndEndStops", {
        validate: (schema, data) => hasStartAndEndStops(data),
      })
      .addKeyword("isStartTimeValid", {
        validate: (schema, data) => isStartTimeValid(data),
      })
      .addKeyword("hasRequiredFulfillments", {
        validate: (schema, data) => hasRequiredFulfillments(data),
      })
      .addKeyword("isQuoteMatching", {
        validate: (schema, data) => isQuoteMatching(data),
      })
      .addKeyword("validateTime", {
        validate: (schema, data) => validateTime(data),
      })
      .addKeyword("validateAcceptBPP_Terms", {
        validate: (schema, data) => validateAcceptBPP_Terms(data),
      })
      .addKeyword("validateBillDetails", {
        validate: (schema, data) => validateBillDetails(data),
      });

    validate = validate.compile(schema);

    const valid = validate(data);
    if (!valid) {
      error_list = validate.errors;
    }
  } catch (error) {
    console.log("ERROR!! validating schema");
    console.trace(error);
  }

  return error_list;
};

const validate_schema_logistics_b2b_master = (data, version) => {
  const masterSchema = loadSchema("master", version);
  error_list = validate_schema(data, masterSchema, version);
  return formatted_error(error_list);
};

module.exports = {
  validate_schema_logistics_b2b_master,
};

const issueSchema = require("./issueSchema");
const onIssueSchema = require("./onIssueSchema");
const issueStatusSchema = require("./issueStatusSchema");
const onIssueStatusSchema = require("./onIssueStatusSchema");

const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  strict: "log",
});
const addFormats = require("ajv-formats");
const { error } = require("ajv/dist/vocabularies/applicator/dependencies");
addFormats(ajv);
require("ajv-errors")(ajv);

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

const validate_schema = (data, schema) => {
  let error_list = [];
  validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    error_list = validate.errors;
  }
  return error_list;
};

const validate_schema_issue_status_igm_for_json = (data) => {
  error_list = validate_schema(data, (schema = issueStatusSchema));
  return formatted_error(error_list);
};

const validate_schema_on_issue_status_igm_for_json = (data) => {
  error_list = validate_schema(data, (schema = onIssueStatusSchema));
  return formatted_error(error_list);
};

const validate_schema_issue_igm_for_json = (data) => {
  error_list = validate_schema(data, (schema = issueSchema));
  return formatted_error(error_list);
};

const validate_schema_on_issue_igm_for_json = (data) => {
  error_list = validate_schema(data, (schema = onIssueSchema));
  return formatted_error(error_list);
};

module.exports = {
  validate_schema_issue_igm_for_json,
  validate_schema_issue_status_igm_for_json,
  validate_schema_on_issue_igm_for_json,
  validate_schema_on_issue_status_igm_for_json,
};

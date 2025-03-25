const VERSION = "2.0.0";

const CONTEXT_DOMAIN = ["ONDC:LOG10", "ONDC:LOG11"];

const MESSAGE_INTENT_CATEGORY_DESCRIPTOR_CODE = [
  "Surface_Delivery",
  "Air_Delivery",
  "Ocean_Delivery",
];

const MESSAGE_INTENT_FULFILLMENTS_TYPE = ["Delivery", "Return"];

const MESSAGE_INTENT_TAGS_CODE = [
  "Package_Weight",
  "Package_Dimensions",
  "Package_Details",
  "Cold_Logistics",
];

const PACKAGE_WEIGHT_TAGS = ["Unit", "Value"];
const PACKAGE_WEIGHT_UNIT_VALUES = [
  "gram",
  "dozen",
  "kilogram",
  "tonne",
  "litre",
  "millilitre",
];

const PACKAGE_DIMENSIONS_TAGS = ["Unit", "Length", "Breadth", "Height"];
const PACKAGE_DIMENSIONS_UNIT_VALUES = ["centimeter", "meter"];

const PACKAGE_DETAILS_TAGS = [
  "Category",
  "Dangerous_Goods",
  "Stackable",
  "Shipment_Value",
  "Package_Count",
  "HSN_Code",
  "Transit_Risk_Owner",
];
const PACKAGE_DETAILS_CATEGORY_VALUES = [
  "Grocery",
  "F&B",
  "Fashion",
  "BPC",
  "Electronics",
  "Pharma",
  "Appliances",
  "Home & Kitchen",
  "Health & Wellness",
];

const DELIVERY_TERMS_TAGS = [
  "Ready_To_Ship",
  "AWB_No",
  "RTO_Action",
  "Incoterms",
  "LR_No",
  "Transporter_Id",
  "Doc_Way_Bill_No",
  "Retry_Count",
  "RTO_Id",
  "Cancellation_Reason_Id",
  "Sub_Reason_Id",
  "Cancelled_By",
  "Eway_Bill_No",
  "Invoice_Number",
];

const COLD_LOGISTICS_TAGS = [
  "Temp_Control",
  "Temp_Unit",
  "Temp_Min",
  "Temp_Max",
];

const QUOTE_TITLE = [
  "delivery",
  "tax",
  "Origin",
  "Freight",
  "Destination",
  "Custom_Clearance_Service_Origin",
  "Custom_Clearance_Service_Destination",
  "rto",
  "diff",
  "insurance",
  "delivery_diff",
  "tax_diff",
];
const SEARCH_TAGS = [
  ...PACKAGE_DIMENSIONS_TAGS,
  ...PACKAGE_DETAILS_TAGS,
  ...DELIVERY_TERMS_TAGS,
  ...COLD_LOGISTICS_TAGS,
];

const PAYMENT_TERMS = ["Settlement_Details", "Collection_Details"];
const PAYMENT_BPP_TERMS = [
  "Counterparty",
  "Mode",
  "Beneficiary_Name",
  "Bank_Account_No",
  "Ifsc_Code",
  "UPI_Address",
  "Amount",
  "Type",
];
const PAYMENT_TYPES = ["PRE-FULFILLMENT", "ON-FULFILLMENT", "POST-FULFILLMENT"];
const FULFILLMENT_TYPES = ["Delivery", "Return", "RTO"];
const DELIVERY_CATEGORIES = [
  "Surface_Delivery",
  "Air_Delivery",
  "Ocean_Delivery",
];
const PROVIDER_TERMS = ["BPP_Terms", "KYC"];
const PROVIDER_TERMS_BPP = [
  "Static_Terms",
  "Static_Terms_New",
  "Effective_Date",
  "url",
  "required",
];

const CONFIRM_MESSAGE_ORDER_TAG_GROUPS = [
  "BPP_Terms",
  "BAP_Terms",
  "Package_Weight",
  "Package_Dimensions",
  "Package_Details",
  "Cold_Logistics",
];

const UPDATE_TAGS = [
  "Package_Weight",
  "Package_Dimensions",
  "Package_Details",
  "Cold_Logistics",
];

const FULFILLMENT_STATES = [
  "Pending",
  "Packed",
  "Pickup-approved",
  "Pickup-rejected",
  "Order-picked-up",
  "In-transit",
  "At-domestic-hub",
  "Custom-cleared-domestic",
  "Custom-rejected-domestic",
  "Shipped",
  "Reached-destination-country",
  "Custom-cleared-destination",
  "Custom-rejected-destination",
  "At-destination-hub",
  "Out-for-delivery",
  "Order-delivered",
  "Delivery-failed",
  "RTO-Initiated",
  "RTO-Delivered",
  "RTO-Disposed",
  "Out-for-pickup",
];

const TERMS = [
  "Package_Weight",
  "Package_Dimensions",
  "Package_Details",
  "Package_Dimensions_Diff",
  "Cold_Logistics",
  "BAP_Terms",
  "Diff_Proof",
];

const LOG_ORDER_TAGS = [
  "Accept_BPP_Terms",
  "Max_Liability",
  "Max_Liability_Cap",
  "Delay_Interest",
  "Court_Jurisdiction",
  "Mandatory_Arbitration",
  "Static_Terms",
  "Temp_Max",
  "Temp_Min",
  "Temp_Unit",
  "Temp_Control",
  "Packaging",
  "Package_Count",
  "Shipment_Value",
  "Stackable",
  "Dangerous_Goods",
  "Category",
  "Height",
  "Breadth",
  "Length",
  "Unit",
  "Value",
  "HSN_Code",
  "Transit_Risk_Owner",
  "type",
  "url",
];

const LOG_BPP_TERMS = [
  "Delay_Interest",
  "Court_Jurisdiction",
  "Mandatory_Arbitration",
  "Max_Liability_Cap",
  "Max_Liability",
  "Static_Terms",
];

module.exports = {
  VERSION,
  CONTEXT_DOMAIN,
  MESSAGE_INTENT_CATEGORY_DESCRIPTOR_CODE,
  MESSAGE_INTENT_FULFILLMENTS_TYPE,
  MESSAGE_INTENT_TAGS_CODE,
  PACKAGE_WEIGHT_TAGS,
  PACKAGE_WEIGHT_UNIT_VALUES,
  PACKAGE_DIMENSIONS_TAGS,
  PACKAGE_DIMENSIONS_UNIT_VALUES,
  PACKAGE_DETAILS_TAGS,
  PACKAGE_DETAILS_CATEGORY_VALUES,
  DELIVERY_TERMS_TAGS,
  COLD_LOGISTICS_TAGS,
  QUOTE_TITLE,
  SEARCH_TAGS,
  PAYMENT_TERMS,
  PAYMENT_BPP_TERMS,
  PAYMENT_TYPES,
  FULFILLMENT_TYPES,
  DELIVERY_CATEGORIES,
  PROVIDER_TERMS,
  PROVIDER_TERMS_BPP,
  CONFIRM_MESSAGE_ORDER_TAG_GROUPS,
  UPDATE_TAGS,
  FULFILLMENT_STATES,
  TERMS,
  LOG_ORDER_TAGS,
  LOG_BPP_TERMS,
};

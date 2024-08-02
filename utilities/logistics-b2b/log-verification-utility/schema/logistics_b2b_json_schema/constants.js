export const VERSION = "2.0.0";

export const CONTEXT_DOMAIN = ["ONDC:LOG10", "ONDC:LOG11"];

export const MESSAGE_INTENT_CATEGORY_DESCRIPTOR_CODE = [
	"Surface_Delivery",
	"Air_Delivery",
	"Ocean_Delivery",
];

export const MESSAGE_INTENT_FULFILLMENTS_TYPE = ["Delivery", "Return"];

export const MESSAGE_INTENT_TAGS_CODE = [
	"Package_Weight",
	"Package_Dimensions",
	"Package_Details",
	"Cold_Logistics",
];

export const PACKAGE_WEIGHT_TAGS = ["Unit", "Value"];
export const PACKAGE_WEIGHT_UNIT_VALUES = [
	"gram",
	"dozen",
	"kilogram",
	"tonne",
	"litre",
	"millilitre",
];

export const PACKAGE_DIMENSIONS_TAGS = ["Unit", "Lenght", "Breadth", "Height"];
export const PACKAGE_DIMENSIONS_UNIT_VALUES = ["centimeter", "meter"];

export const PACKAGE_DETAILS_TAGS = [
	"Category",
	"Dangerous_Goods",
	"Stackable",
	"Shipment_Value",
	"Package_Count",
	"HSN_Code",
	"Transit_Risk_Owner",
];
export const PACKAGE_DETAILS_CATEGORY_VALUES = [
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
export const DELIVERY_TERMS_TAGS = [
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

export const COLD_LOGISTICS_TAGS = [
	"Temp_Control",
	"Temp_Unit",
	"Temp_Min",
	"Temp_Max",
];

export const QUOTE_TITLE = [
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
export const SEARCH_TAGS = [
	...PACKAGE_DIMENSIONS_TAGS,
	...PACKAGE_DETAILS_TAGS,
	...DELIVERY_TERMS_TAGS,
	...COLD_LOGISTICS_TAGS,
];

export const PAYMENT_TERMS = ["Settlement_Details", "Collection_Details"];
export const PAYMENT_BPP_TERMS = [
	"Counterparty",
	"Mode",
	"Beneficiary_Name",
	"Bank_Account_No",
	"Ifsc_Code",
	"UPI_Address",
	"Amount",
	"Type",
];
export const PAYMENT_TYPES = [
	"PRE-FULFILLMENT",
	"ON-FULFILLMENT",
	"POST-FULFILLMENT",
];
export const FULFILLMENT_TYPES = ["Delivery", "Return", "RTO"];
export const DELIVERY_CATEGORIES = [
	"Surface_Delivery",
	"Air_Delivery",
	"Ocean_Delivery",
];
export const PROVIDER_TERMS = ["BPP_Terms", "KYC"];
export const PROVIDER_TERMS_BPP = [
	"Static_Terms",
	"Static_Terms_New",
	"Effective_Date",
	"url",
	"required",
];

export const CONFIRM_MESSAGE_ORDER_TAG_GROUPS = [
	"BPP_Terms",
	"BAP_Terms",
	"Package_Weight",
	"Package_Dimensions",
	"Package_Details",
	"Cold_Logistics",
];

export const UPDATE_TAGS = [
	"Package_Weight",
	"Package_Dimensions",
	"Package_Details",
	"Cold_Logistics",
];

export const FULFILLMENT_STATES = [
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

export const TERMS = [
	"Package_Weight",
	"Package_Dimensions",
	"Package_Details",
	"Package_Dimensions_Diff",
	"Cold_Logistics",
	"BAP_Terms",
	"Diff_Proof",
];

export const LOG_ORDER_TAGS = [
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

export const LOG_BPP_TERMS = [
	"Delay_Interest",
	"Court_Jurisdiction",
	"Mandatory_Arbitration",
	"Max_Liability_Cap",
	"Max_Liability",
	"Static_Terms",
];

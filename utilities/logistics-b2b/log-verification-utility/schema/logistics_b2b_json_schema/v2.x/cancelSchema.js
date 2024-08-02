import { CONTEXT_DOMAIN, VERSION } from "../constants";
module.exports = {
	$id: "http://example.com/schema/cancelSchema",
	type: "object",
	properties: {
		context: {
			type: "object",
			properties: {
				domain: {
					type: "string",
					enum: CONTEXT_DOMAIN,
				},
				location: {
					type: "object",
					properties: {
						city: {
							type: "object",
							properties: {
								code: {
									type: "string",
									const: { $data: "/search/0/context/city/code" },
								},
							},
							required: ["code"],
						},
						country: {
							type: "object",
							properties: {
								code: {
									type: "string",
									const: {
										$data: "/on_confirm/0/context/location/country/code",
									},
								},
							},
							required: ["code"],
						},
					},
					required: ["city", "country"],
				},
				action: {
					type: "string",
					const: "cancel",
				},
				version: {
					type: "string",
					const: VERSION,
				},
				bap_id: {
					type: "string",
				},
				bap_uri: {
					type: "string",
				},
				bpp_id: {
					type: "string",
				},
				bpp_uri: {
					type: "string",
				},
				transaction_id: {
					type: "string",
					const: { $data: "/on_confirm/0/context/transaction_id" },
				},
				message_id: {
					type: "string",
				},
				timestamp: {
					type: "string",
				},
				ttl: {
					type: "string",
					const: "PT30S",
				},
			},
			required: [
				"domain",
				"location",
				"action",
				"version",
				"bap_id",
				"bap_uri",
				"bpp_id",
				"bpp_uri",
				"transaction_id",
				"message_id",
				"timestamp",
				"ttl",
			],
		},
		message: {
			type: "object",
			properties: {
				order_id: {
					type: "string",
					const: { $data: "/on_confirm/0/message/order/id" },
				},
				cancellation_reason_id: {
					type: "string",
				},
			},
			additionalProperties: false,
			required: ["order_id", "cancellation_reason_id"],
		},
	},
	required: ["context", "message"],
};

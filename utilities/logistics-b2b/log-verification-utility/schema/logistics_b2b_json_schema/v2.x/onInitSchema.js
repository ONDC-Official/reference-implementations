import {
	CONTEXT_DOMAIN,
	VERSION,
	TERMS,
	LOG_ORDER_TAGS,
	PAYMENT_TERMS,
	PAYMENT_BPP_TERMS,
	FULFILLMENT_TYPES,
	FULFILLMENT_STATES,
	PAYMENT_TYPES,
	QUOTE_TITLE
} from "../constants";

module.exports = {
	$id: "http://example.com/schema/onInitSchema",
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
									const: { $data: "/search/0/context/city" },
								},
							},
							required: ["code"],
						},
						country: {
							type: "object",
							properties: {
								code: {
									type: "string",
								},
							},
							required: ["code"],
						},
					},
					required: ["city", "country"],
				},
				action: {
					type: "string",
					const: "on_init",
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
				},
				message_id: {
					type: "string",
				},
				timestamp: {
					type: "string",
				},
				ttl: {
					type: "string",
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
				order: {
					type: "object",
					properties: {
						provider: {
							type: "object",
							properties: {
								id: {
									type: "string",
								},
								locations: {
									type: "array",
									items: {
										type: "object",
										properties: {
											id: {
												type: "string",
											},
										},
										required: ["id"],
									},
								},
							},
							required: ["id"],
						},
						items: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: {
										type: "string",
									},
									fulfillment_ids: {
										type: "array",
										items: {
											type: "string",
										},
									},
									category_ids: {
										type: "array",
										items: {
											type: "string",
										},
									},
								},
								required: ["id", "fulfillment_ids", "category_ids"],
							},
						},
						fulfillments: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: {
										type: "string",
									},
									type: {
										type: "string",
										enum: FULFILLMENT_TYPES,
									},
									stops: {
										type: "array",
										items: {
											type: "object",
											properties: {
												type: {
													type: "string",
													enum: ["start", "end"],
												},
												location: {
													type: "object",
													properties: {
														gps: {
															type: "string",
															pattern:
																"^(-?[0-9]{1,3}(?:.[0-9]{6,15})?),( )*?(-?[0-9]{1,3}(?:.[0-9]{6,15})?)$",
															errorMessage:
																"Incorrect gps value (minimum of six decimal places are required)",
														},
														address: {
															type: "string",
														},
														city: {
															type: "object",
															properties: {
																name: {
																	type: "string",
																},
															},
															required: ["name"],
														},
														state: {
															type: "object",
															properties: {
																name: {
																	type: "string",
																},
															},
															required: ["name"],
														},
														country: {
															type: "object",
															properties: {
																code: {
																	type: "string",
																},
															},
															required: ["code"],
														},
														area_code: {
															type: "string",
														},
													},
													required: [
														"gps",
														"address",
														"city",
														"state",
														"country",
														"area_code",
													],
												},
												contact: {
													type: "object",
													properties: {
														phone: {
															type: "string",
															pattern: "^(\\d{10})$",
														},
														email: {
															type: "string",
														},
													},
													required: ["phone"],
												},
											},
											required: ["type", "location", "contact"],
										},
									},
								},
								required: ["id", "type", "stops"],
							},
						},
						billing: {
							type: "object",
							properties: {
								name: {
									type: "string",
								},
								address: {
									type: "string",
								},
								city: {
									type: "string",
								},
								state: {
									type: "string",
								},
								tax_id: {
									type: "string",
								},
								phone: {
									type: "string",
								},
								email: {
									type: "string",
								},
								time: {
									type: "object",
									properties: {
										timestamp: {
											type: "string",
										},
									},
									required: ["timestamp"],
								},
							},
							required: ["name", "address"],
						},
						quote: {
							type: "object",
							properties: {
								price: {
									type: "object",
									properties: {
										currency: {
											type: "string",
										},
										value: {
											type: "string",
										},
									},
									required: ["currency", "value"],
								},
								breakup: {
									type: "array",
									items: {
										type: "object",
										properties: {
											item: {
												type: "object",
												properties: {
													id: {
														type: "string",
													},
												},
												required: ["id"],
											},
											title: {
												type: "string",
												enum : QUOTE_TITLE
											},
											price: {
												type: "object",
												properties: {
													currency: {
														type: "string",
													},
													value: {
														type: "string",
													},
												},
												required: ["currency", "value"],
											},
										},
										required: ["item", "title", "price"],
									},
								},
								ttl: {
									type: "string",
								},
							},
							required: ["price", "breakup", "ttl"],
						},
						cancellation_terms: {
							type: "array",
							items: {
								type: "object",
								properties: {
									fulfillment_state: {
										type: "object",
										properties: {
											descriptor: {
												type: "object",
												properties: {
													code: {
														type: "string",
														enum: FULFILLMENT_STATES,
													},
													short_desc: {
														type: "string",
													},
												},
												required: ["code", "short_desc"],
											},
										},
										required: ["descriptor"],
									},
									reason_required: {
										type: "boolean",
									},
									cancellation_fee: {
										type: "object",
										properties: {
											amount: {
												type: "object",
												properties: {
													currency: {
														type: "string",
													},
													value: {
														type: "string",
													},
												},
												required: ["currency", "value"],
											},
										},
										required: ["amount"],
									},
								},
								required: [
									"fulfillment_state",
									"reason_required",
									"cancellation_fee",
								],
							},
						},
						payments: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: {
										type: "string",
									},
									collected_by: {
										type: "string",
										enum: ["BAP","BPP"]
									},
									params: {
										type: "object",
										properties: {
											amount: {
												type: "string",
											},
											currency: {
												type: "string",
											},
											bank_account_number: {
												type: "string",
											},
											virtual_payment_address: {
												type: "string",
											},
										},
										required: [
											"amount",
											"currency",
											"bank_account_number",
											"virtual_payment_address",
										],
									},
									type: {
										type: "string",
										enum: PAYMENT_TYPES
									},
									tags: {
										type: "array",
										items: {
											type: "object",
											properties: {
												descriptor: {
													type: "object",
													properties: {
														code: {
															type: "string",
															enum: PAYMENT_TERMS,
														},
													},
													required: ["code"],
												},
												list: {
													type: "array",
													items: {
														type: "object",
														properties: {
															descriptor: {
																type: "object",
																properties: {
																	code: {
																		type: "string",
																		enum: PAYMENT_BPP_TERMS,
																	},
																},
																required: ["code"],
															},
															value: {
																type: "string",
															},
														},
														required: ["descriptor", "value"],
													},
												},
											},
											required: ["descriptor", "list"],
										},
									},
								},
								required: ["id", "collected_by", "params", "type", "tags"],
							},
						},
						xinput: {
							type: "object",
							properties: {
								form: {
									type: "object",
									properties: {
										url: {
											type: "string",
										},
										mime_type: {
											type: "string",
										},
										submission_id: {
											type: "string",
										},
										status: {
											type: "string",
										},
									},
									required: ["url", "mime_type", "submission_id", "status"],
								},
								required: {
									type: "boolean",
								},
							},
							required: ["form", "required"],
						},
						tags: {
							type: "array",
							items: {
								type: "object",
								properties: {
									code: {
										type: "string",
										enum: ["BPP_Terms"],
									},
									list: {
										type: "array",
										items: {
											type: "object",
											properties: {
												code: {
													type: "string",
													enum: LOG_ORDER_TAGS,
												},
												value: {
													type: "string",
												},
											},
											required: ["code", "value"],
										},
									},
								},
								required: ["code", "list"],
							},
						},
					},
					required: [
						"provider",
						"items",
						"fulfillments",
						"quote",
						"cancellation_terms",
						"payments",
						"xinput",
						"tags",
					],
				},
			},
			required: ["order"],
		},
		error: {
			type: "object",
			properties: {
				code: {
					type: "string",
				},
				message: {
					type: "string",
				},
			},
			required: ["code", "message"],
		},
	},
	required: ["context", "message"],
};

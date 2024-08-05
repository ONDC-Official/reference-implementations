const {
	CONTEXT_DOMAIN,
	VERSION,
	TERMS,
	LOG_ORDER_TAGS,
	PAYMENT_TERMS,
	PAYMENT_BPP_TERMS,
	FULFILLMENT_TYPES,
	PAYMENT_TYPES,
	DELIVERY_TERMS_TAGS,
	QUOTE_TITLE,
} = require("../constants");

module.exports = {
	$id: "http://example.com/schema/onCancelSchema",
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
					const: "on_cancel",
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
						id: {
							type: "string",
						},
						status: {
							type: "string",
							const: "Cancelled",
						},
						cancellation: {
							type: "object",
							properties: {
								cancelled_by: {
									type: "string",
								},
								reason: {
									type: "object",
									properties: {
										id: {
											type: "string",
										},
									},
									required: ["id"],
								},
							},
							required: ["cancelled_by", "reason"],
						},
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
							required: ["id", "locations"],
						},
						items: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: {
										type: "string",
									},
									category_ids: {
										type: "array",
										items: {
											type: "string",
										},
									},
									descriptor: {
										type: "object",
										properties: {
											code: {
												type: "string",
												enum: ["P2P", "P2H2P"],
											},
										},
										required: ["code"],
									},
									fulfillment_ids: {
										type: "array",
										items: {
											type: "string",
										},
									},
									time: {
										type: "object",
										properties: {
											label: {
												type: "string",
											},
											duration: {
												type: "string",
											},
											timestamp: {
												type: "string",
											},
										},
										required: ["label", "duration"],
									},
								},
								required: [
									"id",
									"category_ids",
									"descriptor",
									"fulfillment_ids",
									"time",
								],
							},
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
												enum: QUOTE_TITLE,
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
							},
							required: ["price", "breakup"],
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
									state: {
										type: "object",
										properties: {
											descriptor: {
												type: "object",
												properties: {
													code: {
														type: "string",
														enum: ["Cancelled", "RTO-Initiated"],
													},
												},
												required: ["code"],
											},
										},
										required: ["descriptor"],
									},
									tracking: {
										type: "boolean",
									},
									stops: {
										type: "array",
										items: {
											type: "object",
											properties: {
												id: {
													type: "string",
												},
												parent_stop_id: {
													type: "string",
												},
												type: {
													type: "string",
													enum: ["start", "end"],
												},
												location: {
													type: "object",
													properties: {
														gps: {
															type: "string",
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
																name: {
																	type: "string",
																},
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
														},
														email: {
															type: "string",
														},
													},
													required: ["phone"],
												},
												instructions: {
													type: "object",
													properties: {
														short_desc: {
															type: "string",
														},
														long_desc: {
															type: "string",
														},
														additional_desc: {
															type: "object",
															properties: {
																content_type: {
																	type: "string",
																},
																url: {
																	type: "string",
																},
															},
															required: ["content_type", "url"],
														},
													},
													required: ["short_desc", "long_desc"],
												},
												time: {
													type: "object",
													properties: {
														range: {
															type: "object",
															properties: {
																start: {
																	type: "string",
																},
																end: {
																	type: "string",
																},
															},
															required: ["start", "end"],
														},
													},
													required: ["range"],
												},
											},
											required: [
												"id",
												"parent_stop_id",
												"type",
												"location",
												"contact",
												"instructions",
												"time",
											],
										},
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
															enum: ["Delivery_Terms", "RTO_Event"],
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
																		enum: DELIVERY_TERMS_TAGS,
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
								required: ["id", "type", "state", "tracking", "stops", "tags"],
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
										enum: ["BAP", "BPP"],
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
										required: ["amount", "currency"],
									},
									type: {
										type: "string",
										enum: PAYMENT_TYPES,
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
												enum: TERMS,
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
															enum: LOG_ORDER_TAGS,
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
						updated_at: {
							type: "string",
						},
					},
					required: [
						"id",
						"status",
						"cancellation",
						"provider",
						"items",
						"quote",
						"fulfillments",
						"billing",
						"payments",
						"tags",
						"updated_at",
					],
				},
			},
			required: ["order"],
		},
	},
	required: ["context", "message"],
};

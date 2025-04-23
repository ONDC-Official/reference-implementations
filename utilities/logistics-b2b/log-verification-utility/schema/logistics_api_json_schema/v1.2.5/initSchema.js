const constants = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/initSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: ["ONDC:LOG10", "ONDC:LOG11"],
        },
        country: {
          type: "string",
        },
        city: {
          type: "string",
          const: { $data: "/search/0/context/city" },
        },
        action: {
          type: "string",
          const: "init",
        },
        core_version: {
          type: "string",
          const: "1.2.5",
        },
        bap_id: {
          type: "string",
          const: { $data: "/on_search/0/context/bap_id" },
          errorMessage:
            "bap_id must match the value from on_search: ${/on_search/0/context/bap_id}",
        },
        bap_uri: {
          type: "string",
          const: { $data: "/on_search/0/context/bap_uri" },
          errorMessage:
            "bap_uri must match the value from on_search: ${/on_search/0/context/bap_uri}",
        },
        bpp_id: {
          type: "string",
          const: { $data: "/on_search/0/context/bpp_id" },
          errorMessage:
            "bpp_id must match the value from on_search: ${/on_search/0/context/bpp_id}",
        },
        bpp_uri: {
          type: "string",
          const: { $data: "/on_search/0/context/bpp_uri" },
          errorMessage:
            "bpp_uri must match the value from on_search: ${/on_search/0/context/bpp_uri}",
        },
        transaction_id: {
          type: "string",
          const: { $data: "/search/0/context/transaction_id" },
          errorMessage:
            "Transaction ID should be same across the transaction: ${/search/0/context/transaction_id}",
        },
        message_id: {
          type: "string",
          allOf: [
            {
              not: {
                const: { $data: "1/transaction_id" },
              },
              errorMessage:
                "Message ID should not be equal to transaction_id: ${1/transaction_id}",
            },
          ],
        },
        timestamp: {
          type: "string",
          format: "date-time",
        },
        ttl: {
          type: "string",
          const: "PT30S",
        },
      },
      required: [
        "domain",
        "country",
        "city",
        "action",
        "core_version",
        "bap_id",
        "bap_uri",
        "bpp_uri",
        "bpp_id",
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
                id: { type: "string" },
                locations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
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
                  id: { type: "string" },
                  fulfillment_id: { type: "string" },
                  category_id: {
                    type: "string",
                    enum: constants.CATEGORY_ID,
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        enum: constants.SHIPMENT_TYPE,
                      },
                    },
                  },
                },
                required: ["id", "fulfillment_id", "category_id", "descriptor"],
              },
            },
            fulfillments: {
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  type: {
                    type: "string",
                    enum: constants.FULFILLMENT_TYPE,
                  },
                  start: {
                    type: "object",
                    properties: {
                      location: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          gps: { type: "string" },
                          address: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              building: { type: "string" },
                              locality: { type: "string" },
                              city: { type: "string" },
                              state: { type: "string" },
                              country: { type: "string" },
                              area_code: { type: "string" },
                            },
                            required: [
                              "name",
                              "building",
                              "locality",
                              "city",
                              "state",
                              "country",
                              "area_code",
                            ],
                          },
                        },
                        required: ["id", "gps", "address"],
                      },
                      contact: {
                        type: "object",
                        properties: {
                          phone: {
                            type: "string",
                            pattern: "^[0-9]{10,11}$",
                          },
                          email: { type: "string", format: "email" },
                        },
                        required: ["phone", "email"],
                      },
                    },
                    required: ["location", "contact"],
                  },
                  end: {
                    type: "object",
                    properties: {
                      location: {
                        type: "object",
                        properties: {
                          gps: { type: "string" },
                          address: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              building: { type: "string" },
                              locality: { type: "string" },
                              city: { type: "string" },
                              state: { type: "string" },
                              country: { type: "string" },
                              area_code: { type: "string" },
                            },
                            required: [
                              "name",
                              "building",
                              "locality",
                              "city",
                              "state",
                              "country",
                              "area_code",
                            ],
                          },
                        },
                        required: ["gps", "address"],
                      },
                      contact: {
                        type: "object",
                        properties: {
                          phone: { type: "string" },
                          email: { type: "string", format: "email" },
                        },
                        required: ["phone", "email"],
                      },
                    },
                    required: ["location", "contact"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: { type: "string" },
                        list: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              code: { type: "string" },
                              value: { type: "string" },
                            },
                            required: ["code", "value"],
                          },
                        },
                      },
                      required: ["code", "list"],
                    },
                  },
                },
                required: ["id", "type", "start", "end", "tags"],
              },
            },
            billing: {
              type: "object",
              properties: {
                name: { type: "string" },
                address: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    building: { type: "string" },
                    locality: { type: "string" },
                    city: { type: "string" },
                    state: { type: "string" },
                    country: { type: "string" },
                    area_code: { type: "string" },
                  },
                  required: [
                    "name",
                    "building",
                    "locality",
                    "city",
                    "state",
                    "country",
                    "area_code",
                  ],
                },
                tax_number: { type: "string" },
                phone: { type: "string" },
                email: { type: "string", format: "email" },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
              },
              required: [
                "name",
                "address",
                "tax_number",
                "phone",
                "email",
                "created_at",
                "updated_at",
              ],
            },
            payment: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: constants.PAYMENT_TYPE,
                },
                collected_by: {
                  type: "string",
                  enum: constants.PAYMENT_COLLECTEDBY,
                },
                "@ondc/org/collection_amount": { type: "string" },
                "@ondc/org/settlement_basis": { type: "string" },
                "@ondc/org/settlement_window": { type: "string" },
                "@ondc/org/settlement_details": {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      settlement_counterparty: { type: "string" },
                      settlement_type: { type: "string" },
                      beneficiary_name: { type: "string" },
                      upi_address: { type: "string" },
                      settlement_bank_account_no: { type: "string" },
                      settlement_ifsc_code: { type: "string" },
                    },
                    required: [
                      "settlement_counterparty",
                      "settlement_type",
                      "beneficiary_name",
                      "upi_address",
                      "settlement_bank_account_no",
                      "settlement_ifsc_code",
                    ],
                  },
                },
              },
              required: [
                "type",
                "collected_by",
                "@ondc/org/settlement_basis",
                "@ondc/org/settlement_window",
              ],
            },
            tags: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: { type: "string" },
                  list: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: { type: "string" },
                        value: { type: "string" },
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
            "billing",
            "payment",
            "tags",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

// const constants = require("../../../utils/constants");

// module.exports = {
//   $id: "http://example.com/schema/initSchema",
//   type: "object",
//   properties: {
//     context: {
//       type: "object",
//       properties: {
//         domain: {
//           type: "string",
//           const: "nic2004:60232",
//         },
//         country: {
//           type: "string",
//         },
//         city: {
//           type: "string",
//           const: { $data: "/search/0/context/city" },
//         },
//         action: {
//           type: "string",
//           const: "init",
//         },
//         core_version: {
//           type: "string",
//           const: "1.2.0",
//         },
//         bap_id: {
//           type: "string",
//         },
//         bap_uri: {
//           type: "string",
//         },
//         bpp_id: {
//           type: "string",
//         },
//         bpp_uri: {
//           type: "string",
//         },
//         transaction_id: {
//           type: "string",
//           const: { $data: "/search/0/context/transaction_id" },
//           errorMessage:
//             "Transaction ID should be same across the transaction: ${/search/0/context/transaction_id}",
//         },
//         message_id: {
//           type: "string",
//           allOf: [
//             {
//               not: {
//                 const: { $data: "1/transaction_id" },
//               },
//               errorMessage:
//                 "Message ID should not be equal to transaction_id: ${1/transaction_id}",
//             },
//           ],
//         },
//         timestamp: {
//           type: "string",
//           format: "date-time",
//         },
//         ttl: {
//           type: "string",
//           format: "duration",
//         },
//       },
//       required: [
//         "domain",
//         "country",
//         "city",
//         "action",
//         "core_version",
//         "bap_id",
//         "bap_uri",
//         "bpp_id",
//         "bpp_uri",
//         "transaction_id",
//         "message_id",
//         "timestamp",
//         "ttl",
//       ],
//     },
//     message: {
//       type: "object",
//       properties: {
//         order: {
//           type: "object",
//           properties: {
//             provider: {
//               type: "object",
//               properties: {
//                 id: {
//                   type: "string",
//                 },
//                 locations: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       id: {
//                         type: "string",
//                       },
//                     },
//                     required: ["id"],
//                   },
//                 },
//               },
//               required: ["id"],
//             },
//             items: {
//               type: "array",
//               items: {
//                 type: "object",
//                 properties: {
//                   id: {
//                     type: "string",
//                   },
//                   fulfillment_id: {
//                     type: "string",
//                     const: { $data: "3/fulfillments/0/id" },
//                     errorMessage:
//                       "should be mapped to the id - ${3/fulfillments/0/id} in /fulfillments",
//                   },
//                   category_id: {
//                     type: "string",
//                     enum: constants.CATEGORY_ID,
//                   },
//                   descriptor: {
//                     type: "object",
//                     properties: {
//                       code: {
//                         type: "string",
//                         enum: constants.SHIPMENT_TYPE,
//                       },
//                     },

//                     required: ["code"],
//                   },
//                 },
//                 required: ["id", "category_id", "descriptor", "fulfillment_id"],
//               },
//             },
//             fulfillments: {
//               type: "array",
//               minItems:1,
//               items: {
//                 type: "object",
//                 properties: {
//                   id: {
//                     type: "string",
//                   },
//                   type: {
//                     type: "string",
//                     enum: constants.FULFILLMENT_TYPE,
//                   },
//                   start: {
//                     type: "object",
//                     properties: {
//                       location: {
//                         type: "object",
//                         properties: {
//                           gps: {
//                             type: "string",
//                             const: {
//                               $data:
//                                 "/search/0/message/intent/fulfillment/start/location/gps",
//                             },
//                             errorMessage:
//                               "does not match start location in search",
//                           },
//                           address: {
//                             type: "object",
//                             properties: {
//                               name: {
//                                 type: "string",
//                                 not: { const: { $data: "1/locality" } },
//                               },
//                               building: {
//                                 type: "string",
//                                 minLength: 3,
//                               },
//                               locality: {
//                                 type: "string",
//                                 minLength: 3,
//                               },
//                               city: {
//                                 type: "string",
//                               },
//                               state: {
//                                 type: "string",
//                               },
//                               country: {
//                                 type: "string",
//                               },
//                               area_code: {
//                                 type: "string",
//                               },
//                             },
//                             isLengthValid: true,

//                             required: [
//                               "name",
//                               "building",
//                               "locality",
//                               "city",
//                               "state",
//                               "country",
//                               "area_code",
//                             ],
//                           },
//                         },
//                         required: ["gps", "address"],
//                       },
//                       contact: {
//                         type: "object",
//                         properties: {
//                           phone: {
//                             type: "string",
//                             pattern: "^[0-9]{10,11}$",
//                           },
//                           email: {
//                             type: "string",
//                             format: "email",
//                           },
//                         },
//                         required: ["phone"],
//                       },
//                     },
//                     required: ["location", "contact"],
//                   },
//                   end: {
//                     type: "object",
//                     properties: {
//                       location: {
//                         type: "object",
//                         properties: {
//                           gps: {
//                             type: "string",
//                             const: {
//                               $data:
//                                 "/search/0/message/intent/fulfillment/end/location/gps",
//                             },
//                             errorMessage:
//                               "does not match end location in search",
//                           },
//                           address: {
//                             type: "object",
//                             properties: {
//                               name: {
//                                 type: "string",
//                                 minLength: 3,
//                                 not: { const: { $data: "1/locality" } },
//                                 errorMessage: "cannot be equal to locality",
//                               },
//                               building: {
//                                 type: "string",
//                                 minLength: 3,
//                                 not: { const: { $data: "1/locality" } },
//                                 errorMessage: "cannot be equal to locality",
//                               },
//                               locality: {
//                                 type: "string",
//                                 minLength: 3,
//                               },
//                               city: {
//                                 type: "string",
//                               },
//                               state: {
//                                 type: "string",
//                               },
//                               country: {
//                                 type: "string",
//                               },
//                               area_code: {
//                                 type: "string",
//                               },
//                             },
//                             isLengthValid: true,

//                             required: [
//                               "name",
//                               "building",
//                               "locality",
//                               "city",
//                               "state",
//                               "country",
//                               "area_code",
//                             ],
//                           },
//                         },
//                         required: ["gps", "address"],
//                       },
//                       contact: {
//                         type: "object",
//                         properties: {
//                           phone: {
//                             type: "string",
//                           },
//                           email: {
//                             type: "string",
//                             format: "email",
//                           },
//                         },
//                         required: ["phone"],
//                       },
//                     },
//                     required: ["location", "contact"],
//                   },
//                 },
//                 additionalProperties: false,
//                 required: ["id", "type", "start", "end"],
//               },
//             },
//             billing: {
//               type: "object",
//               properties: {
//                 name: {
//                   type: "string",
//                 },
//                 address: {
//                   type: "object",
//                   properties: {
//                     name: {
//                       type: "string",
//                       not: { const: { $data: "1/locality" } },
//                       errorMessage: "cannot be equal to locality",
//                     },
//                     building: {
//                       type: "string",
//                       not: { const: { $data: "1/locality" } },
//                       errorMessage: "cannot be equal to locality",
//                     },
//                     locality: {
//                       type: "string",
//                     },
//                     city: {
//                       type: "string",
//                     },
//                     state: {
//                       type: "string",
//                     },
//                     country: {
//                       type: "string",
//                     },
//                     area_code: {
//                       type: "string",
//                     },
//                   },
//                   isLengthValid: true,
//                   additionalProperties: false,
//                   required: [
//                     "name",
//                     "building",
//                     "locality",
//                     "city",
//                     "state",
//                     "country",
//                     "area_code",
//                   ],
//                 },
//                 tax_number: {
//                   type: "string",
//                   pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[0-9A-Z]{4}$",
//                   errorMessage: "should be valid",
//                 },
//                 phone: {
//                   type: "string",
//                 },
//                 email: {
//                   type: "string",
//                   format: "email",
//                 },
//                 created_at: {
//                   type: "string",
//                 },
//                 updated_at: {
//                   type: "string",
//                 },
//               },
//               required: [
//                 "name",
//                 "address",
//                 "tax_number",
//                 "phone",
//                 "email",
//                 "created_at",
//                 "updated_at",
//               ],
//             },
//             payment: {
//               type: "object",
//               properties: {
//                 type: {
//                   type: "string",
//                   enum: constants.PAYMENT_TYPE,
//                   const: { $data: "/search/0/message/intent/payment/type" },
//                   errorMessage:
//                     "should be same as in /search - ${/search/0/message/intent/payment/type}",
//                 },
//                 collected_by: {
//                   type: "string",
//                   enum: constants.PAYMENT_COLLECTEDBY,
//                 },
//               },
//               additionalProperties: false,
//               if: {
//                 properties: {
//                   type: {
//                     const: "ON-ORDER",
//                   },
//                 },
//               },
//               then: {
//                 required: ["type", "collected_by"],
//               },
//               else: {
//                 required: ["type"],
//               },
//             },
//           },
//           additionalProperties: false,
//           required: ["provider", "items", "fulfillments", "billing", "payment"],
//         },
//       },
//       required: ["order"],
//     },
//   },
//   required: ["context", "message"],
// };

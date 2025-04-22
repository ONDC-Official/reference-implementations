const constants = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/onInitSchema",
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
        },
        action: {
          type: "string",
          const: "on_init",
        },
        core_version: {
          type: "string",
          const: "1.2.5",
        },
        bap_id: {
          type: "string",
        },
        bap_uri: {
          type: "string",
        },
        transaction_id: {
          type: "string",
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
                  const: { $data: "/init/0/message/order/provider/id" },
                },
                locations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        const: {
                          $data:
                            "/init/0/message/order/provider/locations/0/id",
                        },
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
                    const: { $data: "/init/0/message/order/items/0/id" },
                  },
                  fulfillment_id: {
                    type: "string",
                    const: {
                      $data: "/init/0/message/order/items/0/fulfillment_id",
                    },
                  },
                },
                required: ["id", "fulfillment_id"],
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
                          gps: {
                            type: "string",
                            const: {
                              $data:
                                "/search/0/message/intent/fulfillment/start/location/gps",
                            },
                          },
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
                          phone: { type: "string" },
                          email: { type: "string", format: "email" },
                        },
                        required: ["phone"],
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
                          gps: {
                            type: "string",
                            const: {
                              $data:
                                "/search/0/message/intent/fulfillment/end/location/gps",
                            },
                          },
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
                        required: ["phone"],
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
            quote: {
              type: "object",
              properties: {
                price: {
                  type: "object",
                  properties: {
                    currency: { type: "string" },
                    value: {
                      type: "string",
                      pattern: "^[0-9]+(\\.[0-9]{1,2})?$",
                      errorMessage: "Value can be max 2 decimal places",
                    },
                  },
                  required: ["currency", "value"],
                },
                breakup: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      "@ondc/org/item_id": { type: "string" },
                      "@ondc/org/title_type": {
                        type: "string",
                        enum: constants.TITLE_TYPE,
                      },
                      price: {
                        type: "object",
                        properties: {
                          currency: { type: "string" },
                          value: {
                            type: "string",
                            pattern: "^[0-9]+(\\.[0-9]{1,2})?$",
                            errorMessage: "Value can be max 2 decimal places",
                          },
                        },
                        required: ["currency", "value"],
                      },
                    },
                    required: [
                      "@ondc/org/item_id",
                      "@ondc/org/title_type",
                      "price",
                    ],
                  },
                },
                ttl: { type: "string", format: "duration" },
              },
              required: ["price", "breakup", "ttl"],
              isQuoteMatching: true,
            },
            payment: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: constants.PAYMENT_TYPE,
                  const: { $data: "/search/0/message/intent/payment/type" },
                },
                collected_by: {
                  type: "string",
                  enum: constants.PAYMENT_COLLECTEDBY,
                },
                "@ondc/org/collection_amount": {
                  type: "string",
                  pattern: "^[0-9]+(\\.[0-9]{1,2})?$",
                },
                "@ondc/org/settlement_details": {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      settlement_counterparty: {
                        type: "string",
                        enum: ["lsp", "lbnp"],
                      },
                      settlement_type: { type: "string" },
                      beneficiary_name: { type: "string" },
                      upi_address: { type: "string" },
                      settlement_bank_account_no: { type: "string" },
                      settlement_ifsc_code: { type: "string" },
                    },
                    allOf: [
                      {
                        if: {
                          properties: { settlement_type: { const: "upi" } },
                        },
                        then: {
                          required: ["upi_address"],
                        },
                      },
                      {
                        if: {
                          properties: {
                            settlement_type: {
                              enum: ["neft", "rtgs"],
                            },
                          },
                        },
                        then: {
                          required: [
                            "settlement_bank_account_no",
                            "settlement_ifsc_code",
                          ],
                        },
                      },
                    ],
                    required: ["settlement_counterparty", "settlement_type"],
                  },
                },
              },
              if: {
                properties: {
                  type: { enum: ["ON-ORDER", "POST-FULFILLMENT"] },
                },
              },
              then: {
                properties: {
                  collected_by: { const: "BAP" },
                },
              },
              else: {
                properties: {
                  collected_by: { const: "BPP" },
                },
              },
              required: ["type", "collected_by"],
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
          required: ["provider", "items", "fulfillments", "quote", "payment"],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

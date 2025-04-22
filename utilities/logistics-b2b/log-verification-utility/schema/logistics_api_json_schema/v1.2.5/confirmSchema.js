const constants = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/confirmSchema",
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
          const: "confirm",
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
            id: { type: "string" },
            state: { type: "string" },
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
              required: ["id", "locations"],
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  fulfillment_id: { type: "string" },
                  category_id: { type: "string" },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                    },
                    required: ["code"],
                  },
                  time: {
                    type: "object",
                    properties: {
                      label: { type: "string" },
                      duration: { type: "string" },
                      timestamp: { type: "string" },
                    },
                    required: ["label", "duration", "timestamp"],
                  },
                },
                required: [
                  "id",
                  "fulfillment_id",
                  "category_id",
                  "descriptor",
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
                    currency: { type: "string" },
                    value: { type: "string" },
                  },
                  required: ["currency", "value"],
                },
                breakup: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      "@ondc/org/item_id": { type: "string" },
                      "@ondc/org/title_type": { type: "string" },
                      price: {
                        type: "object",
                        properties: {
                          currency: { type: "string" },
                          value: { type: "string" },
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
              },
              required: ["price", "breakup"],
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  type: { type: "string" },
                  "@ondc/org/awb_no": { type: "string" },
                  start: {
                    type: "object",
                    properties: {
                      time: {
                        type: "object",
                        properties: {
                          duration: { type: "string" },
                        },
                        required: ["duration"],
                      },
                      person: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                        },
                        required: ["name"],
                      },
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
                          phone: { type: "string" },
                          email: { type: "string" },
                        },
                        required: ["phone", "email"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          code: { type: "string" },
                          short_desc: { type: "string" },
                          long_desc: { type: "string" },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: { type: "string" },
                              url: { type: "string" },
                            },
                            required: ["content_type", "url"],
                          },
                        },
                        required: [
                          "code",
                          "short_desc",
                          "long_desc",
                          "additional_desc",
                        ],
                      },
                    },
                    required: [
                      "time",
                      "person",
                      "location",
                      "contact",
                      "instructions",
                    ],
                  },
                  end: {
                    type: "object",
                    properties: {
                      person: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                        },
                        required: ["name"],
                      },
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
                          email: { type: "string" },
                        },
                        required: ["phone", "email"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          code: { type: "string" },
                          short_desc: { type: "string" },
                          long_desc: { type: "string" },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: { type: "string" },
                              url: { type: "string" },
                            },
                            required: ["content_type", "url"],
                          },
                        },
                        required: [
                          "code",
                          "short_desc",
                          "long_desc",
                          "additional_desc",
                        ],
                      },
                    },
                    required: ["person", "location", "contact", "instructions"],
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
                  "id",
                  "type",
                  "@ondc/org/awb_no",
                  "start",
                  "end",
                  "tags",
                ],
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
                email: { type: "string" },
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
                type: { type: "string" },
                collected_by: { type: "string" },
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
                      upi_address: { type: "string" },
                      settlement_bank_account_no: { type: "string" },
                      settlement_ifsc_code: { type: "string" },
                    },
                    required: [
                      "settlement_counterparty",
                      "settlement_type",
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
                "@ondc/org/settlement_details",
              ],
            },
            "@ondc/org/linked_order": { type: "object" },
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
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
          required: [
            "id",
            "state",
            "provider",
            "items",
            "quote",
            "fulfillments",
            "billing",
            "payment",
            "tags",
            "created_at",
            "updated_at",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

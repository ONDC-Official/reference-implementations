const constants = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/onConfirmSchema",
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
          const: {
            $data: "/on_search/0/context/city",
          },
        },
        action: {
          type: "string",
          const: "on_confirm",
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
          const: {
            $data: "/search/0/context/transaction_id",
          },
          errorMessage:
            "Transaction ID should be same across the transaction: ${/search/0/context/transaction_id}",
        },
        message_id: {
          type: "string",
          allOf: [
            {
              const: {
                $data: "/confirm/0/context/message_id",
              },
              errorMessage:
                "Message ID for on_action API should be same as action API: ${/confirm/0/context/message_id}",
            },
            {
              not: {
                const: { $data: "1/transaction_id" },
              },
              errorMessage:
                "Message ID should not be equal to transaction_id: ${1/transaction_id}",
            },
            {
              not: {
                const: {
                  $data: "/init/0/context/message_id",
                },
              },
              errorMessage: "Message ID should be unique",
            },
            {
              not: {
                const: {
                  $data: "/search/0/context/message_id",
                },
              },
              errorMessage: "Message ID should be unique",
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
            state: {
              type: "string",
              enum: ["Accepted"],
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
                  fulfillment_id: {
                    type: "string",
                  },
                  category_id: {
                    type: "string",
                    enum: ["Same Day Delivery"],
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        enum: ["P2P"],
                      },
                    },
                    required: ["code"],
                  },
                  time: {
                    type: "object",
                    properties: {
                      label: {
                        type: "string",
                        const: "TAT",
                      },
                      duration: {
                        type: "string",
                        pattern: "^PT\\d+M$",
                      },
                      timestamp: {
                        type: "string",
                        format: "date",
                      },
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
                    currency: {
                      type: "string",
                      const: "INR",
                    },
                    value: {
                      type: "string",
                      pattern: "^\\d+\\.\\d{2}$",
                    },
                  },
                  required: ["currency", "value"],
                },
                breakup: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      "@ondc/org/item_id": {
                        type: "string",
                      },
                      "@ondc/org/title_type": {
                        type: "string",
                        enum: ["delivery", "tax"],
                      },
                      price: {
                        type: "object",
                        properties: {
                          currency: {
                            type: "string",
                            const: "INR",
                          },
                          value: {
                            type: "string",
                            pattern: "^\\d+\\.\\d{2}$",
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
                    enum: ["Delivery"],
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: ["Pending"],
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                    pattern: "^\\d{16}$",
                  },
                  tracking: {
                    type: "boolean",
                    const: false,
                  },
                  start: {
                    type: "object",
                    properties: {
                      person: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                        required: ["name"],
                      },
                      location: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          gps: {
                            type: "string",
                            pattern:
                              "^(-?\\d{1,3}\\.\\d{6,15}),\\s*(-?\\d{1,3}\\.\\d{6,15})$",
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
                          phone: {
                            type: "string",
                            pattern: "^\\d{10}$",
                          },
                          email: {
                            type: "string",
                            format: "email",
                          },
                        },
                        required: ["phone", "email"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          code: { type: "string" },
                          short_desc: { type: "string" },
                          long_desc: { type: "string" },
                          images: {
                            type: "array",
                            items: { type: "string", format: "uri" },
                          },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: { type: "string" },
                              url: { type: "string", format: "uri" },
                            },
                            required: ["content_type", "url"],
                          },
                        },
                        required: ["code", "short_desc", "additional_desc"],
                      },
                      time: {
                        type: "object",
                        properties: {
                          duration: {
                            type: "string",
                            pattern: "^PT\\d+M$",
                          },
                          range: {
                            type: "object",
                            properties: {
                              start: { type: "string", format: "date-time" },
                              end: { type: "string", format: "date-time" },
                            },
                            required: ["start", "end"],
                          },
                        },
                        required: ["duration", "range"],
                      },
                    },
                    required: [
                      "person",
                      "location",
                      "contact",
                      "instructions",
                      "time",
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
                          gps: {
                            type: "string",
                            pattern:
                              "^(-?\\d{1,3}\\.\\d{6,15}),\\s*(-?\\d{1,3}\\.\\d{6,15})$",
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
                          phone: { type: "string", pattern: "^\\d{10}$" },
                          email: { type: "string", format: "email" },
                        },
                        required: ["phone", "email"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          code: { type: "string" },
                          short_desc: { type: "string" },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: { type: "string" },
                              url: { type: "string", format: "uri" },
                            },
                            required: ["content_type", "url"],
                          },
                        },
                        required: ["code", "short_desc", "additional_desc"],
                      },
                      time: {
                        type: "object",
                        properties: {
                          range: {
                            type: "object",
                            properties: {
                              start: { type: "string", format: "date-time" },
                              end: { type: "string", format: "date-time" },
                            },
                            required: ["start", "end"],
                          },
                        },
                        required: ["range"],
                      },
                    },
                    required: [
                      "person",
                      "location",
                      "contact",
                      "instructions",
                      "time",
                    ],
                  },
                  agent: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      phone: { type: "string", pattern: "^\\d{10}$" },
                    },
                    required: ["name", "phone"],
                  },
                  vehicle: {
                    type: "object",
                    properties: {
                      registration: { type: "string" },
                    },
                    required: ["registration"],
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
                  "state",
                  "@ondc/org/awb_no",
                  "tracking",
                  "start",
                  "end",
                  "agent",
                  "vehicle",
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
                phone: { type: "string", pattern: "^\\d{10}$" },
                email: { type: "string", format: "email" },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
              },
              required: [
                "name",
                "address",
                "phone",
                "email",
                "created_at",
                "updated_at",
              ],
            },
            payment: {
              type: "object",
              properties: {
                "@ondc/org/collection_amount": {
                  type: "string",
                  pattern: "^\\d+\\.\\d{2}$",
                },
                collected_by: {
                  type: "string",
                  enum: ["BAP"],
                },
                type: {
                  type: "string",
                  const: "POST-FULFILLMENT",
                },
                "@ondc/org/settlement_basis": {
                  type: "string",
                },
                "@ondc/org/settlement_window": {
                  type: "string",
                },
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
                "collected_by",
                "type",
                "@ondc/org/settlement_basis",
                "@ondc/org/settlement_window",
                "@ondc/org/settlement_details",
              ],
            },
            "@ondc/org/linked_order": {
              type: "object",
              properties: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      category_id: { type: "string" },
                      descriptor: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                        },
                        required: ["name"],
                      },
                      quantity: {
                        type: "object",
                        properties: {
                          count: { type: "integer" },
                          measure: {
                            type: "object",
                            properties: {
                              unit: { type: "string" },
                              value: { type: "number" },
                            },
                            required: ["unit", "value"],
                          },
                        },
                        required: ["count", "measure"],
                      },
                      price: {
                        type: "object",
                        properties: {
                          currency: { type: "string", const: "INR" },
                          value: { type: "string", pattern: "^\\d+\\.\\d{2}$" },
                        },
                        required: ["currency", "value"],
                      },
                    },
                    required: [
                      "category_id",
                      "descriptor",
                      "quantity",
                      "price",
                    ],
                  },
                },
                provider: {
                  type: "object",
                  properties: {
                    descriptor: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                      },
                      required: ["name"],
                    },
                    address: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        building: { type: "string" },
                        locality: { type: "string" },
                        city: { type: "string" },
                        state: { type: "string" },
                        area_code: { type: "string" },
                      },
                      required: [
                        "name",
                        "building",
                        "locality",
                        "city",
                        "state",
                        "area_code",
                      ],
                    },
                  },
                  required: ["descriptor", "address"],
                },
                order: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    weight: {
                      type: "object",
                      properties: {
                        unit: { type: "string" },
                        value: { type: "number" },
                      },
                      required: ["unit", "value"],
                    },
                    dimensions: {
                      type: "object",
                      properties: {
                        length: {
                          type: "object",
                          properties: {
                            unit: { type: "string" },
                            value: { type: "number" },
                          },
                          required: ["unit", "value"],
                        },
                        breadth: {
                          type: "object",
                          properties: {
                            unit: { type: "string" },
                            value: { type: "number" },
                          },
                          required: ["unit", "value"],
                        },
                        height: {
                          type: "object",
                          properties: {
                            unit: { type: "string" },
                            value: { type: "number" },
                          },
                          required: ["unit", "value"],
                        },
                      },
                      required: ["length", "breadth", "height"],
                    },
                  },
                  required: ["id", "weight", "dimensions"],
                },
              },
              required: ["items", "provider", "order"],
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

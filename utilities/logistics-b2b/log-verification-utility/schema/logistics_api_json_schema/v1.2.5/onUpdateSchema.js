const constants = require("../../../utils/constants");
const {
  ORDER_STATE,
  TITLE_TYPE,
  FULFILLMENT_STATE,
  PCC_CODE,
  DCC_CODE,
  CATEGORIES,
  UNITS_WEIGHT,
  UNITS_DIMENSIONS,
} = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/onUpdateSchema",
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
          const: "on_update",
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
              const: "O2",
            },
            state: {
              type: "string",
              enum: ORDER_STATE,
              const: "In-progress",
            },
            provider: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  const: "P1",
                },
                locations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        const: "L1",
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
                    const: "I1",
                  },
                  fulfillment_id: {
                    type: "string",
                    const: "1",
                  },
                  category_id: {
                    type: "string",
                    const: "Same Day Delivery",
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        const: "P2P",
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
                        const: "PT45M",
                      },
                      timestamp: {
                        type: "string",
                        const: "2024-11-20",
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
                      const: "59.00",
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
                        const: "I1",
                      },
                      "@ondc/org/title_type": {
                        type: "string",
                        enum: TITLE_TYPE,
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
                            pattern: "^\\d+\\.\\d{1,2}$",
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
                    const: "1",
                  },
                  type: {
                    type: "string",
                    const: "Delivery",
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: FULFILLMENT_STATE,
                            const: "Order-picked-up",
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                    const: "1227262193237777",
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
                            const: "Ramu",
                          },
                        },
                        required: ["name"],
                      },
                      location: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            const: "S1",
                          },
                          gps: {
                            type: "string",
                            const: "12.4535,77.9283",
                          },
                          address: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                const: "name",
                              },
                              building: {
                                type: "string",
                                const: "My house or building name",
                              },
                              locality: {
                                type: "string",
                                const: "My street name",
                              },
                              city: {
                                type: "string",
                                const: "Bengaluru",
                              },
                              state: {
                                type: "string",
                                const: "Karnataka",
                              },
                              country: {
                                type: "string",
                                const: "India",
                              },
                              area_code: {
                                type: "string",
                                const: "560041",
                              },
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
                            const: "9886098860",
                          },
                          email: {
                            type: "string",
                            const: "abcd.efgh@gmail.com",
                          },
                        },
                        required: ["phone", "email"],
                      },
                      time: {
                        type: "object",
                        properties: {
                          duration: {
                            type: "string",
                            const: "PT15M",
                          },
                          range: {
                            type: "object",
                            properties: {
                              start: {
                                type: "string",
                                format: "date-time",
                                const: "2024-11-20T23:45:00.000Z",
                              },
                              end: {
                                type: "string",
                                format: "date-time",
                                const: "2024-11-20T00:00:00.000Z",
                              },
                            },
                            required: ["start", "end"],
                          },
                          timestamp: {
                            type: "string",
                            format: "date-time",
                            const: "2024-11-20T00:00:00.000Z",
                          },
                        },
                        required: ["duration", "range", "timestamp"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: PCC_CODE,
                            const: "2",
                          },
                          short_desc: {
                            type: "string",
                            const: "value of PCC",
                          },
                          long_desc: {
                            type: "string",
                            const: "additional instructions for pickup",
                          },
                          images: {
                            type: "array",
                            items: {
                              type: "string",
                              const:
                                "link to downloadable shipping label (required for P2H2P)",
                            },
                          },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: {
                                type: "string",
                                const: "text/html",
                              },
                              url: {
                                type: "string",
                                const: "..",
                              },
                            },
                            required: ["content_type", "url"],
                          },
                        },
                        required: ["code", "short_desc", "long_desc"],
                      },
                    },
                    required: [
                      "person",
                      "location",
                      "contact",
                      "time",
                      "instructions",
                    ],
                  },
                  end: {
                    type: "object",
                    properties: {
                      person: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                            const: "person_name",
                          },
                        },
                        required: ["name"],
                      },
                      location: {
                        type: "object",
                        properties: {
                          gps: {
                            type: "string",
                            const: "12.453544,77.928379",
                          },
                          address: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                const: "My house or building #",
                              },
                              building: {
                                type: "string",
                                const: "My house or building name",
                              },
                              locality: {
                                type: "string",
                                const: "My street name",
                              },
                              city: {
                                type: "string",
                                const: "Bengaluru",
                              },
                              state: {
                                type: "string",
                                const: "Karnataka",
                              },
                              country: {
                                type: "string",
                                const: "India",
                              },
                              area_code: {
                                type: "string",
                                const: "560076",
                              },
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
                          phone: {
                            type: "string",
                            const: "9886098860",
                          },
                          email: {
                            type: "string",
                            const: "abcd.efgh@gmail.com",
                          },
                        },
                        required: ["phone", "email"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: DCC_CODE,
                            const: "3",
                          },
                          short_desc: {
                            type: "string",
                            const: "value of DCC",
                          },
                          long_desc: {
                            type: "string",
                            const: "additional instructions for delivery",
                          },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: {
                                type: "string",
                                const: "text/html",
                              },
                              url: {
                                type: "string",
                                const: "..",
                              },
                            },
                            required: ["content_type", "url"],
                          },
                        },
                        required: ["code", "short_desc", "long_desc"],
                      },
                      time: {
                        type: "object",
                        properties: {
                          range: {
                            type: "object",
                            properties: {
                              start: {
                                type: "string",
                                format: "date-time",
                                const: "2024-11-20T02:00:00.000Z",
                              },
                              end: {
                                type: "string",
                                format: "date-time",
                                const: "2024-11-20T02:15:00.000Z",
                              },
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
                      name: {
                        type: "string",
                        const: "person_name",
                      },
                      phone: {
                        type: "string",
                        const: "9886098860",
                      },
                    },
                    required: ["name", "phone"],
                  },
                  vehicle: {
                    type: "object",
                    properties: {
                      registration: {
                        type: "string",
                        const: "3LVJ945",
                      },
                    },
                    required: ["registration"],
                  },
                  "@ondc/org/ewaybillno": {
                    type: "string",
                  },
                  "@ondc/org/ebnexpirydate": {
                    type: "string",
                    format: "date-time",
                    const: "2024-11-20T12:00:00.000Z",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                          enum: [
                            "linked_provider",
                            "linked_order",
                            "linked_order_item",
                            "shipping_label",
                          ],
                        },
                        list: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                              },
                              value: {
                                type: ["string", "number"],
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
                name: {
                  type: "string",
                  const: "ONDC sellerNP",
                },
                address: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      const: "My building no",
                    },
                    building: {
                      type: "string",
                      const: "My building name",
                    },
                    locality: {
                      type: "string",
                      const: "My street name",
                    },
                    city: {
                      type: "string",
                      const: "Bengaluru",
                    },
                    state: {
                      type: "string",
                      const: "Karnataka",
                    },
                    country: {
                      type: "string",
                      const: "India",
                    },
                    area_code: {
                      type: "string",
                      const: "560076",
                    },
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
                tax_number: {
                  type: "string",
                  const: "XXXXXXXXXXXXXXX",
                },
                phone: {
                  type: "string",
                  const: "9886098860",
                },
                email: {
                  type: "string",
                  const: "abcd.efgh@gmail.com",
                },
                created_at: {
                  type: "string",
                  format: "date-time",
                  const: "2024-11-20T21:30:00.000Z",
                },
                updated_at: {
                  type: "string",
                  format: "date-time",
                  const: "2024-11-20T21:30:00.000Z",
                },
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
                "@ondc/org/collection_amount": {
                  type: "string",
                  const: "300.00",
                },
                collected_by: {
                  type: "string",
                  const: "BPP",
                },
                type: {
                  type: "string",
                  const: "POST-FULFILLMENT",
                },
                "@ondc/org/settlement_basis": {
                  type: "string",
                  const: "invoicing",
                },
                "@ondc/org/settlement_window": {
                  type: "string",
                  const: "P15D",
                },
                "@ondc/org/settlement_details": {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      settlement_counterparty: {
                        type: "string",
                        const: "buyer-app",
                      },
                      settlement_type: {
                        type: "string",
                        const: "upi",
                      },
                      upi_address: {
                        type: "string",
                        const: "gft@oksbi",
                      },
                      settlement_bank_account_no: {
                        type: "string",
                        const: "XXXXXXXXXX",
                      },
                      settlement_ifsc_code: {
                        type: "string",
                        const: "XXXXXXXXX",
                      },
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
                      category_id: {
                        type: "string",
                        enum: CATEGORIES,
                        const: "Grocery",
                      },
                      descriptor: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                            const: "Atta",
                          },
                        },
                        required: ["name"],
                      },
                      quantity: {
                        type: "object",
                        properties: {
                          count: {
                            type: "integer",
                            const: 2,
                          },
                          measure: {
                            type: "object",
                            properties: {
                              unit: {
                                type: "string",
                                enum: UNITS_WEIGHT,
                                const: "kilogram",
                              },
                              value: {
                                type: "number",
                                const: 0.5,
                              },
                            },
                            required: ["unit", "value"],
                          },
                        },
                        required: ["count", "measure"],
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
                            const: "150.00",
                          },
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
                        name: {
                          type: "string",
                          const: "Aadishwar Store",
                        },
                      },
                      required: ["name"],
                    },
                    address: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          const: "KHB Towers",
                        },
                        building: {
                          type: "string",
                          const: "Building or House No",
                        },
                        street: {
                          type: "string",
                          const: "6th Block",
                        },
                        locality: {
                          type: "string",
                          const: "Koramangala",
                        },
                        city: {
                          type: "string",
                          const: "Bengaluru",
                        },
                        state: {
                          type: "string",
                          const: "Karnataka",
                        },
                        area_code: {
                          type: "string",
                          const: "560070",
                        },
                      },
                      required: [
                        "name",
                        "building",
                        "street",
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
                    id: {
                      type: "string",
                      const: "O1",
                    },
                    weight: {
                      type: "object",
                      properties: {
                        unit: {
                          type: "string",
                          enum: UNITS_WEIGHT,
                          const: "kilogram",
                        },
                        value: {
                          type: "number",
                          const: 1,
                        },
                      },
                      required: ["unit", "value"],
                    },
                    dimensions: {
                      type: "object",
                      properties: {
                        length: {
                          type: "object",
                          properties: {
                            unit: {
                              type: "string",
                              enum: UNITS_DIMENSIONS,
                              const: "centimeter",
                            },
                            value: {
                              type: "number",
                              const: 1,
                            },
                          },
                          required: ["unit", "value"],
                        },
                        breadth: {
                          type: "object",
                          properties: {
                            unit: {
                              type: "string",
                              enum: UNITS_DIMENSIONS,
                              const: "centimeter",
                            },
                            value: {
                              type: "number",
                              const: 1,
                            },
                          },
                          required: ["unit", "value"],
                        },
                        height: {
                          type: "object",
                          properties: {
                            unit: {
                              type: "string",
                              enum: UNITS_DIMENSIONS,
                              const: "centimeter",
                            },
                            value: {
                              type: "number",
                              const: 1,
                            },
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
            updated_at: {
              type: "string",
              format: "date-time",
              const: "2024-11-20T23:00:30.000Z",
            },
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
            "updated_at",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

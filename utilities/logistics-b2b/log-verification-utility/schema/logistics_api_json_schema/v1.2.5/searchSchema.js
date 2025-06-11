const constants = require("../../../utils/constants");
module.exports = {
  $id: "http://example.com/schema/searchSchema",
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
          not: {
            const: "*",
          },
          pattern: "^std:\\d{3,}$",
          errorMessage: {
            not: "City code cannot be '*', please provide a specific city code (e.g., std:080)",
            pattern: "City code must match pattern std:XXX (e.g., std:080)",
          },
        },
        action: {
          type: "string",
          const: "search",
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
        intent: {
          type: "object",
          properties: {
            category: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  enum: constants.CATEGORY_ID,
                },
              },
              required: ["id"],
            },
            provider: {
              type: "object",
              properties: {
                time: {
                  type: "object",
                  properties: {
                    days: {
                      type: "string",
                      pattern: "^(?!.*(\\d).*\\1)[1-7](?:,[1-7])*(?![1-7])$",
                      errorMessage:
                        "Days format not correct. Ref footnote 9 of 1.1",
                    },
                    schedule: {
                      type: "object",
                      properties: {
                        holidays: {
                          type: "array",
                          items: {
                            type: "string",
                            format: "date",
                          },
                        },
                      },
                      required: ["holidays"],
                    },
                    duration: {
                      type: "string",
                    },
                    range: {
                      type: "object",
                      properties: {
                        start: {
                          type: "string",
                          pattern: "^(?:[01][0-9]|2[0-3])[0-5][0-9]$",
                        },
                        end: {
                          type: "string",
                          pattern: "^(?:[01][0-9]|2[0-3])[0-5][0-9]$",
                        },
                      },
                      isEndTimeGreater: true,
                      required: ["start", "end"],
                    },
                  },
                  required: ["days", "schedule", "duration", "range"],
                },
              },
            },
            fulfillment: {
              type: "object",
              properties: {
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
                        id: {
                          type: "string",
                        },
                        gps: {
                          type: "string",
                          pattern:
                            "^(-?[0-9]{1,3}(?:.[0-9]{6,15})?),( )*?(-?[0-9]{1,3}(?:.[0-9]{6,15})?)$",
                          errorMessage:
                            "Incorrect gps value (min 6 decimal digits required)",
                        },
                        address: {
                          type: "object",
                          properties: {
                            area_code: {
                              type: "string",
                            },
                          },
                          required: ["area_code"],
                        },
                      },
                      required: ["gps", "address"],
                    },
                    authorization: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                          enum: ["OTP"],
                        },
                      },
                      required: ["type"],
                    },
                    instructions: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                      },
                      required: ["code"],
                    },
                  },
                  required: ["location"],
                },
                end: {
                  type: "object",
                  properties: {
                    location: {
                      type: "object",
                      properties: {
                        gps: {
                          type: "string",
                          pattern:
                            "^(-?[0-9]{1,3}(?:.[0-9]{6,15})?),( )*?(-?[0-9]{1,3}(?:.[0-9]{6,15})?)$",
                          allOf: [
                            {
                              not: {
                                const: { $data: "3/start/location/gps" },
                              },
                              errorMessage:
                                "cannot be equal to start/location/gps '${3/start/location/gps}'",
                            },
                          ],
                          errorMessage:
                            "Incorrect gps value (min 6 decimal digits required)",
                        },
                        address: {
                          type: "object",
                          properties: {
                            area_code: {
                              type: "string",
                            },
                          },
                          required: ["area_code"],
                        },
                      },
                      required: ["gps", "address"],
                    },
                    authorization: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                          enum: ["OTP"],
                        },
                      },
                      required: ["type"],
                    },
                    instructions: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                      },
                      required: ["code"],
                    },
                  },
                  required: ["location"],
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
                          "fulfill_request",
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
                          additionalProperties: false,
                        },
                      },
                    },
                    required: ["code", "list"],
                    additionalProperties: false,
                    if: {
                      properties: {
                        code: { const: "linked_order" },
                      },
                    },
                    then: {
                      properties: {
                        list: {
                          contains: {
                            properties: {
                              code: { const: "category" },
                              value: {
                                type: "string",
                                enum: [
                                  "F&B",
                                  "Grocery",
                                  "Fashion",
                                  "BPC",
                                  "Electronics",
                                  "Appliances",
                                  "Home & Kitchen",
                                  "Health & Wellness",
                                  "Pharma",
                                  "Auto components",
                                  "C2C parcels",
                                ],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              required: ["type", "start", "end"],
            },
            payment: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: constants.PAYMENT_TYPE,
                },
                "@ondc/org/collection_amount": {
                  type: "string",
                },
              },
              required: ["type"],
            },
            "@ondc/org/payload_details": {
              type: "object",
              properties: {
                weight: {
                  type: "object",
                  properties: {
                    unit: {
                      type: "string",
                      enum: constants.UNITS_WEIGHT,
                    },
                    value: {
                      type: "number",
                      minimum: 0,
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
                          enum: constants.UNITS_DIMENSIONS,
                        },
                        value: {
                          type: "number",
                          minimum: 0,
                        },
                      },
                      required: ["unit", "value"],
                    },
                    breadth: {
                      type: "object",
                      properties: {
                        unit: {
                          type: "string",
                          enum: constants.UNITS_DIMENSIONS,
                        },
                        value: {
                          type: "number",
                          minimum: 0,
                        },
                      },
                      required: ["unit", "value"],
                    },
                    height: {
                      type: "object",
                      properties: {
                        unit: {
                          type: "string",
                          enum: constants.UNITS_DIMENSIONS,
                        },
                        value: {
                          type: "number",
                          minimum: 0,
                        },
                      },
                      required: ["unit", "value"],
                    },
                  },
                  required: ["length", "breadth", "height"],
                },
                category: {
                  type: "string",
                  enum: constants.CATEGORIES,
                },
                dangerous_goods: {
                  type: "boolean",
                },
                value: {
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
              required: ["weight", "category", "value"],
            },
            tags: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    const: "lbnp_features",
                  },
                  list: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                          enum: [
                            "00B",
                            "00E",
                            "01D",
                            "005",
                            "009",
                            "00C",
                            "000",
                            "001",
                            "002",
                            "003",
                            "004",
                            "006",
                            "007",
                            "008",
                            "00A",
                            "00D",
                            "00F",
                            "010",
                            "011",
                            "012",
                            "013",
                            "014",
                            "015",
                            "016",
                            "017",
                            "018",
                            "019",
                            "01A",
                            "01B",
                            "01C",
                            "01E",
                            "01F",
                            "020",
                            "021",
                          ],
                        },
                        value: {
                          type: "string",
                          enum: ["yes", "no"],
                        },
                      },
                      required: ["code", "value"],
                      additionalProperties: false,
                    },
                    minItems: 1,
                  },
                },
                required: ["code", "list"],
                additionalProperties: false,
              },
            },
          },
          required: [
            "category",
            "fulfillment",
            "payment",
            "provider",
            "@ondc/org/payload_details",
          ],
        },
      },
      required: ["intent"],
    },
  },
  required: ["context", "message"],
};

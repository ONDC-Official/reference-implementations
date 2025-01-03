module.exports = {
  $id: "http://example.com/schema/searchSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
        },
        location: {
          type: "object",
          properties: {
            city: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  enum: ["std:999"],
                  errorMessage: "Invalid city code for exports",
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
          const: "search",
        },
        version: {
          type: "string",
          const: "2.0.2",
        },
        bap_id: {
          type: "string",
        },
        bap_uri: {
          type: "string",
          format: "uri",
        },
        transaction_id: {
          type: "string",
        },
        message_id: {
          type: "string",
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
        "location",
        "action",
        "version",
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
            item: {
              type: "object",
              properties: {
                descriptor: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                  },
                  required: ["name"],
                },
              },
            },
            fulfillment: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["Delivery"],
                },
                stops: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        enum: ["end"],
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
                          area_code: {
                            type: "string",
                          },
                        },
                        required: ["gps", "area_code"],
                      },
                    },
                    required: ["type", "location"],
                  },
                },
              },
              required: ["type", "stops"],
            },
            payment: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: [
                    "PRE-FULFILLMENT",
                    "ON-FULFILLMENT",
                    "POST-FULFILLMENT",
                  ],
                },
              },
              required: ["type"],
            },
            tags: {
              type: "array",
              minItems: 1,
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        enum: ["bap_terms"],
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
                    minItems: 2,
                  },
                },
                required: ["descriptor", "list"],
                if: {
                  properties: {
                    descriptor: {
                      properties: { code: { const: "bap_terms" } },
                    },
                  },
                },
                then: {
                  properties: {
                    list: {
                      items: {
                        type: "object",
                        properties: {
                          descriptor: {
                            properties: {
                              code: {
                                enum: ["finder_fee_type", "finder_fee_amount"],
                              },
                            },
                          },
                        },
                        required: ["descriptor"],
                      },
                    },
                  },
                  errorMessage:
                    "For 'bap_terms', the 'list' must contain either 'finder_fee_type' or 'finder_fee_amount'.",
                }
             },
            },
          },
          additionalProperties: false,
          required: ["fulfillment", "payment", "tags"],
        },
      },
      required: ["intent"],
    },
  },
  required: ["context", "message"],
  additionalProperties: false,
};
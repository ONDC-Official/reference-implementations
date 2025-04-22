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
                      required: ["id", "gps", "address"],
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
              required: ["type", "start", "end", "tags"],
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
              allOf: [
                {
                  if: {
                    properties: { type: { const: "POST-FULFILLMENT" } },
                  },
                  then: {
                    required: ["@ondc/org/collection_amount"],
                  },
                },
                {
                  if: {
                    properties: {
                      type: { enum: ["ON-ORDER", "POST-FULFILLMENT"] },
                    },
                  },
                  then: {
                    not: { required: ["@ondc/org/collection_amount"] },
                    errorMessage:
                      "@ondc/org/collection_amount is required only for payment/type 'POST-FULFILLMENT'",
                  },
                },
              ],
            },
            tags: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
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
          required: ["category", "fulfillment", "payment", "provider", "tags"],
        },
      },
      required: ["intent"],
    },
  },
  required: ["context", "message"],
};

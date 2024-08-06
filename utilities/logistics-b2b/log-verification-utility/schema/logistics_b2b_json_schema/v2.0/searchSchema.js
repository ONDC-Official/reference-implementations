const {
  MESSAGE_INTENT_CATEGORY_DESCRIPTOR_CODE,
  CONTEXT_DOMAIN,
  VERSION,
  PAYMENT_BPP_TERMS,
  PAYMENT_TERMS,
} = require("../constants");
const { isEndTimeGreater } = require("./keywords/search");

module.exports = {
  $id: "http://example.com/schema/searchSchema",
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
          const: VERSION,
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
            category: {
              type: "object",
              properties: {
                descriptor: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      enum: MESSAGE_INTENT_CATEGORY_DESCRIPTOR_CODE,
                    },
                  },
                  required: ["code"],
                },
              },
              required: ["descriptor"],
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
                          },
                        },
                      },
                      required: ["holidays"],
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
                  required: ["days", "schedule", "range"],
                },
              },
              required: ["time"],
            },
            fulfillments: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["Delivery", "Return"],
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
                      },
                      location: {
                        type: "object",
                        properties: {
                          gps: {
                            type: "string",
                            pattern:
                              "^(-?[0-9]{1,3}(?:.[0-9]{1,15})?),( )*?(-?[0-9]{1,3}(?:.[0-9]{1,15})?)$",
                            errorMessage: "Incorrect gps value",
                          },
                          area_code: {
                            type: "string",
                          },
                        },
                        required: ["gps", "area_code"],
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
                    required: ["id", "parent_stop_id", "type", "location"],
                  },
                  hasStartAndEndStops: true,
				  isStartTimeValid: true,
                },
              },
              required: ["type", "stops"],
            },
            payments: {
              type: "object",
              properties: {
                collected_by: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                tags: {
                  type: "array",
                  items: [
                    {
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
                          items: [
                            {
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
                          ],
                        },
                      },
                      required: ["descriptor", "list"],
                    },
                  ],
                },
              },
              required: ["type"],
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
                  },
                },
                required: ["descriptor", "list"],
              },
            },
          },
          required: ["provider", "fulfillments", "payment", "tags"],
        },
      },
      required: ["intent"],
    },
  },
  required: ["context", "message"],
};

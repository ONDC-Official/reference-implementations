const {
  CONTEXT_DOMAIN,
  VERSION,
  TERMS,
  LOG_ORDER_TAGS,
  PAYMENT_TERMS,
  PAYMENT_BPP_TERMS,
  FULFILLMENT_TYPES,
  FULFILLMENT_STATES,
  DELIVERY_TERMS_TAGS,
  QUOTE_TITLE,
} = require("../constants");

module.exports = {
  $id: "http://example.com/schema/onStatusSchema",
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
          const: "on_status",
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
        },
        ttl: {
          type: "string",
          format: "date-time",
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
              const: { $data: "/confirm/0/message/order/id" },
            },
            status: {
              type: "string",
              enum: [
                "Created",
                "Accepted",
                "Cancelled",
                "In-progress",
                "Completed",
              ],
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
                      enum: ["007"],
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
                  const: {
                    $data: "/init/0/message/order/provider/id",
                  },
                  errorMessage: "mismatches between /init and /on_status",
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
                        errorMessage: "mismatches between /init and /on_status",
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
                    const: {
                      $data: "/init/0/message/order/items/0/category_ids",
                    },
                  },
                  fulfillment_ids: {
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
                        const: {
                          $data:
                            "/init/0/message/order/items/0/descriptor/code",
                        },
                      },
                    },
                    required: ["code"],
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
                required: ["id", "category_ids", "descriptor", "time"],
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
              isQuoteMatching: true,
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
                            enum: FULFILLMENT_STATES,
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
                              pattern:
                                "^(-?[0-9]{1,3}(?:.[0-9]{6,15})?),( )*?(-?[0-9]{1,3}(?:.[0-9]{6,15})?)$",
                              errorMessage:
                                "Incorrect gps value (minimum of six decimal places are required)",
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
                              pattern: "^(\\d{10})$",
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
                            code: {
                              type: "string",
                            },
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
                            images: {
                              type: "array",
                              items: [
                                {
                                  type: "string",
                                },
                              ],
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
                            timestamp: {
                              type: "string",
                            },
                          },
                          required: ["range"],
                        },
                      },
                      required: [
                        "id",
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
                              const: "Delivery_Terms",
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
                  const: {
                    $data: "/confirm/0/message/order/billing/name",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_status",
                },
                address: {
                  type: "string",
                  const: {
                    $data: "/confirm/0/message/order/billing/address/name",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_status",
                },
                city: {
                  type: "string",
                  const: {
                    $data: "/confirm/0/message/order/billing/address/city",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_status",
                },
                state: {
                  type: "string",
                  const: {
                    $data: "/confirm/0/message/order/billing/address/state",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_status",
                },
                tax_id: {
                  type: "string",
                  const: {
                    $data: "/confirm/0/message/order/billing/tax_id",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_status",
                },
                phone: {
                  type: "string",
                  const: {
                    $data: "/confirm/0/message/order/billing/phone",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_status",
                },
                email: {
                  type: "string",
                  const: {
                    $data: "/confirm/0/message/order/billing/email",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_status",
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
                    const: {
                      $data: "/confirm/0/message/order/payments/0/id",
                    },
                    errorMessage:
                      "mismatches in /billing in /confirm and /on_status",
                  },
                  collected_by: {
                    type: "string",
                    const: {
                      $data: "/confirm/0/message/order/payments/0/collected_by",
                    },
                    errorMessage:
                      "mismatches in /billing in /confirm and /on_status",
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
                    required: [
                      "amount",
                      "currency",
                      "bank_account_number",
                      "virtual_payment_address",
                    ],
                  },
                  type: {
                    type: "string",
                    enum: ["ON-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"],
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
                  },
                },
                required: ["id", "collected_by", "params", "type", "tags"],
              },
            },
            tags: {
              type: "object",
              properties: {
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
              required: ["tags"],
              oneOf: [
                {
                  properties: {
                    tags: {
                      const: { $data: "/confirm/0/message/order/tags" },
                    },
                  },
                },
                {
                  properties: {
                    tags: {
                      const: { $data: "/update/0/message/order/tags" },
                    },
                  },
                },
              ],
            },
            updated_at: {
              type: "string",
            },
          },
          required: [
            "id",
            "status",
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

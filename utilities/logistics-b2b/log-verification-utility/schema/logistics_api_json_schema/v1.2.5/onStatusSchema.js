module.exports = {
  $id: "http://example.com/schema/onStatusSchema",
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
          const: "on_status",
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
              enum: ["Completed", "Cancelled", "In-progress", "Pending"],
            },
            cancellation: {
              type: "object",
              properties: {
                cancelled_by: {
                  type: "string",
                  format: "hostname",
                },
                reason: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      pattern: "^\\d+$",
                    },
                  },
                  required: ["id"],
                },
              },
              required: ["cancelled_by", "reason"],
              if: {
                properties: {
                  state: { const: "Cancelled" },
                },
              },
              then: { required: ["cancellation"] },
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
                  minItems: 1,
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
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
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
                        pattern: "^PT\\d+[MH]$",
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
              minItems: 1,
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
                        enum: ["delivery", "tax", "rto", "convenience"],
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
                  minItems: 1,
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
                    enum: ["Delivery", "RTO", "Pickup", "Delivery and Pickup"],
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                          },
                          short_desc: {
                            type: "string",
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
                  start: {
                    type: "object",
                    properties: {
                      person: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                        },
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
                          phone: { type: "string", pattern: "^\\d{10}$" },
                          email: { type: "string", format: "email" },
                        },
                      },
                      time: {
                        type: "object",
                        properties: {
                          duration: { type: "string", pattern: "^PT\\d+[MH]$" },
                          range: {
                            type: "object",
                            properties: {
                              start: { type: "string", format: "date-time" },
                              end: { type: "string", format: "date-time" },
                            },
                          },
                          timestamp: { type: "string", format: "date-time" },
                        },
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          code: { type: "string" },
                          name: { type: "string" },
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
                          },
                        },
                      },
                      authorization: {
                        type: "object",
                        properties: {
                          type: { type: "string", const: "OTP" },
                          token: { type: "string" },
                          valid_from: { type: "string", format: "date-time" },
                          valid_to: { type: "string", format: "date-time" },
                        },
                      },
                    },
                    allOf: [
                      {
                        if: {
                          properties: {
                            type: {
                              const: "Delivery",
                              $data: "2/type", // Reference to fulfillment type from parent
                            },
                          },
                          required: ["type"],
                        },
                        then: {
                          required: [
                            "person",
                            "location",
                            "contact",
                            "time",
                            "id",
                          ],
                          properties: {
                            person: { required: ["name"] },
                            location: {
                              required: ["id", "gps", "address"],
                              properties: {
                                address: {
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
                            },
                            contact: { required: ["phone", "email"] },
                            time: {
                              required: ["duration", "range", "timestamp"],
                              properties: {
                                range: { required: ["start", "end"] },
                              },
                            },
                            instructions: {
                              required: ["code", "name", "short_desc"],
                            },
                            authorization: {
                              required: [
                                "type",
                                "token",
                                "valid_from",
                                "valid_to",
                              ],
                            },
                          },
                        },
                      },
                      {
                        if: {
                          properties: {
                            type: {
                              const: "RTO",
                              $data: "2/type", // Reference to fulfillment type from parent
                            },
                          },
                          required: ["type"],
                        },
                        then: {
                          // Only basic requirements for RTO
                          required: ["person"],
                          properties: {
                            person: { required: ["name"] },
                          },
                        },
                      },
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
                              area_code: {
                                type: "string",
                                pattern: "^\\d{6}$",
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
                          phone: { type: "string", pattern: "^\\d{10}$" },
                          email: { type: "string", format: "email" },
                        },
                        required: ["phone", "email"],
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
                          timestamp: { type: "string", format: "date-time" },
                        },
                        required: ["range", "timestamp"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          code: { type: "string" },
                          name: { type: "string" },
                          short_desc: { type: "string" },
                          long_desc: { type: "string" },
                        },
                        required: ["code", "name", "short_desc"],
                      },
                      authorization: {
                        type: "object",
                        properties: {
                          type: { type: "string", const: "OTP" },
                          token: { type: "string" },
                          valid_from: { type: "string", format: "date-time" },
                          valid_to: { type: "string", format: "date-time" },
                        },
                        required: ["type", "token", "valid_from", "valid_to"],
                      },
                    },
                    required: ["person", "location", "contact", "time"],
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
                  "@ondc/org/ewaybillno": { type: "string" },
                  "@ondc/org/ebnexpirydate": {
                    type: "string",
                    format: "date-time",
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
                allOf: [
                  {
                    if: {
                      properties: { type: { const: "Delivery" } },
                      required: ["type"],
                    },
                    then: {
                      required: ["start", "end", "agent", "tags"],
                    },
                  },
                  {
                    if: {
                      properties: { type: { const: "Delivery and Pickup" } },
                      required: ["type"],
                    },
                    then: {
                      required: ["start", "end", "agent", "tags"],
                    },
                  },
                ],
                required: ["id", "type", "state"],
              },
              minItems: 1,
            },
            payment: {
              type: "object",
              properties: {
                "@ondc/org/collection_amount": {
                  type: "string",
                  pattern: "^\\d+\\.\\d{2}$",
                },
                type: {
                  type: "string",
                  enum: ["POST-FULFILLMENT", "ON-ORDER", "ON-FULFILLMENT"],
                },
                collected_by: {
                  type: "string",
                  enum: ["BPP", "BAP"],
                },
                "@ondc/org/settlement_basis": {
                  type: "string",
                  enum: ["invoicing", "shipment", "delivery"],
                },
                "@ondc/org/settlement_window": {
                  type: "string",
                  pattern: "^P\\d+D$",
                },
                status: {
                  type: "string",
                  enum: ["PAID", "NOT-PAID"],
                },
                time: {
                  type: "object",
                  properties: {
                    timestamp: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                  required: ["timestamp"],
                },
                "@ondc/org/settlement_details": {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      settlement_counterparty: {
                        type: "string",
                      },
                      settlement_type: {
                        type: "string",
                        enum: ["upi", "neft", "rtgs", "wallet"],
                      },
                      upi_address: {
                        type: "string",
                      },
                      settlement_bank_account_no: {
                        type: "string",
                      },
                      settlement_ifsc_code: {
                        type: "string",
                      },
                      settlement_status: {
                        type: "string",
                        enum: ["PAID", "NOT-PAID"],
                      },
                      settlement_reference: {
                        type: "string",
                      },
                      settlement_timestamp: {
                        type: "string",
                        format: "date-time",
                      },
                    },
                    required: [
                      "settlement_counterparty",
                      "settlement_type",
                      "settlement_status",
                      "settlement_timestamp",
                    ],
                  },
                },
              },
              required: [
                "type",
                "collected_by",
                "status",
                "time",
                "@ondc/org/settlement_window",
                "@ondc/org/settlement_basis",
              ],
              allOf: [
                {
                  if: {
                    properties: { type: { const: "POST-FULFILLMENT" } },
                  },
                  then: {
                    required: ["@ondc/org/collection_amount"],
                  },
                },
              ],
            },
            billing: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                address: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    building: {
                      type: "string",
                    },
                    locality: {
                      type: "string",
                    },
                    city: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    country: {
                      type: "string",
                    },
                    area_code: {
                      type: "string",
                      pattern: "^\\d{6}$",
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
                },
                phone: {
                  type: "string",
                  pattern: "^\\d{10}$",
                },
                email: {
                  type: "string",
                  format: "email",
                },
              },
              required: ["name", "address", "phone", "email"],
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
                      },
                      descriptor: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                        required: ["name"],
                      },
                      quantity: {
                        type: "object",
                        properties: {
                          count: {
                            type: "integer",
                          },
                          measure: {
                            type: "object",
                            properties: {
                              unit: {
                                type: "string",
                              },
                              value: {
                                type: "number",
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
                            pattern: "^\\d+\\.\\d{2}$",
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
                        },
                      },
                      required: ["name"],
                    },
                    address: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        building: {
                          type: "string",
                        },
                        street: {
                          type: "string",
                        },
                        locality: {
                          type: "string",
                        },
                        city: {
                          type: "string",
                        },
                        state: {
                          type: "string",
                        },
                        area_code: {
                          type: "string",
                          pattern: "^\\d{6}$",
                        },
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
                    id: {
                      type: "string",
                    },
                    weight: {
                      type: "object",
                      properties: {
                        unit: {
                          type: "string",
                        },
                        value: {
                          type: "number",
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
                            },
                            value: {
                              type: "number",
                            },
                          },
                          required: ["unit", "value"],
                        },
                        breadth: {
                          type: "object",
                          properties: {
                            unit: {
                              type: "string",
                            },
                            value: {
                              type: "number",
                            },
                          },
                          required: ["unit", "value"],
                        },
                        height: {
                          type: "object",
                          properties: {
                            unit: {
                              type: "string",
                            },
                            value: {
                              type: "number",
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
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
          required: [
            "id",
            "state",
            "provider",
            "items",
            "tags",
            "quote",
            "fulfillments",
            "payment",
            "billing",
            "updated_at",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

module.exports = {
  $id: "http://example.com/schema/updateSchema",
  title: "ONDC Logistics Update Fulfillment Schema",
  type: "object",
  required: ["context", "message"],
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
          const: "update",
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
      required: ["update_target", "order"],
      properties: {
        update_target: { type: "string", const: "fulfillment" },
        order: {
          type: "object",
          required: ["id", "items", "fulfillments", "updated_at"],
          properties: {
            id: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "category_id", "descriptor"],
                properties: {
                  id: { type: "string" },
                  category_id: { type: "string" },
                  descriptor: {
                    type: "object",
                    required: ["code"],
                    properties: {
                      code: { type: "string" },
                    },
                  },
                },
              },
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                required: [
                  "id",
                  "type",
                  "@ondc/org/awb_no",
                  "start",
                  "end",
                  "tags",
                ],
                properties: {
                  id: { type: "string" },
                  type: { type: "string", const: "Delivery" },
                  "@ondc/org/awb_no": { type: "string" },
                  start: {
                    type: "object",
                    required: ["instructions", "authorization"],
                    properties: {
                      instructions: {
                        type: "object",
                        required: [
                          "code",
                          "short_desc",
                          "long_desc",
                          "additional_desc",
                        ],
                        properties: {
                          code: { type: "string" },
                          short_desc: { type: "string" },
                          long_desc: { type: "string" },
                          additional_desc: {
                            type: "object",
                            required: ["content_type", "url"],
                            properties: {
                              content_type: { type: "string" },
                              url: { type: "string" },
                            },
                          },
                        },
                      },
                      authorization: {
                        type: "object",
                        required: ["type", "token", "valid_from", "valid_to"],
                        properties: {
                          type: { type: "string" },
                          token: { type: "string" },
                          valid_from: { type: "string", format: "date-time" },
                          valid_to: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                  end: {
                    type: "object",
                    required: ["instructions"],
                    properties: {
                      instructions: {
                        type: "object",
                        required: ["code", "short_desc", "long_desc"],
                        properties: {
                          code: { type: "string" },
                          short_desc: { type: "string" },
                          long_desc: { type: "string" },
                        },
                      },
                    },
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["code", "list"],
                      properties: {
                        code: { type: "string" },
                        list: {
                          type: "array",
                          items: {
                            type: "object",
                            required: ["code", "value"],
                            properties: {
                              code: { type: "string" },
                              value: { type: "string" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "@ondc/org/linked_order": {
              type: "object",
              required: ["items", "order"],
              properties: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    required: [
                      "category_id",
                      "descriptor",
                      "quantity",
                      "price",
                    ],
                    properties: {
                      category_id: { type: "string" },
                      descriptor: {
                        type: "object",
                        required: ["name"],
                        properties: {
                          name: { type: "string" },
                        },
                      },
                      quantity: {
                        type: "object",
                        required: ["count", "measure"],
                        properties: {
                          count: { type: "number" },
                          measure: {
                            type: "object",
                            required: ["unit", "value"],
                            properties: {
                              unit: { type: "string" },
                              value: { type: "number" },
                            },
                          },
                        },
                      },
                      price: {
                        type: "object",
                        required: ["currency", "value"],
                        properties: {
                          currency: { type: "string" },
                          value: { type: "string" },
                        },
                      },
                    },
                  },
                },
                order: {
                  type: "object",
                  required: ["id", "weight", "dimensions"],
                  properties: {
                    id: { type: "string" },
                    weight: {
                      type: "object",
                      required: ["unit", "value"],
                      properties: {
                        unit: { type: "string" },
                        value: { type: "number" },
                      },
                    },
                    dimensions: {
                      type: "object",
                      required: ["length", "breadth", "height"],
                      properties: {
                        length: {
                          type: "object",
                          required: ["unit", "value"],
                          properties: {
                            unit: { type: "string" },
                            value: { type: "number" },
                          },
                        },
                        breadth: {
                          type: "object",
                          required: ["unit", "value"],
                          properties: {
                            unit: { type: "string" },
                            value: { type: "number" },
                          },
                        },
                        height: {
                          type: "object",
                          required: ["unit", "value"],
                          properties: {
                            unit: { type: "string" },
                            value: { type: "number" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            updated_at: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
};

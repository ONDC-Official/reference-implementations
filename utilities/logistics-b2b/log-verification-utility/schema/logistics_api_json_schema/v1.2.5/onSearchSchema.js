const constants = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/onSearchSchema",
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
          const: "on_search",
        },
        core_version: {
          type: "string",
          const: "1.2.5",
        },
        bap_id: {
          type: "string",
          const: { $data: "/search/0/context/bap_id" },
          errorMessage:
            "bap_id must match the value from search: ${/search/0/context/bap_id}",
        },
        bap_uri: {
          type: "string",
          const: { $data: "/search/0/context/bap_uri" },
          errorMessage:
            "bap_uri must match the value from search: ${/search/0/context/bap_uri}",
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
              const: { $data: "/search/0/context/message_id" },
              errorMessage:
                "Message ID for on_action API should be same as action API: ${/search/0/context/message_id}",
            },
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
        catalog: {
          type: "object",
          properties: {
            "bpp/descriptor": {
              type: "object",
              properties: {
                name: { type: "string" },
                tags: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      code: { type: "string", const: "bpp_terms" },
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
              required: ["name", "tags"],
            },
            "bpp/providers": {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  descriptor: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      short_desc: { type: "string" },
                      long_desc: { type: "string" },
                    },
                    required: ["name", "short_desc", "long_desc"],
                  },
                  categories: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", enum: constants.CATEGORY_ID },
                        time: {
                          type: "object",
                          properties: {
                            label: { type: "string", const: "TAT" },
                            duration: {
                              type: "string",
                              format: "duration",
                              pattern: "^PT([1-5][1-9]|60)?M$",
                              errorMessage:
                                "Duration is not correct as per Immediate Delivery",
                            },
                            timestamp: { type: "string", format: "date" },
                          },
                          required: ["label", "duration", "timestamp"],
                        },
                      },
                      required: ["id"],
                    },
                  },
                  fulfillments: {
                    type: "array",
                    minItems: 1,
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        type: {
                          type: "string",
                          enum: constants.FULFILLMENT_TYPE,
                        },
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
                          },
                          required: ["time"],
                        },
                        tags: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              code: { type: "string", enum: ["distance"] },
                              list: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    code: {
                                      type: "string",
                                      enum: [
                                        "motorable_distance_type",
                                        "motorable_distance",
                                      ],
                                    },
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
                      additionalProperties: false,
                      required: ["id", "type"],
                    },
                  },
                  locations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        gps: { type: "string" },
                        address: {
                          type: "object",
                          properties: {
                            street: { type: "string" },
                            city: { type: "string" },
                            area_code: { type: "string" },
                            state: { type: "string" },
                          },
                          required: ["street", "city", "area_code", "state"],
                        },
                      },
                    },
                  },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        parent_item_id: { type: "string" },
                        category_id: {
                          type: "string",
                          enum: constants.CATEGORY_ID,
                        },
                        fulfillment_id: { type: "string" },
                        descriptor: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                              enum: constants.SHIPMENT_TYPE,
                            },
                            name: { type: "string" },
                            short_desc: { type: "string" },
                            long_desc: { type: "string" },
                          },
                          required: ["code", "name", "short_desc", "long_desc"],
                        },
                        price: {
                          type: "object",
                          properties: {
                            currency: { type: "string" },
                            value: {
                              type: "string",
                              pattern: "^[0-9]+(\\.[0-9]{1,2})?$",
                              errorMessage:
                                "precision for all prices in quote can be maximum of 2 decimal digits",
                            },
                          },
                          required: ["currency", "value"],
                        },
                        time: {
                          type: "object",
                          properties: {
                            label: { type: "string", const: "TAT" },
                            duration: { type: "string", format: "duration" },
                            timestamp: { type: "string", format: "date" },
                          },
                          required: ["label", "duration", "timestamp"],
                        },
                      },
                      additionalProperties: false,
                      required: [
                        "id",
                        "parent_item_id",
                        "category_id",
                        "fulfillment_id",
                        "descriptor",
                        "price",
                      ],
                    },
                  },
                },
                required: [
                  "id",
                  "descriptor",
                  "categories",
                  "items",
                  "fulfillments",
                ],
              },
            },
            tags: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: { type: "string", const: "lsp_features" },
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
          additionalProperties: false,
          required: ["bpp/descriptor", "bpp/providers", "tags"],
        },
      },
      required: ["catalog"],
    },
  },
  required: ["context", "message"],
};

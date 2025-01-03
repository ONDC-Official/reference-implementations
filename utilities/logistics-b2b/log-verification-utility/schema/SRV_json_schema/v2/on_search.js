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
        },
        location: {
          type: "object",
          properties: {
            city: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  const: { $data: "/search/0/context/location/city/code" },
                },
              },
              required: ["code"],
            },
            country: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  const: { $data: "/search/0/context/location/country/code" },
                },
              },
              required: ["code"],
            },
          },
          required: ["city", "country"],
        },
        action: {
          type: "string",
          const: "on_search",
        },
        version: {
          type: "string",
          const: "2.0.0",
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
        catalog: {
          type: "object",
          properties: {
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
                    enum: constants.SRV_FULFILLMENT_TYPE,
                  },
                },
                required: ["id", "type"],
              },
            },
            payments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                    enum: constants.SRV_PAYMENT_TYPE,
                  },
                },
                required: ["id", "type"],
              },
            },
            descriptor: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                short_desc: {
                  type: "string",
                },
                long_desc: {
                  type: "string",
                },
                images: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      url: {
                        type: "string",
                      },
                    },
                    required: ["url"],
                  },
                },
              },
              required: ["name", "short_desc", "long_desc", "images"],
            },
            providers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      code: {
                        type: "string",
                      },
                      short_desc: {
                        type: "string",
                      },
                      long_desc: {
                        type: "string",
                      },
                      images: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            url: {
                              type: "string",
                            },
                          },
                          required: ["url"],
                        },
                      },
                    },
                    required: ["name", "code", "short_desc", "long_desc"],
                  },
                  rating: {
                    type: "string",
                  },
                  ttl: {
                    type: "string",
                  },
                  time: {
                    type: "object",
                    properties: {
                      label: {
                        type: "string",
                      },
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
                      schedule: {
                        type: "object",
                        properties: {
                          frequency: {
                            type: "string",
                          },
                          holidays: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          times: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                        required: ["frequency"],
                      },
                    },
                    required: ["label", "schedule"],
                  },
                  locations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        gps: {
                          type: "string",
                        },
                        address: {
                          type: "string",
                        },
                        city: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                          },
                          required: ["code", "name"],
                        },
                        state: {
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
                        area_code: {
                          type: "string",
                        },
                      },
                      required: [
                        "id",
                        "gps",
                        "address",
                        "city",
                        "state",
                        "country",
                        "area_code",
                      ],
                    },
                  },
                  creds: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                        desc: {
                          type: "string",
                        },
                        url: {
                          type: "string",
                        },
                      },
                      required: ["id", "type", "desc", "url"],
                    },
                  },
                  categories: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        descriptor: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            code: {
                              type: "string",
                            },
                          },
                          required: ["name", "code"],
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
                              enum:["serviceability"]
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
                                    enum:["location", "category", "type", "val", "unit"]
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
                          minItems:5,
                          allOf: [
                            {
                              contains: {
                                properties: {
                                  descriptor: {
                                    properties: {
                                      code: {
                                        const: "location",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            {
                              contains: {
                                properties: {
                                  descriptor: {
                                    properties: {
                                      code: {
                                        const: "category",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            {
                              contains: {
                                properties: {
                                  descriptor: {
                                    properties: {
                                      code: { const: "type" },
                                    },
                                  },
                                },
                              },
                            },
                            {
                              contains: {
                                properties: {
                                  descriptor: {
                                    properties: {
                                      code: {
                                        const: "val",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            {
                              contains: {
                                properties: {
                                  descriptor: {
                                    properties: {
                                      code: {
                                        const: "unit",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                      required: ["descriptor", "list"],
                    },
                    minItems:1
                  },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        parent_item_id: {
                          type: "string",
                        },
                        descriptor: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            code: {
                              type: "string",
                            },
                            short_desc: {
                              type: "string",
                            },
                            long_desc: {
                              type: "string",
                            },
                            images: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  url: {
                                    type: "string",
                                  },
                                },
                                required: ["url"],
                              },
                            },
                            media: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  mimetype: {
                                    type: "string",
                                  },
                                  url: {
                                    type: "string",
                                  },
                                },
                                required: ["mimetype", "url"],
                              },
                            },
                          },
                          required: [
                            "name",
                            "code",
                            "short_desc",
                            "long_desc",
                            "images",
                          ],
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
                            offered_value: {
                              type: "string",
                            },
                            maximum_value: {
                              type: "string",
                            },
                            minimum_value: {
                              type: "string",
                            },
                          },
                          minProperties: 2,
                          anyOf: [
                            { required: ["currency", "value"] },
                            { required: ["currency", "minimum_value"] },
                          ],
                        },
                        category_ids: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        fulfillment_ids: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        location_ids: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        payment_ids: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        cancellation_terms: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              fulfillment_state: {
                                type: "object",
                                properties: {
                                  descriptor: {
                                    type: "object",
                                    properties: {
                                      code: {
                                        type: "string",
                                        enum: constants.SRV_FULFILLMENT_STATE,
                                      },
                                    },
                                    required: ["code"],
                                  },
                                },
                                required: ["descriptor"],
                              },
                              cancellation_fee: {
                                type: "object",
                                properties: {
                                  amount: {
                                    type: "object",
                                    properties: {
                                      value: {
                                        type: "string",
                                      },
                                    },
                                    required: ["value"],
                                  },
                                  percentage: {
                                    type: "string",
                                  },
                                },
                              },
                              reason_required: {
                                type: "boolean",
                              },
                              cancel_by: {
                                type: "object",
                                properties: {
                                  duration: {
                                    type: "string",
                                    format: "duration",
                                  },
                                },
                              },
                            },
                            required: [
                              "fulfillment_state",
                              "cancellation_fee",
                              "reason_required",
                              "cancel_by",
                            ],
                          },
                          minItems: 1,
                        },
                        xinput: {
                          type: "object",
                          properties: {
                            form: {
                              type: "object",
                              properties: {
                                url: {
                                  type: "string",
                                  format: "uri",
                                },
                                mimetype: {
                                  type: "string",
                                },
                              },
                              required: ["url", "mimetype"],
                            },
                            required: {
                              type: "boolean",
                            },
                          },
                          required: ["form", "required"],
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
                        time: {
                          type: "object",
                          properties: {
                            label: {
                              type: "string",
                            },
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
                            schedule: {
                              type: "object",
                              properties: {
                                frequency: {
                                  type: "string",
                                },
                                holidays: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                times: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                              },
                              required: ["holidays"],
                            },
                          },
                          required: ["label", "schedule"],
                        },
                        matched: {
                          type: "boolean",
                        },
                        recommended: {
                          type: "boolean",
                        },
                      },
                      if: {
                        required: ["parent_item_id"],
                        properties: {
                          parent_item_id: {
                            type: "string"
                          }
                        }
                      },
                      then: {
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
                                      enum: ["reschedule_terms"], // Enum validation for descriptor code
                                    },
                                  },
                                  required: ["code"],
                                },
                                list: {
                                  type: "array",
                                  minItems: 4, // Ensure the list array has at least 4 items
                                  items: {
                                    type: "object",
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        properties: {
                                          code: {
                                            type: "string",
                                            enum: [
                                              "fulfillment_state",
                                              "reschedule_eligible",
                                              "reschedule_fee",
                                              "reschedule_within",
                                            ], // Ensure these values are valid
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
                                  allOf: [
                                    {
                                      contains: {
                                        properties: {
                                          descriptor: {
                                            properties: {
                                              code: {
                                                const: "fulfillment_state",
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    {
                                      contains: {
                                        properties: {
                                          descriptor: {
                                            properties: {
                                              code: {
                                                const: "reschedule_eligible",
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    {
                                      contains: {
                                        properties: {
                                          descriptor: {
                                            properties: {
                                              code: { const: "reschedule_fee" },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    {
                                      contains: {
                                        properties: {
                                          descriptor: {
                                            properties: {
                                              code: {
                                                const: "reschedule_within",
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  ],
                                },
                              },

                              required: ["descriptor", "list"],
                            },
                            minItems: 1,
                          },
                        },
                        required: [
                          "id",
                          "parent_item_id",
                          "descriptor",
                          "price",
                          "category_ids",
                          "fulfillment_ids",
                          "location_ids",
                          "payment_ids",
                          "cancellation_terms",
                          "tags", // Include 'tags' in the required list
                          "time",
                          "matched",
                          "recommended",
                        ],
                      },
                      else: {
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
                                      enum: ["attribute","quantity_selection"], // Enum validation for descriptor code
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
                                            enum: constants.SRV_CUSTOMIZATION_TAGS, // Ensure these values are valid
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
                                  minItems:1
                                },
                              },

                              required: ["descriptor", "list"],
                            },
                            minItems: 1,
                          },
                        },
                        required: [
                          "id",
                          "parent_item_id",
                          "descriptor",
                          "price",
                          "category_ids",
                          "tags", // Here, tags might still be required, but no validation on structure
                        ],
                      },
                    },
                  },
                  offers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        descriptor: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            code: {
                              type: "string",
                              enum: [
                                "Discount_Percent",
                                "Disc_Amt",
                                "Freebie",
                                "BuyXGetY",
                              ],
                            },
                            short_desc: {
                              type: "string",
                            },
                            long_desc: {
                              type: "string",
                            },
                            images: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  url: {
                                    type: "string",
                                  },
                                },
                                required: ["url"],
                              },
                            },
                          },
                          required: ["name", "code", "short_desc", "long_desc"],
                        },
                        location_ids: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        category_ids: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        item_ids: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        time: {
                          type: "object",
                          properties: {
                            label: {
                              type: "string",
                            },
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
                          required: ["label", "range"],
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
                      required: [
                        "id",
                        "descriptor",
                        "location_ids",
                        "category_ids",
                        "item_ids",
                        "time",
                        "tags",
                      ],
                      allOf: [
                        {
                          if: {
                            properties: {
                              descriptor: {
                                properties: {
                                  code: { const: "Disc_Pct" },
                                },
                              },
                            },
                          },
                          then: {
                            properties: {
                              tags: {
                                items: {
                                  properties: {
                                    list: {
                                      items: {
                                        properties: {
                                          descriptor: {
                                            properties: {
                                              code: {
                                                type: "string",
                                                enum: [
                                                  "qualifier_min_value",
                                                  "max_benefit",
                                                  "discount_unit",
                                                  "discount_value",
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
                            },
                          },
                        },
                        {
                          if: {
                            properties: {
                              descriptor: {
                                properties: {
                                  code: { const: "Disc_Amt" },
                                },
                              },
                            },
                          },
                          then: {
                            properties: {
                              tags: {
                                items: {
                                  properties: {
                                    list: {
                                      items: {
                                        properties: {
                                          descriptor: {
                                            properties: {
                                              code: {
                                                type: "string",
                                                enum: [
                                                  "qualifier_min_value",
                                                  "max_benefit",
                                                  "discount_value",
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
                            },
                          },
                        },
                        {
                          if: {
                            properties: {
                              descriptor: {
                                properties: {
                                  code: { const: "Freebie" },
                                },
                              },
                            },
                          },
                          then: {
                            properties: {
                              tags: {
                                items: {
                                  properties: {
                                    list: {
                                      items: {
                                        properties: {
                                          descriptor: {
                                            properties: {
                                              code: {
                                                type: "string",
                                                enum: ["qualifier_min_value"],
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                        {
                          if: {
                            properties: {
                              descriptor: {
                                properties: {
                                  code: { const: "BuyXGetY" },
                                },
                              },
                            },
                          },
                          then: {
                            properties: {
                              tags: {
                                items: {
                                  properties: {
                                    list: {
                                      items: {
                                        properties: {
                                          descriptor: {
                                            properties: {
                                              code: {
                                                type: "string",
                                                enum: [
                                                  "item_required",
                                                  "item_free",
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
                            },
                          },
                        },
                      ],
                    },
                  },
                  fulfillments: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        contact: {
                          type: "object",
                          properties: {
                            phone: {
                              type: "string",
                            },
                            email: {
                              type: "string",
                            },
                          },
                          required: ["phone", "email"],
                        },
                      },
                      required: ["contact"],
                    },
                  },
                },
                required: [
                  "id",
                  "descriptor",
                  "rating",
                  "ttl",
                  "time",
                  "locations",
                  "tags",
                  "items",
                  "fulfillments",
                ],
              },
            },
          },
          required: ["fulfillments", "payments", "descriptor", "providers"],
        },
      },
      required: ["catalog"],
    },
  },
  required: ["context", "message"],
};

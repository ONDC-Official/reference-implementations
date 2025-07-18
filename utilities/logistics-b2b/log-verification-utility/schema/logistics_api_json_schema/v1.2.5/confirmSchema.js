const constants = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/confirmSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: ["ONDC:LOG10", "ONDC:LOG11"],
          const: { $data: "/on_init/0/context/domain" },
        },
        country: {
          type: "string",
        },
        city: {
          type: "string",
          const: { $data: "/on_search/0/context/city" },
        },
        action: {
          type: "string",
          const: "confirm",
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
              pattern: "^[a-zA-Z0-9-_]{1,32}$",
              allOf: [
                {
                  not: {
                    const: { $data: "3/context/transaction_id" },
                  },
                  errorMessage:
                    "should be unique and not be equal to transaction_id: ${3/context/transaction_id}",
                },
              ],
            },
            state: { type: "string" },
            provider: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  const: { $data: "/init/0/message/order/provider/id" },
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
                  },
                },
              },
              required: ["id"],
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    const: { $data: "/init/0/message/order/items/0/id" },
                  },
                  category_id: {
                    type: "string",
                    const: {
                      $data: "/init/0/message/order/items/0/category_id",
                    },
                  },
                  fulfillment_id: {
                    type: "string",
                    const: {
                      $data: "/init/0/message/order/items/0/fulfillment_id",
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
                required: ["id", "category_id", "time", "fulfillment_id"],
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
                      const: {
                        $data: "/on_init/0/message/order/quote/price/value",
                      },
                      errorMessage: "mismatches in /on_init and /confirm.",
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
                        enum: constants.TITLE_TYPE,
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
              additionalProperties: false,
              required: ["price", "breakup"],
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  type: { type: "string" },
                  "@ondc/org/awb_no": {
                    type: "string",
                    pattern: "^[0-9]{11,16}$",
                    errorMessage: "should be 11-16 digits",
                  },
                  start: {
                    type: "object",
                    properties: {
                      person: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                        required: ["name"],
                      },
                      time: {
                        type: "object",
                        properties: {
                          duration: {
                            type: "string",
                            format: "duration",
                          },
                        },
                        required: ["duration"],
                      },
                      location: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          gps: {
                            type: "string",
                            const: {
                              $data:
                                "/search/0/message/intent/fulfillment/start/location/gps",
                            },
                            errorMessage:
                              "does not match start location in search",
                          },
                          address: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                minLength: 3,
                                not: { const: { $data: "1/locality" } },
                              },
                              building: {
                                type: "string",
                                minLength: 3,
                              },
                              locality: {
                                type: "string",
                                minLength: 3,
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
                          short_desc: {
                            type: "string",
                          },
                          long_desc: {
                            type: "string",
                          },
                          code: {
                            type: "string",
                            enum: constants.PCC_CODE,
                          },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: {
                                type: "string",
                              },
                              url: {
                                type: "string",
                                pattern:
                                  "^https:\\/\\/(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/[^\\s]*)?$",
                                errorMessage:
                                  "URL must be a valid https URL",
                              },
                            },
                          },
                        },
                        required: ["code", "short_desc"],
                        allOf: [
                          {
                            if: { properties: { code: { const: "1" } } },
                            then: {
                              properties: {
                                short_desc: {
                                  minLength: 10,
                                  maxLength: 10,
                                  pattern: "^[0-9]{10}$",
                                  errorMessage: "should be a 10 digit number",
                                },
                              },
                            },
                          },
                          {
                            if: {
                              properties: { code: { enum: ["2", "3", "4"] } },
                            },
                            then: {
                              properties: {
                                short_desc: {
                                  maxLength: 6,
                                  pattern: "^[a-zA-Z0-9]{1,6}$",
                                  errorMessage:
                                    "should not be an empty string or have more than 6 alphanumeric",
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                    required: ["person", "location", "time", "contact"],
                  },
                  end: {
                    type: "object",
                    properties: {
                      person: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                        required: ["name"],
                      },
                      location: {
                        type: "object",
                        properties: {
                          gps: {
                            type: "string",
                            const: {
                              $data:
                                "/search/0/message/intent/fulfillment/end/location/gps",
                            },
                            errorMessage:
                              "does not match end location in search",
                          },
                          address: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                minLength: 3,
                                not: { const: { $data: "1/locality" } },
                                errorMessage:
                                  "name + building + locality < 190 chars & each of name / building / locality > 3 chars; name != locality",
                              },
                              building: {
                                type: "string",
                                minLength: 3,
                              },
                              locality: {
                                type: "string",
                                minLength: 3,
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
                          short_desc: {
                            type: "string",
                            not: {
                              const: {
                                $data: "3/start/instructions/short_desc",
                              },
                            },
                            errorMessage:
                              "PCC should not be same as DCC ${3/start/instructions/short_desc}",
                          },
                          long_desc: {
                            type: "string",
                          },
                          code: {
                            type: "string",
                            enum: constants.DCC_CODE,
                          },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: {
                                type: "string",
                              },
                              url: {
                                type: "string",
                                pattern:
                                  "^https:\\/\\/(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/[^\\s]*)?$",
                                errorMessage:
                                  "URL must be a valid https URL",
                              },
                            },
                          },
                        },
                        required: ["code"],
                        allOf: [
                          {
                            if: { properties: { code: { const: "3" } } },
                            then: {
                              properties: {
                                short_desc: {
                                  maxLength: 0,
                                  errorMessage: "is not required",
                                },
                              },
                            },
                          },
                          {
                            if: {
                              properties: { code: { enum: ["1", "2"] } },
                            },
                            then: {
                              properties: {
                                short_desc: {
                                  maxLength: 6,
                                  pattern: "^[a-zA-Z0-9]{1,6}$",
                                  errorMessage:
                                    "should not be an empty string or have more than 6 alphanumeric",
                                },
                              },
                              required: ["short_desc"],
                            },
                          },
                        ],
                      },
                    },
                    required: ["person", "location", "contact"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                          enum: [
                            "linked_order_item",
                            "linked_provider",
                            "linked_order",
                            "state",
                            "rto_action",
                            "provider",
                            "order",
                            "cod_settlement_detail",
                            "rto_verification",
                            "items",
                            "reverseqc_input",
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
                                type: "string",
                              },
                            },
                            required: ["code", "value"],
                          },
                        },
                      },

                      required: ["code", "list"],
                    },
                    minItems: 2,
                    errorMessage:
                      "both 'state' and 'rto_action' tags are required",
                  },
                },
                additionalProperties: false,
                required: ["id", "type", "start", "end", "tags"],
              },
            },
            billing: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  const: { $data: "/init/0/message/order/billing/name" },
                  errorMessage: "mismatches in /billing in /init and /confirm",
                },
                address: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      not: { const: { $data: "1/locality" } },
                      const: {
                        $data: "/init/0/message/order/billing/address/name",
                      },
                      errorMessage:
                        "mismatches in /billing in /init and /confirm",
                    },
                    building: {
                      type: "string",
                      const: {
                        $data: "/init/0/message/order/billing/address/building",
                      },
                      errorMessage:
                        "mismatches in /billing in /init and /confirm",
                    },
                    locality: {
                      type: "string",
                      const: {
                        $data: "/init/0/message/order/billing/address/locality",
                      },
                      errorMessage:
                        "mismatches in /billing in /init and /confirm",
                    },
                    city: {
                      type: "string",
                      const: {
                        $data: "/init/0/message/order/billing/address/city",
                      },
                      errorMessage:
                        "mismatches in /billing in /init and /confirm",
                    },
                    state: {
                      type: "string",
                      const: {
                        $data: "/init/0/message/order/billing/address/state",
                      },
                      errorMessage:
                        "mismatches in /billing in /init and /confirm",
                    },
                    country: {
                      type: "string",
                      const: {
                        $data: "/init/0/message/order/billing/address/country",
                      },
                      errorMessage:
                        "mismatches in /billing in /init and /confirm",
                    },
                    area_code: {
                      type: "string",
                      const: {
                        $data:
                          "/init/0/message/order/billing/address/area code",
                      },
                      errorMessage:
                        "mismatches in /billing in /init and /confirm",
                    },
                  },
                  additionalProperties: false,
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
                  const: {
                    $data: "/init/0/message/order/billing/tax_number",
                  },
                  errorMessage: "mismatches in /billing in /init and /confirm",
                },
                phone: {
                  type: "string",
                  const: { $data: "/init/0/message/order/billing/phone" },
                  errorMessage: "mismatches in /billing in /init and /confirm",
                },
                email: {
                  type: "string",
                  const: { $data: "/init/0/message/order/billing/email" },
                  errorMessage: "mismatches in /billing in /init and /confirm",
                },
                created_at: {
                  type: "string",
                  const: {
                    $data: "/init/0/message/order/billing/created_at",
                  },
                  errorMessage: "mismatches in /billing from /init",
                },
                updated_at: {
                  type: "string",
                  const: {
                    $data: "/init/0/message/order/billing/updated_at",
                  },
                  errorMessage: "mismatches in /billing from /init",
                },
              },
              additionalProperties: false,
              required: [
                "name",
                "address",
                "phone",
                "tax_number",
                "created_at",
                "updated_at",
              ],
            },
            payment: {
              type: "object",
              properties: {
                "@ondc/org/settlement_basis": { type: "string" },
                "@ondc/org/settlement_window": { type: "string" },
                "@ondc/org/collection_amount": {
                  type: "string",
                  const: {
                    $data:
                      "/search/0/message/intent/payment/@ondc~1org~1collection_amount",
                  },
                  errorMessage: "mismatches in /payment from /search",
                },
                collected_by: {
                  type: "string",
                  enum: constants.PAYMENT_COLLECTEDBY,
                  const: {
                    $data: "/on_init/0/message/order/payment/collected_by",
                  },
                  errorMessage:
                    "mismatches in /payment in /on_init and /confirm",
                },
                type: {
                  type: "string",
                  enum: constants.PAYMENT_TYPE,
                  const: {
                    $data: "/on_init/0/message/order/payment/type",
                  },
                  errorMessage:
                    "mismatches in /payment in /on_init and /confirm",
                },
                "@ondc/org/settlement_details": {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      settlement_counterparty: {
                        type: "string",
                        enum: ["lbnp", "lsp"],
                      },
                      settlement_type: {
                        type: "string",
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
                    },
                    allOf: [
                      {
                        if: {
                          properties: {
                            settlement_type: {
                              const: "upi",
                            },
                          },
                        },
                        then: {
                          required: ["upi_address"],
                        },
                      },
                      {
                        if: {
                          properties: {
                            settlement_type: {
                              const: ["neft", "rtgs"],
                            },
                          },
                        },
                        then: {
                          required: [
                            "settlement_ifsc_code",
                            "settlement_bank_account_no",
                            "bank_name",
                            "branch_name",
                          ],
                        },
                      },
                    ],
                    required: ["settlement_counterparty", "settlement_type"],
                  },
                },
              },
              required: [
                "type",
                "collected_by",
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
                        enum: constants.CATEGORIES,
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
                                enum: constants.UNITS_WEIGHT,
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
                          },
                          value: {
                            type: "string",
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
                        },
                      },

                      required: [
                        "name",
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
                      allOf: [
                        {
                          not: {
                            const: { $data: "4/order/id" },
                          },
                          errorMessage:
                            "Is linked retail order Id same as logistics order Id?",
                        },
                      ],
                    },
                    weight: {
                      type: "object",
                      properties: {
                        unit: {
                          type: "string",
                          enum: constants.DEAD_wEIGHT,
                        },
                        value: {
                          const: {
                            $data:
                              "/search/0/message/intent/@ondc~1org~1payload_details/weight/value",
                          },
                          errorMessage:
                            "Payload weight mismatches from /search",
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
                            },
                          },
                          required: ["unit", "value"],
                        },
                      },
                      required: ["length", "breadth", "height"],
                    },
                  },
                  required: ["id", "weight"],
                },
              },
              additionalProperties: false,
              required: ["items", "provider", "order"],
            },
            tags: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    enum: constants.TERMS,
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
              minItems: 2,
              errorMessage:
                "both 'bpp_terms' and 'bap_terms' tags are required (logistics buyer NP must accept LSP terms. If not accepted, LSP can NACK /confirm with error code 65002)",
            },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
          required: [
            "id",
            "state",
            "provider",
            "items",
            "quote",
            "fulfillments",
            "billing",
            "@ondc/org/linked_order",
            "payment",
            "created_at",
            "updated_at",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

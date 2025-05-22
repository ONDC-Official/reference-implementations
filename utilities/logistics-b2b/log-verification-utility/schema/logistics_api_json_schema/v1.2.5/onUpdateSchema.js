const { QUOTE_TITLE_TYPE } = require("../../../utils/1.2.5/constants");
const constants = require("../../../utils/constants");
const {
  ORDER_STATE,
  TITLE_TYPE,
  FULFILLMENT_STATE,
  PCC_CODE,
  DCC_CODE,
  CATEGORIES,
  UNITS_WEIGHT,
  UNITS_DIMENSIONS,
} = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/onUpdateSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          const: { $data: "/update/0/context/domain" },
          enum: ["ONDC:LOG10", "ONDC:LOG11"],
        },
        country: {
          type: "string",
        },
        city: {
          type: "string",
          const: {
            $data: "/confirm/0/context/city",
          },
        },
        action: {
          type: "string",
          const: "on_update",
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
          const: {
            $data: "/search/0/context/transaction_id",
          },
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
              const: {
                $data: "/confirm/0/message/order/id",
              },
            },
            state: {
              type: "string",
              enum: ORDER_STATE,
            },
            provider: {
              type: "object",
              properties: {
                id: { type: "string" },
                locations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
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
                  fulfillment_id: {
                    type: "string",
                    const: {
                      $data: "/init/0/message/order/items/0/fulfillment_id",
                    },
                  },
                  category_id: {
                    type: "string",
                    const: {
                      $data: "/init/0/message/order/items/0/category_id",
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
                  },
                  time: {
                    type: "object",
                    properties: {
                      label: {
                        type: "string",
                      },
                      duration: {
                        type: "string",
                        const: {
                          $data:
                            "/confirm/0/message/order/items/0/time/duration",
                        },
                      },
                      timestamp: {
                        type: "string",
                        const: {
                          $data:
                            "/confirm/0/message/order/items/0/time/timestamp",
                        },
                      },
                    },
                    required: ["label", "duration"],
                  },
                },
                required: ["id", "fulfillment_id", "category_id"],
              },
            },
            quote: {
              type: "object",
              properties: {
                price: {
                  $ref: "commonSchema#/properties/priceFormat",
                },
                breakup: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      "@ondc/org/item_id": { type: "string" },
                      "@ondc/org/title_type": {
                        type: "string",
                        enum: QUOTE_TITLE_TYPE,
                      },
                      price: {
                        $ref: "commonSchema#/properties/priceFormat",
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
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: FULFILLMENT_STATE,
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                  },
                  tracking: {
                    type: "boolean",
                    const: {
                      $data:
                        "/on_confirm/0/message/order/fulfillments/0/tracking",
                    },
                  },
                  start: {
                    $merge: {
                      with: {
                        type: "object",
                        properties: {
                          time: {
                            type: "object",
                            properties: {
                              range: {
                                type: "object",
                                properties: {
                                  start: {
                                    type: "string",
                                    pattern:
                                      "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
                                    errorMessage:
                                      "should be in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format",
                                  },
                                  end: {
                                    type: "string",
                                    pattern:
                                      "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
                                    errorMessage:
                                      "should be in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format",
                                  },
                                },
                                required: ["start", "end"],
                              },
                              timestamp: {
                                type: "string",
                                format: "date-time",
                              },
                            },
                            required: ["range"],
                          },
                          instructions: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                                enum: constants.PCC_CODE,
                                const: {
                                  $data:
                                    "/update/0/message/order/fulfillments/0/start/instructions/code",
                                },
                              },
                              name: {
                                type: "string",
                              },
                              short_desc: {
                                type: "string",
                                const: {
                                  $data:
                                    "/update/0/message/order/fulfillments/0/start/instructions/short_desc",
                                },
                              },
                              long_desc: {
                                type: "string",
                              },
                            },

                            required: [],
                          },
                        },
                      },
                      source: {
                        $ref: "commonSchema#/properties/addressFormat",
                      },
                    },
                    required: ["time"],
                  },
                  end: {
                    type: "object",
                    allOf: [
                      {
                        properties: {
                          time: {
                            type: "object",
                            properties: {
                              range: {
                                type: "object",
                                properties: {
                                  start: {
                                    type: "string",
                                    pattern:
                                      "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
                                    errorMessage:
                                      "should be in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format",
                                  },
                                  end: {
                                    type: "string",
                                    pattern:
                                      "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
                                    errorMessage:
                                      "should be in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format",
                                  },
                                },
                                required: ["start", "end"],
                              },
                              timestamp: {
                                type: "string",
                                pattern:
                                  "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
                                errorMessage:
                                  "should be in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format",
                              },
                            },
                            required: ["range"],
                          },
                          instructions: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                                enum: constants.DCC_CODE,
                                const: {
                                  $data:
                                    "/update/0/message/order/fulfillments/0/end/instructions/code",
                                },
                              },
                              name: {
                                type: "string",
                              },
                              short_desc: {
                                type: "string",
                                const: {
                                  $data:
                                    "/update/0/message/order/fulfillments/0/end/instructions/short_desc",
                                },
                              },
                              long_desc: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      {
                        $ref: "commonSchema#/properties/addressFormat",
                      },
                    ],
                    required: ["time"],
                  },
                  agent: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      phone: {
                        type: "string",
                      },
                    },
                    required: ["name", "phone"],
                  },
                  vehicle: {
                    type: "object",
                    properties: {
                      registration: {
                        type: "string",
                      },
                    },
                    required: ["registration"],
                  },
                  "@ondc/org/ewaybillno": {
                    type: "string",
                    const: {
                      $data:
                        "/on_confirm/0/message/order/fulfillments/0/@ondc~1org~1ewaybillno",
                    },
                  },
                  "@ondc/org/ebnexpirydate": {
                    type: "string",
                    format: "date-time",
                    const: {
                      $data:
                        "/on_confirm/0/message/order/fulfillments/0/@ondc~1org~1ebnexpirydate",
                    },
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
                            "linked_order_item",
                            "shipping_label",
                            "fulfill_request",
                            "fulfill_response",
                            "rider_details",
                            "fulfillment_delay",
                            "fulfillment_proof",
                            "ebn",
                            "linked_order_diff",
                            "linked_order_diff_proof",
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
                          },
                        },
                      },
                      required: ["code", "list"],
                    },
                  },
                },
                required: ["id", "type", "state", "tracking", "start", "end"],
              },
            },
            billing: {
              allOf: [
                {
                  $ref: "confirmSchema#/properties/message/properties/order/properties/billing",
                },
                {
                  $data: "/confirm/0/message/order/billing",
                },
              ],
            },
            payment: {
              allOf: [
                {
                  $ref: "onConfirmSchema#/properties/message/properties/order/properties/payment",
                },
                {
                  $data: "/on_confirm/0/message/order/payment",
                },
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
                      const: {
                        $data:
                          "/update/0/message/order/@ondc~1org~1linked_order/order/id",
                      },
                    },
                    weight: {
                      type: "object",
                      properties: {
                        unit: {
                          type: "string",
                          enum: constants.UNITS_WEIGHT,
                        },
                        value: {
                          type: "number",
                          const: {
                            $data:
                              "/update/0/message/order/@ondc~1org~1linked_order/order/weight/value",
                          },
                          errorMessage:
                            "Payload weight mismatches from /update",
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
              required: ["items", "provider", "order"],
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
          required: [
            "id",
            "state",
            "items",
            "fulfillments",
            "billing",
            "payment",
            "@ondc/org/linked_order",
            "updated_at",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

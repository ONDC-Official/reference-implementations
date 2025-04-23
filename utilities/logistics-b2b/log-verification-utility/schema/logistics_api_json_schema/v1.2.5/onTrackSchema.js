const constants = require("../../../utils/constants");

module.exports = {
  $id: "http://example.com/schema/onTrackSchema",
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
          const: "on_track",
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
              const: { $data: "/track/0/context/message_id" },
              errorMessage:
                "Message ID should be same as /track: ${/track/0/context/message_id}",
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
        "ttl",
      ],
    },
    message: {
      type: "object",
      properties: {
        tracking: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            url: {
              type: "string",
              format: "uri",
            },
            location: {
              type: "object",
              properties: {
                gps: {
                  type: "string",
                  pattern: "^([-+]?\\d{1,2}\\.\\d+),([-+]?\\d{1,3}\\.\\d+)$",
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
                updated_at: {
                  type: "string",
                  format: "date-time",
                },
              },
              required: ["gps", "time", "updated_at"],
            },
            status: {
              type: "string",
              enum: ["active"],
              errorMessage: `should be 'active' if tracking is enabled`,
            },
            tags: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    enum: constants.TRACK_TAGS_CODE,
                  },
                  list: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                          enum: constants.TRACK_TAGS_LIST_CODE,
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
          required: ["id", "location", "status"],
        },
      },
      required: ["tracking"],
    },
  },
  required: ["context", "message"],
};

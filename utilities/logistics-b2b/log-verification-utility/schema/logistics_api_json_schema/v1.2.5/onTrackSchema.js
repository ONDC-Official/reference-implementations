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

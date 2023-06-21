module.exports = {
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: ["nic2004:52110", "nic2004:60232"],
        },
        country: {
          type: "string",
        },
        city: {
          type: "string",
        },
        action: {
          type: "string",
        },
        core_version: {
          type: "string",
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
        },
        message_id: {
          type: "string",
        },
        timestamp: {
          type: "string",
          format: "date-time",
        },
        key: {
          type: "string",
        },
        ttl: {
          type: "string",
          format: "duration",
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
      ],
    },
    message: {
      type: "object",
      properties: {
        issue_id: {
          type: "string",
          format: "uuid",
        },
      },
      required: ["issue_id"],
    },
  },
  required: ["context", "message"],
};

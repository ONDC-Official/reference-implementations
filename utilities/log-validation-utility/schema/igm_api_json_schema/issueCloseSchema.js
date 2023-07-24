const utils = require("../../utils/utils");
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
        action: {
          type: "string",
          const: "issue",
        },
        country: {
          type: "string",
        },
        city: {
          type: "string",
        },
        core_version: {
          type: "string",
          const: "1.0.0",
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
        ttl: {
          type: "string",
          format: "duration",
        },
      },
      required: [
        "domain",
        "action",
        "country",
        "city",
        "core_version",
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
        issue: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["OPEN", "CLOSED"],
            },
            issue_actions: {
              type: "object",
              properties: {
                complainant_actions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      complainant_action: {
                        type: "string",
                        enum: ["OPEN", "ESCALATE", "CLOSE"],
                      },
                      updated_at: {
                        type: "string",
                      },
                      updated_by: {
                        type: "object",
                        properties: {
                          org: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              cred: {
                                type: "string",
                              },
                            },
                            required: ["name"],
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
                              tags: {
                                type: "string",
                              },
                            },
                            required: ["phone", "email"],
                          },
                          person: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              image: {
                                type: "string",
                              },
                              dob: {
                                type: "string",
                              },
                              gender: {
                                type: "string",
                              },
                              creds: {
                                type: "string",
                              },
                              tags: {
                                type: "string",
                              },
                            },
                            required: ["name"],
                          },
                        },
                        required: ["org", "contact", "person"],
                      },
                      short_desc: {
                        type: "string",
                      },
                    },
                    required: [
                      "complainant_action",
                      "short_desc",
                      "updated_at",
                      "updated_by",
                    ],
                  },
                },
              },
              required: ["complainant_actions"],
            },
            rating: {
              type: "string",
              enum: ["THUMBS-UP", "THUMBS-DOWN"],
            },
            created_at: {
              type: "string",
            },
            updated_at: {
              type: "string",
            },
          },
          required: [
            "id",
            "created_at",
            "updated_at",
            "issue_actions",
            "status",
            "rating",
          ],
        },
      },
      required: ["issue"],
    },
  },
  required: ["context", "message"],
};

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
              description:
                "* Network issue identifier is an unique number assigned to any complaint by the interfacing application at the source.\n\n* **During the life cycle of a complaint, this number will not change and will be communicated to counterparty application.**\n\n* Any subsequent issues created with the interfacing,counterpary or casacaded counter party apps are responsible for providing the correalted and relevant network-issue-id which helps all this inteacting systems to traverse back to the main issue.\n",
            },
            issue_actions: {
              type: "object",
              properties: {
                respondent_actions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      respondent_action: {
                        type: "string",
                        enum: [
                          "PROCESSING",
                          "CASCADED",
                          "RESOLVED",
                          "NEED-MORE-INFO",
                        ],
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
                                format: "email",
                              },
                              tags: {
                                type: "object",
                                properties: {
                                  additionalProp1: {
                                    type: "string",
                                  },
                                  additionalProp2: {
                                    type: "string",
                                  },
                                  additionalProp3: {
                                    type: "string",
                                  },
                                },
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
                                format: "date",
                              },
                              gender: {
                                type: "string",
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
                                    issuer: {
                                      type: "string",
                                    },
                                    issuance_date: {
                                      type: "string",
                                    },
                                    credential_subject: {
                                      type: "object",
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        additionalProperties: {
                                          type: "object",
                                        },
                                      },
                                    },
                                    credential_schema: {
                                      type: "object",
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        type: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              tags: {
                                type: "object",
                                properties: {
                                  additionalProp1: {
                                    type: "string",
                                  },
                                  additionalProp2: {
                                    type: "string",
                                  },
                                  additionalProp3: {
                                    type: "string",
                                  },
                                },
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
                      cascaded_level: {
                        type: "number",
                      },
                    },
                    required: [
                      "respondent_action",
                      "updated_at",
                      "short_desc",
                      "updated_by",
                    ],
                  },
                },
              },
              required: ["respondent_actions"],
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["id", "created_at", "updated_at", "issue_actions"],
        },
      },
      required: ["issue"],
    },
    error: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        path: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
  required: ["context", "message"],
};

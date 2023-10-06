const utils = require("../../utils/utils");
module.exports = {
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: [
            "nic2004:52110",
            "nic2004:60232",
            "ONDC:RET10",
            "ONDC:RET11",
            "ONDC:RET12",
            "ONDC:RET13",
            "ONDC:RET14",
            "ONDC:RET15",
            "ONDC:RET16",
            "ONDC:RET17",
            "ONDC:RET18",
            "ONDC:RET19",
            "ONDC:RET20",
            "ONDC:FIS10",
            "ONDC:FIS11",
            "ONDC:FIS12",
            "ONDC:FIS13",
            "ONDC:FIS14",
            "ONDC:FIS15",
            "ONDC:TRV10",
            "ONDC:TRV11",
            "ONDC:TRV12",
            "ONDC:TRV13",
            "ONDC:TRV14",
            "ONDC:TRV15",
          ],
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
            complainant_info: {
              type: "object",
              properties: {
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
                contact: {
                  type: "object",
                  properties: {
                    phone: {
                      type: "string",
                      minLength: 10,
                      maxLength: 11,
                    },
                    email: {
                      type: "string",
                    },
                    tags: {
                      type: "string",
                    },
                  },
                  required: ["phone"],
                },
              },
              required: ["person", "contact"],
            },
            order_details: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                state: {
                  type: "string",
                },
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      quantity: {
                        type: "number",
                        minimum: 1,
                      },
                    },
                    required: ["id", "quantity"],
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
                      state: {
                        type: "string",
                      },
                    },
                    required: ["id"],
                  },
                },
                provider_id: {
                  type: "string",
                },
              },
              required: ["id", "provider_id"],
            },
            description: {
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
                additional_desc: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                    },
                    content_type: {
                      type: "string",
                      enum: ["text/plain", "text/html", "application/json"],
                    },
                  },
                },
                media: {
                  type: "object",
                  properties: {
                    mimetype: {
                      type: "string",
                    },
                    url: {
                      type: "string",
                    },
                    signature: {
                      type: "string",
                    },
                    dsa: {
                      type: "string",
                    },
                  },
                },
                images: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
            category: {
              type: "string",
              enum: utils.issueCategories,
            },
            sub_category: {
              type: "string",
              enum: utils.issueSubCategories,
            },
            issue_type: {
              type: "string",
              enum: ["ISSUE", "GRIEVANCE", "DISPUTE"],
            },
            source: {
              type: "object",
              properties: {
                network_participant_id: {
                  type: "string",
                },
                type: {
                  type: "string",
                  enum: ["CONSUMER", "SELLER", "INTERFACING-NP"],
                },
              },
            },
            expected_response_time: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                },
                timestamp: {
                  type: "string",
                },
                duration: {
                  type: "string",
                  format: "duration",
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
                },
                days: {
                  type: "string",
                },
                schedule: {
                  type: "object",
                },
              },
              required: ["duration"],
            },
            expected_resolution_time: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                },
                timestamp: {
                  type: "string",
                },
                duration: {
                  type: "string",
                  format: "duration",
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
                },
                days: {
                  type: "string",
                },
                schedule: {
                  type: "object",
                },
              },
              required: ["duration"],
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
            resolution_provider: {
              type: "object",
              properties: {
                respondent_info: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: [
                        "INTERFACING-NP",
                        "TRANSACTION-COUNTERPARTY-NP",
                        "CASCADED-COUNTERPARTY-NP",
                      ],
                    },
                    organization: {
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
                        },
                      },
                    },
                    resolution_support: {
                      type: "object",
                      properties: {
                        chat_link: {
                          type: "string",
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
                        },
                        faqs: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              question: {
                                type: "string",
                              },
                              answer: {
                                type: "string",
                              },
                            },
                          },
                        },
                        additional_sources: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              type: {
                                type: "string",
                              },
                              link: {
                                type: "string",
                              },
                            },
                          },
                        },
                        gros: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              gro_type: {
                                type: "string",
                                enum: [
                                  "INTEFACING-NP-GRO",
                                  "TRANSACTION-COUNTERPARTY-NP-GRO",
                                  "CASCADED-COUNTERPARTY-NP-GRO",
                                ],
                              },
                            },
                            required: ["gro_type"],
                          },
                        },
                      },
                    },
                  },
                },
              },
              required: ["respondent_info"],
            },
            resolution: {
              type: "object",
              properties: {
                short_desc: {
                  type: "string",
                },
                long_desc: {
                  type: "string",
                },
                gro_remarks: {
                  type: "string",
                },
                odr_remarks: {
                  type: "string",
                },
                action_triggered: {
                  type: "string",
                  enum: [
                    "REFUND",
                    "REPLACEMENT",
                    "RETURN",
                    "CANCEL",
                    "NO-ACTION",
                  ],
                },
                action: {
                  type: "string",
                  enum: ["RESOLVE", "REJECT"],
                },
                refund_amount: {
                  type: "string",
                },
              },
              required: ["short_desc", "action_triggered"],
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
            "category",
            "sub_category",
            "complainant_info",
            "order_details",
            "description",
            "source",
            "created_at",
            "updated_at",
            "issue_type",
            "expected_response_time",
            "expected_resolution_time",
            "issue_actions",
            "status",
          ],
        },
      },
      required: ["issue"],
    },
  },
  required: ["context", "message"],
};

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
          format: "uri",
        },
        bpp_id: {
          type: "string",
        },
        bpp_uri: {
          type: "string",
          format: "uri",
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
        "country",
        "city",
        "action",
        "core_version",
        "bap_id",
        "bap_uri",
        "transaction_id",
        "message_id",
        "timestamp",
        "bpp_id",
        "bpp_uri",
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
              format: "uuid",
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
                        format: "date-time",
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
                                      default: "VerifiableCredential",
                                    },
                                    issuance_date: {
                                      type: "string",
                                      format: "date-time",
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
                          },
                        },
                      },
                      short_desc: {
                        type: "string",
                      },
                      cascaded_level: {
                        type: "number",
                      },
                    },
                  },
                  required: [
                    "respondent_action",
                    "updated_at",
                    "updated_by",
                    "short_desc",
                  ],
                },
              },
              required: ["respondent_actions"],
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
                    merchant_order_id: {
                      type: "string",
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
                                    default: "VerifiableCredential",
                                  },
                                  issuer: {
                                    type: "string",
                                  },
                                  issuance_date: {
                                    type: "string",
                                    format: "date-time",
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
                    resolution_support: {
                      type: "object",
                      properties: {
                        respondentChatLink: {
                          type: "string",
                        },
                        respondentEmail: {
                          type: "string",
                        },
                        respondentContact: {
                          type: "object",
                          properties: {
                            phone: {
                              type: "string",
                            },
                            email: {
                              type: "string",
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
                        },
                        faqs: {
                          type: "object",
                          properties: {
                            additionalProp1: {
                              type: "object",
                              properties: {
                                question: {
                                  type: "string",
                                },
                                Answer: {
                                  type: "string",
                                },
                              },
                            },
                            additionalProp2: {
                              type: "object",
                              properties: {
                                question: {
                                  type: "string",
                                },
                                Answer: {
                                  type: "string",
                                },
                              },
                            },
                            additionalProp3: {
                              type: "object",
                              properties: {
                                question: {
                                  type: "string",
                                },
                                Answer: {
                                  type: "string",
                                },
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
                                          default: "VerifiableCredential",
                                        },
                                        issuer: {
                                          type: "string",
                                        },
                                        issuance_date: {
                                          type: "string",
                                          format: "date-time",
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
                              },
                              contact: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  address: {
                                    type: "object",
                                    properties: {
                                      full: {
                                        type: "string",
                                      },
                                      format: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  phone: {
                                    type: "string",
                                  },
                                  email: {
                                    type: "string",
                                  },
                                  jcard: {
                                    type: "object",
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
                              },
                              gro_type: {
                                type: "string",
                              },
                            },
                            required: ["gro_type"],
                          },
                        },
                      },
                    },
                  },
                  required: ["type", "organization", "resolution_support"],
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
                action: {
                  type: "string",
                  enum: ["RESOLVE", " REJECT"],
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
                refund_amount: {
                  type: "string",
                },
              },
              required: ["long_desc", "short_desc", "action_triggered"],
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
          required: [
            "id",
            "created_at",
            "updated_at",
            "issue_actions",
            "resolution_provider",
            "resolution",
          ],
        },
      },
      required: ["issue"],
    },
  },
  required: ["context", "message"],
};

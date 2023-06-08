module.exports = {
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
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
              },
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
                      state: {
                        type: "string",
                      },
                    },
                  },
                },
              },
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
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      mimetype: {
                        type: "string",
                      },
                      url: {
                        type: "string",
                        format: "uri",
                      },
                      signature: {
                        type: "string",
                      },
                      dsa: {
                        type: "string",
                      },
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
              enum: [
                "ORDER",
                "ITEM",
                "FULFILLMENT",
                "AGENT",
                "PAYMENT",
                "TRANSACTION",
              ],
            },
            sub_category: {
              type: "string",
              enum: [
                "ORD01",
                "ORD02",
                "ORD03",
                "ITM01",
                "ITM02",
                "ITM03",
                "ITM04",
                "FLM01",
                "FLM02",
                "FLM03",
                "FLM04",
                "FLM05",
                "FLM06",
                "FLM07",
                "AGT01",
                "AGT02",
                "PMT01",
                "PMT02",
                "PMT03",
                "PMT04",
              ],
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
                issue_source_type: {
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
                  format: "date-time",
                },
                duration: {
                  type: "string",
                },
                range: {
                  type: "object",
                  properties: {
                    start: {
                      type: "string",
                      format: "date-time",
                    },
                    end: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
                days: {
                  type: "string",
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
                        format: "date-time",
                      },
                    },
                    times: {
                      type: "array",
                      items: {
                        type: "string",
                        format: "date-time",
                      },
                    },
                  },
                },
              },
            },
            expected_resolution_time: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                },
                timestamp: {
                  type: "string",
                  format: "date-time",
                },
                duration: {
                  type: "string",
                },
                range: {
                  type: "object",
                  properties: {
                    start: {
                      type: "string",
                      format: "date-time",
                    },
                    end: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
                days: {
                  type: "string",
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
                        format: "date-time",
                      },
                    },
                    times: {
                      type: "array",
                      items: {
                        type: "string",
                        format: "date-time",
                      },
                    },
                  },
                },
              },
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
                        },
                      },
                      remarks: {
                        type: "string",
                      },
                    },
                  },
                },
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
                      remarks: {
                        type: "string",
                      },
                      cascaded_level: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
            selected_odrs_info: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  respondant_info: {
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
                  odrs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        about_info: {
                          type: "string",
                        },
                        url: {
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
                                        required: [
                                          "id",
                                          "additionalProperties",
                                        ],
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
                                    required: [
                                      "id",
                                      "type",
                                      "issuer",
                                      "issuance_date",
                                      "credential_subject",
                                      "credential_schema",
                                    ],
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
                        pricing_model: {
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
                                  pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                },
                                estimated_value: {
                                  type: "string",
                                  pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                },
                                computed_value: {
                                  type: "string",
                                  pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                },
                                listed_value: {
                                  type: "string",
                                  pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                },
                                offered_value: {
                                  type: "string",
                                  pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                },
                                minimum_value: {
                                  type: "string",
                                  pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                },
                                maximum_value: {
                                  type: "string",
                                  pattern: "[+-]?([0-9]*[.])?[0-9]+",
                                },
                              },
                            },
                            pricing_info: {
                              type: "string",
                            },
                          },
                        },
                        resolution_ratings: {
                          type: "object",
                          properties: {
                            rating_value: {
                              type: "string",
                            },
                          },
                        },
                      },
                      required: ["name", "about_info", "url"],
                    },
                  },
                },
              },
            },
            finalized_odr: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                about_info: {
                  type: "string",
                },
                url: {
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
                                required: ["id", "additionalProperties"],
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
                            required: [
                              "id",
                              "type",
                              "issuer",
                              "issuance_date",
                              "credential_subject",
                              "credential_schema",
                            ],
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
                pricing_model: {
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
                          pattern: "[+-]?([0-9]*[.])?[0-9]+",
                        },
                        estimated_value: {
                          type: "string",
                          pattern: "[+-]?([0-9]*[.])?[0-9]+",
                        },
                        computed_value: {
                          type: "string",
                          pattern: "[+-]?([0-9]*[.])?[0-9]+",
                        },
                        listed_value: {
                          type: "string",
                          pattern: "[+-]?([0-9]*[.])?[0-9]+",
                        },
                        offered_value: {
                          type: "string",
                          pattern: "[+-]?([0-9]*[.])?[0-9]+",
                        },
                        minimum_value: {
                          type: "string",
                          pattern: "[+-]?([0-9]*[.])?[0-9]+",
                        },
                        maximum_value: {
                          type: "string",
                          pattern: "[+-]?([0-9]*[.])?[0-9]+",
                        },
                      },
                    },
                    pricing_info: {
                      type: "string",
                    },
                  },
                },
                resolution_ratings: {
                  type: "object",
                  properties: {
                    rating_value: {
                      type: "string",
                    },
                  },
                },
              },
              required: ["name", "about_info", "url"],
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
                      },
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
                        respondentFaqs: {
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
                          type: "object",
                          properties: {
                            additionalProp1: {
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
                            additionalProp2: {
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
                            additionalProp3: {
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
                },
              },
              required: ["respondent_info"],
            },
            resolution: {
              type: "object",
              properties: {
                resolution: {
                  type: "string",
                },
                resolution_remarks: {
                  type: "string",
                },
                gro_remarks: {
                  type: "string",
                },
                dispute_resolution_remarks: {
                  type: "string",
                },
                resolution_action: {
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
              required: ["resolution_remarks", "resolution_action"],
            },
            additional_info_required: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  info_required: {
                    type: "object",
                    properties: {
                      issue_update_info: {
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
                                enum: [
                                  "text/plain",
                                  "text/html",
                                  "application/json",
                                ],
                              },
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
                                  format: "url",
                                },
                                signature: {
                                  type: "string",
                                },
                                dsa: {
                                  type: "string",
                                },
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
                      updated_at: {
                        type: "string",
                      },
                      message_id: {
                        type: "string",
                      },
                    },
                  },
                  info_provided: {
                    type: "object",
                    properties: {
                      issue_update_info: {
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
                                enum: [
                                  "text/plain",
                                  "text/html",
                                  "application/json",
                                ],
                              },
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
                                  format: "url",
                                },
                                signature: {
                                  type: "string",
                                },
                                dsa: {
                                  type: "string",
                                },
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
                      updated_at: {
                        type: "string",
                      },
                      message_id: {
                        type: "string",
                      },
                    },
                  },
                },
              },
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
          required: ["id", "created_at", "updated_at"],
        },
      },
    },
  },
  required: ["context"],
};

module.exports = {
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          const: "nic2004:52110",
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
        "action",
        "country",
        "city",
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
                  required: ["phone"],
                },
              },
              required: ["contact"],
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
                        minLength: 1,
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
                    type: "object",
                    properties: {
                      images: {
                        type: "string",
                      },
                    },
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
                      short_desc: {
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
                      complainant_action: {
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
                      short_desc: {
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
                  respondent_info: {
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
                  odrs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        short_desc: {
                          type: "string",
                        },
                        long_desc: {
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
                            value: {
                              type: "string",
                            },
                          },
                        },
                      },
                      required: [
                        "name",
                        "short_desc",
                        "url",
                        "pricing_model",
                        "resolution_ratings",
                      ],
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
                short_desc: {
                  type: "string",
                },
                long_desc: {
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
                    value: {
                      type: "string",
                    },
                  },
                },
              },
              required: [
                "name",
                "short_desc",
                "url",
                "pricing_model",
                "resolution_ratings",
              ],
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
            additional_info_required: {
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
                            type: "object",
                            properties: {
                              images: {
                                type: "string",
                              },
                            },
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
                            type: "object",
                            properties: {
                              images: {
                                type: "string",
                              },
                            },
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
            created_at: {
              type: "string",
            },
            updated_at: {
              type: "string",
            },
          },
          required: ["id", "created_at", "updated_at"],
        },
      },
      required: ["issue"],
    },
  },
  required: ["context", "message"],
};

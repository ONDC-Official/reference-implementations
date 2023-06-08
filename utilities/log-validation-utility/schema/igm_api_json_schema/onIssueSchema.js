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
                  required: ["phone"],
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
              required: ["id"],
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
                  properties: {
                    frequency: {
                      type: "string",
                    },
                    holidays: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    times: {
                      type: "array",
                      items: {
                        type: "string",
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
                  properties: {
                    frequency: {
                      type: "string",
                    },
                    holidays: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    times: {
                      type: "array",
                      items: {
                        type: "string",
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
                                },
                                estimated_value: {
                                  type: "string",
                                },
                                computed_value: {
                                  type: "string",
                                },
                                listed_value: {
                                  type: "string",
                                },
                                offered_value: {
                                  type: "string",
                                },
                                minimum_value: {
                                  type: "string",
                                },
                                maximum_value: {
                                  type: "string",
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
                        },
                        estimated_value: {
                          type: "string",
                        },
                        computed_value: {
                          type: "string",
                        },
                        listed_value: {
                          type: "string",
                        },
                        offered_value: {
                          type: "string",
                        },
                        minimum_value: {
                          type: "string",
                        },
                        maximum_value: {
                          type: "string",
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
                                    format: "email",
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
                          },
                        },
                      },
                    },
                  },
                },
              },
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
                },
                action: {
                  type: "string",
                },
                refund_amount: {
                  type: "string",
                },
              },
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

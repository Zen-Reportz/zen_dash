
formdata  ={ "orders": [
            {
            "customer": {
                "id": '471201',
                "name": 'Sirius Cybernetics Corporation',
                "department": 'Complaints Division',
                "phone": '(12) 34 56 78 90'
            },
            "title": '42 killer robots',
            "ordered": True,
            "processId": 1890004498,
            "assignee": 'Philip J. Fry',
            "status": 'ordered',
            "startDate": '2018-06-01',
            "endDate": '2018-08-01',
            },
            {
            "customer": {
                "id": '471202',
                "name": 'Very Big Corporation of America',
                "phone": '+49 123 456 789'
            },
            "title": '1000 gallons of MomCorp Oil',
            "processId": 1890004499,
            "assignee": 'Jen Barber',
            "startDate": '2018-07-01',
            "status": 'planned'
            }
        ]
}

formSchema = {
  "definitions": {
    "order": {
      "type": "object",
      "properties": {
        "customer": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "name": { "type": "string"},
            "department": { "type": "string" },
            "emailAddress": { "type": "string", "format": "email" }
          }
        },
        "title": {
          "type": "string",
          "minLength": 5
        },
        "description": {
          "type": "string"
        },
        "ordered": { "type": "boolean" },
        "processId": {
          "type": "number",
          "minimum": 0
        },
        "assignee": { "type": "string" },
        "startDate": {
          "type": "string",
          "format": "date"
        },
        "endDate": {
          "type": "string",
          "format": "date"
        },
        "status": {
          "type": "string",
          "enum": ["unordered", "planned", "ordered"]
        },
        "amount": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "default": 10,
          "multipleOf": 1
        }
      }
    }
  },
  "type": "object",
  "properties": {
    "orders": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/order"
      }
    }
  },
  "required": ["title"]
}

formUISchema = {
  "type": "Categorization",
  "elements": [
    {
      "type": "Category",
      "label": "Orders",
      "elements": [
        {
          "type": "ListWithDetail",
          "scope": "#/properties/orders",
          "options": {
            "labelRef": "#/items/properties/customer/properties/name",
            "detail": {
              "type": "VerticalLayout",
              "elements": [
                {
                  "type": "HorizontalLayout",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/title"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/processId"
                    }
                  ]
                },
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "VerticalLayout",
                      "elements": [
                        {

                          "type": "Control",
                          "scope": "#/properties/assignee"
                        },
                        {
                          "type": "HorizontalLayout",
                          "elements": [
                            {
                              "type": "Control",
                              "scope": "#/properties/startDate"
                            },
                            {
                              "type": "Control",
                              "scope": "#/properties/endDate"
                            }
                          ]
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/status"
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/ordered",
                          "options": {
                            "toggle": True
                          }
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/amount",
                          "options": {
                            "slider": True
                          },
                          "rule": {
                            "effect": "DISABLE",
                            "condition": {
                              "schema": {
                                "const": "unordered"
                              },
                              "scope": "#/properties/status"
                            }
                          }
                        }

                      ]
                    }
                  ]
                },
                {
                  "type": "Group",
                  "label": "Customer",
                  "elements": [
                    {
                      "type": "Control",
                      "scope": "#/properties/customer/properties/name"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/customer/properties/department"
                    },
                    {
                      "type": "Control",
                      "scope": "#/properties/customer/properties/emailAddress"
                    }
                  ]
                },
                {
                  "type": "Control",
                  "scope": "#/properties/description",
                  "options": {
                    "multi": True
                  }
                }
              ]
            }
          }
        }
      ]
    },
    {
      "type": "Category",
      "label": "Data",
      "elements": [
        {
          "type": "Label",
          "text": "Data"
        },
        {
          "type": "Control",
          "scope": "#/___data"
        }
      ]
    },
    {
      "type": "Category",
      "label": "Language",
      "elements": [
        {
          "type": "Label",
          "text": "Choose preferred locale"
        },
        {
          "type": "Control",
          "scope": "#",
          "options": {
            "lang": True
          }
        }
      ]
    },
    {
      "type": "Category",
      "label": "Contracts",
      "elements": [
        {
          "type": "Label",
          "text": "Currently Empty Category"
        }
      ]
    }
  ]
}

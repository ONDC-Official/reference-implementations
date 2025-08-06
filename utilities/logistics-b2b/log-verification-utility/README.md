# ONDC-LOG-VERIFICATION-SERVER

### APIs Log Verification tool for Pre-Prod participants

The tool is a NODE.js based server to check the conformance and compliance of the API logs for Logistics (B2C and B2B), B2B Retail, B2C Exports, Services domains based on the model specifications provided by ONDC. It offers an endpoint that allows users to submit a directory path containing log files for verification. The server then responds with a log report, indicating any errors found in the log files.

### Tech

- [[node.js](https://nodejs.org/en/)]
- [[lmdb](https://www.npmjs.com/package/lmdb)]
- [[lodash](https://www.npmjs.com/package/lodash)]
- [[ajv](https://ajv.js.org/)]

## Steps to run the server

Log Verification Server requires [Node.js](https://nodejs.org/) to run.

1. Clone the repository, navigate to log-verification-utility and install the dependencies.

```sh

cd log-verification-utility

npm i
```

2. Set up the .env file with the following configuration:

```code
MAPPLS_API_KEY=<api_key_value>
```
To get the api_key, refer to this link: https://developer.mappls.com/mapping/reverse-geocoding-api

3. Start the server with the following command:

```sh
npm run server:start
```
The server will be up and running at `http://localhost:3000`  

4. The server provides an HTTP endpoint for log file verification:

```code
http://localhost:3000/validate/<domainName>
```
| Domain        | domainName   |
|---------------|--------------|
| Logistics     | logistics    |
| B2B Retail    | b2b          |
| Services      | services     |
| B2C Exports   | b2c-exports  |


5. Send a POST request to the endpoint with the following parameters:
```code
logPath: <The path to the directory containing the log files>
```
6. Example using Postman:
```
Url: http://localhost:3000/validate/logistics
Request body json: {
    "logPath": "Documents/projects/v1.2.0-logs/Ref-logistics-app/flow2"
}
```

7. Example user cURL:

```
curl -X POST -d "logPath=/path/to/log/files" http://localhost:3000/validate/logistics
```

8. Upon successful validation, the server will respond with a log report in JSON format. The log report will indicate any errors found in the log files.

_Notes:_

> There must be a separate payload for every API.

> The server validates all the payloads as documented in the examples for respective domains:
* [logistics](https://docs.google.com/document/d/10GpEuKZE2g96DFJT3HKq6wIEMhPC-kkMZhXNn2jHHXc/edit?pli=1)

* [B2B](https://github.com/ONDC-Official/ONDC-RET-Specifications)
* [Services](https://github.com/ONDC-Official/ONDC-SRV-Specifications)

> Test cases to be referred here -> [logsitics](https://docs.google.com/document/d/1ttixilM-I6dutEdHL10uzqRFd8RcJlEO_9wBUijtdDc/edit) and [B2B](https://docs.google.com/document/d/10ouiTKLY4dm1KnXCuhFwK38cYd9_aDQ30bklkqnPRkM/edit)

> Sample payload for search.json is demonstrated below:

```json
{
  "context":
  {
    "domain":"ONDC:RET10",
    "location": {
      "city": {
        "code": "std:080"
      },
      "country": {
        "code": "IND"
      }
    },
    "action":"search",
    "version":"2.0.1",
    "bap_id":"buyerapp.com",
    "bap_uri":"https://buyerapp.com/grocery",
    "transaction_id":"T1",
    "message_id":"M1",
    "timestamp":"2023-01-08T22:00:00.000Z",
    "ttl":"PT30S"
  },
  "message":
  {
    "intent":
    {
      "item":
      {
        "descriptor":
        {
          "name":"oil"
        }
      },
      "fulfillment":
      {
        "type":"Delivery",
        "stops":
        [
          {
            "type":"end",
            "location":
            {
              "gps":"1.3806217468119772, 103.74636438437074",
              "area_code":"680230"
            }
          }
        ]
      },
      "payment":
      {
        "type":"ON-FULFILLMENT"
      },
      "tags":
      [
        {
          "descriptor": {
            "code":"bap_terms"
          },
          "list":
          [
            {
              "descriptor": {
                "code":"finder_fee_type"
              },
              "value":"percent"
            },
            {
              "descriptor": {
                "code":"finder_fee_amount"
              },
              "value":"0"
            }
          ]
        }
      ]
    }
  }
}
```

### N.B.

> - Community contributions are welcomed to enhance this server for future releases.



# 📦 Logistic Verification Utility

This utility helps verify logistics flows by using pre-saved JSON payloads for different ONDC action and on_action APIs.

---

## 🚀 Steps to Use

1. Go to the directory:
/logistic-b2b/log-verification-utility


2. Create a `public` folder inside `log-verification-utility`:
mkdir public


3. Create another folder named `logs` inside the `public` folder:
mkdir public/logs

4. Place all your JSON payloads (for both action and on_action calls) inside the `logs` folder.


5. Run the utility with command "node index logistic"


---

## 🔁 Supported Flows

### ✅ Version 1.2.0

- Order to Confirm Fulfillment  
- Deferred RTS  
- RTO Flow  
- Forward Flow  
- Cancel Flow  
- RTO Delivered  
- RTO Disposed Flow  

### ✅ Version 1.2.5

- Quick Commerce  
- Milk Run  
- SPMD  
- Payment Wallet  
- ePOD  
- Call Masking  
- Dynamic OTP Verification (Pickup and Delivery)  
- Dynamic OTP Verification (RTO)  
- Update Delivery Address  
- E-way Bill  
- Reverse QC  
- Codified Static Terms  
- Update Pickup and Delivery Authorization  
- COD Order  
- Updated Flow for Immediate Delivery  
- Surge Fee  
- Pickup and Delivery Attempt Trail (P2H2P)  
- Differential Weight Charges  
- Static OTP Verification (Pickup and Delivery)  
- Static OTP Verification (RTO)  
- Cancellation Terms  

---

## 📂 Folder Structure Example

log-verification-utility/
├── index.js
├── public/
│ └── logs/
│ ├── search.json
│ ├── on_search.json
│ ├── init.json
│ ├── on_init.json
│ └── ... (other payloads)


---

## 📌 Notes

- Payloads should follow ONDC logistics specifications.
- Make sure filenames are appropriate for matching the expected API call.
- The utility validates the flow as per business rules and versioned schema.


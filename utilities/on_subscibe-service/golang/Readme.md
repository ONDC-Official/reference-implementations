### Golang Utility for Subscribing and Key Generation

- Clone the repository.
- Ensure you have **Go 1.19+** installed.
- Navigate to the utility package and run the following command to start the application:
  ```bash
  go run cmd/main.go
  ```
- You will need to set up the configuration in `config.yaml` or `.env` with relevant details such as API keys and subscriber information.

- Use the `api/v1/generate-keys` endpoint to generate the necessary encryption and signing keys.

  Example Request:
  ```bash
  curl --location 'http://localhost:8080/api/v1/generate-keys' \
  --header 'Content-Type: application/json'
  ```

  Example Response:
  ```json
 
  {
    "encryption_private_key": "MC4CAQEwBQYDK2VuBCIEIIBdEBcQXDHq7qpXleyO1qN8H+Umpinh0nZjt8+Ff6ll",
    "encryption_public_key": "MCowBQYDK2VuAyEAhUURTGqE9kVClYehljZP5KysL45qs3RNAAzkJ9BELUE=",
    "signing_private_key": "CNDFf7t/onC/sZOeEGC3EPzPL6iKQWhM8nuBfeiPLH23uEr94otzIkN7nY8TxXRA4a5ZA+gx1MBydUXnZWYqCw==",
    "signing_public_key": "t7hK/eKLcyJDe52PE8V0QOGuWQPoMdTAcnVF52VmKgs="
}
  ```

- Replace the `message.key_pair.encryption_public_key` and `signing_public_key` in your subscription payload with the generated values.

- To subscribe, use the following curl request:

  ```bash
  curl --location 'registry_url/subscribe' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "context": {
      "operation": {
        "ops_no": 2
      }
    },
    "message": {
      "request_id": "ccfce272-13c3-4ca4-a070-64769f5df2a66",
      "timestamp": "2024-02-21T13:02:09.814Z",
      "entity": {
        "gst": {
          "legal_entity_name": "ABC Incorporates",
          "business_address": "Trade World, Mansarpur, Coorg, Karnataka 333333",
          "city_code": [
            "std:080"
          ],
          "gst_no": "07AAACN2082N4Z7"
        },
        "pan": {
          "name_as_per_pan": "ABC Incorporates",
          "pan_no": "ASDFP7657Q",
          "date_of_incorporation": "23/06/1982"
        },
        "name_of_authorised_signatory": "Anand Sharma",
        "address_of_authorised_signatory": "405, Pinnacle House, Kandiwali, Mumbai 400001",
        "email_id": "anand.sharma@abc.com",
        "mobile_no": 9912332199,
        "country": "IND",
        "subscriber_id": "your.app.com",
        "unique_key_id": "ccfce174-17c1-4ca4-a070-7419f5df2a66",
        "callback_url": "/",
        "key_pair": {
          "signing_public_key": "Od5jWsddCTo2bG04iT8jWirXBll5hTgt5v9WJVAyZWM=",
          "encryption_public_key": "MCowBQYDK2VuAyEAtixcps5Wt84F4sq90IPFr5ZjuUqPE93nGui7ROr2zzk=",
          "valid_from": "2024-02-21T13:02:09.814Z",
          "valid_until": "2024-10-20T18:00:15.071Z"
        }
      },
      "network_participant": [
        {
          "subscriber_url": "/",
          "domain": "ONDC:RET10",
          "type": "sellerApp",
          "msn": false,
          "city_code": [
            "std:080"
          ]
        }
      ]
    }
  }'
  ```

### Next Steps

Once you have successfully subscribed, proceed to the authentication header generation and verification steps.

--- 

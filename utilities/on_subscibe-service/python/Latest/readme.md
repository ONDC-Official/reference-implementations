# ONDC Subscribe Service Setup Guide

## Project Setup

### 1. Create and activate virtual environment

#### Create virtual environment
```sh
python -m venv venv
```

#### Activate virtual environment
**For Unix/MacOS**
```sh
source venv/bin/activate
```

**For Windows**
```sh
venv\Scripts\activate
```

### 2. Install dependencies
```sh
pip install -r requirements.txt
```

### 3. Run the Flask application
```sh
python server.py
```

The server will start on port `5556`.

---

## Configuration

Update the following variables in `server.py`:

```python
REQUEST_ID = "your-request-id"
SIGNING_PUBLIC_KEY = "your-signing-public-key"
SIGNING_PRIVATE_KEY = "your-signing-private-key"
ONDC_PUBLIC_KEY = "your-ondc-public-key"
ENC_PUBLIC_KEY = "your-encryption-public-key"
ENC_PRIVATE_KEY = "your-encryption-private-key"
```

---

## ONDC Subscribe API Endpoints

### Staging Environment
`https://staging.registry.ondc.org/subscribe`

### Pre-Production Environment
`https://preprod.registry.ondc.org/ondc/subscribe`

### Production Environment
`https://prod.registry.ondc.org/subscribe`

---

## Sample Subscribe Payload

```json
{
  "context": {
    "operation": {
      "ops_no": 1
    }
  },
  "message": {
    "request_id": "27baa06d-f90a-486c-85e5-cc621b787f04",
    "timestamp": "2022-07-08T13:44:54.101Z",
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
      "subscriber_id": "sit.grab.in",
      "unique_key_id": "27baa06d-f90a-486c-85e5-cc621b787f04",
      "callback_url": "/ondc/onboarding",
      "key_pair": {
        "signing_public_key": "QSax2KT4UiTUWUqoVUaEcWhBcGTTNu+Sf8EMDRY1GaE=",
        "encryption_public_key": "O74ukMymk4KZnVs3sZhU2U7RXpaZ/qiOUMk5NWt6rbI=",
        "valid_from": "2022-07-08T13:44:54.101Z",
        "valid_until": "2022-07-08T13:44:54.101Z"
      }
    },
    "network_participant": [
      {
        "subscriber_url": "/bapl",
        "domain": "nic2004:52110",
        "type": "buyerApp",
        "msn": false,
        "city_code": [
          "std:080"
        ]
      }
    ]
  }
}
```


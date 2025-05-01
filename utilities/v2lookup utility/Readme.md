# lookup-v2

## Summary

`lookup-v2` is a Node.js utility designed to interact with the ONDC (Open Network for Digital Commerce) registry. It allows users to send a POST request to the ONDC registry with dynamically provided parameters such as `country`, `type`, `ukid`, `domain`, and `city`. The utility generates an authorization header using a private key and other constants, constructs a JSON body, and sends the request to the registry endpoint.

---

## Features

- Dynamically accepts parameters via CLI.
- Validates that at least two parameters are provided before execution.
- Generates an authorization header using a private key and subscriber details.
- Sends a POST request to the ONDC registry endpoint.
- Outputs the JSON response from the registry.

---

## Environment Variables

The following environment variables can be set to customize the behavior of the utility:

| Environment Variable | Description                                                     | Default Value                                                                                                                       |
| -------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `REGISTRY_URL`     | The URL of the ONDC registry to which the POST request is sent. | `https://staging.registry.ondc.org/v2.0/lookup`                                                                                   |
| `SUBSCRIBER_ID`    | The subscriber ID used for generating the authorization header. | `staging-automation.ondc.org`                                                                        |
| `UNIQUE_KEY_ID`    | The unique key ID used for generating the authorization header. | `unique_key_id`                                                                                     |
| `PRIVATE_KEY`      | The private key used for generating the authorization header.   | `TNQyLktBlHNYIecRgfgNaR+F2JgdAP1xTDng2vuOWL0YMB5DtExgDkBHOkoizQ5WN9qzs9NQaa1Vr6yg==` (Replace with your actual private key) |

---

## CLI Parameters

The utility accepts the following parameters via the command line:

| Parameter     | Type       | Description                        | Required |
| ------------- | ---------- | ---------------------------------- | -------- |
| `--country` | `string` | Country code (e.g.,`IND`).       | Optional |
| `--type`    | `string` | Type (e.g.,`BAP`).               | Optional |
| `--ukid`    | `string` | Unique Key ID (UKID) for the body. | Optional |
| `--domain`  | `string` | Domain name.                       | Optional |
| `--city`    | `string` | City name.                         | Optional |

**Note**: At least **two parameters** must be provided for the utility to execute.

---

## Steps to Run

1. **Install Dependencies**:
   Ensure you have Node.js installed on your system. Then, install the required dependencies:

   ```bash
   npm install
   ```
2. **Set Environment Variables** (Optional): If you want to override the default values for `REGISTRY_URL`, `SUBSCRIBER_ID`, `UNIQUE_KEY_ID`, or `PRIVATE_KEY`, set them in your environment before running the script:

   ```
   export REGISTRY_URL="https://custom.registry.url"
   export SUBSCRIBER_ID="custom-subscriber-id"
   export UNIQUE_KEY_ID="custom-unique-key-id"
   export PRIVATE_KEY="custom-private-key"
   ```

   On Windows (Command Prompt):

   ```
   set REGISTRY_URL=https://custom.registry.url
   set SUBSCRIBER_ID=custom-subscriber-id
   set UNIQUE_KEY_ID=custom-unique-key-id
   set PRIVATE_KEY=custom-private-key
   ```
3. **View the Output** : The utility will output the JSON response from the ONDC registry.

---

## Example Usage

* **Basic Example** :

  ```
  node index.js --country="IND" --type="BAP"
  ```
* **With Additional Parameters** :

  ```
  node index.js --country="IND" --type="BAP" --ukid="unique-key-id" --domain="ONDC:TRV10" --city="std:080"
  ```
* **With Environment Variables** :

  ```
  export REGISTRY_URL="https://custom.registry.url"
  node index.js --country="IND" --type="BAP"
  ```

---

## Error Handling

* If fewer than two parameters are provided, the utility will display the following error and exit:

  **Error:** **At** **least** **two** **parameters** **are** **required** **to** **run** **the** **script.**
* If the ONDC registry returns an error, the utility will display the error response.

---

## Dependencies

The utility uses the following dependencies:

* `node-fetch`: For making HTTP requests.
* `ondc-crypto-sdk-nodejs`: For generating the authorization header.
* `yargs`: For parsing CLI arguments.

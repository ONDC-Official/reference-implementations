# Signing and Verification

This guide provides steps for signing and verification using a Ruby on Rails utility.

## Prerequisites

Ensure you have the following installed on your system:
- Ruby and Rails
- Bundler
- Docker and Docker Compose (if using the Docker setup)

---

## Running the Application

### Option 1: Running Locally

1. Install dependencies:
   ```sh
   bundle install
   ```

2. Start the Rails server:
   ```sh
   rails server
   ```

### Option 2: Running with Docker

1. Build and run the application using Docker Compose:
   ```sh
   docker-compose up --build
   ```

This will start the Rails server inside a Docker container.

---

## Generating Keys

Use the following API endpoint to generate signing and encryption key pairs:

```sh
curl --location http://localhost:3000/generate_keys
```

Response Example:
```json
{
    "Signing_private_key": "Mfs8PVY/RjuaUK+N/bAwwpSAiZf2P+jsptDmoavRxZk=",
    "Signing_public_key": "dFbJN468FxbjHGWiQTdBFQzXUFkjjFktp0ZadPOPX0E=",
    "Encryption_Privatekey": "4B+Swf1ibUYtvreIvuCn42c/qXRxKh6g38jL5cJHOMc=",
    "Encryption_Publickey": "28knPWlXcfhwvaoUMODYUcGuvCPAqCd1zUdofkkS3z4="
}
```

---

## Generating Authorization Header

Use the following API endpoint to create an authorization header:

```sh
curl --location 'http://localhost:3000/generate_header' \
--header 'Content-Type: application/json' \
--data '{
          "body": "payload",
          "private_key": "your_sign_private_key",
          "subscriber_id": "your_subscriber_id",
          "subscriber_unique_key_id": "subscriber_unique_key_id"
        }'
```

Response Example:
```json
Signature keyId="your subscriber_id|subscriber_unique_key_id|ed25519",algorithm="ed25519",created="1742937275",expires="1742940875",headers="(created) (expires) digest",signature="trigKG7n5aN9v6JWVe4Oxxh09HR7ZiuV5Q3f4ai6EucZGHoFPUKBq2GEQjJhKXhPG6p8neGCK/BpT1D9LdD3AQ=="
```

---

This README provides a complete guide to setting up, running, and using the Ruby on Rails-based signing and verification utility. Let me know if you need any refinements! 🚀


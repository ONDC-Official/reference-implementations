# ONDC crypto utility (Go)

A small CLI that helps ONDC Network Participants with ed25519 signing/verification and x25519 + AES encryption/decryption. Signing hashes the request body with BLAKE2b-512 and signs the `(created)/(expires)/digest` string with ed25519.

## Build

```sh
go build -o ondc-crypto .
```

## Usage

```sh
# generate signing + encryption key pairs
./ondc-crypto generate_key_pairs

# create an auth header for the plaintext body in request_body_raw_text.txt
# PRIVATE_KEY, SUBSCRIBER_ID, UNIQUE_KEY_ID should be set
./ondc-crypto create_authorisation_header

# verify an auth header (body read from request_body_raw_text.txt)
# PUBLIC_KEY should be set
./ondc-crypto verify_authorisation_header '<auth header>'
```

## Signing & verifying gzip (binary) payloads

When the request body is gzip-compressed and the signature is computed over the **compressed bytes**, use the gzip subcommands. They read the compressed body as raw bytes (from `GZIP_BODY_PATH`, default `request_body.gz`) and hash those bytes directly, so binary payloads are signed/verified intact. The caller is responsible for producing the gzip file.

```sh
# sign a gzip body
# PRIVATE_KEY, SUBSCRIBER_ID, UNIQUE_KEY_ID, GZIP_BODY_PATH should be set
./ondc-crypto create_gzip_authorisation_header

# verify a gzip body
# PUBLIC_KEY, GZIP_BODY_PATH should be set
./ondc-crypto verify_gzip_authorisation_header '<auth header>'
```

> Verify against the raw compressed bytes exactly as received. Do not decompress before verifying.

## Encryption / decryption

```sh
./ondc-crypto encrypt '<x25519 private key>' '<counterparty x25519 public key>'
./ondc-crypto decrypt '<x25519 private key>' '<counterparty x25519 public key>' '<cipher text>'
```

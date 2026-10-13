A signing and verification utility that is necessary for creation and verification of authentication signature between network participants of ONDC.


## NPM Package

You may use this utility which is release as a package on NPM

`https://www.npmjs.com/package/ondc-crypto-sdk-nodejs/v/2.1.1`

## Signing Authorisation Header

For signing the verification header, you can use the `createAuthorizationHeader` method.

```javascript
import { createAuthorizationHeader } from "ondc-crypto-sdk-nodejs"

const header = await createAuthorizationHeader({
      body: { context: {...}, message: {...} },
      privateKey: privateKey,
      subscriberId: "abcd.com/ondc", // Subscriber ID that you get after registering to ONDC Network
      subscriberUniqueKeyId: "584", // Unique Key Id or uKid that you get after registering to ONDC Network
    });
```

The method returns a set a unique signature that is ONDC-compliant and can be verified across NPs by looking up your public key from the registry.

## Verifying Authorisation Header

For verifying the verification header, you can use the `isHeaderValid` method.

```javascript
import { isHeaderValid } from "ondc-crypto-sdk-nodejs"

const isValid = await isHeaderValid({
      header: header, // The Authorisation header sent by other network participants
      body: { context: {...}, message: {...} },
      publicKey: publicKey,
});
```

The method returns a boolean value whether the signature is valid or not.

## Create vLookup signature

For creating a signature for the vLookup request, you can use the `createVLookupSignature` method.

```javascript
import { createVLookupSignature } from 'ondc-crypto-sdk-nodejs';

const isValid = await createVLookupSignature({
  country: 'IND',
  domain: 'ONDC:RET10',
  type: 'sellerApp',
  city: 'std:080',
  subscriber_id: 'subscriberId',
  privateKey: 'privateKey',
});
```

The method returns a signature that can be used in the /vlookup call on the registry.


## Signing & verifying gzip (binary) payloads

When the request body is gzip-compressed and the signature is computed over the **compressed bytes** (for example a catalog pushed with `Content-Encoding: gzip`), use the gzip variants. They hash the raw bytes directly and never UTF-8 re-encode the body, so they do not corrupt binary input the way the string-based `createAuthorizationHeader` / `isHeaderValid` do. The caller is responsible for compressing the body; these functions sign/verify the bytes as given.

```javascript
import { createGzipAuthorizationHeader, isGzipHeaderValid } from 'ondc-crypto-sdk-nodejs';
import { gzipSync } from 'zlib';

const compressedBody = gzipSync(Buffer.from(JSON.stringify(payload))); // Uint8Array / Buffer

const header = await createGzipAuthorizationHeader({
  compressedBody,
  privateKey: 'privateKey',
  subscriberId: 'subscriberId',
  subscriberUniqueKeyId: 'uniqueKeyId',
});

const valid = await isGzipHeaderValid({
  header,
  compressedBody, // the exact bytes received on the wire
  publicKey: 'publicKey',
});
```

> Verify against the raw compressed bytes exactly as received. Do not decompress before verifying.


## Release Notes

### [v2.1.0] - 2024-14-05


#### Changed
- Removed the JSON.parser in code
- Accepting JSON as string

#### Fixed
- Fixed a bug that caused the package to give NACK for valid signature


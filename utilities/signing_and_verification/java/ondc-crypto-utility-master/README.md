# ondc-crypto-utility
## Introduction
This project has been created with an intension to help and assist ONDC Network Participants to build their own crypto libraries that are required for interaction in ONDC Network
It covers key generation, signing, verification, encryption and decryption.

## CryptoFunctions class
[CryptoFunctions](./src/main/java/org/ondc/crypto/util/CryptoFunctions.java) has all crypto functions implemented

## Test class
[CryptoTest](./src/test/java/org/ondc/crypto/util/CryptoTest.java) Class has all test methods that can be referred to get an idea on how to use this library

## Documentation

[Java Docs](https://ondc-official.github.io/developer-docs/org/ondc/crypto/util/package-summary.html)


## Packaging
In root project folder issue below command. Ensure you have maven installed.
<br><br>
``mvn package``

## Downloads
[Download 0.1-GA jar](./target/ondc-crypto-util-0.1-GA.jar)

## Signing & verifying gzip (binary) payloads

When the request body is gzip-compressed and the signature is computed over the **compressed bytes**, use the gzip helpers. `generateBlakeHashRaw(byte[])` hashes raw bytes (unlike `generateBlakeHash(String)`, which UTF-8 re-encodes and corrupts binary), and `createGzipAuthorizationHeader` / `isGzipHeaderValid` assemble and verify the full ONDC Signature header over those bytes. The caller compresses the body.

```java
byte[] compressedBody = /* caller gzip-compresses the request body */;
CryptoKeyPair kp = CryptoFunctions.generateSigningKeyPair();

long created = System.currentTimeMillis() / 1000L;
long expires = created + 3600;

String header = CryptoFunctions.createGzipAuthorizationHeader(
        compressedBody, kp.getPrivateKey(), "subscriberId", "uniqueKeyId", created, expires);

// verify against the exact compressed bytes received on the wire
boolean valid = CryptoFunctions.isGzipHeaderValid(header, compressedBody, kp.getPublickKey());
```

> Verify against the raw compressed bytes exactly as received. Do not decompress before verifying.

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nd/2.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nd/2.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nd/2.0/">Creative Commons Attribution-NoDerivs 2.0 Generic License</a>.

const { randomBytes, createCipheriv, createDecipheriv } = require("crypto");
const { IV_LENGTH_IN_BITS, AUTH_TAG_LENGTH_IN_BITS } = require("./config");

const AUTH_TAG_LENGTH_IN_BYTES = Math.ceil(AUTH_TAG_LENGTH_IN_BITS / 8);
const IV_LENGTH_IN_BYTES = Math.ceil(IV_LENGTH_IN_BITS / 8);

function encryptData(sharedKey, data) {
  const iv = randomBytes(IV_LENGTH_IN_BYTES);
  const sharedKeyBytes = Buffer.from(sharedKey, "base64");

  const cipher = createCipheriv("aes-256-gcm", sharedKeyBytes, iv, {
    authTagLength: AUTH_TAG_LENGTH_IN_BYTES,
  });

  const encryptedMessage =
    cipher.update(data, "utf8", "base64") + cipher.final("base64");
  const authTag = cipher.getAuthTag();

  const authTagBase64 = authTag.toString("base64");

  const digetBase64 = convertPayloadToBase64(
    encryptedMessage,
    authTagBase64,
    iv.toString("base64")
  );

  return digetBase64;
}

function decryptData(sharedKey, eData) {
  const decodedData = Buffer.from(eData, "base64").toString("utf8");
  const dataJSON = JSON.parse(decodedData);
  const { encrypted_data, hmac, nonce } = dataJSON;

  const authTag = Buffer.from(hmac, "base64");
  const sharedKeyBytes = Buffer.from(sharedKey, "base64");
  const nonceBytes = Buffer.from(nonce, "base64");

  const decipher = createDecipheriv("aes-256-gcm", sharedKeyBytes, nonceBytes, {
    authTagLength: AUTH_TAG_LENGTH_IN_BYTES,
  });
  decipher.setAuthTag(authTag);

  const decryptedMessage =
    decipher.update(encrypted_data, "base64", "utf8") + decipher.final("utf8");

  return decryptedMessage;
}

function convertPayloadToBase64(encryptedMessage, authTagBase64, iv) {
  const returnPayloadJSON = {
    encrypted_data: encryptedMessage,
    hmac: authTagBase64,
    nonce: iv,
  };

  const returnPayloadString = JSON.stringify(returnPayloadJSON);

  const returnPayloadBase64 = Buffer.from(returnPayloadString, "utf8").toString(
    "base64"
  );

  return returnPayloadBase64;
}

module.exports = { encryptData, decryptData };

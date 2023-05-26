const { randomBytes, createCipheriv, createDecipheriv } = require("crypto");
const {
  IV_LENGTH_IN_BITS,
  AUTH_TAG_LENGTH_IN_BITS,
  KEY_STRING_FORMAT,
  ENCRYPT_DECRYPT_ALGORITHM,
} = require("./constants");

const AUTH_TAG_LENGTH_IN_BYTES = Math.ceil(AUTH_TAG_LENGTH_IN_BITS / 8);
const IV_LENGTH_IN_BYTES = Math.ceil(IV_LENGTH_IN_BITS / 8);

function encryptData(sharedKey, data) {
  const iv = randomBytes(IV_LENGTH_IN_BYTES);
  const sharedKeyBytes = Buffer.from(sharedKey, KEY_STRING_FORMAT);

  const cipher = createCipheriv(ENCRYPT_DECRYPT_ALGORITHM, sharedKeyBytes, iv, {
    authTagLength: AUTH_TAG_LENGTH_IN_BYTES,
  });

  const encryptedMessage =
    cipher.update(data, "utf8", KEY_STRING_FORMAT) +
    cipher.final(KEY_STRING_FORMAT);
  const authTag = cipher.getAuthTag();

  const authTagBase64 = authTag.toString(KEY_STRING_FORMAT);

  const digetBase64 = convertPayloadToBase64(
    encryptedMessage,
    authTagBase64,
    iv.toString(KEY_STRING_FORMAT)
  );

  return digetBase64;
}

function decryptData(sharedKey, eData) {
  const decodedData = Buffer.from(eData, KEY_STRING_FORMAT).toString("utf8");
  const dataJSON = JSON.parse(decodedData);
  const { encrypted_data, hmac, nonce } = dataJSON;

  const authTag = Buffer.from(hmac, KEY_STRING_FORMAT);
  const sharedKeyBytes = Buffer.from(sharedKey, KEY_STRING_FORMAT);
  const nonceBytes = Buffer.from(nonce, KEY_STRING_FORMAT);

  const decipher = createDecipheriv(
    ENCRYPT_DECRYPT_ALGORITHM,
    sharedKeyBytes,
    nonceBytes,
    {
      authTagLength: AUTH_TAG_LENGTH_IN_BYTES,
    }
  );
  decipher.setAuthTag(authTag);

  const decryptedMessage =
    decipher.update(encrypted_data, KEY_STRING_FORMAT, "utf8") +
    decipher.final("utf8");

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
    KEY_STRING_FORMAT
  );

  return returnPayloadBase64;
}

module.exports = { encryptData, decryptData };

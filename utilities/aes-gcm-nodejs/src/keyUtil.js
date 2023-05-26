const {
  generateKeyPairSync,
  diffieHellman,
  createPrivateKey,
  createPublicKey,
} = require("crypto");
const {
  KEY_PAIR_GENERATION_ALGORITHM,
  KEY_STRING_FORMAT,
} = require("./constants");

/**
 * Generates a public, private key pair in 'der' format
 * @typedef {Object} KeyPair
 * @property {String} publicKey
 * @property {String} privateKey
 * @returns {KeyPair}
 */
function generateKeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync(
    KEY_PAIR_GENERATION_ALGORITHM,
    {
      privateKeyEncoding: {
        format: "der",
        type: "pkcs8",
      },
      publicKeyEncoding: {
        format: "der",
        type: "spki",
      },
    }
  );

  const publicKeyString = publicKey.toString(KEY_STRING_FORMAT);
  const privateKeyString = privateKey.toString(KEY_STRING_FORMAT);

  return { publicKey: publicKeyString, privateKey: privateKeyString };
}
/**
 * Generates a shared key, when a private key and public key are passed
 * @param {String} privateKeyString
 * @param {String} publicKeyString
 * @returns {String} sharedKey
 */
function generateSharedKey(privateKeyString, publicKeyString) {
  const privateBuffer = Buffer.from(privateKeyString, KEY_STRING_FORMAT);
  const publicBuffer = Buffer.from(publicKeyString, KEY_STRING_FORMAT);

  const privateObj = createPrivateKey({
    key: privateBuffer,
    format: "der",
    type: "pkcs8",
  });
  const publicObj = createPublicKey({
    key: publicBuffer,
    format: "der",
    type: "spki",
  });

  const sharedSecret = diffieHellman({
    privateKey: privateObj,
    publicKey: publicObj,
  });

  const sharedKey = sharedSecret.toString(KEY_STRING_FORMAT);

  return sharedKey;
}

module.exports = { generateKeyPair, generateSharedKey };

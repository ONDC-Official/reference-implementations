const {
  generateKeyPairSync,
  diffieHellman,
  createPrivateKey,
  createPublicKey,
} = require("crypto");
const { KEY_LENGTH_IN_BITS } = require("./config");

function generateKeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync("x25519", {
    modulusLength: KEY_LENGTH_IN_BITS,
    privateKeyEncoding: {
      format: "der",
      type: "pkcs8",
    },
    publicKeyEncoding: {
      format: "der",
      type: "spki",
    },
  });

  const publicKeyString = publicKey.toString("base64");
  const privateKeyString = privateKey.toString("base64");

  return { publicKey: publicKeyString, privateKey: privateKeyString };
}

function generateSharedKey(privateKeyString, publicKeyString) {
  const privateBuffer = Buffer.from(privateKeyString, "base64");
  const publicBuffer = Buffer.from(publicKeyString, "base64");

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

  const sharedKey = sharedSecret.toString("base64");

  return sharedKey;
}

module.exports = { generateKeyPair, generateSharedKey };

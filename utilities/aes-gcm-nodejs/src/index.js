const { generateKeyPair, generateSharedKey } = require("./keyUtil");
const { encryptData, decryptData } = require("./encryptionUtil");

const aliceKeys = generateKeyPair();
const bobKeys = generateKeyPair();

console.log("Alice's keys: ");
console.log(aliceKeys);

console.log("Bob's keys: ");
console.log(bobKeys);

console.log("Making shared keys with the correct combination...");

const aliceSharedKey = generateSharedKey(
  aliceKeys.privateKey,
  bobKeys.publicKey
);
const bobSharedKey = generateSharedKey(bobKeys.privateKey, aliceKeys.publicKey);

console.log(
  "Do Alice and bob have the same shared key? ",
  aliceSharedKey === bobSharedKey,
  aliceSharedKey
);

const MESSAGE_DATA = "Peter Parker is spider man!!!!!";

console.log("Using Alice shared key to enrypt data");
const encryptedData = encryptData(aliceSharedKey, MESSAGE_DATA);

console.log("Encrypted data = ", encryptedData);

console.log("Using Bob shared key to decrypt data");
const decryptedData = decryptData(bobSharedKey, encryptedData);

console.log("Decrypted data = ", decryptedData);

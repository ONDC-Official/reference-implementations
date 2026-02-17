const { generateKeyPair, generateSharedKey } = require("./keyUtil");
const { encryptData, decryptData } = require("./encryptionUtil");

// Generate Key Pair for User 1.
const keyPair1 = generateKeyPair();
console.log("Key Pair 1 ==> ", keyPair1);

// Generate Key Pair for User 2.
const keyPair2 = generateKeyPair();
console.log("Key Pair 2 ==> ", keyPair2);

// Generate Shared Key with User 1's Private Key and User 2's Public Key.
const sharedKey1 = generateSharedKey(keyPair1.privateKey, keyPair2.publicKey);
console.log("SharedKey1 ==> " + sharedKey1);

// Generate Shared Key with User 2's Private Key and User 1's Public Key.
const sharedKey2 = generateSharedKey(keyPair2.privateKey, keyPair1.publicKey);
console.log("SharedKey2 ==> " + sharedKey2);

// Comparing the two Shared keys generated above.
console.log("sharedKey1 == sharedKey2 ==> ", sharedKey1 === sharedKey2);

// Initializing the raw text to be encrypted.
const MESSAGE_DATA = "Hello This is ONDC Test Data";

// Encrypting the raw data.
const encryptedData = encryptData(sharedKey1, MESSAGE_DATA);
console.log("Encrypted Data ===> " + encryptedData);

// Decrypting the Encrypted data.
const decryptedData = decryptData(sharedKey2, encryptedData);
console.log("Decrypted Data ===> " + decryptedData);

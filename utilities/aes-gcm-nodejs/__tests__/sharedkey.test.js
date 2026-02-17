const { generateKeyPair, generateSharedKey } = require("../src/keyUtil");

test("Check if two pairs of keys generate the same shared key after exchange", () => {
  const keyPair1 = generateKeyPair();
  const keyPair2 = generateKeyPair();

  const sharedKey1 = generateSharedKey(keyPair1.privateKey, keyPair2.publicKey);
  const sharedKey2 = generateSharedKey(keyPair2.privateKey, keyPair1.publicKey);

  expect(sharedKey1 === sharedKey2).toBe(true);
});

test("Check if two pairs of key generate the same shared key when not exchanged", () => {
  const keyPair1 = generateKeyPair();
  const keyPair2 = generateKeyPair();

  const sharedKey1 = generateSharedKey(keyPair1.privateKey, keyPair1.publicKey);
  const sharedKey2 = generateSharedKey(keyPair2.privateKey, keyPair2.publicKey);

  expect(sharedKey1 === sharedKey2).toBe(false);
});

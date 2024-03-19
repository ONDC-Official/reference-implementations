const { randomBytes } = require("crypto");
const { encryptData, decryptData } = require("../src/encryptionUtil");

test("Checking encryption with same shared key", () => {
  const MESSAGE = "This is a secret...";
  const sharedKey = randomBytes(32).toString("base64");

  const encryptedData = encryptData(sharedKey, MESSAGE);
  const decrpyedtData = decryptData(sharedKey, encryptedData);

  expect(decrpyedtData === MESSAGE).toBe(true);
});

test("Checking encryption with different shared key", () => {
  const MESSAGE = "This is a secret...";
  const sharedKey1 = randomBytes(32).toString("base64");
  const sharedKey2 = randomBytes(32).toString("base64");

  const encryptedData = encryptData(sharedKey1, MESSAGE);
  const decrpyedtData = decryptData(sharedKey2, encryptedData);

  expect(decrpyedtData === MESSAGE).toBe(false);
});

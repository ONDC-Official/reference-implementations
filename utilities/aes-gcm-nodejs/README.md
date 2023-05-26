# Crypto module in node.js

Make sure you are in the root of folder (the folder which contains src, \_\_tests\_\_ and README.md) of the repo and have node installed (v16^).

Run this command to run the script (A demo for key pair and shared key generation, encrpytion and decryption)

```
node src/index.js
```

Run this command to install testing libarary

```
npm install
```

Run this command to generate coverage report from test cases

```
npm run coverage
```

###

index.js is the main flow

keyUtil.js contains all the methods for creating key pairs and shared keys

encryptionUtil.js contains all the logic for encryption and decryption

constants.js contains all the variables that can be customised

\_\_tests\_\_ contains all the test cases

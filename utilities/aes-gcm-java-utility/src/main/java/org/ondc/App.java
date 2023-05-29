package org.ondc;

import java.security.Security;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.ondc.KeyUtil.DHKeyPair;

/**
 * Class depicting the usage of the utility.
 */
public class App {
    private static Logger logger = Logger.getLogger("InfoLogger");

    /**
     * Main Function.
     * @param args Main Function Args.
     */
    public static void main(String[] args) {
    	
    	// Adding the BouncyCastleProvider to java.security.Security.
        Security.addProvider(new BouncyCastleProvider());
        
        // Generate Key Pair for User 1.
        DHKeyPair keyPair1 = KeyUtil.generateKeyPair();
        logger.log(Level.INFO, "Key Pair 1 ==> {0}", keyPair1);
        
        // Generate Key Pair for User 2.
        DHKeyPair keyPair2 = KeyUtil.generateKeyPair();
        logger.log(Level.INFO, "Key Pair 2 ==> {0}", keyPair2);

        // Generate Shared Key with User 1's Private Key and User 2's Public Key.
        String sharedKey1 = KeyUtil.generateSharedKey(keyPair1.getPrivateKey(), keyPair2.getPublicKey());
        logger.log(Level.INFO, "SharedKey1 ==> {0}", sharedKey1);
        
        // Generate Shared Key with User 2's Private Key and User 1's Public Key.
        String sharedKey2 = KeyUtil.generateSharedKey(keyPair2.getPrivateKey(), keyPair1.getPublicKey());
        logger.log(Level.INFO, "SharedKey2 ==> {0}", sharedKey2);

        // Comparing the two Shared keys generated above.
        logger.log(Level.INFO, "sharedKey1 == sharedKey2 ==> {0}", sharedKey1.equals(sharedKey2));

        // Initializing the raw text to be encrypted.
        String rawData = "Hello This is ONDC Test Data";
        
        // Encrypting the raw data.
        String encryptedData = EncryptionUtil.encryptData(sharedKey1, rawData);
        logger.log(Level.INFO, "Encrypted Data ===> {0}", encryptedData);

        // Decrypting the Encrypted data.
        String decryptedData =  EncryptionUtil.decryptData(sharedKey2, encryptedData);
        logger.log(Level.INFO, "Decrypted Data ===> {0}", decryptedData);

    }
}
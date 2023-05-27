package org.ondc;

import java.security.Security;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.ondc.KeyUtil.DHKeyPair;

/**
 * Class depicting the usage of the utility.
 */
public class App {

    /**
     * Main Function.
     * @param args Main Function Args.
     */
    public static void main(String[] args) {
    	
    	// Adding the BouncyCastleProvider to java.security.Security.
        Security.addProvider(new BouncyCastleProvider());
        
        // Generate Key Pair for User 1.
        DHKeyPair keyPair1 = KeyUtil.generateKeyPair();
        System.out.println("Key Pair 1 ==> "+ keyPair1.toString());
        
        // Generate Key Pair for User 2.
        DHKeyPair keyPair2 = KeyUtil.generateKeyPair();
        System.out.println("Key Pair 2 ==> "+ keyPair2.toString());

        // Generate Shared Key with User 1's Private Key and User 2's Public Key.
        String sharedKey1 = KeyUtil.generateSharedKey(keyPair1.getPrivateKey(), keyPair2.getPublicKey());
        System.out.println("SharedKey1 ==> "+ sharedKey1);
        
        // Generate Shared Key with User 2's Private Key and User 1's Public Key.
        String sharedKey2 = KeyUtil.generateSharedKey(keyPair2.getPrivateKey(), keyPair1.getPublicKey());
        System.out.println("SharedKey2 ==> "+ sharedKey2);

        // Comparing the two Shared keys generated above.
        System.out.println("sharedKey1 == sharedKey2 ==> " + sharedKey1.equals(sharedKey2));

        // Initializing the raw text to be encrypted.
        String rawData = "Hello This is ONDC Test Data";
        
        // Encrypting the raw data.
        String encryptedData = EncryptionUtil.encryptData(sharedKey1, rawData);
        System.out.println("Encrypted Data ===> " + encryptedData);

        // Decrypting the Encrypted data.
        String decryptedData =  EncryptionUtil.decryptData(sharedKey2, encryptedData);
        System.out.println("Decrypted Data ===> " + decryptedData);

    }
}
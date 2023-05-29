package org.ondc;

import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.crypto.KeyAgreement;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/**
 * 
 * Utility Class to Generate Keypairs and Shared Key.
 *
 */
public class KeyUtil {
	private static Logger log = Logger.getLogger("ErrorLogger");

    private KeyUtil() {

    }

    /**
     * The Algorithm used to generate Key pairs. ("X25519").
     */
    public static final String KEYPAIR_GENERATION_ALGORITHM = "X25519";
	
	/**
	 * 
	 * POJO class for storing private and public keys.
	 *
	 */
    public static class DHKeyPair {
    	
    	/**
    	 * The Public Key.
    	 */
        private String publicKey;
        
        /**
         * The Private Key.
         */
        private String privateKey;

        /**
         * Constructor
         * @param keyPair Instance of java.security.KeyPair Class.
         */
        public DHKeyPair(KeyPair keyPair) {
            this.publicKey = keyToString(keyPair.getPublic());
            this.privateKey = keyToString(keyPair.getPrivate());
        }

        /**
         * Gets the Public Key.
         * @return Public Key.
         */
        public String getPublicKey() {
            return publicKey;
        }

        /**
         * Gets the Private Key.
         * @return Private Key.
         */
        public String getPrivateKey() {
            return privateKey;
        }
        
        /**
         * String Formatting.
         */
        @Override
        public String toString() {
            return "DHKeyPair [publicKey=" + publicKey + ", privateKey=" + privateKey + "]";
        }
        

    }

    /**
     * Generate a Keypair.
     * @return Generated Keypair.
     */
    public static DHKeyPair generateKeyPair() {
        DHKeyPair generatedKeyPair = null;
        try {
            KeyPair keyPair = KeyPairGenerator.getInstance(KEYPAIR_GENERATION_ALGORITHM).generateKeyPair();
            generatedKeyPair = new DHKeyPair(keyPair);
        } catch (Exception e) {
            log.log(Level.SEVERE, e.getMessage(), e);
        }
        return generatedKeyPair;
    }

    /**
     * Generates a SharedKey.
     * @param privateKeyStr Private Key of one party.
     * @param publicKeyStr Public Key of the other party.
     * @return Shared key as base64 string.
     */
    public static String generateSharedKey(String privateKeyStr, String publicKeyStr){
    	
    	// Initialize the variables to store Shared Key and Key Agreement.
        String sharedKey = null;
        KeyAgreement ka;
        
        try {
        	
        	// De-serializing the private key and public key.
            Key privateKey = privateKeyFromString(privateKeyStr);
            Key publicKey = publicKeyFromString(publicKeyStr);
            
            // Intializing a key agreement instance.
            ka = KeyAgreement.getInstance(KEYPAIR_GENERATION_ALGORITHM, "BC");
            ka.init(privateKey);
            
            // Generate the Shared Key.
            ka.doPhase(publicKey, true);
            SecretKey sKey = ka.generateSecret("AES");
            sharedKey = keyToString(sKey);
            
        } catch (Exception e) {
            log.log(Level.SEVERE, e.getMessage(), e);
        }
        
        // Return the Shared Key.
        return sharedKey;
    }

    /**
     * Encode a key to base64 string.
     * @param key The key to encode.
     * @return The Encoded Key.
     */
    private static String keyToString(Key key) {
        byte[] encodedKey = key.getEncoded();
        return Base64.getEncoder().encodeToString(encodedKey);
    }

    /**
     * Get the Public Key from base64 encoded string.
     * @param publicKeyStr The base64 encoded Public Key string.
     * @return The Decoded Public Key.
     * @throws NoSuchAlgorithmException Thrown when invalid keypair generation algorithm is configured.
     * @throws InvalidKeySpecException Thrown if the public key is invalid.
     */
    private static PublicKey publicKeyFromString(String publicKeyStr) throws NoSuchAlgorithmException, InvalidKeySpecException  {
        byte[] encodedKey = Base64.getDecoder().decode(publicKeyStr);
        KeyFactory keyFactory = KeyFactory.getInstance(KEYPAIR_GENERATION_ALGORITHM);
        return keyFactory.generatePublic(new X509EncodedKeySpec(encodedKey));
    }

    /**
     * Get the Private Key from base64 encoded string.
     * @param privateKeyStr The base64 encoded Private Key string.
     * @return The Decoded Private Key.
     * @throws NoSuchAlgorithmException Thrown when invalid keypair generation algorithm is configured.
     * @throws InvalidKeySpecException Thrown if the private key is invalid.
     */
    private static PrivateKey privateKeyFromString(String privateKeyStr) throws NoSuchAlgorithmException, InvalidKeySpecException  {
        byte[] encodedKey = Base64.getDecoder().decode(privateKeyStr);
        KeyFactory keyFactory = KeyFactory.getInstance(KEYPAIR_GENERATION_ALGORITHM);
        return keyFactory.generatePrivate(new PKCS8EncodedKeySpec(encodedKey));
    }

    /**
     * Get the Shared Key from base64 encoded string.
     * @param sharedKeyString The base64 encoded Shared Key String.
     * @return The Decoded Shared Key.
     */
    protected static SecretKey sharedKeyFromString(String sharedKeyString) {
        byte[] decodedKey = Base64.getDecoder().decode(sharedKeyString);
        return new SecretKeySpec(decodedKey, KEYPAIR_GENERATION_ALGORITHM);
    }
}
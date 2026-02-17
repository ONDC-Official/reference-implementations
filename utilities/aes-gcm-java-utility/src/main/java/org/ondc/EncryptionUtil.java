package org.ondc;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;


/**
 * Utility class for encrypting and decrypting payload.
 */
public class EncryptionUtil {
	private static Logger log = Logger.getLogger("ErrorLogger");

    private EncryptionUtil() {
        
    }
	/**
	 * The standard Initialization Vector (IV) length (96 bits).
	 */
	public static final int IV_BIT_LENGTH = 96;
	
	/**
	 * The standard authentication tag length (128 bits).
	 */
    public static final int AUTH_TAG_BIT_LENGTH = 128;
    
    
    /**
     * 
     * The POJO class for Encrypted Data.
     *
     */
    public static class EncryptionPayload {
        
        /**
         * The Nonce / IV (Initialization Vector) created for encrypting the data.
         */
        private String nonce;
        
    	/**
    	 * The Encrypted Data in base64 encoded format.
    	 */
        @SerializedName("encrypted_data")
        private String encrypedData;
        
        /**
         * The HMAC
         */
        private String hmac;

        /**
         * Gets the Encrypted Data
         * @return The Encrypted Data.
         */
        public String getEncrypedData() {
            return encrypedData;
        }

        /**
         * Sets the Encrypted Data.
         * @param encrypedData The Encrypted Data.
         */
        private void setEncrypedData(String encrypedData) {
            this.encrypedData = encrypedData;
        }

        /**
         * Gets the Nonce.
         * @return The Nonce.
         */
        public String getNonce() {
            return nonce;
        }

        /**
         * Sets the Nonce.
         * @param nonce The Nonce.
         */
        private void setNonce(String nonce) {
            this.nonce = nonce;
        }

        /**
         * Gets the HMAC.
         * @return The HMAC.
         */
        public String getHmac() {
            return hmac;
        }

        /**
         * Sets the HMAC.
         * @param hmac The HMAC.
         */
        private void setHmac(String hmac) {
            this.hmac = hmac;
        }

        /**
         * A Method to convert this instance of a class to base64 string.
         * @return Base64 Encoded string of the object.
         */
        public String toBase64String() {
            return bytesToString(new Gson().toJson(this).getBytes());
        }

    }

    /**
     * Encrypts the specified plain text using AES/GCM/NoPadding.
     * @param key The Shared Key.
     * @param data The Raw Data to be Encrypted.
     * @return The Encrypted data in base64 encoded format.
     */
    public static String encryptData(String key, String data) {
    	
    	// Initialize a EncryptionPayload Object.
        String enryptionPayload = null;
        try {
        	
        	// Create a Cipher instance.
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            
            // De-serializing the Shared Key.
            SecretKey sKey = KeyUtil.sharedKeyFromString(key);
            SecretKeySpec keySpec = new SecretKeySpec(sKey.getEncoded(), "AES");
            
            // Randomly generate the IV / nonce.
            SecureRandom secureRandom = new SecureRandom();
            byte[] iv = new byte[IV_BIT_LENGTH / 8];
            secureRandom.nextBytes(iv);
            
            // Initialize AES/GCM cipher for encryption
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, new GCMParameterSpec(AUTH_TAG_BIT_LENGTH, iv));
            
            // Encrypt the raw data and get the cipher text and authentication tag.
            byte[] eData = cipher.doFinal(data.getBytes());
            EncryptionPayload encryptedData = new EncryptionPayload();
            int tagLengthBytes = AUTH_TAG_BIT_LENGTH / Byte.SIZE;
            
            
            byte[] encryptedText=Arrays.copyOfRange(eData, 0, eData.length - tagLengthBytes);
            byte[] authTag= Arrays.copyOfRange(eData, eData.length - tagLengthBytes, eData.length);
           
            // Set the values for the EncryptedData object.
            encryptedData.setEncrypedData(bytesToString(encryptedText));
            encryptedData.setNonce(bytesToString(iv));
            encryptedData.setHmac(bytesToString(authTag)); 
            
            enryptionPayload = encryptedData.toBase64String();
        } catch (Exception e) {
            log.log(Level.SEVERE, e.getMessage(), e);
        }
        
        // Return the Encrypted Data.
        return enryptionPayload;
    }

    /**
     * Decrypts the Encrypted Data using Shared Key.
     * @param key The Shared Key.
     * @param eData The Encrypted Data.
     * @return The Raw Decrypted data.
     */
    public static String decryptData(String key, String eData) {
    	
    	// Initialize a variable to store Decrypted Data.
        String rawData = null;
        
        // Decode the base64 string and De-serialize it as› EncryptionPayload Object.
        String json = stringToBytes(eData);
        EncryptionPayload encryptedData = new Gson().fromJson(json, EncryptionPayload.class);
        
        try {
        	
        	// Create a Cipher instance.
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            
            // Decode the fields of encryptedData from base64 to bytes.
            byte[] nonce = Base64.getDecoder().decode(encryptedData.getNonce());
            byte[] authTagBytes = Base64.getDecoder().decode(encryptedData.getHmac());
            byte[] eBytes = Base64.getDecoder().decode(encryptedData.getEncrypedData());
            
            byte[] encryptedBytes= Arrays.copyOf(eBytes, eBytes.length + authTagBytes.length);
            System.arraycopy(authTagBytes,0,encryptedBytes,eBytes.length,authTagBytes.length);
            
            // De-serialize the Shared Key.
            SecretKey sKey = KeyUtil.sharedKeyFromString(key);
            SecretKeySpec keySpec = new SecretKeySpec(sKey.getEncoded(), "AES");
            
            // Initialize the AES/GCM Cipher instance for decryption.
            cipher.init(Cipher.DECRYPT_MODE, keySpec, new GCMParameterSpec(128, nonce));
            
            
            // Decrypt the data
            byte[] dData = cipher.doFinal(encryptedBytes);
            rawData = new String(dData);
            
        } catch (Exception e) {
            log.log(Level.SEVERE, e.getMessage(), e);
        }
        
        // Return the Decrypted Data.›
        return rawData;
        
    }
    

    /**
     * Converts a Byte Array into base64 string.
     * @param bytes The Byte Array to be encoded.
     * @return The base64 encoded string.
     */
    private static String bytesToString(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }
    
    
    /**
     * Converts a base64 string into Byte Array.
     * @param data The base64 encoded string.
     * @return The decoded Byte Array.
     */
    private static String stringToBytes(String data) {
    	byte[] bytes = Base64.getDecoder().decode(data);
    	return new String(bytes);
    }
}
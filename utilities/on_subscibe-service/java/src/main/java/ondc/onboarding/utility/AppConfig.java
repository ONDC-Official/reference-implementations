package ondc.onboarding.utility;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    
    private static final Logger logger = LoggerFactory.getLogger(AppConfig.class);
    
    @Value("${ondc.keys.sign.private}")
    private String signPrivateKey;
    
    @Value("${ondc.keys.sign.public}")
    private String signPublicKey;
    
    @Value("${ondc.keys.enc.private}")
    private String encPrivateKey;
    
    @Value("${ondc.keys.enc.public}")
    private String encPublicKey;
    
    @Value("${ondc.keys.auto.generate}")
    private boolean autoGenerateKeys;
    
    @Bean
    public Map<String,byte[]> keys() throws NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchProviderException, JSONException {
        Map<String,byte[]> keys = new HashMap<>();
        
        // Check if all required keys are provided in environment/properties
        boolean hasAllKeys = !signPrivateKey.isEmpty() && !signPublicKey.isEmpty() && 
                           !encPrivateKey.isEmpty() && !encPublicKey.isEmpty();
        
        if (hasAllKeys && !autoGenerateKeys) {
            // Load keys from environment/properties
            logger.info("Loading keys from environment variables/properties");
            
            try {
                keys.put("sign_private_key", Base64.getDecoder().decode(signPrivateKey));
                keys.put("sign_public_key", Base64.getDecoder().decode(signPublicKey));
                keys.put("enc_private_key", Base64.getDecoder().decode(encPrivateKey));
                keys.put("enc_public_key", Base64.getDecoder().decode(encPublicKey));
                
                logger.info("Successfully loaded keys from environment");
            } catch (Exception e) {
                logger.error("Error loading keys from environment: " + e.getMessage());
                logger.info("Falling back to key generation");
                return generateNewKeys();
            }
        } else {
            // Generate new keys if not provided or auto-generate is enabled
            logger.info("Generating new keys (missing environment keys or auto-generate enabled)");
            return generateNewKeys();
        }
        
        return keys;
    }
    
    private Map<String,byte[]> generateNewKeys() throws NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchProviderException {
        Map<String,byte[]> keys = new HashMap<>();
        
        // Generate Ed25519 signing key pair
        CryptoKeyPair signingKeyPair = Utils.generateSigningKeyPair();
        keys.put("sign_private_key", signingKeyPair.getPrivateKey());
        keys.put("sign_public_key", signingKeyPair.getPublickKey());
        
        // Generate X25519 encryption key pair
        CryptoKeyPair encryptionKeyPair = Utils.generateEncDecKey();
        keys.put("enc_private_key", encryptionKeyPair.getPrivateKey());
        keys.put("enc_public_key", encryptionKeyPair.getPublickKey());
        
        // Log generated keys for copying to environment
        logger.info("=== GENERATED KEYS FOR ENVIRONMENT SETUP ===");
        logger.info("ONDC_SIGN_PRIVATE_KEY=" + Base64.getEncoder().encodeToString(keys.get("sign_private_key")));
        logger.info("ONDC_SIGN_PUBLIC_KEY=" + Base64.getEncoder().encodeToString(keys.get("sign_public_key")));
        logger.info("ONDC_ENC_PRIVATE_KEY=" + Base64.getEncoder().encodeToString(keys.get("enc_private_key")));
        logger.info("ONDC_ENC_PUBLIC_KEY=" + Base64.getEncoder().encodeToString(keys.get("enc_public_key")));
        logger.info("=== COPY THESE TO YOUR .env FILE OR ENVIRONMENT VARIABLES ===");
        
        return keys;
    }

    @Bean
    public String requestId(@Value("${ondc.request.id}") String requestId){
        return requestId;
    }

    @Bean
    public String ondcPublicKey(@Value("${ondc.public.key}") String publicKey){
        return publicKey;
    }

    @Bean
    public String gatewayUrl(@Value("${ondc.gateway.url}") String gatewayUrl){
        return gatewayUrl;
    }
}


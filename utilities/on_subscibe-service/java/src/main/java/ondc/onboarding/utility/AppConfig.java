package ondc.onboarding.utility;

import org.json.JSONException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.HashMap;
import java.util.Map;

import static ondc.onboarding.utility.Utils.generateEncDecKey;
import static ondc.onboarding.utility.Utils.generateSigningKeyPair;

@Configuration
public class AppConfig {
    @Bean
    public Map<String,byte[]> keys() throws NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchProviderException, JSONException {
        CryptoKeyPair signingKeyPair = generateSigningKeyPair();
        CryptoKeyPair encKeyPair = generateEncDecKey();

        Map<String,byte[]> keys = new HashMap<>();
        keys.put("sign_public_key",signingKeyPair.getPublickKey());
                keys.put("sign_private_key",signingKeyPair.getPrivateKey());
                keys.put("enc_public_key", encKeyPair.getPublickKey());
                keys.put("enc_private_key", encKeyPair.getPrivateKey());
        return keys;
    }

    @Bean
    public String requestId(){
        return "";
    }

    @Bean
    public String ondcPublicKey(){
        return "MCowBQYDK2VuAyEARa/WcMCzNQp4DWjvTI4DK7vHL6EdaHqN4GjFIu9wxxM=";
    }

    @Bean
    public String gatewayUrl(){
        // staging decommissioned -> defaulting to pre-prod
        return "https://preprod.registry.ondc.org/ondc/subscribe";
    }

    @Bean
    public String vlookupUrl(){
        //Staging (decommissioned)
        //return "https://staging.registry.ondc.org/vlookup";

        //Preprod (vlookup is obsolete -> use /v2.0/lookup)
        return "https://preprod.registry.ondc.org/v2.0/lookup";

        //Prod
        //return "https://prod.registry.ondc.org/vlookup";
    }
}


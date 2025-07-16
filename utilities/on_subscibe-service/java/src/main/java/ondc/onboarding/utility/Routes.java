package ondc.onboarding.utility;


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;


@RestController
public class Routes extends  Utils{

    @Autowired
    private Map<String,byte[]> keys;

    @Autowired
    private String ondcPublicKey;

    @Autowired
    private String requestId;

    @Autowired
    private String gatewayUrl;
    private final Logger logger =  LoggerFactory.getLogger(Routes.class);;

    @GetMapping("/get-keys")
    public ResponseEntity<Map<String,String>> getKeys (){
        Map<String,String> keyResponse = new HashMap<>();
        keyResponse.put("enc_private_key", toBase64(keys.get("enc_private_key")));
        keyResponse.put("sign_private_key", toBase64(keys.get("sign_private_key")));
        keyResponse.put("sign_public_key", toBase64(keys.get("sign_public_key")));
        keyResponse.put("enc_public_key", toBase64(keys.get("enc_public_key")));
        
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(keyResponse);
    }

    // Health check endpoint - matching Node.js
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("Health OK!!");
    }

    // Default route - matching Node.js
    @GetMapping("/")
    public ResponseEntity<String> defaultRoute() {
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("Hello World!");
    }

    @PostMapping("/create-header")
    public
    String createHeader(@RequestBody JsonNode req) throws Exception {
        long created = System.currentTimeMillis() / 1000L;
        long expires = created + 300000;
        logger.info(toBase64(generateBlakeHash(req.get("value").toString())));
        logger.info(req.get("value").toString());
        String hashedReq = hashMassage(req.get("value").toString(),created,expires);
        String signature = sign(Base64.getDecoder().decode(req.get("private_key").asText()),hashedReq.getBytes());
        String subscriberId = req.get("subscriber_id").asText();
        String uniqueKeyId = req.get("unique_key_id").asText();

        return "Signature keyId=\"" + subscriberId + "|" + uniqueKeyId + "|" + "ed25519\"" + ",algorithm=\"ed25519\"," + "created=\"" + created + "\",expires=\"" + expires + "\",headers=\"(created) (expires)" + " digest\",signature=\"" + signature + "\"";
    }

    @PostMapping("/verify-header")
    public ResponseEntity<String> isValidHeader(@RequestBody JsonNode req) throws JSONException {
        try {
            long currentTimestamp = System.currentTimeMillis() / 1000L;
            String authHeader = req.get("header").asText();
            String signature = authHeader.split(",")[5].split("=")[1].replaceAll("\"","");
            long expires = Long.parseLong(authHeader.split(",")[3].split("=")[1].replaceAll("\"",""));
            long created = Long.parseLong(authHeader.split(",")[2].split("=")[1].replaceAll("\"",""));
            
            if ((created > currentTimestamp) || currentTimestamp > expires){
                logger.info("Timestamp should be Created < CurrentTimestamp < Expires");
                JSONObject response = new JSONObject();
                response.put("is_valid", false);
                response.put("reason", "Invalid timestamp");
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response.toString());
            }
            
            String hashedReq = hashMassage(req.get("value").toString(),created,expires);
            logger.info(hashedReq);
            
            boolean isValid = verify(
                    fromBase64(signature),
                    hashedReq.getBytes(),
                    fromBase64(req.get("public_key").asText())
            );
            
            JSONObject response = new JSONObject();
            response.put("is_valid", isValid);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response.toString());
            
        } catch (Exception e) {
            logger.error("Error in verify-header: ", e);
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("is_valid", false);
            errorResponse.put("error", "Failed to verify header: " + e.getMessage());
            return ResponseEntity.status(400).contentType(MediaType.APPLICATION_JSON).body(errorResponse.toString());
        }
    }

        @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@RequestBody JsonNode subscribeBody) throws NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchProviderException, JSONException, IOException, InterruptedException {

        logger.info("Making subscription request to gateway URL: {}", gatewayUrl);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(gatewayUrl))
                .POST(HttpRequest.BodyPublishers.ofString(subscribeBody.toString()))
                .build();
        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> httpResponse = client.send(request, HttpResponse.BodyHandlers.ofString());
        JSONObject responseJson = new JSONObject(httpResponse.body());

        if (responseJson.has("error")){
            this.logger.info(responseJson.getJSONObject("error").toString());
            return ResponseEntity.status(401).contentType(MediaType.APPLICATION_JSON).body(httpResponse.body());
        }

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(httpResponse.body());
    }

    @GetMapping("/ondc-site-verification.html")
    public ResponseEntity<String> htmlVerify() throws JSONException {

        if (this.requestId == null || this.requestId.isEmpty()){
            return ResponseEntity.internalServerError().body("Please Set Request ID in configuration");
        }

        // Generate signature for the request ID directly in this endpoint
        String signedRequestId = sign(
                this.keys.get("sign_private_key"),
                this.requestId.getBytes()
        );

        return ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(
        """ 
        <!--Contents of ondc-site-verification.html. -->
        <!--Please replace SIGNED_UNIQUE_REQ_ID with an actual value-->
        <html>
          <head>
            <meta
              name="ondc-site-verification"
              content="%s"
            />
          </head>
          <body>
            ONDC Site Verification Page
          </body>
        </html>
        """.formatted(signedRequestId));
    }

    @PostMapping("/on_subscribe")
    public ResponseEntity<String> onSubscribe(@RequestBody JsonNode request) throws JSONException {
        try {
            logger.info(request.toString());
            
            JsonNode challengeNode = request.get("challenge");
            if (challengeNode == null) {
                JSONObject errorResponse = new JSONObject();
                errorResponse.put("error", "Missing challenge parameter");
                return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(errorResponse.toString());
            }
            
            byte[] decryptedData = encryptDecrypt(
                    Cipher.DECRYPT_MODE,
                    Base64.getDecoder().decode(challengeNode.asText()),
                    keys.get("enc_private_key"),
                    Base64.getDecoder().decode(this.ondcPublicKey)
            );
            JSONObject response = new JSONObject();
            response.put("answer", new String(decryptedData));
            logger.info(response.toString());
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response.toString());
        } catch (Exception e) {
            logger.error("Error in on_subscribe: ", e);
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", "Failed to decrypt challenge");
            return ResponseEntity.status(500).contentType(MediaType.APPLICATION_JSON).body(errorResponse.toString());
        }
    }
}
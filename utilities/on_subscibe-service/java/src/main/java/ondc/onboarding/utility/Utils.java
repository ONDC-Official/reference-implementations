package ondc.onboarding.utility;

import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Security;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyAgreement;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import static org.bouncycastle.jcajce.spec.XDHParameterSpec.X25519;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.math.ec.rfc8032.Ed25519;

public class Utils {
    public static CryptoKeyPair generateSigningKeyPair() {
        SecureRandom RANDOM = new SecureRandom();
        byte[] privateKey = new byte[Ed25519.SECRET_KEY_SIZE]; // 32 bytes
        byte[] publicKey = new byte[Ed25519.PUBLIC_KEY_SIZE];  // 32 bytes
        RANDOM.nextBytes(privateKey);
        Ed25519.generatePublicKey(privateKey, 0, publicKey, 0);
        
        // Create TweetNaCl-compatible 64-byte secret key (private + public concatenated)
        byte[] tweetNaClSecretKey = new byte[64];
        System.arraycopy(privateKey, 0, tweetNaClSecretKey, 0, 32);
        System.arraycopy(publicKey, 0, tweetNaClSecretKey, 32, 32);
        
        return new CryptoKeyPair(publicKey, tweetNaClSecretKey);
    }

    public static CryptoKeyPair generateEncDecKey() throws InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, NoSuchProviderException {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }
        KeyPairGenerator kpg = KeyPairGenerator.getInstance(X25519, BouncyCastleProvider.PROVIDER_NAME);
        kpg.initialize(256); // 32 Byte or 256 Bits
        KeyPair kp = kpg.generateKeyPair();
        
        return new CryptoKeyPair(kp.getPublic().getEncoded(), kp.getPrivate().getEncoded());
    }

    public static String toBase64(byte[] src){
        return Base64.getEncoder().encodeToString(src);
    }
    public static byte[] fromBase64 (String str) {
        return Base64.getDecoder().decode(str);
    }


    public static  String hashMassage(String req, long created,long expires) throws Exception {
        byte[] digest = generateBlakeHash(req);
        return """
            (created): %s
            (expires): %s
            digest: BLAKE-512=%s""".formatted(created,expires, toBase64(digest));
    }
    public static byte[] generateBlakeHash(String req) throws Exception {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }
        MessageDigest digest = MessageDigest.getInstance("BLAKE2B-512", BouncyCastleProvider.PROVIDER_NAME);
        digest.reset();
        digest.update(req.getBytes(StandardCharsets.UTF_8));
        return digest.digest();
    }

    public static String sign(byte[] privateKey,byte[] message) {
        // Handle TweetNaCl format (64-byte) by extracting first 32 bytes
        byte[] actualPrivateKey = privateKey;
        if (privateKey.length == 64) {
            actualPrivateKey = new byte[32];
            System.arraycopy(privateKey, 0, actualPrivateKey, 0, 32);
        }
        
        // initialise signature variable
        byte[] signature = new byte[Ed25519.SIGNATURE_SIZE];

        // sign the received message with given private key
        Ed25519.sign(actualPrivateKey, 0, message, 0, message.length, signature, 0);
        return  toBase64(signature);
    }

    public static boolean verify(byte[] signature,byte[] message, byte[] publicKey) {
        //verify the given signature with
        return Ed25519.verify(signature, 0, publicKey, 0, message, 0, message.length);
    }

    public static byte[] encryptDecrypt(int mode, byte[] challenge_string,byte[] privateKey, byte[] publicKey) throws NoSuchAlgorithmException, NoSuchProviderException, InvalidKeySpecException, InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeySpecException {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }
        KeyAgreement keyAgreement=KeyAgreement.getInstance(X25519, BouncyCastleProvider.PROVIDER_NAME);
        X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(publicKey);
        PublicKey publickey = KeyFactory.getInstance(X25519, BouncyCastleProvider.PROVIDER_NAME)
                .generatePublic(x509EncodedKeySpec);
        PrivateKey privatekey = KeyFactory.getInstance(X25519, BouncyCastleProvider.PROVIDER_NAME)
                .generatePrivate(new PKCS8EncodedKeySpec(privateKey));
        keyAgreement.init(privatekey);
        keyAgreement.doPhase(publickey, true);
        byte[] secret = keyAgreement.generateSecret();
        SecretKey originalKey = new SecretKeySpec(secret , 0, secret.length, "AES");
        Cipher cipher = Cipher.getInstance("AES", BouncyCastleProvider.PROVIDER_NAME);
        cipher.init(mode, originalKey);
        return cipher.doFinal(challenge_string);
    }

    public static String formatEncryptionKey(byte[] keyBytes) {
        // Convert DER-encoded key to base64 (this gives us the raw key data)
        String base64Key = toBase64(keyBytes);
        
        // The DER-encoded keys from BouncyCastle are already in the right format
        // Node.js strips PEM headers, but our keys are DER-encoded, so they're already clean
        return base64Key;
    }

}

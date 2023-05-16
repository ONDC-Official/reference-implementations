package com.example.AES_GCM;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.Provider;
import java.security.SecureRandom;
import java.security.Security;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Enumeration;
import java.security.KeyFactory;
import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.crypto.generators.Ed25519KeyPairGenerator;
import org.bouncycastle.crypto.params.Ed25519KeyGenerationParameters;
import org.bouncycastle.crypto.params.Ed25519PrivateKeyParameters;
import org.bouncycastle.crypto.params.Ed25519PublicKeyParameters;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.crypto.CryptoException;
import org.bouncycastle.crypto.DataLengthException;
import org.bouncycastle.crypto.Signer;
import org.bouncycastle.crypto.generators.Ed25519KeyPairGenerator;
import org.bouncycastle.crypto.params.Ed25519KeyGenerationParameters;
import org.bouncycastle.crypto.params.Ed25519PrivateKeyParameters;
import org.bouncycastle.crypto.params.Ed25519PublicKeyParameters;
import org.bouncycastle.crypto.signers.Ed25519Signer;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.stereotype.Component;
import javax.crypto.*;

import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Security;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.InvalidParameterSpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Arrays;
import java.util.Base64;

import org.json.JSONObject;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyAgreement;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.*;
import org.bouncycastle.util.encoders.Hex;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ch.qos.logback.core.net.SyslogOutputStream;

import org.bouncycastle.jcajce.spec.AEADParameterSpec;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class KeyGen {
	
	 
	
		
		public static KeyPairString genKeyPairs() throws NoSuchAlgorithmException {
		
	KeyPair agreementKeyPair;
		agreementKeyPair = KeyPairGenerator.getInstance("X25519").generateKeyPair();	
	String publicKey = Base64.getEncoder().encodeToString(agreementKeyPair.getPublic().getEncoded());
	String privateKey = Base64.getEncoder().encodeToString(agreementKeyPair.getPrivate().getEncoded());

     return new KeyPairString(privateKey,publicKey);

		
		}
		
		public static SecretKey getsharedKey(String PublicKey,String privateKey) throws NoSuchAlgorithmException, NoSuchProviderException, InvalidKeySpecException, InvalidKeyException {
		
		byte[] publicKeyBytes = Base64.getDecoder().decode(PublicKey);
		byte[] privateKeyBytes = Base64.getDecoder().decode(privateKey);

		Security.addProvider(new BouncyCastleProvider());

		KeyFactory keyFactory = KeyFactory.getInstance("X25519", "BC");

		PublicKey publicKeyObj = keyFactory.generatePublic(new X509EncodedKeySpec(publicKeyBytes));
		PrivateKey privateKeyObj = keyFactory.generatePrivate(new PKCS8EncodedKeySpec(privateKeyBytes));
		System.out.println(publicKeyObj);

		KeyAgreement keyAgreement = KeyAgreement.getInstance("X25519", "BC");
		keyAgreement.init(privateKeyObj);
		keyAgreement.doPhase(publicKeyObj, true);

		SecretKey aesKeyEncrypt = keyAgreement.generateSecret("AES");


		System.out.println("Encryption Key: " + Base64.getEncoder().encodeToString(aesKeyEncrypt.getEncoded()));
		return aesKeyEncrypt;

		// Now you can use the sharedSecretKey for encryption/decryption

				}
				}




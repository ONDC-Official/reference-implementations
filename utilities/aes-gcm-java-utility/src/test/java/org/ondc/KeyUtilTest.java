package org.ondc;

import static org.assertj.core.api.Assertions.assertThat;

import java.security.Security;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.junit.jupiter.api.Test;
import org.ondc.KeyUtil.DHKeyPair;

class KeyUtilTest {
	DHKeyPair keyPair1 = KeyUtil.generateKeyPair();
	DHKeyPair keyPair2 = KeyUtil.generateKeyPair();

	@Test
	void testGenerateSharedKey() {
		Security.addProvider(new BouncyCastleProvider());

		// Positive testcase
		String sharedKey1 = KeyUtil.generateSharedKey(keyPair1.getPrivateKey(), keyPair2.getPublicKey());
		String sharedKey2 = KeyUtil.generateSharedKey(keyPair2.getPrivateKey(), keyPair1.getPublicKey());
		assertThat(sharedKey1).isEqualTo(sharedKey2);

		// Negative testcase
		sharedKey1 = KeyUtil.generateSharedKey(keyPair1.getPrivateKey(), keyPair1.getPublicKey());
		sharedKey2 = KeyUtil.generateSharedKey(keyPair2.getPrivateKey(), keyPair2.getPublicKey());
		assertThat(sharedKey1).isNotEqualTo(sharedKey2);
	}

	@Test
	void testEncryptDecrypt() {
		Security.addProvider(new BouncyCastleProvider());
		String sharedKey = KeyUtil.generateSharedKey(keyPair1.getPrivateKey(), keyPair2.getPublicKey());

		String plainText = "ONDC is a greate initiative!";

		// Positive testcases
		String encryptedText = EncryptionUtil.encryptData(sharedKey, plainText);
		String decryptedText = EncryptionUtil.decryptData(sharedKey, encryptedText);
		assertThat(decryptedText).isEqualTo(plainText);

		// Negative Test case
		String invalidSharedKey = "GhkO6Qx1BIkqSV/yW2xEAG3jNVki6QE29gujYJ6HJ3E=";
		encryptedText = EncryptionUtil.encryptData(sharedKey, plainText);
		decryptedText = EncryptionUtil.decryptData(invalidSharedKey, encryptedText);
		assertThat(decryptedText).isNotEqualTo(plainText);
	}
}
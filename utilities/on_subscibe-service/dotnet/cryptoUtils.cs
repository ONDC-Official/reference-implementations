using System;
using System.Formats.Asn1;
using System.Security.Cryptography;
using System.Text;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Crypto.Signers;
using Org.BouncyCastle.Crypto.Digests;
using System.Text.Json;

public class Pkcs8
{
    public int Version { get; set; }
    public AlgorithmIdentifier Algorithm { get; set; }
    public byte[] PrivateKey { get; set; }
}

public class PublicKeyInfo
{
    public byte[] RawContent { get; set; }
    public AlgorithmIdentifier Algorithm { get; set; }
    public BitString PublicKey { get; set; }
}

public class PkixPublicKey
{
    public AlgorithmIdentifier Algorithm { get; set; }
    public BitString BitString { get; set; }
}

public class AlgorithmIdentifier
{
    public string Algorithm { get; set; }
}

public class BitString
{
    public byte[] Bytes { get; set; }
    public int BitLength { get; set; }
}

public class CryptoOperations
{
    private static readonly byte[] X25519_OID = new byte[] { 1, 3, 101, 110 };
    private static readonly string X25519_OID_STRING = "1.3.101.110";

    public static string Base64Encode(byte[] data)
    {
        return Convert.ToBase64String(data);
    }

    public static byte[] Base64Decode(string encoded)
    {
        return Convert.FromBase64String(encoded);
    }

    public static (string publicKey, string privateKey) GenerateEncryptionKeys()
    {
        try
        {
            var keyPairGenerator = new X25519KeyPairGenerator();
            keyPairGenerator.Init(new X25519KeyGenerationParameters(new SecureRandom()));
            var keyPair = keyPairGenerator.GenerateKeyPair();

            var privateKey = ((X25519PrivateKeyParameters)keyPair.Private).GetEncoded();
            var publicKey = ((X25519PublicKeyParameters)keyPair.Public).GetEncoded();

            var marshaledPrivateKey = MarshalX25519PrivateKey(privateKey);
            var marshaledPublicKey = MarshalX25519PublicKey(publicKey);

            return (Base64Encode(marshaledPublicKey), Base64Encode(marshaledPrivateKey));
        }
        catch (Exception ex)
        {
            throw new CryptographicException("Error generating X25519 keys", ex);
        }
    }

    private static byte[] MarshalX25519PrivateKey(byte[] key)
    {
        var writer = new AsnWriter(AsnEncodingRules.DER);

        using (writer.PushSequence())
        {
            writer.WriteInteger(2); // Version

            using (writer.PushSequence()) // AlgorithmIdentifier
            {
                writer.WriteObjectIdentifier(X25519_OID_STRING);
            }

            writer.WriteOctetString(key);
        }

        return writer.Encode();
    }

    private static byte[] MarshalX25519PublicKey(byte[] key)
    {
        var writer = new AsnWriter(AsnEncodingRules.DER);

        using (writer.PushSequence())
        {
            using (writer.PushSequence()) // AlgorithmIdentifier
            {
                writer.WriteObjectIdentifier(X25519_OID_STRING);
            }

            writer.WriteBitString(key);
        }

        return writer.Encode();
    }

    public static byte[] ParseX25519PrivateKey(string key)
    {
        try
        {
            var decoded = Base64Decode(key);
            var reader = new AsnReader(decoded, AsnEncodingRules.DER);

            var sequence = reader.ReadSequence();

            var version = sequence.ReadInteger();
            _ = sequence.ReadSequence(); // Algorithm
            var privateKey = sequence.ReadOctetString();

            return privateKey;
        }
        catch (Exception ex)
        {
            throw new CryptographicException("Error parsing X25519 private key", ex);
        }
    }

    public static byte[] ParseX25519PublicKey(string key)
    {
        try
        {
            var decoded = Base64Decode(key);
            var reader = new AsnReader(decoded, AsnEncodingRules.DER);

            var sequence = reader.ReadSequence();
            _ = sequence.ReadSequence(); // Algorithm
            return sequence.ReadBitString(out _);
        }
        catch (Exception ex)
        {
            throw new CryptographicException("Error parsing X25519 public key", ex);
        }
    }

    public static (string publicKey, string privateKey) GenerateSigningKeys()
    {
        using (var ed25519 = new Ed25519())
        {
            byte[] publicKey, privateKey;
            ed25519.GenerateKeyPair(out publicKey, out privateKey);
            return (Base64Encode(publicKey), Base64Encode(privateKey));
        }
    }

    public static (string signedData, Exception error) CreateSignedData(string data, string privateKey)
    {
        try
        {
            // Decode the private key from base64
            byte[] privateKeyBytes = Convert.FromBase64String(privateKey);

            // Create the signer
            var signer = new Ed25519Signer();
            var privateKeyParams = new Ed25519PrivateKeyParameters(privateKeyBytes, 0);
            signer.Init(true, privateKeyParams);

            // Sign the data
            byte[] dataBytes = Encoding.UTF8.GetBytes(data);
            signer.BlockUpdate(dataBytes, 0, dataBytes.Length);
            byte[] signature = signer.GenerateSignature();

            // Convert signature to base64
            string signatureBase64 = Convert.ToBase64String(signature);

            return (signatureBase64, null);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error creating signed data: " + ex.Message);
            return (null, ex);
        }
    }

    public static (string decryptedText, Exception error) Decrypt(string privateKey, string publicKey, string cipherText)
    {
        try
        {
            byte[] decodedPublicKey = ParseX25519PublicKey(publicKey);
            byte[] decodedPrivateKey = ParseX25519PrivateKey(privateKey);

            var publicKeyParams = new X25519PublicKeyParameters(decodedPublicKey, 0);
            var privateKeyParams = new X25519PrivateKeyParameters(decodedPrivateKey, 0);

            byte[] secretKey = new byte[32];
            privateKeyParams.GenerateSecret(publicKeyParams, secretKey, 0);

            byte[] cipherBytes = Base64Decode(cipherText);
            byte[] plainBytes = AesDecrypt(cipherBytes, secretKey);

            // Find the first occurrence of null character
            int nullIndex = Array.IndexOf(plainBytes, (byte)0);
            if (nullIndex != -1)
            {
                Array.Resize(ref plainBytes, nullIndex);
            }

            return (Encoding.UTF8.GetString(plainBytes), null);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Decryption failed: {ex.GetType().Name} - {ex.Message}");
            return (null, ex);
        }
    }

    private static byte[] AesDecrypt(byte[] cipherText, byte[] key)
    {
        using (var aes = Aes.Create())
        {
            aes.Key = key;
            aes.Mode = CipherMode.ECB;
            aes.Padding = PaddingMode.PKCS7; // Enable padding

            using (var decryptor = aes.CreateDecryptor())
            {
                // Decrypt the cipherText directly
                byte[] decryptedBytes = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);
                return decryptedBytes; // No need for custom unpadding
            }
        }
    }
    public class Ed25519 : IDisposable
    {
        public void GenerateKeyPair(out byte[] publicKey, out byte[] privateKey)
        {
            var keyPairGenerator = new Ed25519KeyPairGenerator();
            keyPairGenerator.Init(new Ed25519KeyGenerationParameters(new SecureRandom()));
            var keyPair = keyPairGenerator.GenerateKeyPair();

            privateKey = ((Ed25519PrivateKeyParameters)keyPair.Private).GetEncoded();
            publicKey = ((Ed25519PublicKeyParameters)keyPair.Public).GetEncoded();
        }

        public void Dispose()
        {
            // Cleanup if needed
        }
    }
}

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

    public static (string authHeader, Exception error) GenerateAuthorizationHeader(object payload, string subscriberId, string uniqueKeyId, string privateKey)
    {
        string authHeader = string.Empty;
        try
        {

            int currentTime = (int)DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            DateTime dateTime = DateTimeOffset.FromUnixTimeSeconds(currentTime).UtcDateTime;

            int ttl = 300;

            var (signature, signError) = SignRequest(privateKey, ConvertObjectToBytes(payload), currentTime, ttl);

            if (signError != null)
            {
                return (authHeader, signError);
            }


            authHeader = string.Format(
                "Signature keyId=\"{0}|{1}|ed25519\",algorithm=\"ed25519\",created=\"{2}\",expires=\"{3}\",headers=\"(created) (expires) digest\",signature=\"{4}\"",
                subscriberId, uniqueKeyId, currentTime, currentTime + ttl, signature
            );

            Console.WriteLine("Generated Authorization Header: " + authHeader);

            return (authHeader, null);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception occurred: " + ex.Message);
            return (authHeader, ex);
        }
    }

    private static (string signature, Exception error) SignRequest(string privateKey, byte[] payload, int currentTime, int ttl)
    {
        try
        {
            // Correct method call with parentheses and argument
            byte[] hash = ComputeBlake2bHash(payload);
            string digest = Convert.ToBase64String(hash);

            string signatureBody = string.Format("(created): {0}\n(expires): {1}\ndigest: BLAKE-512={2}", currentTime, currentTime + ttl, digest);

            byte[] decodedKey = Convert.FromBase64String(privateKey);

            // Sign the data
            var signer = new Ed25519Signer();
            var privateKeyParams = new Ed25519PrivateKeyParameters(decodedKey, 0);
            signer.Init(true, privateKeyParams);
            signer.BlockUpdate(Encoding.UTF8.GetBytes(signatureBody), 0, signatureBody.Length);
            byte[] signature = signer.GenerateSignature();

            return (Convert.ToBase64String(signature), null);
        }
        catch (Exception ex)
        {
            return (null, ex);
        }
    }

    public static byte[] ComputeBlake2bHash(byte[] data)
    {
        var digest = new Blake2bDigest(512); // 512-bit hash
        digest.BlockUpdate(data, 0, data.Length);
        byte[] result = new byte[digest.GetDigestSize()];
        digest.DoFinal(result, 0);
        return result;
    }

    public static string SignRequestForVlookup(string privateKey, string country, string ondcDomain, string city, string type, string subscriberId)
    {
        try
        {
            // Create the signature body
            string signatureBody = $"{country}|{ondcDomain}|{type}|{city}|{subscriberId}";

            var (signedData, error) = CreateSignedData(signatureBody, privateKey);

            if (error != null)
            {
                Console.WriteLine("Error creating signed data: " + error.Message);
                return null;
            }

            return signedData;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error signing request: " + ex.Message);
            return null;
        }
    }
    
    private static byte[] ConvertObjectToBytes(object obj)
    {
        // Assuming JSON serialization for object conversion
        var json = System.Text.Json.JsonSerializer.Serialize(obj);
        return Encoding.UTF8.GetBytes(json);
    }

    public static (bool isValid, Exception error) VerifyAuthorizationHeader(string authHeader, object payload, string publicKey)
    {
        try
        {
            var (created, expires, signature, parseError) = ParseAuthorizationHeader(authHeader);
            if (parseError != null)
            {
                return (false, parseError);
            }

            long currentTimestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            if (created > currentTimestamp || currentTimestamp > expires)
            {
                return (false, new Exception("Timestamp validation failed: Created < CurrentTimestamp < Expires"));
            }

            byte[] payloadBytes = ConvertObjectToBytes(payload);
            byte[] hash = ComputeBlake2bHash(payloadBytes);
            string digest = Convert.ToBase64String(hash);

            string signingMessage = string.Format("(created): {0}\n(expires): {1}\ndigest: BLAKE-512={2}", created, expires, digest);

            byte[] publicKeyBytes = Convert.FromBase64String(publicKey);
            byte[] signatureBytes = Convert.FromBase64String(signature);

            var verifier = new Ed25519Signer();
            var publicKeyParams = new Ed25519PublicKeyParameters(publicKeyBytes, 0);
            verifier.Init(false, publicKeyParams);
            var signingMessageBytes = Encoding.UTF8.GetBytes(signingMessage);
            verifier.BlockUpdate(signingMessageBytes, 0, signingMessageBytes.Length);
            bool ok = verifier.VerifySignature(signatureBytes);
            return (ok, null);
        }
        catch (Exception ex)
        {
            return (false, ex);
        }
    }

    private static (long created, long expires, string signature, Exception error) ParseAuthorizationHeader(string authHeader)
    {
        try
        {
            string header = authHeader.StartsWith("Signature ") ? authHeader.Substring("Signature ".Length) : authHeader;

            int createdStart = header.IndexOf("created=\"") + "created=\"".Length;
            int createdEnd = header.IndexOf("\"", createdStart);
            if (createdStart < "created=\"".Length || createdEnd == -1) throw new Exception("created not found");
            long created = long.Parse(header.Substring(createdStart, createdEnd - createdStart));

            int expiresStart = header.IndexOf("expires=\"") + "expires=\"".Length;
            int expiresEnd = header.IndexOf("\"", expiresStart);
            if (expiresStart < "expires=\"".Length || expiresEnd == -1) throw new Exception("expires not found");
            long expires = long.Parse(header.Substring(expiresStart, expiresEnd - expiresStart));

            int sigStart = header.IndexOf("signature=\"") + "signature=\"".Length;
            int sigEnd = header.IndexOf("\"", sigStart);
            if (sigStart < "signature=\"".Length || sigEnd == -1) throw new Exception("signature not found");
            string signature = header.Substring(sigStart, sigEnd - sigStart);

            return (created, expires, signature, null);
        }
        catch (Exception ex)
        {
            return (0, 0, null, ex);
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

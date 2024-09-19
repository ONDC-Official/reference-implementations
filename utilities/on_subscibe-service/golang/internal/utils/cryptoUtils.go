package utils

import (
	"crypto/ed25519"
	"crypto/rand"
	"crypto/x509/pkix"
	"encoding/asn1"
	"encoding/base64"
	"fmt"

	"maze.io/x/crypto/x25519"
)

type pkcs8 struct {
	Version    int
	Algo       pkix.AlgorithmIdentifier
	PrivateKey []byte
	// optional attributes omitted.
}

type publicKeyInfo struct {
	Raw       asn1.RawContent
	Algorithm pkix.AlgorithmIdentifier
	PublicKey asn1.BitString
}

type pkixPublicKey struct {
	Algo      pkix.AlgorithmIdentifier
	BitString asn1.BitString
}

func base64Encode(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}

func base64Decode(encoded string) ([]byte, error) {
	return base64.StdEncoding.DecodeString(encoded)
}



func GenerateEncryptionKeys() (string, string, error) {
	privateKey, err := x25519.GenerateKey(rand.Reader) 
	if err != nil {
		fmt.Println("Error generating x25519 keys for encryption")
		return "", "", err
	}

	marshaledPrivateKey, err := marshalX25519PrivateKey(privateKey.Bytes())
	if err != nil {
		fmt.Println("Error marshaling enc private key to x509.pkcs format", err)
		return "", "", err
	}

	marshaledPublicKey, err := marshalX25519PublicKey(privateKey.PublicKey.Bytes())
	if err != nil {
		fmt.Println("Error marshaling enc public key to x509 format", err)
		return "", "", err
	}

	return base64Encode(marshaledPublicKey), base64Encode(marshaledPrivateKey), nil
}

func GenerateSigningKeys() (string, string, error) {
	publicKey, privateKey, err := ed25519.GenerateKey(nil)
	if err != nil {
		fmt.Println("Error generating signing keys", err)
		return "", "", err
	}

	return base64Encode(publicKey), base64Encode(privateKey), nil
}

func marshalX25519PrivateKey(key []byte) ([]byte, error) {
	var privateKey []byte
	curveKey, err := asn1.Marshal(key[:32])
	if err != nil {
		fmt.Println("Error asn1 marshaling private key")
		return privateKey, err
	}
	pkcsKey := pkcs8{
		Version: 1,
		Algo: pkix.AlgorithmIdentifier{
			Algorithm: asn1.ObjectIdentifier{1, 3, 101, 110},
		},
		PrivateKey: curveKey,
	}
	privateKey, err = asn1.Marshal(pkcsKey)
	if err != nil {
		fmt.Println("Error asn1 marshaling pkcs8 key", err)
		return privateKey, err
	}
	return privateKey, nil
}

func marshalX25519PublicKey(key []byte) ([]byte, error) {
	x509Key := pkixPublicKey{
		Algo: pkix.AlgorithmIdentifier{
			Algorithm: asn1.ObjectIdentifier{1, 3, 101, 110},
		},
		BitString: asn1.BitString{
			Bytes:     key,
			BitLength: 8 * len(key),
		},
	}
	publicKey, err := asn1.Marshal(x509Key)
	if err != nil {
		fmt.Println("Error asn1 marshaling public key", err)
		return publicKey, err
	}
	return publicKey, nil
}


func CreateSignedData(data, privateKey string) (string, error) {
	privateKeyBytes, err := base64.StdEncoding.DecodeString(privateKey)
	if err != nil {
		return "", fmt.Errorf("error decoding private key: %w", err)
	}

	if len(privateKeyBytes) != ed25519.PrivateKeySize {
		return "", fmt.Errorf("invalid private key length")
	}

	signature := ed25519.Sign(privateKeyBytes, []byte(data))

	signatureBase64 := base64.StdEncoding.EncodeToString(signature)

	fmt.Println("Signed Message: ", signatureBase64)
	return signatureBase64, nil
}
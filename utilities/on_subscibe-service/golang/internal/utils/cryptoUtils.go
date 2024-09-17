package utils

import (
	"crypto/ed25519"
	"encoding/base64"
	"fmt"
)
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
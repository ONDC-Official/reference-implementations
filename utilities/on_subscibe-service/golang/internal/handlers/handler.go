package handlers

import (
	"fmt"
	"golang/internal/utils"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

type On_SubscribeResponse struct {
    SubscriberId string `json:"subscriber_id"`
    Challenge    string `json:"challenge"`
}

// GenerateKeysHandler handles the /generate-keys endpoint
func GenerateKeysHandler(c *gin.Context) {
    signingPublicKey, signingPrivateKey, err := utils.GenerateSigningKeys()
    if err != nil {
        c.String(http.StatusInternalServerError, "Error generating signing keys: %s", err)
        return
    }
    
    encPublicKey, encPrivateKey, err := utils.GenerateEncryptionKeys()
    if err != nil {
        c.String(http.StatusInternalServerError, "Error generating encryption keys: %s", err)
        return
    }

    // Send response
    c.JSON(http.StatusOK, gin.H{
        "signing_public_key":    signingPublicKey,
        "signing_private_key":   signingPrivateKey,
        "encryption_public_key": encPublicKey,
        "encryption_private_key": encPrivateKey,
    })
}

// OnSubscribeHandler handles the /on_subscribe POST endpoint
func OnSubscribeResponse(c *gin.Context) {
    var response On_SubscribeResponse

    // Log the incoming request body (as raw JSON) for debugging
    if err := c.BindJSON(&response); err != nil {
        log.Printf("Failed to bind JSON: %v", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    log.Printf("Request Body: %+v", response.Challenge) // Log the request body
    log.Printf("Encryption private key: %s", os.Getenv("ENCRYPTION_PRIVATE_KEY"))
    log.Printf("Encryption public key: %s", os.Getenv("ONDC_PUBLIC_KEY"))
    decryptedText, err := utils.Decrypt(
        os.Getenv("ENCRYPTION_PRIVATE_KEY"),
        os.Getenv("ONDC_PUBLIC_KEY"),
        response.Challenge,
    )

    if err != nil {
        log.Printf("Decryption failed: %v", err) // Log any decryption error
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Log the decrypted text
    log.Printf("Decrypted Text: %s", decryptedText)

    // Respond with the decrypted text
    c.JSON(http.StatusOK, gin.H{"answer": decryptedText})
}




// SiteVerificationHandler handles the /ondc-site-verification.html endpoint
func OndcSiteVerificationHandler(c *gin.Context) {
    fmt.Println("++++++ Private key", os.Getenv("SIGNING_PRIVATE_KEY"))
    
    // Create signed content
    signedContent, err := utils.CreateSignedData(os.Getenv("REQUEST_ID"), os.Getenv("SIGNING_PRIVATE_KEY"))
    if err != nil {
        c.String(http.StatusInternalServerError, fmt.Sprintf("Error creating signed data: %s", err))
        return
    }

    // Modify HTML with signed content
    modifiedHTML := strings.Replace(utils.HtmlFile, "SIGNED_UNIQUE_REQ_ID", signedContent, 1)
    
    // Serve the modified HTML
    c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(modifiedHTML))
}

package handlers

import (
	"fmt"
	"golang/internal/utils"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

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
func OnSubscribeHandler(c *gin.Context) {
    var requestData map[string]interface{}
    
    // Bind the request body to the requestData map
    if err := c.BindJSON(&requestData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid request payload",
        })
        return
    }

    // Example response for subscription
    c.JSON(http.StatusOK, gin.H{
        "message": "Subscription received",
        "data":    requestData,
    })
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

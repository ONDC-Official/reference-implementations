package handlers

import (
	"fmt"
	configs "golang/config"
	"golang/internal/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// GenerateKeysHandler handles the /generate-keys endpoint
func GenerateKeysHandler(c *gin.Context) {
    // Example response for generating keys
    c.JSON(http.StatusOK, gin.H{
        "message": "Keys generated successfully",
        "keys":    "example-keys", // Replace with actual key generation logic
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
    fmt.Println(configs.GlobalConfigs.OndcConfigs.SigningPrivateKey)
    
    // Create signed content
    signedContent, err := utils.CreateSignedData(configs.GlobalConfigs.OndcConfigs.RequestId, configs.GlobalConfigs.OndcConfigs.SigningPrivateKey)
    if err != nil {
        c.String(http.StatusInternalServerError, fmt.Sprintf("Error creating signed data: %s", err))
        return
    }

    // Modify HTML with signed content
    modifiedHTML := strings.Replace(utils.HtmlFile, "SIGNED_UNIQUE_REQ_ID", signedContent, 1)
    
    // Serve the modified HTML
    c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(modifiedHTML))
}

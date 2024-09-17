package handlers

import (
	"net/http"

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
func SiteVerificationHandler(c *gin.Context) {
    // Define the HTML content as a raw string
    htmlContent := `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Verification</title>
</head>
<body>
    <h1>Site Verification</h1>
    <p>Your site verification content goes here.</p>
</body>
</html>`

    // Return the HTML content directly as an HTTP response
    c.String(http.StatusOK, htmlContent)
}

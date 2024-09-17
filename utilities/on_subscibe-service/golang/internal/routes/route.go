package routes

import (
	"golang/internal/handlers"

	"github.com/gin-gonic/gin"
)
func SetupRoutes(r *gin.Engine) {
    // API version 1 routes
    v1 := r.Group("/api/v1")
    {
        v1.GET("/generate-keys", handlers.GenerateKeysHandler)
        v1.POST("/on_subscribe", handlers.OnSubscribeHandler)
        
    }

	r.GET("/ondc-site-verification.html", handlers.OndcSiteVerificationHandler)
}
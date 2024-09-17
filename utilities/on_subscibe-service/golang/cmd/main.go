package main

import (
	"golang/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
    // Create a new Gin router
    r := gin.Default()

    routes.SetupRoutes(r)

    // Start the server on port 8080
    r.Run(":8080")
}

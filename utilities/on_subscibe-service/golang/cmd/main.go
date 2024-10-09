package main

import (
	"golang/internal/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

    err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

    // Create a new Gin router
    r := gin.Default()

    routes.SetupRoutes(r)

    // Start the server on port 8080
    r.Run(":8080")
}

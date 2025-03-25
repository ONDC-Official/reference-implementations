## A .NET utility for subscribing and header generation

### Getting Started

### Prerequisites
- Git
- .NET 6.0 SDK or later
- Visual Studio Code or Visual Studio 2022 or any Code editor

### Clone the Repository
```bash
git clone https://github.com/ONDC-Official/reference-implementations.git
cd reference-implementations/utilities/on_subscibe-service/dotnet
```

### Project Setup

1. Create a `.env` file in the root directory with the following content:
    ```ini
    SIGNING_PRIVATE_KEY=
    REQUEST_ID=
    ENCRYPTION_PRIVATE_KEY=
    ONDC_PUBLIC_KEY=
    ```

2. Install dependencies:
    ```bash
    dotnet restore
    ```

3. Build the project:
    ```bash
    dotnet build
    ```

4. Run the application:
    ```bash
    dotnet run
    ```

## API Documentation

Access the full API documentation and test endpoints using Swagger UI:

```bash
curl http://localhost:port/swagger
```

### Available Endpoints

- **GET /health** - Health check endpoint
- **GET /api/v1/generate-keys** - Generate cryptographic keys
- **GET /ondc-site-verification.html** - ONDC site verification
- **POST /api/v1/on_subscribe** - Handle subscription
- **POST /api/v1/generate-auth-header** - Generate authorization header
- **POST /api/v1/vlookup/signature** - Generate vlookup signature

## Features
- Ed25519 signing capabilities
- X25519 encryption/decryption
- BLAKE-512 hashing
- Environment variable configuration
- Swagger UI for API documentation


# ONDC Java Utility - Complete Guide

A comprehensive Java Spring Boot utility for ONDC (Open Network for Digital Commerce) participant onboarding, key management, and cryptographic operations.

## 🌟 Features

- **🔐 Cryptographic Key Management** - Generate and manage Ed25519 signing and X25519 encryption keys
- **📝 Authorization Headers** - Create and verify ONDC-compliant authorization headers
- **🚀 ONDC Subscription** - Complete subscription workflow with the ONDC registry
- **🛡️ Site Verification** - Generate verification pages for ONDC compliance
- **⚙️ Environment-Based Configuration** - Flexible configuration via environment variables
- **🐳 Docker Support** - Ready-to-use Docker containers
- **🔍 Health Monitoring** - Built-in health checks and logging

## 📋 Prerequisites

Choose one of the following setups:

### Option 1: Local Development
- **Java 17** or higher
- **Maven 3.6+** (or use included Maven wrapper)

### Option 2: Docker (Recommended)
- **Docker 20.10+**
- **Docker Compose 2.0+**

## 🚀 Quick Start

### Method 1: Using Docker (Recommended)

1. **Clone and Navigate:**
   ```bash
   git clone <repository-url>
   cd java
   ```

2. **Setup Environment:**
   ```bash
   cp docker.env.example docker.env
   # Edit docker.env with your configuration
   ```

3. **Run with Docker:**
   ```bash
   docker-compose up -d
   ```

4. **Verify Installation:**
   ```bash
   curl http://localhost:8080/health
   # Should return: Health OK!!
   ```

### Method 2: Local Development

1. **Clone and Navigate:**
   ```bash
   git clone <repository-url>
   cd java
   ```

2. **Setup Environment:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Run the Application:**
   ```bash
   ./mvnw spring-boot:run
   ```

## 🔐 Key Management

### Automatic Key Generation (Default)

The application will automatically generate keys on first run if none are provided:

```bash
./mvnw spring-boot:run
```

**Console Output:**
```
Generated Signing Private Key: zeiPflZ2GHCX1bkzm4C4HfOoWclVKdZi9qYXgEnv89g=
Generated Signing Public Key: 3fdeC79Oqcsb26JLPA8aZSyjWytVR+CdRVtkaneijPk=
Generated Encryption Private Key: MFECAQEwBQYDK2VuBCIEIP...
Generated Encryption Public Key: MCowBQYDK2VuAyEAHjjX+uHubK...
```

### Using Environment Variables (Production)

```bash
export ONDC_SIGN_PRIVATE_KEY="your_signing_private_key"
export ONDC_SIGN_PUBLIC_KEY="your_signing_public_key"
export ONDC_ENC_PRIVATE_KEY="your_encryption_private_key"
export ONDC_ENC_PUBLIC_KEY="your_encryption_public_key"
export ONDC_AUTO_GENERATE_KEYS=false
```

## 🌐 API Reference

### Base URL
- **Local:** `http://localhost:8080`
- **Docker:** `http://localhost:8080`

### Core Endpoints

#### 🏥 Health Check
```bash
GET /health
curl http://localhost:8080/health
```
**Response:** `Health OK!!`

#### 🔑 Generate Keys
```bash
GET /get-keys
curl http://localhost:8080/get-keys
```
**Response:**
```json
{
  "enc_private_key": "MFECAQEwBQYDK2VuBCIEIPjSJTWFXeb0AH5L...",
  "sign_private_key": "zeiPflZ2GHCX1bkzm4C4HfOoWclVKdZi9qYXgEnv89g=",
  "sign_public_key": "3fdeC79Oqcsb26JLPA8aZSyjWytVR+CdRVtkaneijPk=",
  "enc_public_key": "MCowBQYDK2VuAyEAHjjX+uHubKwSOINetLeSed..."
}
```

### 📝 Authorization Headers

#### Create Authorization Header
```bash
POST /create-header
Content-Type: application/json
```

**Request Body:**
```json
{
  "value": {"test": "data"},
  "subscriber_id": "buyer-app.ondc.org",
  "unique_key_id": "207",
  "private_key": "your_private_key_here"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/create-header \
  -H "Content-Type: application/json" \
  -d '{
    "value": {"order_id": "12345", "amount": 100},
    "subscriber_id": "buyer-app.ondc.org",
    "unique_key_id": "207",
    "private_key": "zeiPflZ2GHCX1bkzm4C4HfOoWclVKdZi9qYXgEnv89g="
  }'
```

**Response:**
```
Signature keyId="buyer-app.ondc.org|207|ed25519",algorithm="ed25519",created="1712239689",expires="1712539689",headers="(created) (expires) digest",signature="Gy5wiiJYGeNOBsiXJKo4OF..."
```

#### Verify Authorization Header
```bash
POST /verify-header
Content-Type: application/json
```

**Request Body:**
```json
{
  "value": {"test": "data"},
  "public_key": "your_public_key_here",
  "header": "Signature keyId=\"buyer-app.ondc.org|207|ed25519\"..."
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/verify-header \
  -H "Content-Type: application/json" \
  -d '{
    "value": {"order_id": "12345", "amount": 100},
    "public_key": "3fdeC79Oqcsb26JLPA8aZSyjWytVR+CdRVtkaneijPk=",
    "header": "Signature keyId=\"buyer-app.ondc.org|207|ed25519\",algorithm=\"ed25519\",created=\"1712239689\",expires=\"1712539689\",headers=\"(created) (expires) digest\",signature=\"Gy5wiiJYGeNOBsiXJKo4OF...\""
  }'
```

**Response:**
```json
{
  "is_valid": true
}
```

### 🚀 ONDC Subscription

#### Subscribe to ONDC Network
```bash
POST /subscribe
Content-Type: application/json
```

**Complete Request Example:**
```bash
curl -X POST http://localhost:8080/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "context": {
      "operation": {
        "ops_no": 2
      }
    },
    "message": {
      "request_id": "c4b796d8-335d-41f7-978e-34b8b345438f",
      "timestamp": "2024-02-21T13:02:09.814Z",
      "entity": {
        "gst": {
          "legal_entity_name": "ABC Incorporates",
          "business_address": "Trade World, Mansarpur, Coorg, Karnataka 333333",
          "city_code": ["std:080"],
          "gst_no": "07AAACN2082N4Z7"
        },
        "pan": {
          "name_as_per_pan": "ABC Incorporates",
          "pan_no": "ASDFP7657Q",
          "date_of_incorporation": "23/06/1982"
        },
        "name_of_authorised_signatory": "Anand Sharma",
        "address_of_authorised_signatory": "405, Pinnacle House, Kandiwali, Mumbai 400001",
        "email_id": "anand.sharma@abc.com",
        "mobile_no": 9912332199,
        "country": "IND",
        "subscriber_id": "your.app.com",
        "unique_key_id": "ccfce174-17c1-4ca4-a070-7419f5df2a66",
        "callback_url": "/",
        "key_pair": {
          "signing_public_key": "3fdeC79Oqcsb26JLPA8aZSyjWytVR+CdRVtkaneijPk=",
          "encryption_public_key": "MCowBQYDK2VuAyEAHjjX+uHubKwSOINetLeSedFoWXIaWybDQYON8pXewGQ=",
          "valid_from": "2024-02-21T13:02:09.814Z",
          "valid_until": "2024-10-20T18:00:15.071Z"
        }
      },
      "network_participant": [
        {
          "subscriber_url": "/",
          "domain": "ONDC:RET10",
          "type": "sellerApp",
          "msn": false,
          "city_code": ["std:080"]
        }
      ]
    }
  }'
```

#### Handle Subscription Callback
```bash
POST /on_subscribe
Content-Type: application/json
```

**Request Body:**
```json
{
  "challenge": "encrypted_challenge_from_ondc_registry"
}
```

**Response:**
```json
{
  "answer": "decrypted_challenge_response"
}
```

### 🛡️ Site Verification

#### Get Site Verification Page
```bash
GET /ondc-site-verification.html
curl http://localhost:8080/ondc-site-verification.html
```

**Response:** HTML page with signed verification content

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ONDC_SIGN_PRIVATE_KEY` | Ed25519 signing private key (Base64) | Auto-generated | No* |
| `ONDC_SIGN_PUBLIC_KEY` | Ed25519 signing public key (Base64) | Auto-generated | No* |
| `ONDC_ENC_PRIVATE_KEY` | X25519 encryption private key (Base64) | Auto-generated | No* |
| `ONDC_ENC_PUBLIC_KEY` | X25519 encryption public key (Base64) | Auto-generated | No* |
| `ONDC_REQUEST_ID` | Request ID for verification | UUID | No |
| `ONDC_PUBLIC_KEY` | ONDC Registry public key | Default key | No |
| `ONDC_GATEWAY_URL` | ONDC Gateway URL | Staging URL | No |
| `ONDC_AUTO_GENERATE_KEYS` | Auto-generate keys if not provided | `false` | No |

*Required only if `ONDC_AUTO_GENERATE_KEYS=false`

### Configuration Files

1. **`.env`** - Local environment variables
2. **`docker.env`** - Docker environment variables
3. **`application.properties`** - Spring Boot configuration

## 🐳 Docker Usage

### Quick Commands

```bash
# Start application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Rebuild and restart
docker-compose up --build -d

# Check status
docker-compose ps
```

### Docker Health Checks

The container includes automatic health monitoring:
```bash
# Check container health
docker-compose ps

# Manual health check
curl http://localhost:8080/health
```


### Common Issues

#### 1. Port 8080 Already in Use
```bash
# Check what's using the port
lsof -i :8080

# Kill the process
kill <PID>

# Or change port in docker-compose.yml
ports:
  - "8081:8080"  # Use port 8081 instead
```

#### 2. Key Generation Issues
```bash
# Clear existing keys and regenerate
export ONDC_AUTO_GENERATE_KEYS=true
./mvnw spring-boot:run
```

#### 3. Docker Build Failures
```bash
# Clean build
docker-compose build --no-cache

# Check logs
docker-compose logs
```

#### 4. Subscription Failures
- Verify your `request_id` matches between configuration and payload
- Ensure your keys are correctly formatted (Base64)
- Check gateway URL accessibility
- Verify subscription payload format


## 🎯 Common Use Cases

### 1. Generate Keys for New ONDC App
```bash
# Method 1: Using API
curl http://localhost:8080/get-keys

# Method 2: Auto-generation on startup
ONDC_AUTO_GENERATE_KEYS=true ./mvnw spring-boot:run
```

### 2. Create Authorization Header for API Call
```bash
curl -X POST http://localhost:8080/create-header \
  -H "Content-Type: application/json" \
  -d '{
    "value": {"transaction_id": "txn_123"},
    "subscriber_id": "my-app.ondc.org",
    "unique_key_id": "my-key-id",
    "private_key": "generated_private_key"
  }'
```

### 3. Verify Incoming Authorization Header
```bash
curl -X POST http://localhost:8080/verify-header \
  -H "Content-Type: application/json" \
  -d '{
    "value": {"received": "data"},
    "public_key": "sender_public_key",
    "header": "received_authorization_header"
  }'
```

### 4. Complete ONDC Registration Flow
1. Generate keys: `GET /get-keys`
2. Update subscription payload with generated public keys
3. Submit subscription: `POST /subscribe`
4. Handle verification callback: `POST /on_subscribe`
5. Serve verification page: `GET /ondc-site-verification.html`

## 🔗 Additional Resources

- **ONDC Documentation:** [Onboarding documentation](https://github.com/ONDC-Official/developer-docs/blob/main/registry/Onboarding%20of%20Participants.md)
- **Spring Boot Reference:** [https://docs.spring.io/spring-boot/docs/current/reference/html/](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- **Docker Documentation:** [https://docs.docker.com/](https://docs.docker.com/)
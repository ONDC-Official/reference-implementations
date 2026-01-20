# Cipher Suite Analysis: Current vs PyNaCl Implementation

## Summary of Findings

The current implementation in `cryptic_utils.py` has a **critical security vulnerability** due to mixing cryptographic libraries and using insecure cipher modes.

## Current Implementation

### Libraries Used
1. **PyNaCl** - Ed25519 signing/verification, BLAKE2b hashing
2. **cryptography** - X25519 key exchange
3. **pycryptodomex** - AES-256-ECB encryption

### Encryption Flow (lines 125-136, 139-151)
```python
# Key exchange using cryptography library
shared_key = private_key.exchange(public_key)  # 32 bytes (256 bits)

# Encryption using pycryptodomex
cipher = AES.new(shared_key, AES.MODE_ECB)     # AES-256-ECB
ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
```

### Critical Issues

#### 1. AES-ECB Mode (INSECURE) ❌
- **No Initialization Vector (IV)**: Same plaintext always produces same ciphertext
- **Pattern Leakage**: Reveals patterns in plaintext data
- **Deterministic**: Vulnerable to statistical analysis
- **NOT recommended** for any use case by security experts

#### 2. No Message Authentication ❌
- **No MAC/HMAC**: Cannot verify message integrity
- **Malleable**: Attacker can modify ciphertext without detection
- **No protection** against tampering

#### 3. Multiple Crypto Libraries ❌
- **Increased attack surface**: More code = more potential vulnerabilities
- **Compatibility risks**: Different libraries may have different implementations
- **Maintenance burden**: Must track security updates for 3 libraries

## PyNaCl Implementation

### Supported Cipher Suites

#### 1. Public Key Encryption: `Box`
```
Algorithm: crypto_box (NaCl/libsodium)
- Key Exchange: Curve25519 (X25519)
- Encryption: XSalsa20 (stream cipher)
- Authentication: Poly1305 (MAC)
- Nonce: 24 bytes (random)
```

**Advantages:**
- ✅ Authenticated encryption (AEAD)
- ✅ Random nonce prevents pattern leakage
- ✅ Poly1305 MAC ensures integrity
- ✅ Non-deterministic encryption
- ✅ Well-audited implementation (libsodium)

#### 2. Secret Key Encryption: `SecretBox`
```
Algorithm: crypto_secretbox (NaCl/libsodium)
- Encryption: XSalsa20 (stream cipher)
- Authentication: Poly1305 (MAC)
- Nonce: 24 bytes
```

#### 3. Digital Signatures: `Sign`
```
Algorithm: Ed25519
- Already used in current implementation
- Working correctly
```

#### 4. Hashing: `Hash`
```
Algorithms:
- BLAKE2b (variable output length)
- SHA-256
- SHA-512
```
- Already used in current implementation (BLAKE2b)

## Test Results

### ECB Mode Vulnerability Demonstration
```
Same plaintext encrypted twice with current implementation:
Encrypted 1: VqjNgJYGOvqZTFfJTfG4vEFIdXuGbXhdIgIIXFfXyzE=
Encrypted 2: VqjNgJYGOvqZTFfJTfG4vEFIdXuGbXhdIgIIXFfXyzE=
Identical: True ❌ (REVEALS THAT SAME DATA WAS ENCRYPTED!)
```

### PyNaCl Box (Secure)
```
Same plaintext encrypted twice with PyNaCl:
Encrypted 1: 87EvjfpQX5ZZ+V+0+vtp/5797jycvdqjmV1s9+1u7Z13...
Encrypted 2: a+cw8YEUTgBhy/iQMKiCAUCxWUM1W5EJgUjaRzdwyNu9...
Identical: False ✅ (SECURE - different random nonces)
```

## The Bug

**The bug mentioned is likely a combination of:**

1. **Insecure cipher mode**: Using AES-ECB instead of authenticated encryption
2. **Library mixing**: Combining cryptography + pycryptodomex when PyNaCl can do it all
3. **No authentication**: Missing MAC/integrity protection
4. **Deterministic encryption**: Security risk in many scenarios

## Recommendations

### Option 1: Use PyNaCl Box (Recommended)
Replace the entire encrypt/decrypt implementation with PyNaCl's `Box`:

```python
import nacl.public
import nacl.utils

def encrypt_with_nacl(private_key_bytes, public_key_bytes, plaintext):
    private_key = nacl.public.PrivateKey(private_key_bytes)
    public_key = nacl.public.PublicKey(public_key_bytes)
    box = nacl.public.Box(private_key, public_key)
    encrypted = box.encrypt(plaintext)
    return base64.b64encode(encrypted).decode('utf-8')

def decrypt_with_nacl(private_key_bytes, public_key_bytes, ciphertext_b64):
    private_key = nacl.public.PrivateKey(private_key_bytes)
    public_key = nacl.public.PublicKey(public_key_bytes)
    box = nacl.public.Box(private_key, public_key)
    decrypted = box.decrypt(base64.b64decode(ciphertext_b64))
    return decrypted
```

**Benefits:**
- Single library (PyNaCl already used for signing)
- Authenticated encryption (integrity + confidentiality)
- Non-deterministic (random nonces)
- Well-audited implementation

### Option 2: Fix Current Implementation (If must keep AES)
If you must use AES, minimum changes needed:

1. **Switch to AES-GCM** (authenticated encryption mode)
2. **Add random IV/nonce** for each encryption
3. **Consider using cryptography library's AESGCM** instead of pycryptodomex

```python
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

def encrypt_with_aesgcm(shared_key, plaintext):
    aesgcm = AESGCM(shared_key)  # 32-byte key = AES-256
    nonce = os.urandom(12)  # 96-bit nonce for GCM
    ciphertext = aesgcm.encrypt(nonce, plaintext, None)
    # Return nonce + ciphertext (nonce must be transmitted)
    return base64.b64encode(nonce + ciphertext).decode('utf-8')
```

## Compatibility Note

**WARNING**: Changing the encryption implementation will break compatibility with existing encrypted data. Plan migration carefully:

1. Version the encryption scheme
2. Support both old and new decryption temporarily
3. Re-encrypt existing data with new scheme
4. Deprecate old scheme after migration period

## Key Size Answer

**Q: Does AES need 128-bit or 256-bit keys?**

**A: AES automatically uses 256-bit keys in this implementation.**

- X25519 key exchange produces **32 bytes = 256 bits**
- AES.new() accepts the 32-byte key and uses **AES-256**
- AES determines variant by key length:
  - 16 bytes → AES-128
  - 24 bytes → AES-192
  - 32 bytes → AES-256

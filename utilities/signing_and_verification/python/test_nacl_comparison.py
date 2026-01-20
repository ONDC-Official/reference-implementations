#!/usr/bin/env python3
"""
Comparison test between current implementation (cryptography + pycryptodomex)
and PyNaCl's native implementation.

Current implementation: X25519 (cryptography) + AES-256-ECB (pycryptodomex)
PyNaCl implementation: X25519 + XSalsa20-Poly1305 (Box)
"""

import base64
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey
from cryptography.hazmat.primitives import serialization
from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import pad, unpad
import nacl.public
import nacl.utils


def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print('='*60)


def current_implementation_encrypt(private_key_der, public_key_der, plaintext):
    """Current implementation from cryptic_utils.py"""
    private_key = serialization.load_der_private_key(
        base64.b64decode(private_key_der),
        password=None
    )
    public_key = serialization.load_der_public_key(
        base64.b64decode(public_key_der)
    )
    shared_key = private_key.exchange(public_key)

    print(f"Shared key length: {len(shared_key)} bytes ({len(shared_key)*8} bits)")
    print(f"Shared key (hex): {shared_key.hex()}")

    cipher = AES.new(shared_key, AES.MODE_ECB)
    ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
    return base64.b64encode(ciphertext).decode('utf-8')


def current_implementation_decrypt(private_key_der, public_key_der, ciphertext_b64):
    """Current implementation from cryptic_utils.py"""
    private_key = serialization.load_der_private_key(
        base64.b64decode(private_key_der),
        password=None
    )
    public_key = serialization.load_der_public_key(
        base64.b64decode(public_key_der)
    )
    shared_key = private_key.exchange(public_key)
    cipher = AES.new(shared_key, AES.MODE_ECB)
    ciphertxt = base64.b64decode(ciphertext_b64)
    return unpad(cipher.decrypt(ciphertxt), AES.block_size)


def nacl_encrypt(private_key_nacl, public_key_nacl, plaintext):
    """PyNaCl Box implementation"""
    box = nacl.public.Box(private_key_nacl, public_key_nacl)
    encrypted = box.encrypt(plaintext)
    return base64.b64encode(encrypted).decode('utf-8')


def nacl_decrypt(private_key_nacl, public_key_nacl, ciphertext_b64):
    """PyNaCl Box implementation"""
    box = nacl.public.Box(private_key_nacl, public_key_nacl)
    decrypted = box.decrypt(base64.b64decode(ciphertext_b64))
    return decrypted


def main():
    print_section("PyNaCl Supported Cipher Suites")
    print("""
PyNaCl (libsodium Python bindings) supports:

1. Public Key Encryption (Box):
   - Key Exchange: Curve25519 (X25519)
   - Encryption: XSalsa20 stream cipher
   - Authentication: Poly1305 MAC
   - Combined: crypto_box (authenticated encryption)

2. Secret Key Encryption (SecretBox):
   - Encryption: XSalsa20 stream cipher
   - Authentication: Poly1305 MAC
   - Combined: crypto_secretbox (authenticated encryption)

3. Signing (Sign):
   - Algorithm: Ed25519
   - Hash: SHA-512 internally

4. Hashing (Hash):
   - BLAKE2b (variable output length)
   - SHA-256, SHA-512

Current implementation uses:
   - Key Exchange: X25519 (cryptography library)
   - Encryption: AES-256-ECB (pycryptodomex)
   - NO authentication/MAC
""")

    plaintext = b'ONDC is a Great Initiative!!'

    # ===== Test 1: Current Implementation =====
    print_section("Test 1: Current Implementation (X25519 + AES-256-ECB)")

    # Generate keys using cryptography library (as in current code)
    current_private = X25519PrivateKey.generate()
    current_public = current_private.public_key()

    # Serialize to DER format (as stored/transmitted)
    current_private_der = base64.b64encode(current_private.private_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )).decode('utf-8')

    current_public_der = base64.b64encode(current_public.public_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )).decode('utf-8')

    print(f"Private key (DER, base64): {current_private_der[:50]}...")
    print(f"Public key (DER, base64):  {current_public_der[:50]}...")
    print(f"\nPlaintext: {plaintext.decode('utf-8')}")

    # Encrypt
    current_encrypted = current_implementation_encrypt(
        current_private_der,
        current_public_der,
        plaintext
    )
    print(f"\nEncrypted (base64): {current_encrypted}")

    # Decrypt
    current_decrypted = current_implementation_decrypt(
        current_private_der,
        current_public_der,
        current_encrypted
    )
    print(f"Decrypted: {current_decrypted.decode('utf-8')}")
    print(f"Match: {current_decrypted == plaintext}")

    # ===== Test 2: PyNaCl Implementation =====
    print_section("Test 2: PyNaCl Box (X25519 + XSalsa20-Poly1305)")

    # Generate keys using PyNaCl
    nacl_private = nacl.public.PrivateKey.generate()
    nacl_public = nacl_private.public_key

    print(f"Private key (raw, hex): {nacl_private.encode().hex()[:50]}...")
    print(f"Public key (raw, hex):  {nacl_public.encode().hex()[:50]}...")
    print(f"\nPlaintext: {plaintext.decode('utf-8')}")

    # Encrypt
    nacl_encrypted = nacl_encrypt(nacl_private, nacl_public, plaintext)
    print(f"\nEncrypted (base64): {nacl_encrypted}")
    print(f"Note: Includes 24-byte nonce + 16-byte Poly1305 MAC")

    # Decrypt
    nacl_decrypted = nacl_decrypt(nacl_private, nacl_public, nacl_encrypted)
    print(f"Decrypted: {nacl_decrypted.decode('utf-8')}")
    print(f"Match: {nacl_decrypted == plaintext}")

    # ===== Test 3: Security Analysis =====
    print_section("Security Comparison")

    print("""
Current Implementation Issues:
1. ❌ Uses AES-ECB mode (INSECURE - no IV, identical plaintexts produce
   identical ciphertexts)
2. ❌ No authentication/MAC (vulnerable to tampering)
3. ❌ Mixing multiple crypto libraries (increased attack surface)
4. ❌ No nonce/IV (deterministic encryption - same plaintext = same ciphertext)

PyNaCl Box Advantages:
1. ✅ Uses XSalsa20-Poly1305 (authenticated encryption)
2. ✅ Includes Poly1305 MAC (integrity protection)
3. ✅ Random nonce for each message (non-deterministic)
4. ✅ Single, well-audited library (libsodium)
5. ✅ Designed by cryptography experts (DJB et al.)

Recommendation:
Use PyNaCl's Box for encryption instead of the current implementation.
""")

    # ===== Test 4: Demonstrate ECB weakness =====
    print_section("Demonstration: ECB Mode Weakness")

    # Encrypt same plaintext twice with current implementation
    encrypted1 = current_implementation_encrypt(
        current_private_der, current_public_der, plaintext
    )
    encrypted2 = current_implementation_encrypt(
        current_private_der, current_public_der, plaintext
    )

    print(f"Same plaintext encrypted twice:")
    print(f"Encrypted 1: {encrypted1}")
    print(f"Encrypted 2: {encrypted2}")
    print(f"Identical: {encrypted1 == encrypted2} ❌ (INSECURE!)")

    # With PyNaCl, each encryption is different (due to random nonce)
    nacl_enc1 = nacl_encrypt(nacl_private, nacl_public, plaintext)
    nacl_enc2 = nacl_encrypt(nacl_private, nacl_public, plaintext)

    print(f"\nPyNaCl - Same plaintext encrypted twice:")
    print(f"Encrypted 1: {nacl_enc1[:60]}...")
    print(f"Encrypted 2: {nacl_enc2[:60]}...")
    print(f"Identical: {nacl_enc1 == nacl_enc2} ✅ (SECURE - different nonces)")


if __name__ == '__main__':
    main()

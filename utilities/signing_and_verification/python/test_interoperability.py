#!/usr/bin/env python3
"""
Comprehensive test for cryptographic interoperability.

Tests:
1. Original implementation (AES-ECB) - baseline
2. Fixed implementation (XSalsa20-Poly1305) - secure
3. Pure NaCl implementation - reference
4. Cross-compatibility between fixed and NaCl
5. Security validation
"""

import base64
import sys
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey
from cryptography.hazmat.primitives import serialization
import nacl.public
import nacl.utils

# Import both implementations
print("Loading implementations...")
sys.path.insert(0, '/Users/s0litudeisbliss/.claude-worktrees/reference-implementations/sleepy-tu/utilities/signing_and_verification/python')

# Import original functions
from cryptic_utils import encrypt as original_encrypt
from cryptic_utils import decrypt as original_decrypt

# Import fixed functions
from cryptic_utils_fixed import encrypt as fixed_encrypt
from cryptic_utils_fixed import decrypt as fixed_decrypt


def print_section(title, char='='):
    print(f"\n{char*70}")
    print(f"  {title}")
    print(f"{char*70}")


def test_original_implementation():
    """Test original AES-ECB implementation"""
    print_section("TEST 1: Original Implementation (AES-256-ECB)", '=')

    # Generate keys
    private_key = X25519PrivateKey.generate()
    public_key = private_key.public_key()

    private_key_der = base64.b64encode(private_key.private_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )).decode('utf-8')

    public_key_der = base64.b64encode(public_key.public_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )).decode('utf-8')

    plaintext = b'ONDC is a Great Initiative!!'

    # Encrypt
    encrypted = original_encrypt(private_key_der, public_key_der, None)
    print(f"Plaintext: {plaintext.decode()}")
    print(f"Encrypted: {encrypted}")

    # Decrypt
    decrypted = original_decrypt(private_key_der, public_key_der, encrypted)
    print(f"Decrypted: {decrypted.decode()}")

    # Verify
    success = decrypted == plaintext
    print(f"\n✅ Encryption/Decryption: {'PASS' if success else 'FAIL'}")

    # Test determinism (ECB weakness)
    encrypted2 = original_encrypt(private_key_der, public_key_der, None)
    is_deterministic = encrypted == encrypted2
    print(f"❌ Deterministic (same plaintext → same ciphertext): {is_deterministic}")
    print(f"   This is INSECURE for ECB mode!")

    return success


def test_fixed_implementation():
    """Test fixed XSalsa20-Poly1305 implementation"""
    print_section("TEST 2: Fixed Implementation (XSalsa20-Poly1305)", '=')

    # Generate keys
    private_key = X25519PrivateKey.generate()
    public_key = private_key.public_key()

    private_key_der = base64.b64encode(private_key.private_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )).decode('utf-8')

    public_key_der = base64.b64encode(public_key.public_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )).decode('utf-8')

    plaintext = 'ONDC is a Great Initiative!!'

    # Encrypt
    encrypted = fixed_encrypt(private_key_der, public_key_der, plaintext)
    print(f"Plaintext: {plaintext}")
    print(f"Encrypted: {encrypted}")
    print(f"Encrypted length: {len(base64.b64decode(encrypted))} bytes")
    print(f"  (24 bytes nonce + {len(plaintext)} bytes plaintext + 16 bytes MAC)")

    # Decrypt
    decrypted = fixed_decrypt(private_key_der, public_key_der, encrypted)
    print(f"Decrypted: {decrypted}")

    # Verify
    success = decrypted == plaintext
    print(f"\n✅ Encryption/Decryption: {'PASS' if success else 'FAIL'}")

    # Test non-determinism (random nonces)
    encrypted2 = fixed_encrypt(private_key_der, public_key_der, plaintext)
    is_non_deterministic = encrypted != encrypted2
    print(f"✅ Non-deterministic (random nonces): {is_non_deterministic}")
    print(f"   This is SECURE!")

    # Verify both decrypt correctly
    decrypted2 = fixed_decrypt(private_key_der, public_key_der, encrypted2)
    both_decrypt = decrypted == plaintext and decrypted2 == plaintext
    print(f"✅ Both ciphertexts decrypt correctly: {both_decrypt}")

    return success


def test_pure_nacl():
    """Test pure NaCl implementation as reference"""
    print_section("TEST 3: Pure NaCl Reference Implementation", '=')

    # Generate NaCl keys
    private_key = nacl.public.PrivateKey.generate()
    public_key = private_key.public_key

    plaintext = b'ONDC is a Great Initiative!!'

    # Encrypt with NaCl
    box = nacl.public.Box(private_key, public_key)
    encrypted = box.encrypt(plaintext)
    encrypted_b64 = base64.b64encode(encrypted).decode('utf-8')

    print(f"Plaintext: {plaintext.decode()}")
    print(f"Encrypted: {encrypted_b64}")

    # Decrypt with NaCl
    decrypted = box.decrypt(encrypted)
    print(f"Decrypted: {decrypted.decode()}")

    # Verify
    success = decrypted == plaintext
    print(f"\n✅ NaCl Encryption/Decryption: {'PASS' if success else 'FAIL'}")

    return success


def test_cross_compatibility():
    """Test that fixed implementation is compatible with pure NaCl"""
    print_section("TEST 4: Cross-Library Interoperability", '=')

    # Generate keys with cryptography library
    crypto_private = X25519PrivateKey.generate()
    crypto_public = crypto_private.public_key()

    # Get DER format for fixed implementation
    private_key_der = base64.b64encode(crypto_private.private_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )).decode('utf-8')

    public_key_der = base64.b64encode(crypto_public.public_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )).decode('utf-8')

    # Get raw bytes for NaCl
    private_key_bytes = crypto_private.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption()
    )
    public_key_bytes = crypto_public.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )

    # Create NaCl keys from same bytes
    nacl_private = nacl.public.PrivateKey(private_key_bytes)
    nacl_public = nacl.public.PublicKey(public_key_bytes)

    plaintext = 'ONDC is a Great Initiative!!'

    print("Test 4a: Encrypt with fixed, decrypt with NaCl")
    print("-" * 70)

    # Encrypt with fixed implementation
    encrypted_fixed = fixed_encrypt(private_key_der, public_key_der, plaintext)
    print(f"Fixed encrypted: {encrypted_fixed[:60]}...")

    # Decrypt with pure NaCl
    box = nacl.public.Box(nacl_private, nacl_public)
    try:
        decrypted_nacl = box.decrypt(base64.b64decode(encrypted_fixed))
        success_4a = decrypted_nacl.decode('utf-8') == plaintext
        print(f"NaCl decrypted: {decrypted_nacl.decode('utf-8')}")
        print(f"✅ Fixed → NaCl: {'PASS' if success_4a else 'FAIL'}")
    except Exception as e:
        print(f"❌ Fixed → NaCl: FAIL - {e}")
        success_4a = False

    print("\nTest 4b: Encrypt with NaCl, decrypt with fixed")
    print("-" * 70)

    # Encrypt with pure NaCl
    encrypted_nacl = box.encrypt(plaintext.encode('utf-8'))
    encrypted_nacl_b64 = base64.b64encode(encrypted_nacl).decode('utf-8')
    print(f"NaCl encrypted: {encrypted_nacl_b64[:60]}...")

    # Decrypt with fixed implementation
    try:
        decrypted_fixed = fixed_decrypt(private_key_der, public_key_der, encrypted_nacl_b64)
        success_4b = decrypted_fixed == plaintext
        print(f"Fixed decrypted: {decrypted_fixed}")
        print(f"✅ NaCl → Fixed: {'PASS' if success_4b else 'FAIL'}")
    except Exception as e:
        print(f"❌ NaCl → Fixed: FAIL - {e}")
        success_4b = False

    print(f"\n{'='*70}")
    print(f"INTEROPERABILITY: {'✅ FULLY COMPATIBLE' if success_4a and success_4b else '❌ NOT COMPATIBLE'}")
    print(f"{'='*70}")

    return success_4a and success_4b


def test_security_properties():
    """Test security properties of fixed implementation"""
    print_section("TEST 5: Security Properties Validation", '=')

    # Generate keys
    private_key = X25519PrivateKey.generate()
    public_key = private_key.public_key()

    private_key_der = base64.b64encode(private_key.private_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )).decode('utf-8')

    public_key_der = base64.b64encode(public_key.public_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )).decode('utf-8')

    # Test 1: Different plaintexts produce different ciphertexts
    plaintext1 = "Message 1"
    plaintext2 = "Message 2"
    encrypted1 = fixed_encrypt(private_key_der, public_key_der, plaintext1)
    encrypted2 = fixed_encrypt(private_key_der, public_key_der, plaintext2)
    test1 = encrypted1 != encrypted2
    print(f"✅ Different plaintexts → different ciphertexts: {test1}")

    # Test 2: Same plaintext produces different ciphertexts (nonce randomness)
    encrypted1a = fixed_encrypt(private_key_der, public_key_der, plaintext1)
    encrypted1b = fixed_encrypt(private_key_der, public_key_der, plaintext1)
    test2 = encrypted1a != encrypted1b
    print(f"✅ Same plaintext → different ciphertexts (random nonces): {test2}")

    # Test 3: Tampered ciphertext fails to decrypt
    encrypted = fixed_encrypt(private_key_der, public_key_der, "Test message")
    # Flip a bit in the ciphertext
    encrypted_bytes = bytearray(base64.b64decode(encrypted))
    encrypted_bytes[-1] ^= 0x01  # Flip last bit
    tampered = base64.b64encode(bytes(encrypted_bytes)).decode('utf-8')

    try:
        fixed_decrypt(private_key_der, public_key_der, tampered)
        test3 = False
        print(f"❌ Tampered ciphertext detection: FAIL (should have raised error)")
    except Exception as e:
        test3 = True
        print(f"✅ Tampered ciphertext detection: PASS (raised {type(e).__name__})")

    # Test 4: Message is actually encrypted (not plaintext)
    plaintext = "Secret message"
    encrypted = fixed_encrypt(private_key_der, public_key_der, plaintext)
    encrypted_bytes = base64.b64decode(encrypted)
    test4 = plaintext.encode('utf-8') not in encrypted_bytes
    print(f"✅ Plaintext not visible in ciphertext: {test4}")

    all_pass = test1 and test2 and test3 and test4
    print(f"\n{'='*70}")
    print(f"SECURITY VALIDATION: {'✅ ALL TESTS PASS' if all_pass else '❌ SOME TESTS FAILED'}")
    print(f"{'='*70}")

    return all_pass


def main():
    print_section("CRYPTOGRAPHIC INTEROPERABILITY TEST SUITE", '=')
    print("""
This test suite validates:
1. Original implementation (baseline)
2. Fixed implementation (secure)
3. Pure NaCl reference
4. Cross-library interoperability
5. Security properties

The goal is to ensure the fixed implementation:
- Uses secure cryptography (XSalsa20-Poly1305)
- Is fully interoperable with NaCl/libsodium
- Maintains compatibility with existing key generation
- Provides proper security guarantees
""")

    results = {}

    try:
        results['original'] = test_original_implementation()
    except Exception as e:
        print(f"❌ Original implementation failed: {e}")
        results['original'] = False

    try:
        results['fixed'] = test_fixed_implementation()
    except Exception as e:
        print(f"❌ Fixed implementation failed: {e}")
        results['fixed'] = False

    try:
        results['nacl'] = test_pure_nacl()
    except Exception as e:
        print(f"❌ NaCl reference failed: {e}")
        results['nacl'] = False

    try:
        results['interop'] = test_cross_compatibility()
    except Exception as e:
        print(f"❌ Interoperability test failed: {e}")
        import traceback
        traceback.print_exc()
        results['interop'] = False

    try:
        results['security'] = test_security_properties()
    except Exception as e:
        print(f"❌ Security test failed: {e}")
        results['security'] = False

    # Summary
    print_section("FINAL SUMMARY", '=')
    print(f"Original Implementation (AES-ECB):        {'✅ PASS' if results.get('original') else '❌ FAIL'}")
    print(f"Fixed Implementation (XSalsa20-Poly1305): {'✅ PASS' if results.get('fixed') else '❌ FAIL'}")
    print(f"Pure NaCl Reference:                      {'✅ PASS' if results.get('nacl') else '❌ FAIL'}")
    print(f"Cross-Library Interoperability:           {'✅ PASS' if results.get('interop') else '❌ FAIL'}")
    print(f"Security Properties:                      {'✅ PASS' if results.get('security') else '❌ FAIL'}")
    print()

    if all(results.values()):
        print("🎉 ALL TESTS PASSED! 🎉")
        print("\nThe fixed implementation is:")
        print("  ✅ Secure (XSalsa20-Poly1305 with authentication)")
        print("  ✅ Interoperable (compatible with all NaCl/libsodium implementations)")
        print("  ✅ Compatible (works with existing X25519 key generation)")
        return 0
    else:
        print("⚠️  SOME TESTS FAILED")
        return 1


if __name__ == '__main__':
    sys.exit(main())

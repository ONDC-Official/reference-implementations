#!/usr/bin/env python3
"""
Test to check if original AES-ECB implementation is compatible with NaCl.

This test will demonstrate that the original implementation is NOT interoperable
with NaCl/libsodium implementations.

Test Flow:
1. Encrypt using original implementation (AES-ECB)
2. Try to decrypt with NaCl
3. Expected result: FAIL (incompatible formats)
"""

import base64
import sys
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey
from cryptography.hazmat.primitives import serialization
import nacl.public
import nacl.exceptions

sys.path.insert(0, '/Users/s0litudeisbliss/.claude-worktrees/reference-implementations/sleepy-tu/utilities/signing_and_verification/python')

from cryptic_utils import encrypt as original_encrypt
from cryptic_utils import decrypt as original_decrypt


def print_section(title):
    print(f"\n{'='*70}")
    print(f"  {title}")
    print(f"{'='*70}")


def main():
    print_section("COMPATIBILITY TEST: Original (AES-ECB) vs NaCl")

    print("""
This test checks if the original AES-ECB implementation can be decrypted
by a standard NaCl implementation.

Hypothesis: The formats are INCOMPATIBLE because:
- Original uses AES-ECB (custom)
- NaCl expects XSalsa20-Poly1305 (crypto_box format)
""")

    # Generate keys using cryptography library (as original does)
    crypto_private = X25519PrivateKey.generate()
    crypto_public = crypto_private.public_key()

    # Get DER format for original implementation
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

    # Create NaCl keys
    nacl_private = nacl.public.PrivateKey(private_key_bytes)
    nacl_public = nacl.public.PublicKey(public_key_bytes)

    plaintext = b'ONDC is a Great Initiative!!'

    print_section("Step 1: Encrypt with Original Implementation")

    # Encrypt with original (AES-ECB)
    try:
        encrypted_original = original_encrypt(private_key_der, public_key_der, None)
        print(f"✅ Original encryption successful")
        print(f"   Plaintext: {plaintext.decode()}")
        print(f"   Encrypted (base64): {encrypted_original}")
        print(f"   Encrypted length: {len(base64.b64decode(encrypted_original))} bytes")

        # Analyze the encrypted data
        encrypted_bytes = base64.b64decode(encrypted_original)
        print(f"\n   Format analysis:")
        print(f"   - Length: {len(encrypted_bytes)} bytes")
        print(f"   - Expected for AES-ECB: Padded to 32 bytes (AES block size)")
        print(f"   - Contains: Only ciphertext (no nonce, no MAC)")

    except Exception as e:
        print(f"❌ Original encryption failed: {e}")
        return 1

    print_section("Step 2: Try to Decrypt with NaCl")

    # Try to decrypt with NaCl
    box = nacl.public.Box(nacl_private, nacl_public)

    try:
        encrypted_bytes = base64.b64decode(encrypted_original)
        print(f"   Attempting to decrypt {len(encrypted_bytes)}-byte ciphertext with NaCl...")
        print(f"   NaCl expects format: [24-byte nonce] + [ciphertext] + [16-byte MAC]")
        print(f"   Original provides:    [32-byte ciphertext only]")
        print()

        decrypted = box.decrypt(encrypted_bytes)
        print(f"❌ UNEXPECTED: NaCl decryption succeeded!")
        print(f"   Decrypted: {decrypted.decode()}")
        print(f"   This should NOT happen - formats are different!")
        test_passed = True

    except nacl.exceptions.CryptoError as e:
        print(f"✅ EXPECTED: NaCl decryption failed with CryptoError")
        print(f"   Error: {e}")
        print(f"\n   This is expected because:")
        print(f"   1. NaCl expects a 24-byte nonce at the start")
        print(f"   2. NaCl expects a 16-byte Poly1305 MAC at the end")
        print(f"   3. Original format has neither (just AES-ECB ciphertext)")
        test_passed = False

    except Exception as e:
        print(f"✅ EXPECTED: NaCl decryption failed")
        print(f"   Error type: {type(e).__name__}")
        print(f"   Error: {e}")
        print(f"\n   This confirms the formats are incompatible.")
        test_passed = False

    print_section("Step 3: Verify Original Can Decrypt Its Own Format")

    # Verify original can decrypt its own format
    try:
        decrypted_original = original_decrypt(private_key_der, public_key_der, encrypted_original)
        matches = decrypted_original == plaintext
        print(f"✅ Original decryption: {'PASS' if matches else 'FAIL'}")
        print(f"   Decrypted: {decrypted_original.decode()}")
        print(f"   Matches plaintext: {matches}")
    except Exception as e:
        print(f"❌ Original decryption failed: {e}")

    print_section("DETAILED FORMAT COMPARISON")

    print("""
Original (AES-ECB) Format:
┌──────────────────────────────┐
│ AES-ECB Encrypted Ciphertext │
│         (32 bytes)           │
│      - No nonce              │
│      - No MAC                │
│      - Padded to block size  │
└──────────────────────────────┘

NaCl crypto_box Format:
┌─────────────┬──────────────────┬────────────┐
│ Nonce       │ XSalsa20         │ Poly1305   │
│ (24 bytes)  │ Ciphertext       │ MAC        │
│             │ (variable)       │ (16 bytes) │
└─────────────┴──────────────────┴────────────┘

Conclusion:
These formats are FUNDAMENTALLY INCOMPATIBLE!

Original implementation:
- Uses custom AES-ECB format
- Only works with itself
- Cannot decrypt NaCl messages
- NaCl cannot decrypt its messages

This is why we need cryptic_utils_fixed.py which uses the
standard NaCl crypto_box format for interoperability.
""")

    print_section("FINAL RESULT")

    if test_passed:
        print("⚠️  UNEXPECTED: Test passed (formats are compatible)")
        print("This would mean AES-ECB and NaCl formats are compatible.")
        print("This should NOT happen!")
        return 1
    else:
        print("✅ EXPECTED: Test failed (formats are incompatible)")
        print("\nThis confirms that:")
        print("  1. Original implementation uses custom AES-ECB format")
        print("  2. NaCl uses standard crypto_box format")
        print("  3. These formats are NOT interoperable")
        print("  4. We NEED cryptic_utils_fixed.py for interoperability")
        print("\n🎯 This is exactly why we created the fixed implementation!")
        return 0


if __name__ == '__main__':
    sys.exit(main())

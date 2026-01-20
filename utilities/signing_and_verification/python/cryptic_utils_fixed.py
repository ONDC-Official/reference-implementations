"""
Fixed cryptic_utils.py with secure, interoperable encryption.

CHANGES FROM ORIGINAL:
1. Replaced AES-256-ECB with XSalsa20-Poly1305 (crypto_box)
2. Uses only PyNaCl for encryption (removes pycryptodomex dependency for encryption)
3. Maintains compatibility with cryptography library for X25519 key loading
4. Adds proper authentication (Poly1305 MAC)
5. Non-deterministic encryption (random nonces)
6. Fully interoperable with any NaCl/libsodium implementation

SECURITY IMPROVEMENTS:
- ✅ Authenticated encryption (AEAD)
- ✅ Random nonces (non-deterministic)
- ✅ No pattern leakage
- ✅ Integrity protection via Poly1305 MAC
- ✅ Industry-standard crypto_box primitive
"""

import base64
import datetime
import os
import re
import json
import fire as fire
import nacl.encoding
import nacl.hash
import nacl.bindings
import nacl.public
import nacl.utils
from nacl.bindings import crypto_sign_ed25519_sk_to_seed
from nacl.signing import SigningKey, VerifyKey
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey, X25519PublicKey
from cryptography.hazmat.primitives import serialization

f = open(os.getenv("REQUEST_BODY_PATH", "request_body_raw_text.txt"), "r")
request_body_raw_text = f.read()
request_body_raw_text = json.loads(request_body_raw_text)
request_body_raw_text = json.dumps(request_body_raw_text, separators=(',', ':'))


def hash_message(msg: str):
    """Hash message using BLAKE2b (unchanged from original)"""
    HASHER = nacl.hash.blake2b
    digest = HASHER(bytes(msg, 'utf-8'), digest_size=64, encoder=nacl.encoding.Base64Encoder)
    digest_str = digest.decode("utf-8")
    return digest_str


def create_signing_string(digest_base64, created=None, expires=None):
    """Create signing string (unchanged from original)"""
    if created is None:
        created = int(datetime.datetime.now().timestamp())
    if expires is None:
        expires = int((datetime.datetime.now() + datetime.timedelta(hours=1)).timestamp())
    signing_string = f"""(created): {created}
(expires): {expires}
digest: BLAKE-512={digest_base64}"""
    return signing_string


def sign_response(signing_key, private_key):
    """Sign response using Ed25519 (unchanged from original)"""
    private_key64 = base64.b64decode(private_key)
    seed = crypto_sign_ed25519_sk_to_seed(private_key64)
    signer = SigningKey(seed)
    signed = signer.sign(bytes(signing_key, encoding='utf8'))
    signature = base64.b64encode(signed.signature).decode()
    return signature


def verify_response(signature, signing_key, public_key):
    """Verify signature using Ed25519 (unchanged from original)"""
    try:
        public_key64 = base64.b64decode(public_key)
        VerifyKey(public_key64).verify(bytes(signing_key, 'utf8'), base64.b64decode(signature))
        return True
    except Exception:
        return False


def get_filter_dictionary_or_operation(filter_string):
    """Parse authorization header (unchanged from original)"""
    filter_string_list = re.split(',', filter_string)
    filter_string_list = [x.strip(' ') for x in filter_string_list]
    filter_dictionary_or_operation = dict()
    for fs in filter_string_list:
        splits = fs.split('=', maxsplit=1)
        key = splits[0].strip()
        value = splits[1].strip()
        filter_dictionary_or_operation[key] = value.replace("\"", "")
    return filter_dictionary_or_operation


def create_authorisation_header(request_body=request_body_raw_text, created=None, expires=None):
    """Create authorization header (unchanged from original)"""
    created = int(datetime.datetime.now().timestamp()) if created is None else created
    expires = int((datetime.datetime.now() + datetime.timedelta(hours=1)).timestamp()) if expires is None else expires
    signing_key = create_signing_string(hash_message(request_body),
                                        created=created, expires=expires)
    signature = sign_response(signing_key, private_key=os.getenv("PRIVATE_KEY"))

    subscriber_id = os.getenv("SUBSCRIBER_ID", "buyer-app.ondc.org")
    unique_key_id = os.getenv("UNIQUE_KEY_ID", "207")
    header = f'"Signature keyId="{subscriber_id}|{unique_key_id}|ed25519",algorithm="ed25519",created=' \
             f'"{created}",expires="{expires}",headers="(created) (expires) digest",signature="{signature}""'
    return header


def verify_authorisation_header(auth_header, request_body_str=request_body_raw_text,
                                public_key=os.getenv("PUBLIC_KEY")):
    """Verify authorization header (unchanged from original)"""
    header_parts = get_filter_dictionary_or_operation(auth_header.replace("Signature ", ""))
    created = int(header_parts['created'])
    expires = int(header_parts['expires'])
    current_timestamp = int(datetime.datetime.now().timestamp())
    if created <= current_timestamp <= expires:
        signing_key = create_signing_string(hash_message(request_body_str), created=created, expires=expires)
        return verify_response(header_parts['signature'], signing_key, public_key=public_key)
    else:
        return False


def generate_key_pairs():
    """Generate key pairs (unchanged from original)"""
    signing_key = SigningKey.generate()
    private_key = base64.b64encode(signing_key._signing_key).decode()
    public_key = base64.b64encode(bytes(signing_key.verify_key)).decode()
    inst_private_key = X25519PrivateKey.generate()
    inst_public_key = inst_private_key.public_key()
    bytes_private_key = inst_private_key.private_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )
    bytes_public_key = inst_public_key.public_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    encryption_private_key = base64.b64encode(bytes_private_key).decode('utf-8')
    encryption_public_key = base64.b64encode(bytes_public_key).decode('utf-8')
    return {"Signing_private_key": private_key,
            "Signing_public_key": public_key,
            "Encryption_Privatekey": encryption_private_key,
            "Encryption_Publickey": encryption_public_key}


def encrypt(encryption_private_key, encryption_public_key, plaintext=None):
    """
    FIXED: Secure encryption using NaCl crypto_box (XSalsa20-Poly1305).

    This implementation:
    - Uses X25519 for key exchange
    - Uses XSalsa20 for encryption
    - Uses Poly1305 for authentication
    - Generates random 24-byte nonce for each encryption
    - Is fully interoperable with any NaCl/libsodium implementation

    Args:
        encryption_private_key: Base64-encoded DER private key (from cryptography library)
        encryption_public_key: Base64-encoded DER public key (from cryptography library)
        plaintext: Optional plaintext string. If None, uses default test message.

    Returns:
        Base64-encoded string containing: nonce (24 bytes) + authenticated_ciphertext
    """
    # Load keys from DER format (for compatibility with existing key generation)
    private_key = serialization.load_der_private_key(
        base64.b64decode(encryption_private_key),
        password=None
    )
    public_key = serialization.load_der_public_key(
        base64.b64decode(encryption_public_key)
    )

    # Get raw 32-byte keys for NaCl
    private_key_bytes = private_key.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption()
    )
    public_key_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )

    # Convert to NaCl key objects
    nacl_private = nacl.public.PrivateKey(private_key_bytes)
    nacl_public = nacl.public.PublicKey(public_key_bytes)

    # Create Box for encryption
    box = nacl.public.Box(nacl_private, nacl_public)

    # Use provided plaintext or default
    if plaintext is None:
        plaintext = b'ONDC is a Great Initiative!!'
    elif isinstance(plaintext, str):
        plaintext = plaintext.encode('utf-8')

    # Encrypt with random nonce
    # Box.encrypt() returns: nonce (24 bytes) + ciphertext + mac (16 bytes)
    encrypted = box.encrypt(plaintext)

    return base64.b64encode(encrypted).decode('utf-8')


def decrypt(encryption_private_key, encryption_public_key, cipherstring):
    """
    FIXED: Secure decryption using NaCl crypto_box (XSalsa20-Poly1305).

    This implementation:
    - Verifies Poly1305 MAC (authentication)
    - Decrypts using XSalsa20
    - Is fully interoperable with any NaCl/libsodium implementation

    Args:
        encryption_private_key: Base64-encoded DER private key
        encryption_public_key: Base64-encoded DER public key
        cipherstring: Base64-encoded encrypted message (nonce + ciphertext + mac)

    Returns:
        Decrypted plaintext as string

    Raises:
        nacl.exceptions.CryptoError: If MAC verification fails or decryption fails
    """
    # Load keys from DER format
    private_key = serialization.load_der_private_key(
        base64.b64decode(encryption_private_key),
        password=None
    )
    public_key = serialization.load_der_public_key(
        base64.b64decode(encryption_public_key)
    )

    # Get raw 32-byte keys for NaCl
    private_key_bytes = private_key.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption()
    )
    public_key_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )

    # Convert to NaCl key objects
    nacl_private = nacl.public.PrivateKey(private_key_bytes)
    nacl_public = nacl.public.PublicKey(public_key_bytes)

    # Create Box for decryption
    box = nacl.public.Box(nacl_private, nacl_public)

    # Decrypt (will verify MAC automatically)
    ciphertext = base64.b64decode(cipherstring)
    decrypted = box.decrypt(ciphertext)

    return decrypted.decode('utf-8')


if __name__ == '__main__':
    fire.Fire()

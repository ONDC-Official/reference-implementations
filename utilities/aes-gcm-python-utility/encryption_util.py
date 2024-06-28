import base64
import json
from Cryptodome.Cipher import AES
from Crypto.Random import get_random_bytes
import logging

def encrypt_data(key, data):
    '''
    Encrypt the specified plain text using AES/GCM/NoPadding.
    
    Parameters:

    ``key`` (string): The Shared Key.

    ``data`` (string): The Raw Data to be Encrypted.

    Returns:
    string: The Encrypted data in base64 encoded string format
    '''
    # The standard Initialization Vector (IV) length (96 bits) (12 byte).
    IV_BYTE_LENGTH=12
    encrypted_data=None
    try:
        shared_key = base64.b64decode(key)  
        nonce = get_random_bytes(IV_BYTE_LENGTH) # Randomly generate the IV/nonce 

        #  Initialize AES/GCM cipher for encryption
        cipher = AES.new(shared_key, AES.MODE_GCM, nonce=nonce)
        # Encrypt the raw data and get the cipher text and authentication tag.
        ciphertext, auth_tag = cipher.encrypt_and_digest(data.encode())
        
        #  Set the values for the EncryptedData 
        encrypted_payload = {
            'nonce': base64.b64encode(cipher.nonce).decode("utf-8"),
            'encrypted_data': base64.b64encode(ciphertext).decode("utf-8"),
            'hmac': base64.b64encode(auth_tag).decode("utf-8")
        }
        encrypted_data=base64.b64encode(json.dumps(encrypted_payload).encode()).decode("utf-8")
    except Exception as e:
        logging.exception(e)

    # Return the Encrypted Data.    
    return encrypted_data

def decrypt_data(key, e_data):
    '''
        Decrypts the Encrypted Data using Shared Key.

        Parameters:

        ``key`` (string): The Shared Key
        
        ``data`` (string): The Encrypted Data.

        Returns:
        string: The Raw Decrypted data
    '''
    decrypted_data=None
    try:
        
        shared_key = base64.b64decode(key)
        
        # Decode the base64 string and De-serialize it as
        decoded_payload = json.loads(base64.b64decode(e_data))

        # Decode the fields of encryptedData from base64 to bytes.
        nonce = base64.b64decode(decoded_payload["nonce"])
        encrypted_data = base64.b64decode( decoded_payload["encrypted_data"])
        auth_tag =base64.b64decode( decoded_payload["hmac"])

        cipher = AES.new(shared_key, AES.MODE_GCM, nonce=nonce)
        # Decrypt the data
        plaintext = cipher.decrypt_and_verify(encrypted_data, auth_tag)
        decrypted_data=plaintext.decode('utf-8')
    except Exception as e:
        logging.exception(e)
    return decrypted_data
    
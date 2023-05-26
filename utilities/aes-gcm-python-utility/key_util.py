import base64
import fire as fire
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey
from cryptography.hazmat.primitives import serialization
import logging

class DHKeyPair:
    '''
    DHKeyPair class stores a pair of public_key and private_key.

    Attributes:
        ``private_key`` (string): The Public Key.

        ``public_key`` (string): The Private Key.
    '''

    def __init__(self, private_key, public_key):
        self.private_key = private_key
        self.public_key = public_key

def generate_key_pair():
    '''
        Generate a Keypair

        Returns:
        DHKeyPair: public_key and private_key 
    '''

    keypair= DHKeyPair(None,None)
    try:
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
        private_key = base64.b64encode(bytes_private_key).decode('utf-8')
        public_key = base64.b64encode(bytes_public_key).decode('utf-8')
        keypair.private_key=private_key
        keypair.public_key=public_key
    except Exception as e:
        logging.exception(e)
    
    return keypair

def generate_shared_key(private_key_str, public_key_str):
    '''
        Generates a SharedKey.

        Parameters:

        ``private_key_str`` (string): Private Key of one party.
        
        ``public_key_str`` (string): Public Key of the other party.

        Returns:
        string: shared_key in base64 encoded string format
    '''
    shared_key=None
    try:
        private_key = serialization.load_der_private_key(
                base64.b64decode(private_key_str),
                password=None
        )
        public_key = serialization.load_der_public_key(
            base64.b64decode(public_key_str)
        )
        shared_key = private_key.exchange(public_key)
        shared_key = base64.b64encode(shared_key).decode('utf-8')
    except Exception as e:
        logging.exception(e)
    
    return shared_key
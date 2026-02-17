import unittest
import encryption_util
import key_util


class TestEnc(unittest.TestCase):

    def test_generate_shared_key(self):
        keypair1=key_util.generate_key_pair()
        keypair2=key_util.generate_key_pair()

        # positive testcases
        shared_key1=key_util.generate_shared_key(keypair1.private_key,keypair2.public_key)
        shared_key2=key_util.generate_shared_key(keypair2.private_key,keypair1.public_key)
        self.assertEqual(shared_key1,shared_key2,"must be same")

        #negative testcase
        shared_key2=key_util.generate_shared_key(keypair1.private_key,keypair1.public_key)
        self.assertNotEqual(shared_key1,shared_key2,"should be different")

    def test_encrypt_decrypt(self):
        keypair1=key_util.generate_key_pair()
        keypair2=key_util.generate_key_pair()

        shared_key=key_util.generate_shared_key(keypair1.private_key,keypair2.public_key)
        
        # positive testcases
        raw_data = "Hello This is ONDC Test data"
        encrypted_data=encryption_util.encrypt_data(shared_key,raw_data)
        decrypted_data=encryption_util.decrypt_data(shared_key,encrypted_data)
        self.assertEqual(decrypted_data,raw_data,"decrypted text and raw tax must be same")

        #negative testcase
        invalid_shared_key='YR7XT2fAQR2WSQGf/G/JSLZ+LDuULMdYJI7ZDLGa3H4='
        decrypted_data=encryption_util.decrypt_data(invalid_shared_key,encrypted_data)
        self.assertNotEqual(decrypted_data,raw_data,'should be different')
        
if __name__=='__main__':
    unittest.main()

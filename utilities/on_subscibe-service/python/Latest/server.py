import base64
from nacl.bindings import crypto_sign_ed25519_sk_to_seed
from nacl.signing import SigningKey
from cryptography.hazmat.primitives import serialization
from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import unpad
from flask import Flask, request


app_port = 5556

REQUEST_ID = "your-request-id"
SIGNING_PUBLIC_KEY = "your-signing-public-key"
SIGNING_PRIVATE_KEY = "your-signing-private-key"
ONDC_PUBLIC_KEY = "your-ondc-public-key"
ENC_PUBLIC_KEY = "your-encryption-public-key"
ENC_PRIVATE_KEY = "your-encryption-private-key"


def sign(signing_key, private_key):
    private_key64 = base64.b64decode(private_key)
    seed = crypto_sign_ed25519_sk_to_seed(private_key64)
    signer = SigningKey(seed)
    signed = signer.sign(bytes(signing_key, encoding='utf8'))
    signature = base64.b64encode(signed.signature).decode()
    return signature


def decrypt(enc_public_key, enc_private_key, cipherstring):
    private_key = serialization.load_der_private_key(
        base64.b64decode(enc_private_key),
        password=None
    )
    public_key = serialization.load_der_public_key(
        base64.b64decode(enc_public_key)
    )
    shared_key = private_key.exchange(public_key)
    cipher = AES.new(shared_key, AES.MODE_ECB)
    ciphertxt = base64.b64decode(cipherstring)
    return unpad(cipher.decrypt(ciphertxt), AES.block_size).decode('utf-8')


app = Flask(__name__)


@app.route('/on_subscribe', methods=['POST'])
def onsubscribe():
    data = request.get_json()
    print(f"/on_subscribe called :: Request -> {data}")
    return {
        "answer": decrypt(ONDC_PUBLIC_KEY, ENC_PRIVATE_KEY, data['challenge'])
    }



@app.route('/ondc-site-verification.html', methods=['GET'])
def verify_html():
    signature = sign(REQUEST_ID, SIGNING_PRIVATE_KEY)
    html_content = f'''
    <html>
        <head>
            <meta name="ondc-site-verification" content="{signature}" />
        </head>
        <body>
            ONDC Site Verification Page
        </body>
    </html>
    '''
    return html_content

@app.route('/', methods=['GET'])
def health_check():
    return {"status": "healthy", "message": "Hello World!"}




def start_flask_app():
    app.run(port=app_port, host="0.0.0.0")


if __name__ == '__main__':
    start_flask_app()

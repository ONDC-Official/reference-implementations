<?php
require 'vendor/autoload.php';
use phpseclib3\Crypt\AES;
use Sop\CryptoTypes\Asymmetric\OneAsymmetricKey;
use Sop\CryptoTypes\Asymmetric\PublicKeyInfo;

const ENCRYPTION_PRIVATE_KEY = "ENCRYPTION_PRIVATE_KEY";
const ONDC_PUBLIC_KEY = "MCowBQYDK2VuAyEAduMuZgmtpjdCuxv+Nc49K0cB6tL/Dj3HZetvVN7ZekM=";
const REQUEST_ID = "REQUEST_ID";
const SIGNING_PRIVATE_KEY = "SIGNING_PRIVATE_KEY";

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($request_uri == '/') {
    echo "Hello World!";
} elseif ($request_uri == '/health') {
    echo "Health OK!!";
} elseif ($request_uri == '/on_subscribe' && $_SERVER['REQUEST_METHOD'] == 'POST') {
    handleSubscribe();
} elseif ($request_uri == '/ondc-site-verification.html') {
    serveVerificationFile();
} else {
    http_response_code(404);
    echo "404 Not Found";
}

function handleSubscribe()
{
    $data = json_decode(
        file_get_contents("php://input"),
        null, 512, JSON_OBJECT_AS_ARRAY
    );

    if (!isset($data['challenge'])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing challenge parameter"]);
        return;
    }

    $challenge = $data['challenge'];
    error_log("Received challenge: " . $challenge);
    print_r($data, "data");

    $answer = decryptChallenge(ENCRYPTION_PRIVATE_KEY,ONDC_PUBLIC_KEY,$challenge);
    error_log("Decryption Result: " . $answer);

    header('Content-Type: application/json');
    echo json_encode(["answer" => $answer]);
    return json_encode(["answer" => $answer]);
}

function serveVerificationFile() {
    $signedContent = signMessage(REQUEST_ID, SIGNING_PRIVATE_KEY);
    error_log("HTML file served");
    $html = "<html><head><meta name='ondc-site-verification' content='$signedContent'/></head><body>ONDC Site Verification Page</body></html>";
    
    header('Content-Type: text/html');
    echo $html;
}

function decryptChallenge($crypto_private_key, $crypto_public_key, $cipher_text)
{
    $pkey = OneAsymmetricKey::fromDER(base64_decode($crypto_private_key));
    $pubkey = PublicKeyInfo::fromDER(base64_decode($crypto_public_key));
    $pkey = hex2bin(str_replace("0420", "", bin2hex($pkey->privateKeyData())));

    $shpkey = sodium_crypto_scalarmult($pkey, $pubkey->publicKeyData());

    $cipher = new AES('ecb');
    $cipher->setKey($shpkey);
    $cipher->setKeyLength(256);

    return ($cipher->decrypt(base64_decode($cipher_text)));
}

function signMessage($message, $privateKeyBase64) {
    if (!extension_loaded('sodium')) {
        die("Error: Sodium extension is required.");
    }

    $privateKey = base64_decode($privateKeyBase64);
    if (!$privateKey) {
        die("Error: Invalid private key format.");
    }

    $signature = sodium_crypto_sign_detached($message, $privateKey);
    return base64_encode($signature);
}

?>

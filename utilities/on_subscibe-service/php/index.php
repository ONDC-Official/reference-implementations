<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use phpseclib3\File\ASN1;
use phpseclib3\Crypt\DH;
use phpseclib3\Crypt\PublicKeyLoader;


require 'vendor/autoload.php';

$app = AppFactory::create();


const REQUEST_ID = "ba2e36c6-93eb-11ee-b9d1-0242ac120002";
const SIGNING_PRIVATE_KEY = "gdmqdQZhls8XT8EPL6PZl2y+vzm4pGHq6vTw2VnRG92EBka024G3DaG5LRIrR1cQ5UkTYO+KrNUAORcZ4msEeA==";
const CRYPTO_PRIVATE_KEY = "MC4CAQAwBQYDK2VuBCIEICDZIYrj/hzaGBEveyxlwaCrR+ZVMjkVIgHpTnaxMU1/";
const ONDC_PUBLIC_KEY = "MCowBQYDK2VuAyEAduMuZgmtpjdCuxv+Nc49K0cB6tL/Dj3HZetvVN7ZekM="; // Dont change this for staging

function verification_html($signed_request_id)
{
  return
    "<!--Contents of ondc-site-verification.html. -->
<!--Please replace {$signed_request_id} with an actual value-->
<html>
  <head>
    <meta
      name=\"ondc-site-verification\"
      content=\"{$signed_request_id}\"
    />
  </head>
  <body>
    ONDC Site Verification Page
  </body>
</html>";
}
function sign_message()
{
  $bin_private_key = sodium_base642bin(SIGNING_PRIVATE_KEY, SODIUM_BASE64_VARIANT_ORIGINAL);
  $bin_message = sodium_crypto_sign_detached(REQUEST_ID, $bin_private_key);
  return sodium_bin2base64($bin_message, SODIUM_BASE64_VARIANT_ORIGINAL);
}

$app->addBodyParsingMiddleware();

$app->get('/', function (Request $request, Response $response, $args) {
  $response->getBody()->write("Health Ok");
  return $response;
});

$app->post('/on_subscribe', function (Request $request, Response $response, $args) {
  // Create on_sub here
});

$app->get('/ondc-site-verification.html', function (Request $request, Response $response, $args) use ($app) {
  $html_response = verification_html(sign_message());
  $response->getBody()->write($html_response);
  return $response->withHeader('Content-Length', strlen($html_response))->withHeader('Content-Type', 'text/html; charset=utf-8');
});

$app->run();
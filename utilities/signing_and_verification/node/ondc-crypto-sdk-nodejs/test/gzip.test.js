/*
 * Round-trip tests for the gzip (raw-bytes) signing/verification functions.
 * Run with `npm test` (builds to lib/ first, then runs this).
 *
 * Uses a throwaway ed25519 keypair generated at runtime; no real keys needed.
 */
const assert = require('assert');
const zlib = require('zlib');
const _sodium = require('libsodium-wrappers');
const {
  createGzipAuthorizationHeader,
  isGzipHeaderValid,
  isHeaderValid,
} = require('../lib');

(async () => {
  await _sodium.ready;
  const sodium = _sodium;

  const kp = sodium.crypto_sign_keypair();
  const privateKey = sodium.to_base64(kp.privateKey, sodium.base64_variants.ORIGINAL);
  const publicKey = sodium.to_base64(kp.publicKey, sodium.base64_variants.ORIGINAL);

  const payload = JSON.stringify({ context: { action: 'search', bap_id: 'buyer.example.com' } });
  const compressedBody = zlib.gzipSync(Buffer.from(payload));

  const header = await createGzipAuthorizationHeader({
    compressedBody,
    privateKey,
    subscriberId: 'buyer.example.com',
    subscriberUniqueKeyId: 'key-1',
  });

  // 1. valid signature over the compressed body verifies
  assert.strictEqual(
    await isGzipHeaderValid({ header, compressedBody, publicKey }),
    true,
    'valid gzip signature should verify',
  );

  // 2. a tampered compressed body is rejected
  const tampered = Buffer.from(compressedBody);
  tampered[tampered.length - 1] ^= 0xff;
  assert.strictEqual(
    await isGzipHeaderValid({ header, compressedBody: tampered, publicKey }),
    false,
    'tampered body should be rejected',
  );

  // 3. a wrong public key is rejected
  const other = sodium.crypto_sign_keypair();
  const otherPublicKey = sodium.to_base64(other.publicKey, sodium.base64_variants.ORIGINAL);
  assert.strictEqual(
    await isGzipHeaderValid({ header, compressedBody, publicKey: otherPublicKey }),
    false,
    'wrong key should be rejected',
  );

  // 4. the string-based isHeaderValid cannot verify a signature made over
  //    compressed bytes — this is why the gzip variant exists.
  assert.strictEqual(
    await isHeaderValid({ header, body: compressedBody.toString('binary'), publicKey }),
    false,
    'legacy string-based verify should fail on binary body',
  );

  console.log('gzip signing/verification tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});

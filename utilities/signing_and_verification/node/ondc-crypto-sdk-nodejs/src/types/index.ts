export interface ICreateSigningString {
  message: string;
  created?: string;
  expires?: string;
}

export interface ISignMessage {
  signingString: string;
  privateKey: string;
}

export interface GenericObject {
  [key: string]: any;
}

export interface IVerifyMessage {
  signedString: string;
  signingString: string;
  publicKey: string;
}

export interface IHeaderParts {
  expires: string;
  created: string;
  keyId: string;
  signature: string;
  [key: string]: any;
}

export interface IVerifyHeader {
  headerParts: IHeaderParts;
  body: string;
  publicKey: string;
}

export interface IsHeaderValid {
  header: string;
  body: string;
  publicKey: string;
}
export interface ICreateAuthorizationHeader {
  body: string;
  privateKey: string;
  subscriberId: string;
  subscriberUniqueKeyId: string;
  expires?: string;
  created?: string;
}

export interface CreateVLookupSignature {
  country: string;
  domain: string;
  type: string;
  city: string;
  subscriber_id: string;
  privateKey: string;
}

/**
 * Gzip (raw-bytes) variants. These accept the already-compressed body as a
 * Uint8Array/Buffer and hash the raw bytes directly — unlike the string-based
 * interfaces above, they never UTF-8 re-encode the body, so binary (gzip)
 * payloads are signed/verified intact.
 */
export interface ICreateGzipSigningString {
  compressedBody: Uint8Array;
  created?: string;
  expires?: string;
}

export interface ICreateGzipAuthorizationHeader {
  compressedBody: Uint8Array;
  privateKey: string;
  subscriberId: string;
  subscriberUniqueKeyId: string;
  expires?: string;
  created?: string;
}

export interface IVerifyGzipHeader {
  headerParts: IHeaderParts;
  compressedBody: Uint8Array;
  publicKey: string;
}

export interface IsGzipHeaderValid {
  header: string;
  compressedBody: Uint8Array;
  publicKey: string;
}

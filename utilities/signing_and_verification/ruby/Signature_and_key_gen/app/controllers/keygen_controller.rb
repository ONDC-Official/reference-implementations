class KeygenController < ApplicationController
    def generate_key_pairs
      # Generate signing keys (Ed25519)
      signing_key_pair = RbNaCl::SigningKey.generate
      signing_private_key = Base64.strict_encode64(signing_key_pair.to_bytes)
      signing_public_key = Base64.strict_encode64(signing_key_pair.verify_key.to_bytes)
  
      # Generate encryption keys (X25519)
      encryption_private_key = RbNaCl::PrivateKey.generate
      encryption_public_key = encryption_private_key.public_key
  
      # Response JSON
      render json: {
        Signing_private_key: signing_private_key,
        Signing_public_key: signing_public_key,
        Encryption_Privatekey: Base64.strict_encode64(encryption_private_key.to_bytes),
        Encryption_Publickey: Base64.strict_encode64(encryption_public_key.to_bytes)
      }, status: :ok
    end
  end
  
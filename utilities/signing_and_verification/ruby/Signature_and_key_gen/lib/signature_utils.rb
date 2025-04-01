require 'rbnacl'
require 'base64'
require 'time'

class SignatureUtils
  def self.create_signing_string(message:, created: nil, expires: nil)
    created ||= Time.now.to_i.to_s
    expires ||= (created.to_i + 3600).to_s

    digest = RbNaCl::Hash.blake2b(message, digest_size: 64)
    digest_base64 = Base64.strict_encode64(digest)

    signing_string = "(created): #{created}\n(expires): #{expires}\ndigest: BLAKE-512=#{digest_base64}"
    
    { signing_string: signing_string, created: created, expires: expires }
  end

  def self.sign_message(signing_string:, private_key:)
    private_key_bytes = Base64.decode64(private_key)
    signing_key = RbNaCl::SigningKey.new(private_key_bytes)
    
    signature = signing_key.sign(signing_string)
    Base64.strict_encode64(signature)
  end

  def self.create_authorization_header(body:, private_key:, subscriber_id:, subscriber_unique_key_id:, expires: nil, created: nil)
    signing_data = create_signing_string(message: body, created: created, expires: expires)
    signature = sign_message(signing_string: signing_data[:signing_string], private_key: private_key)
    
    "Signature keyId=\"#{subscriber_id}|#{subscriber_unique_key_id}|ed25519\",algorithm=\"ed25519\",created=\"#{signing_data[:created]}\",expires=\"#{signing_data[:expires]}\",headers=\"(created) (expires) digest\",signature=\"#{signature}\""
  end

  def self.split_auth_header(auth_header)
    header = auth_header.sub('Signature ', '')
    parts = {}
    
    header.scan(/\s*([^=]+)=([^,]+)[,]?/).each do |key, value|
      parts[key] = value.gsub(/^\"|\"$/, '')
    end
    
    parts
  end

  def self.verify_message(signed_string:, signing_string:, public_key:)
    begin
      public_key_bytes = Base64.decode64(public_key)
      verify_key = RbNaCl::VerifyKey.new(public_key_bytes)
      signature_bytes = Base64.decode64(signed_string)
      
      verify_key.verify(signature_bytes, signing_string)
      true
    rescue RbNaCl::CryptoError
      false
    end
  end

  def self.verify_header(header_parts:, body:, public_key:)
    signing_data = create_signing_string(message: body, created: header_parts['created'], expires: header_parts['expires'])
    verify_message(signed_string: header_parts['signature'], signing_string: signing_data[:signing_string], public_key: public_key)
  end

  def self.is_header_valid(header:, body:, public_key:)
    begin
      header_parts = split_auth_header(header)
      verify_header(header_parts: header_parts, body: body, public_key: public_key)
    rescue
      false
    end
  end
end

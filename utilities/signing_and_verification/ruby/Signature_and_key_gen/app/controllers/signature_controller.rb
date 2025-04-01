require 'rbnacl'
require 'base64'
require 'time'

class SignatureController < ApplicationController
  # POST /generate_header
  def generate_header
    body = params[:body]
    private_key = params[:private_key]
    subscriber_id = params[:subscriber_id]
    subscriber_unique_key_id = params[:subscriber_unique_key_id]

    if body.blank? || private_key.blank? || subscriber_id.blank? || subscriber_unique_key_id.blank?
      return render plain: 'Missing parameters', status: :bad_request
    end

    header = SignatureUtils.create_authorization_header(
      body: body,
      private_key: private_key,
      subscriber_id: subscriber_id,
      subscriber_unique_key_id: subscriber_unique_key_id
    )

    render plain: header
  end

  # POST /verify_signature
  def verify_signature
    body = params[:body]
    header = request.headers['Authorization']
    public_key = params[:public_key]

    if header.blank? || public_key.blank?
      return render plain: 'Missing authorization header or public key', status: :bad_request
    end

    is_valid = SignatureUtils.is_header_valid(header: header, body: body, public_key: public_key)

    render plain: is_valid ? 'Signature is valid' : 'Invalid signature'
  end
end

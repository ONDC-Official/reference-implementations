Rails.application.routes.draw do
  # Reveal health status on /up
  get "up" => "rails/health#show", as: :rails_health_check

  # Health check route
  get '/health', to: 'health#health'


  get "/generate_keys", to: "keygen#generate_key_pairs"

  post '/generate_header', to: 'signature#generate_header'
  post '/verify_signature', to: 'signature#verify_signature'
 

  # Defines the root path route ("/")
  # root "posts#index"
end

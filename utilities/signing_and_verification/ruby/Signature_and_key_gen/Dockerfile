# Use an official Ruby image as the base
FROM ruby:3.2

# Set the working directory
WORKDIR /app

# Install dependencies
# RUN apt-get update && apt-get install -y libsodium23
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client libsodium23

# Install Bundler
RUN gem install bundler

# Copy the Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install --binstubs

# Copy the application code
COPY . .

# Ensure Rails is available in PATH
ENV PATH="/app/bin:$PATH"

# Expose the application port
EXPOSE 3000

# Start the Rails server
CMD ["bin/rails", "server", "-b", "0.0.0.0"]

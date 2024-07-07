source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.4"

gem "rails", "~> 7.1.3"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 6.4"

gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

gem "bootsnap", require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem "rack-cors"

group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem "sqlite3", "~> 1.4", group: [:development, :test]
end

group :production do
  gem "pg", "~> 1.5"
end

gem 'devise'
gem 'devise_token_auth'
gem 'devise-i18n'
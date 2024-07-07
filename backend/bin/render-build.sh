#!/usr/bin/env bash
# exit on error
set -o errexit

#gem install bundler -v 2.5.14
bundle install --without development test
bundle exec rake db:migrate
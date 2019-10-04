FROM jekyll/builder:latest
COPY Gemfile .
RUN bundle install

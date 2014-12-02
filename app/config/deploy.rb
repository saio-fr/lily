set :stages,        %w(prod1 prod2 ws1)
set :default_stage, "prod1"
set :stage_dir,     "app/config/deploy"
require 'capistrano/ext/multistage'
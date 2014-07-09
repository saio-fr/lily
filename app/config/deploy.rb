set :stages,        %w(prod1 prod2)
set :default_stage, "prod2"
set :stage_dir,     "app/config"
require 'capistrano/ext/multistage'
set :application, "saio"
set :domain,      "staging.#{application}.fr"
set :deploy_to,   "/var/www/vhosts/saio.fr/#{domain}"
set :app_path,    "app"

set :repository,  "git@github.com:saio-fr/lily.git"
set :scm,         :git
set :branch,      "develop"

# Or: `accurev`, `bzr`, `cvs`, `darcs`, `subversion`, `mercurial`, `perforce`, or `none`

set :model_manager, "doctrine"
# Or: `propel`

role :web,        domain                         # Your HTTP server, Apache/etc
role :app,        domain, :primary => true       # This may be the same as your `Web` server

set :keep_releases,  3
set :shared_files,      ["app/config/parameters_staging.yml"]
set :shared_children,     ["vendor"]
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitmodules", "Capfile", "config/deploy"]
set :use_composer, true
set :update_vendors, true
set :symfony_env_prod, "staging"
set :clear_controllers, false

set :user, "saio"
set :use_sudo, false
set :ssh_options, {:forward_agent => true}

# perform tasks after deploying
after "deploy" do
  # dump assets (if using assetic)
  run "cd #{deploy_to}/current && php app/console assetic:dump --env=staging"

  # update node modules
  run "cd #{deploy_to}/current && npm install"

  # update bower components
  run "cd #{deploy_to}/current && bower update"

  # build project
  run "cd #{deploy_to}/current && ./node_modules/.bin/grunt build"

  # clear the cache
  run "cd #{deploy_to}/current && php app/console cache:clear --env=staging"

  # clear memcache
  run "cd #{deploy_to}/current && php app/console cache:flush default --env=staging"
end

namespace :ws do
  task :stop do
    # clear the cache
    run "sudo supervisorctl stop staging_ws_log"
    run "sudo supervisorctl stop staging_ws_server"
  end
  task :start do
    # clear the cache
    run "sudo supervisorctl start staging_ws_server"
    run "sudo supervisorctl start staging_ws_log"
  end
end

task :upload_parameters do
  origin_file = "app/config/parameters_staging.yml"
  destination_file = shared_path + "/app/config/parameters_staging.yml" # Notice the
  shared_path

  try_sudo "mkdir -p #{File.dirname(destination_file)}"
  top.upload(origin_file, destination_file)
end

after "deploy:setup", "upload_parameters"
after "deploy", "deploy:cleanup"
after "deploy", "ws:stop"
after "ws:stop", "ws:start"

# Be more verbose by uncommenting the following line
 logger.level = Logger::MAX_LEVEL

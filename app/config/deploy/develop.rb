set :application, "saio"
set :domain,      "develop.#{application}.fr"
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
set :shared_files,      ["app/config/parameters.yml", "app/config/parameters_dev.yml"]
set :shared_children,     ["vendor"]
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitmodules", "Capfile", "config/deploy"]
set :use_composer, true
set :update_vendors, true
set :clear_controllers, false

set :user, "saio"
set :use_sudo, false
set :ssh_options, {:forward_agent => true}

# perform tasks after deploying
after "deploy" do
  # clear the cache
  run "cd /var/www/vhosts/saio.fr/#{domain}/current && php app/console cache:clear"

  # dump assets (if using assetic)
  run "cd /var/www/vhosts/saio.fr/#{domain}/current && php app/console assetic:dump"
  
  # update bower components
  run "cd /var/www/vhosts/saio.fr/#{domain}/current && bower update"
  
end

task :upload_parameters do
  origin_file = "app/config/parameters_dev.yml"
  destination_file = shared_path + "/app/config/parameters_dev.yml" # Notice the
  shared_path

  try_sudo "mkdir -p #{File.dirname(destination_file)}"
  top.upload(origin_file, destination_file)
end

after "deploy:setup", "upload_parameters"
after "deploy", "deploy:cleanup"

# Be more verbose by uncommenting the following line
 logger.level = Logger::MAX_LEVEL
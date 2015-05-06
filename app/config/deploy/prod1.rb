set :application, "saio"
set :domain,      "prod1.#{application}.fr"
set :deploy_to,   "/var/www/vhosts/saio.fr/httpdocs"
set :app_path,    "app"

set :repository,  "git@github.com:saio-fr/lily.git"
set :scm,         :git
set :branch,      "master"

# Or: `accurev`, `bzr`, `cvs`, `darcs`, `subversion`, `mercurial`, `perforce`, or `none`

set :model_manager, "doctrine"
# Or: `propel`

role :web,        domain                         # Your HTTP server, Apache/etc
role :app,        domain, :primary => true       # This may be the same as your `Web` server

set :keep_releases,  3
set :shared_files,      ["app/config/parameters.yml"]
set :shared_children,     ["vendor"]
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitmodules", "Capfile", "config/deploy"]
set :use_composer, true
set :update_vendors, true

set :user, "saio"
set :use_sudo, false
set :ssh_options, {:forward_agent => true}

# perform tasks after deploying
after "deploy" do
  # clear the cache
  run "cd /var/www/vhosts/saio.fr/httpdocs/current && php app/console cache:clear --env=prod"

  # dump assets (if using assetic)
  run "cd /var/www/vhosts/saio.fr/httpdocs/current && php app/console assetic:dump --env=prod"
  
  # update bower components
  run "cd /var/www/vhosts/saio.fr/httpdocs/current && bower update"
  
end

namespace :ws do
  task :stop do
    # clear the cache
    run "sudo supervisorctl stop wslog"
    run "sudo supervisorctl stop wsserver"
  end
  task :start do
    # clear the cache
    run "sudo supervisorctl start wsserver"
    run "sudo supervisorctl start wslog"
  end
end

namespace :home do
  task :stop do
    # clear the cache
    run "sudo supervisorctl stop homepage"
  end
  task :start do
    # clear the cache
    run "cd /var/www/vhosts/saio.fr/httpdocs && rm -Rf homepage"
    run "cd /var/www/vhosts/saio.fr/httpdocs && git clone git@github.com:saio-fr/homepage.git"
    run "cd /var/www/vhosts/saio.fr/httpdocs/homepage && npm install"
    run "sudo supervisorctl start homepage"
  end
end

task :clear_opcache do
	opcache_file = "#{deploy_to}/current/opcache-clear.php"
	put "<?php opcache_reset(); ?>", opcache_file, :mode => 0644
	run "cd #{deploy_to}/current && php opcache-clear.php"
end

task :upload_parameters do
  origin_file = "app/config/parameters.yml"
  destination_file = shared_path + "/app/config/parameters.yml" # Notice the
  shared_path

  try_sudo "mkdir -p #{File.dirname(destination_file)}"
  top.upload(origin_file, destination_file)
end

after "deploy:setup", "upload_parameters"
after "deploy", "deploy:cleanup"
after "deploy", "clear_opcache"

# Be more verbose by uncommenting the following line
 logger.level = Logger::MAX_LEVEL
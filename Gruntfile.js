/*global module:false*/
'use strict';

var config = require('./buildConfig');

var _config =  {
  front:        config.mix('front'),
  common:       config.mix('common'),
  chatComp:     config.mix('chatComp'),
  dashboard:    config.mix('dashboard'),
  config:       config.mix('config'),
  chat:         config.mix('chat'),
  faq:          config.mix('faq'),
  knowledge:    config.mix('knowledge'),
  profile:      config.mix('profile'),
  users:        config.mix('users'),
  statistics:   config.mix('statistics'),
  redirection:  config.mix('redirection')
};

function getRequireConf() {
  var returnObj = {};
  Object.keys(_config).forEach(function(key) {
    returnObj[key] = {
       compile: {
        options: _config[key]
      }
    };
  });
  return returnObj;
}

var requirejsConf = getRequireConf();

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    requireMulti: requirejsConf,

    clean: {
      release: 'js-build'
    },

    requirejs: {
      compile: {
        options: '<%= moduleConf %>'
      }
    },

    cssmin: {
      compile: {
        files: {
          cwd: 'web/css',
        }
      }
    }
  });

  // Load tasks from NPM
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerMultiTask('requireMulti', 'Run require optimizer across the project', function() {
    grunt.log.write('\nCompiling ' + this.target + '\n');
    grunt.config.set('moduleConf', this.data.compile.options);
    grunt.task.run('requirejs');
  });

  // Default task.
  grunt.registerTask('default', ['requireMulti']);


};

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

// Format for grunt task config.
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
      release: 'web/js-build'
    },

    jshint: {
      all: [
        'gruntfile.js',
        'web/js/**/*.js',
        '!web/js/bower_components/**/*.js',
        '!web/js/libs/**/*.js',
        '!web/js/utils/**/*.js',
        '!web/js/ie/**/*.js',
        '!web/js/facebook/**/*.js'
      ],
      options: {
        // options here to override JSHint defaults
        jshintrc: '.jshintrc',
      }
    },

    requirejs: {
      compile: {
        options: '<%= moduleConf %>'
      }
    },

    // Let's not use css tasks for now, until we have
    // a proper build folder for assets (images, fonts, css && js)
    cssmin: {
      compile: {
        files: {
          cwd: 'web/css',
        }
      }
    },

    autoprefixer: {
      options: {
        // We need to `freeze` browsers versions for testing purposes.
        browsers: ['last 2 versions', '> 5%', 'IE 10', 'ChromeAndroid > 1', 'iOS > 6', 'Android >  4'],
        expand: true,
        flatten: true,
        src: 'web/css/**/*.css',
      }
    },

    hashres: {
      // Global options
      options: {
        // Optional. Encoding used to read/write files. Default value 'utf8'
        encoding: 'utf8',
        // Optional. Format used to name the files specified in 'files' property.
        // Default value: '${hash}.${name}.cache.${ext}'
        fileNameFormat: '${name}.${ext}?${hash}',
        // Optional. Should files be renamed or only alter the references to the files
        // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files
        // Default value: true
        renameFiles: false
      },
      // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
      prod: {
        options: {
          rename: true
        },
        // Files to hash
        src: [
          // WARNING: These files will be renamed!
          'web/js-build/chat/main.js',
          'web/js-build/config/main.js',
          'web/js-build/dashboard/main.js',
          'web/js-build/faq/main.js',
          'web/js-build/front/main.js',
          'web/js-build/knowledge/main.js',
          'web/js-build/profile/main.js',
          'web/js-build/redirection/main.js',
          'web/js-build/statistics/main.js',
          'web/js-build/users/main.js',
          'web/js-build/common.js',
          'web/js-build/chatComp.js'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: [
          'src/Lily/AppBundle/Resources/views/themes/lily/index.html.twig',
          'src/Lily/ChatBundle/Resources/views/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Config/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Dashboard/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Faq/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Redirections/index.html.twig',
          'src/Lily/KnowledgeBundle/Resources/views/index.html.twig',
          'src/Lily/StatisticsBundle/Resources/views/Statistics/index.html.twig',
          'src/Lily/UserBundle/Resources/views/Profile/index.html.twig',
          'src/Lily/UserBundle/Resources/views/Admin/index.html.twig'
        ]
      },

      // For dev env to work (require to match the appropriate files), clean up all hash in paths.
      dev: {
        options: {
          fileNameFormat: '${name}.${ext}',
          rename: true
        },
        // Files to hash
        src: [
          // WARNING: These files will be renamed!
          'web/js/backoffice/chat/main.js',
          'web/js/backoffice/config/main.js',
          'web/js/backoffice/dashboard/main.js',
          'web/js/backoffice/faq/main.js',
          'web/js/backoffice/front/main.js',
          'web/js/backoffice/knowledge/main.js',
          'web/js/backoffice/profile/main.js',
          'web/js/backoffice/redirection/main.js',
          'web/js/backoffice/statistics/main.js',
          'web/js/backoffice/users/main.js',
          'web/js/backoffice/common.js',
          'web/js/backoffice/chatComp.js',
          'web/js-build/chat/main.js',
          'web/js-build/config/main.js',
          'web/js-build/dashboard/main.js',
          'web/js-build/faq/main.js',
          'web/js-build/front/main.js',
          'web/js-build/knowledge/main.js',
          'web/js-build/profile/main.js',
          'web/js-build/redirection/main.js',
          'web/js-build/statistics/main.js',
          'web/js-build/users/main.js',
          'web/js-build/common.js',
          'web/js-build/chatComp.js'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: [
          'src/Lily/AppBundle/Resources/views/themes/Lily/index.html.twig', 
          'src/Lily/ChatBundle/Resources/views/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Config/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Dashboard/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Faq/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Redirections/index.html.twig',
          'src/Lily/KnowledgeBundle/Resources/views/index.html.twig',
          'src/Lily/StatisticsBundle/Resources/views/Statistics/index.html.twig',
          'src/Lily/UserBundle/Resources/views/Profile/index.html.twig',
          'src/Lily/UserBundle/Resources/views/Admin/index.html.twig'
        ]
      },
    }
  });

  // Load tasks from NPM
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-hashres');

  // requirejs is not a multi task. Emulate that by running requirejs task for each module in config
  // or one by one using multi task format (ex: grunt requireMulti:front)
  grunt.registerMultiTask('requireMulti', 'Run require optimizer across the project', function() {
    grunt.log.write('\nCompiling ' + this.target + '\n');
    grunt.config.set('moduleConf', this.data.compile.options);
    grunt.task.run('requirejs');
  });

  grunt.registerTask('check', ['jshint']);
  grunt.registerTask('cacheBust', ['hashres:prod']);
  grunt.registerTask('cleanDevRefs', ['hashres:dev']);

  grunt.registerTask('dev', ['clean', 'cleanDevRefs']);

  // Default task. Compile all modules
  grunt.registerTask('build', ['clean', 'requireMulti', 'cacheBust']);
  grunt.registerTask('buildFront', ['requireMulti:front', 'cacheBust']);
  grunt.registerTask('buildChat', ['requireMulti:chatComp', 'cacheBust']);
  grunt.registerTask('buildLibs', ['requireMulti:common', 'cacheBust']);
  grunt.registerTask('buildBo', [
    'requireMulti:chat',
    'requireMulti:config',
    'requireMulti:dashboard',
    'requireMulti:profile',
    'requireMulti:statistics',
    'requireMulti:knowledge',
    'requireMulti:users',
    'requireMulti:faq',
    'cacheBust'
  ]);
};

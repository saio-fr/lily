/////////////
// JsHint: //
/////////////
/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'gruntfile.js'
      },
      sourcefiles: {
        src: ['src/**/*.js', '!src/app/bower_components/**/*.js']
      }
    },

    requirejs: {

      options: {
        'appDir': 'src',
        'dir': 'build',
        'mainConfigFile': 'src/common.js',
        'optimize': 'uglify2',
        'normalizeDirDefines': 'skip',
        'skipDirOptimize': true,
      },

      independentAlmond: {
        options: {
          almond: true,
          wrap: true,
          replaceRequireScript: [{
            files: ['build/hello.html'],
            module: 'app/hello/main',
            modulePath: 'app/hello/main'
          }, {
            files: ['build/world.html'],
            module: 'app/world/main',
            modulePath: 'app/world/main'
          }],
          'modules': [{
            name: 'app/hello/main',
            include: ['backbone'],
            insertRequire: ['app/hello/main']
          }, {
            name: 'app/world/main',
            include: ['backbone'],
            insertRequire: ['app/world/main']
          }]
        }
      },

      shared: {
        options: {
          'modules': [{
            'name': 'common',
            'include': ['jquery',
              'underscore',
              'backbone',
              'text',
            ]
          }, {
            'name': 'app/hello/main',
            'exclude': ['common']
          }, {
            'name': 'app/world/main',
            'exclude': ['common']
          }]
        }
      }
    },

    requirejs: {
      compile: {

        // !! You can drop your app.build.js config wholesale into 'options'
        options: {
          appDir: "src/",
          baseUrl: ".",
          dir: "target/",
          optimize: 'uglify',
          mainConfigFile: './src/main.js',
          modules: [
            {
              name: 'MyModule'
            }
          ],
          logLevel: 0,
          findNestedDependencies: true,
          fileExclusionRegExp: /^\./,
          inlineText: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-requirejs');

  // Default task.
  grunt.registerTask('default', ['jshint']);
};

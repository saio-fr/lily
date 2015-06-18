'use strict';

module.exports = function(grunt) {

  // measures the time each task takes
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    env: process.env,

    requirejs: {
      compile: {
        options: {

        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint']);
};

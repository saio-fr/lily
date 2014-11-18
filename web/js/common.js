require.config({
  baseUrl: '.',
  paths: {
    'jquery': 'bower_components/jquery/jquery.min',
    'backbone': 'bower_components/backbone/backbone-min',
    'underscore': 'bower_components/underscore/underscore-min',
    'js': '.',
    'common': 'common'
  },
  shim: {
    backbone: {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    }
  },
  deps: ['bower_components/require/require'],
  callback: function(require) {
    'use strict';

    var filename = location.pathname.match(/\/([^\/]*)$/),
        modulename;

    if (filename && filename[1] !== '') {
      modulename = ['app', filename[1].split('.')[0], 'main']
      .join('/');

      require([modulename]);
    } else {
      if (window.console) {
        console.log('no modulename found via location.pathname');
      }
    }
  }
});

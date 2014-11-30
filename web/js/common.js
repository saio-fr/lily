require.config({
  baseUrl: '.',
  paths: {
    'jquery': '../bower_components/jquery/jquery.min',
    'backbone': '../bower_components/backbone/backbone-min',
    'underscore': '../bower_components/underscore/underscore-min',
    'js': '.',
    'common': 'common'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    }
  },
  deps: ['']
});

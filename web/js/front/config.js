'use strict';

require.config({

  baseUrl: '/js',
  // urlArgs: 'v' + config.version,
  waitSeconds: 20,

  paths: {
    // 'main':          'front/main',
    // 'front/app':           'front/app',
    'FastClick':     'bower_components/fastclick/lib/fastclick',
    'Modernizr':     'libs/modernizr-custom',
    'Snap':          'bower_components/snapjs/snap',
    'autobahn':      'libs/autobahn-v1',
    'backbone':      'bower_components/backbone/backbone',
    'front/globals':       'front/globals',
    'isMobile':      'bower_components/isMobile/isMobile',
    'jquery':        'bower_components/jquery/dist/jquery',
    'moment':        'bower_components/moment/moment',
    'moment-fr':     'bower_components/moment/locale/fr',
    'polyfils':      'utils/polyfils',
    'underscore':    'bower_components/underscore/underscore',
    'when':          'libs/when',
    'synapse':       'libs/synapse-suggest',
    'typeahead':     'libs/typeahead.jquery',
    'bloodhound':    'libs/bloodhound',
  },

  shim: {

    'moment-fr': ['moment'],
    'Modernizr': {
      'exports': 'Modernizr'
    },
    'autobahn': {
      'deps': ['when'],
      'exports': 'ab'
    },
    'backbone': {
      'deps': ['underscore', 'jquery'],
      'exports': 'Backbone'
    },
    'underscore': {
      'exports': '_'
    },
    'typeahead': {
      deps: ['jquery'],
      exports: 'typeahead'
    },
    'bloodhound': {
      deps: ['jquery'],
      exports: 'Bloodhound'
    },
    'Snap': {
      exports: 'Snap'
    },
    'isMobile': {
      exports: 'isMobile'
    },
    'synapse': {
      deps: ['jquery', 'typeahead', 'bloodhound'],
      exports: 'SynapseSuggest'
    }

  }
});

require(['front/main']);

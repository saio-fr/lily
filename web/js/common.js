require.config({

  baseUrl: '/js',
  waitSeconds: 20,

  paths: {

    'FastClick':                      'bower_components/fastclick/lib/fastclick',
    'Modernizr':                      'libs/modernizr-custom',
    'Snap':                           'bower_components/snapjs/snap',
    'autobahn':                       'libs/autobahn-v1',
    'backbone':                       'bower_components/backbone/backbone',
    'backbone-nested':                'bower_components/backbone-nested-model/backbone-nested',
    'backbone-localStorage':          'bower_components/backbone.localStorage/backbone.localStorage',
    'backbone-validation':            'bower_components/backbone-validation/dist/backbone-validation',
    'bootstrap':                      'bower_components/bootstrap/dist/js/bootstrap',
    'bootstrap-wysihtml5':            'wysiwyg/bootstrap-wysihtml5',
    'daterangepicker':                'bower_components/bootstrap-daterangepicker/daterangepicker',
    'easypiechart':                   'bower_components/easypie/dist/jquery.easypiechart',
    'flot':                           'bower_components/flot.tooltip/js/jquery.flot',
    'flot-pie':                       'bower_components/flot/jquery.flot.pie',
    'flot-resize':                    'bower_components/flot/jquery.flot.resize',
    'flot-time':                      'bower_components/flot/jquery.flot.time',
    'flot-tooltip':                   'bower_components/flot.tooltip/js/jquery.flot.tooltip',
    'config':                        'backoffice/config',
    'isMobile':                       'bower_components/isMobile/isMobile',
    'jquery':                         'bower_components/jquery/dist/jquery',
    'moment':                         'bower_components/moment/moment',
    'moment-fr':                      'bower_components/moment/locale/fr',
    'morris':                         'bower_components/morrisjs/morris',
    'polyfils':                       'utils/polyfils',
    'raphael':                        'bower_components/raphael/raphael',
    'sortable':                       'bower_components/html5sortable/jquery.sortable',
    'statistics':                     'utils/statistics-flot',
    'statistics-flot':                'utils/statistics-flot',
    'statistics-morris':              'utils/statistics-morris',
    'todoTpl':                        'libs/todo',
    'underscore':                     'bower_components/underscore/underscore',
    'when':                           'libs/when',
    'wysihtml5':                      'bower_components/wysihtml5/dist/wysihtml5-0.3.0',
    'wysihtml5-parser':               'bower_components/wysihtml5/parser_rules/advanced',
    'scribe':                         'bower_components/scribe/scribe',
    'scribe-plugin-toolbar' :         'bower_components/scribe-plugin-toolbar/scribe-plugin-toolbar',
    'scribe-plugin-smart-lists':      'bower_components/scribe-plugin-smart-lists/scribe-plugin-smart-lists',
    'scribe-plugin-heading-command':  'bower_components/scribe-plugin-heading-command/scribe-plugin-heading-command',
    'scribe-plugin-shell-command':    'components/chat/utils/scribe-plugin-shell-command',
    'scribe-plugin-sanitizer':        'bower_components/scribe-plugin-sanitizer/scribe-plugin-sanitizer',
    'interact':                       'bower_components/interact/interact',
    'synapse':                        'libs/synapse-suggest',
    'typeahead':                      'libs/typeahead.jquery',
    'bloodhound':                     'libs/bloodhound',
    'pikaday':                        'bower_components/pikaday/pikaday',
  },

  shim: {

    'backbone-validation': ['backbone'],
    'bootstrap': ['jquery'],
    'bootstrap-wysihtml5': ['wysihtml5', 'bootstrap'],
    'daterangepicker': ['jquery', 'bootstrap', 'moment'],
    'easypiechart': ['jquery'],
    'flot': ['jquery'],
    'flot-pie': ['flot'],
    'flot-resize': ['flot'],
    'flot-time': ['flot'],
    'flot-tooltip': ['flot'],
    'moment-fr': ['moment'],
    'morris': ['raphael'],
    'sortable': ['jquery'],
    'todoTpl': ['jquery', 'bootstrap'],
    'validator': ['jquery'],
    'backbone-localStorage': ['backbone'],

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
    'backbone-nested': {
      'deps': ['backbone'],
      'exports': 'Backbone.NestedModel'
    },
    'underscore': {
      'exports': '_'
    },
    'wysihtml5': {
      'deps': ['wysihtml5-parser'],
      'exports': 'wysihtml5'
    },
    'quill': {
      'exports': 'Quill'
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

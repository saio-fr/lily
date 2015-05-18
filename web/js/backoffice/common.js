require.config({

  "baseUrl": "/js",
  "urlArgs": "v=1",

  "paths": {

    "FastClick": "bower_components/fastclick/lib/fastclick",
    "Modernizr": "app/libs/modernizr-custom",
    "Snap": "bower_components/snapjs/snap",
    "app": "backoffice/app",
    "autobahn": "vendor/autobahn-v1",
    "backbone": "bower_components/backbone/backbone",
    "backbone-nested": "bower_components/backbone-nested-model/backbone-nested",
    "backbone-localStorage": "bower_components/backbone.localStorage/backbone.localStorage",
    "backbone-validation": "bower_components/backbone-validation/dist/backbone-validation",
    "bootstrap": "bower_components/bootstrap/dist/js/bootstrap",
    "bootstrap-wysihtml5": "wysiwyg/bootstrap-wysihtml5",
    "daterangepicker": "bower_components/bootstrap-daterangepicker/daterangepicker",
    "easypiechart": "bower_components/easypie/dist/jquery.easypiechart",
    "flot": "bower_components/flot.tooltip/js/jquery.flot",
    "flot-pie": "bower_components/flot/jquery.flot.pie",
    "flot-resize": "bower_components/flot/jquery.flot.resize",
    "flot-time": "bower_components/flot/jquery.flot.time",
    "flot-tooltip": "bower_components/flot.tooltip/js/jquery.flot.tooltip",
    "globals": "backoffice/globals",
    "isMobile": "bower_components/isMobile/isMobile",
    "jquery": "bower_components/jquery/dist/jquery",
    "jquery-placeholder": "bower_components/jquery-placeholder/jquery.placeholder",
    "moment": "bower_components/moment/moment",
    "moment-fr": "bower_components/moment/locale/fr",
    "morris": "bower_components/morrisjs/morris",
    "polyfils": "utils/polyfils",
    "raphael": "bower_components/raphael/raphael",
    "sortable": "bower_components/html5sortable/jquery.sortable",
    "statistics": "utils/statistics-flot",
    "statistics-flot": "utils/statistics-flot",
    "statistics-morris": "utils/statistics-morris",
    "todoTpl": "todo",
    "underscore": "bower_components/underscore/underscore",
    "when": "vendor/when",
    "wysihtml5": "bower_components/wysihtml5/dist/wysihtml5-0.3.0",
    "wysihtml5-parser": "bower_components/wysihtml5/parser_rules/advanced",
    "scribe" : "bower_components/scribe/scribe",
    "scribe-plugin-toolbar" : "bower_components/scribe-plugin-toolbar/scribe-plugin-toolbar",
    "scribe-plugin-smart-lists": "bower_components/scribe-plugin-smart-lists/scribe-plugin-smart-lists",
    "scribe-plugin-heading-command": "bower_components/scribe-plugin-heading-command/scribe-plugin-heading-command",
    "scribe-plugin-shell-command" : "components/chat/utils/scribe-plugin-shell-command",
    "interact" : "bower_components/interact/interact"
  },

  "shim": {

    "Modernizr": {
      "exports": "Modernizr"
    },
    "autobahn": {
      "deps": ["when"],
      "exports": "ab"
    },
    "backbone": {
      "deps": ["underscore", "jquery"],
      "exports": "Backbone"
    },
    "backbone-localStorage": ["backbone"],
    "backbone-nested": {
      "deps": ["backbone"],
      "exports": "Backbone.NestedModel"
    },
    "backbone-validation": ["backbone"],
    "bootstrap": ["jquery"],
    "bootstrap-wysihtml5": ["wysihtml5", "bootstrap"],
    "daterangepicker": ["jquery", "bootstrap", "moment"],
    "easypiechart": ["jquery"],
    "flot": ["jquery"],
    "flot-pie": ["flot"],
    "flot-resize": ["flot"],
    "flot-time": ["flot"],
    "flot-tooltip": ["flot"],
    "moment-fr": ["moment"],
    'morris': ['raphael'],
    "sortable": ["jquery"],
    "todoTpl": ["jquery", "bootstrap"],
    "underscore": {
      "exports": "_"
    },
    "validator": ["jquery"],
    "wysihtml5": {
      "deps": ["wysihtml5-parser"],
      "exports": "wysihtml5"
    },
    "quill": {
      "exports": "Quill"
    }

  }
});

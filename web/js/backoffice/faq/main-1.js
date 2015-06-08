//Load common code that includes config, then load the app logic for this page.
define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "globals",
  "app",
  "backoffice/faq/router",
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  "bootstrap",
  "todoTpl",
  "sortable",
  "wysihtml5",
  'wysihtml5-parser'

], function($, _, Backbone, globals, app, Router, LiveChat) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    app.init = function() {
      app.router = new Router();

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    };

    app.init();
    app.wsConnect();
    Backbone.history.start();
  });
});

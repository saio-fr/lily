//Load common code that includes config, then load the app logic for this page.
define(['require', '../../common'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'globals',
  'backoffice/app',
  'backoffice/faq/router',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'todoTpl',
  'sortable',
  'wysihtml5',
  'wysihtml5-parser'

], function($, _, Backbone, globals, app, Router, LiveChat) {

    app.init = function() {
      app.router = new Router();

      if (globals.chat && globals.isChatOperator && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    };

    app.ajaxConfig();
    app.init();
    app.wsConnect();
    Backbone.history.start();
  });
});

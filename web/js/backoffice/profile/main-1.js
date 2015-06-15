//Load common code that includes config, then load the app logic for this page.
define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/profile/router',
  'globals',
  'app',
  'components/chat/main',
  'moment',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment-fr',
  'statistics'
], function($, _, Backbone, Router, globals, app, LiveChat, moment) {

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.router = new Router();

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    };

    app.ajaxConfig();
    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});

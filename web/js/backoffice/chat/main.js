define(['require', '../../common'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'autobahn',
  'when',
  'backoffice/app',
  'backoffice/chat/router',
  'components/chat/main',
  'moment',
  'globals',

  // Libraries required at bootstrap for the UI.
  'moment-fr',
  'Modernizr',
  'todoTpl',
  'polyfils',
  // Autobahn V1 AMD broken.
], function($, _, Backbone, ab, when, app, ChatRouter, LiveChat, moment, globals) {

    // Set locale in moment JS
    moment.locale('fr');

    function bootstrap() {
      app.router = new ChatRouter();

      if (globals.chat && globals.isChatOperator && !app.liveChat) {
        app.liveChat = new LiveChat();
      }

      // Start routing
      if (Backbone.History.started) {
        Backbone.history.stop();
      }

      Backbone.history.start();
    }

    app.init(bootstrap);
  });
});

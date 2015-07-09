define(['require', '../../common'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/config/router',
  'globals',
  'backoffice/app',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'todoTpl'

], function($, _, Backbone, ConfigRouter, globals, app, LiveChat) {

    function bootstrap() {
      app.router = new ConfigRouter();
      Backbone.history.start();

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    }

    app.init(bootstrap);
  });
});

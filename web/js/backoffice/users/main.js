//Load common code that includes config, then load the app logic for this page.
define(['require', '../../common'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/users/router',
  'globals',
  'backoffice/app',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap'
], function($, _, Backbone, UserRouter, globals, app, LiveChat) {

    function bootstrap() {
      app.router = new UserRouter();
      Backbone.history.start();

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    }

    app.init(bootstrap);
  });
});

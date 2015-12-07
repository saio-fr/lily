//Load common code that includes config, then load the app logic for this page.
define(['require', '../../common.js'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'backoffice/app',
  'backoffice/faq/router',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'todoTpl',
  'sortable',
  'wysihtml5',
  'wysihtml5-parser'

], function($, _, Backbone, config, app, Router, LiveChat) {

    function bootstrap() {
      app.router = new Router();
      Backbone.history.start();

      if (config.chat && config.isChatOperator && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    }

    app.init(bootstrap);
  });
});

define(['require', '../../common.js'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/app',
  'config',
  'backoffice/knowledge/router',
  'backoffice/knowledge/utils/counters',
  'utils/interact',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'moment',
  'bootstrap',
  'todoTpl'
], function($, _, Backbone, app, config, Router, Counters, Interact, LiveChat) {

  function bootstrap() {
    app.router = new Router();
    Backbone.history.start();
    Interact.resizeNavigator();

    if (config.chat && config.isChatOperator && !app.liveChat) {
      app.liveChat = new LiveChat();
    }
  }

  app.post = function() {
    $('.icon-spinner').removeClass('hide');
    $.post(app.postUrl, JSON.stringify(app.sortRequest), function(data) {
      app.postCallback(data);
      $('.icon-spinner').addClass('hide');
    });
  };

  app.init(bootstrap);
});
});

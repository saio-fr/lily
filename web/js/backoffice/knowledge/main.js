define(['require', '../../common'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/app',
  'globals',
  'backoffice/knowledge/router',
  'backoffice/knowledge/utils/counters',
  'utils/interact',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'moment',
  'bootstrap',
  'todoTpl'
], function($, _, Backbone, app, globals, Router, Counters, Interact, LiveChat) {

  function bootstrap() {
    app.router = new Router();
    Backbone.history.start();
    Interact.resizeNavigator();

    if (globals.chat && globals.isChatOperator && !app.liveChat) {
      app.liveChat = new LiveChat();
    }
  }

  app.post = function() {
    $('.icon-spinner').removeClass('hide');
    $.post(app.postUrl, JSON.stringify(app.sortRequest), function(data) {
      console.log(app.sortRequest);
      app.postCallback(data);
      $('.icon-spinner').addClass('hide');
    });
  };

  app.init(bootstrap);
});
});

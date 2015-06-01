define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "app",
  "globals",
  "backoffice/knowledge/router",
  "backoffice/knowledge/utils/counters",
  "utils/interact",
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  "moment",
  "bootstrap",
  "todoTpl"

], function($, _, Backbone, app, globals, Router, Counters, Interact, LiveChat) {

  $.ajaxPrefilter(function(options) {
    options.url = globals.root + options.url;
  });

  app.init = function() {
    app.router = new Router();
    Interact.resizeNavigator();
    Counters.set(config);
  };

  app.post = function() {
    $('.icon-spinner').removeClass('hide');
    $.post(app.postUrl, JSON.stringify(app.sortRequest), function(data) {
      console.log(app.sortRequest);
      app.postCallback(data);
      $('.icon-spinner').addClass('hide');
    });
  };

  // Will get called if ws connection is successful
  app.onConnect = function(result) {

    if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
      app.liveChat = new LiveChat(result);
    }
  };

  app.wsConnect();
  app.init();
  Backbone.history.start();
});
});

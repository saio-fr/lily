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
    if (options.external) {
      options.url = globals.appRoot + options.url;
    } else if (options.url.match(/^(http|www)/)) {
      options.url = options.url;
    } else  {
      options.url = globals.root + options.url;
    }
  });

  app.init = function() {
    app.router = new Router();
    Interact.resizeNavigator();
    Counters.set(config);
    if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
      app.liveChat = new LiveChat();
    }
  };

  app.post = function() {
    $('.icon-spinner').removeClass('hide');
    $.post(app.postUrl, JSON.stringify(app.sortRequest), function(data) {
      console.log(app.sortRequest);
      app.postCallback(data);
      $('.icon-spinner').addClass('hide');
    });
  };

  app.init();
  app.wsConnect();
  Backbone.history.start();
});
});
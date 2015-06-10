define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/config/router',
  'globals',
  'app',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'todoTpl'

], function($, _, Backbone, ConfigRouter, globals, app, LiveChat) {

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
      app.router = new ConfigRouter();
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

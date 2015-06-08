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

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment',
  'moment-fr',
  'statistics'

], function($, _, Backbone, ProfileRouter, globals, app, LiveChat) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.router = new ProfileRouter();
      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    };

    app.init();
    app.wsConnect();
    Backbone.history.start();
  });
});

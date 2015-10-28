/* ===========================
         	ROUTER
========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('backoffice/app'),
    config = require('config'),
    ConfigModel = require('backoffice/config/models/configModel'),
    SkeletonView = require('backoffice/config/views/skeletonView'),
    GlobalView = require('backoffice/config/views/globalView'),
    ChatView = require('backoffice/config/views/chatView'),
    AviView = require('backoffice/config/views/aviView'),

    // Object wrapper returned as a module
    AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      '*path': 'home'
    },

    initialize: function() {

      var configModel = new ConfigModel();

      configModel.fetch().success(function() {

        var skeleton = new SkeletonView({
          model: configModel
        });
        app.skeleton = skeleton;

        skeleton.globalView = new GlobalView({
          model: configModel
        });

        if (config.client.avi)
          skeleton.aviView = new AviView({
            model: configModel
          });

        if (config.client.chat)
          skeleton.chatView = new ChatView({
            model: configModel
          });
      });

      app.trackPageView('Config page');
      // TODO: same as profile: route tabs and track page
    },

    home: function() {
      // todo: Adding more logic to the router (sort based on url...)
    }

  });
  return AppRouter;
});

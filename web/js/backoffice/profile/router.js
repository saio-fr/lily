/* ===========================
         	ROUTER
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('backoffice/app'),
    SkeletonView = require('backoffice/profile/views/skeletonView'),
    UserModel = require('backoffice/profile/models/userModel'),
    GraphModel = require('backoffice/profile/models/graphModel'),
    FooterModel = require('backoffice/profile/models/footerModel'),
    ChatCollection = require('backoffice/profile/collections/chatCollection'),
    LogCollection = require('backoffice/profile/collections/logCollection'),
    ChatsSkeletonView = require('backoffice/profile/views/activities/chats/skeletonView'),
    LogsSkeletonView = require('backoffice/profile/views/activities/logs/skeletonView'),
    UserEditView = require('backoffice/profile/views/userEditView'),
    ActivitiesView = require('backoffice/profile/views/activities/skeletonView'),
    StatisticsView = require('backoffice/profile/views/activities/statistics/statisticsView'),

    // Object wrapper returned as a module
    AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      '*path': 'home'
    },

    initialize: function() {

      // Models & Collection
      var userModel = new UserModel();
      var graphModel = new GraphModel();
      var footerModel = new FooterModel();
      var chatCollection = new ChatCollection();
      var logCollection = new LogCollection();

      // Sekeleton
      var skeleton = new SkeletonView();
      app.skeleton = skeleton;

      userModel.fetch().success(function() {
        skeleton.userEditView = new UserEditView({
          model: userModel
        });
      });

      // Create activities skeleton
      var activities = new ActivitiesView();
      skeleton.activities = activities;

      activities.statisticsView = new StatisticsView({
        model: {
          graph: graphModel,
          footer: footerModel
        }
      });

      chatCollection.fetch().success(function() {
        activities.chatsView = new ChatsSkeletonView({
          collection: chatCollection
        });
      });

      logCollection.fetch().success(function() {
        activities.logsView = new LogsSkeletonView({
          collection: logCollection
        });
      });

      app.trackPageView('Profile page');
      // TODO: route by tab and track different sections.
    },

    home: function() {}


  });

  return AppRouter;
});

/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      app = require('app'),
      SkeletonView = require('backoffice/statistics/views/skeletonView'),
      
      UsageGraphModel = require('backoffice/statistics/models/usage/graphModel'),
      UsageFooterModel = require('backoffice/statistics/models/usage/footerModel'),
      
      AviGraphModel = require('backoffice/statistics/models/avi/graphModel'),
      AviFooterModel = require('backoffice/statistics/models/avi/footerModel'),
      
      ChatGraphModel = require('backoffice/statistics/models/chat/graphModel'),
      ChatFooterModel = require('backoffice/statistics/models/chat/footerModel'),
      
      UsersGraphModel = require('backoffice/statistics/models/users/graphModel'),
      UsersFooterModel = require('backoffice/statistics/models/users/footerModel'),
      UserCollection = require('backoffice/statistics/collections/users/userCollection'),       
      UserChatCollection = require('backoffice/statistics/collections/users/chatCollection'),    
      UserLogCollection = require('backoffice/statistics/collections/users/logCollection'),    
      UserActivitiesView = require('backoffice/statistics/views/users/activities/skeletonView'),
      UserChatsSkeletonView = require('backoffice/statistics/views/users/activities/chats/skeletonView'),
      UserLogsSkeletonView = require('backoffice/statistics/views/users/activities/logs/skeletonView'),
      UserStatisticsView = require('backoffice/statistics/views/users/activities/statistics/statisticsView'),

      // Object wrapper returned as a module
      AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      '*path': 'home'
    },

    initialize: function () {
      
      // Models & Collection
      var usageGraphModel = new UsageGraphModel();
      var usageFooterModel = new UsageFooterModel();
      var aviGraphModel = new AviGraphModel();
      var aviFooterModel = new AviFooterModel();
      var chatGraphModel = new ChatGraphModel();
      var chatFooterModel = new ChatFooterModel();
      var userCollection = new UserCollection();
      var userChatCollection = new UserChatCollection();
      var userLogCollection = new UserLogCollection();
      
      // Sekeleton
      var skeleton = new SkeletonView();
      app.skeleton  = skeleton;
   
    },

    home: function () {
    }
    
    
  });

  return AppRouter;
});


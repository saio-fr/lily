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
      
      UsageSkeletonView = require('backoffice/statistics/views/usage/skeletonView'),
      
      AviGraphModel = require('backoffice/statistics/models/avi/graphModel'),
      AviFooterModel = require('backoffice/statistics/models/avi/footerModel'),
      AviSkeletonView = require('backoffice/statistics/views/avi/skeletonView'),
      
      ChatGraphModel = require('backoffice/statistics/models/chat/graphModel'),
      ChatFooterModel = require('backoffice/statistics/models/chat/footerModel'),
      ChatSkeletonView = require('backoffice/statistics/views/chat/skeletonView'),
      
      UserGraphModel = require('backoffice/statistics/models/users/graphModel'),
      UserFooterModel = require('backoffice/statistics/models/users/footerModel'),
      UserCollection = require('backoffice/statistics/collections/users/userCollection'),       
      UserChatCollection = require('backoffice/statistics/collections/users/chatCollection'),    
      UserLogCollection = require('backoffice/statistics/collections/users/logCollection'),
      UserSkeletonView = require('backoffice/statistics/views/users/skeletonView'),  
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
      
      // Sekeleton
      var skeleton = new SkeletonView();
      app.skeleton  = skeleton;
      
      this.usage();
      this.avi();
      this.chat();
      this.users();
      
    },
    
    home: function () {
      
    },

    usage: function () {
      // Skeleton
      var usage = new UsageSkeletonView();
      app.skeleton.usage = usage;
    },
    
    avi: function () {
      // Models & Collection    
      var aviGraphModel = new AviGraphModel();
      var aviFooterModel = new AviFooterModel();
      
      // Skeleton
      var avi = new AviSkeletonView();
      app.skeleton.avi = avi;  
    },
    
    chat: function () {
      // Models & Collection 
      var chatGraphModel = new ChatGraphModel();
      var chatFooterModel = new ChatFooterModel();

      // Skeleton
      var chat = new ChatSkeletonView();
      app.skeleton.chat = chat;
    },
    
    users: function () {
      // Models & Collection
      var userGraphModel = new UserGraphModel();
      var userFooterModel = new UserFooterModel();
      var userCollection = new UserCollection();
      var userChatCollection = new UserChatCollection();
      var userLogCollection = new UserLogCollection();
                 
      var users = new UserSkeletonView();
      app.skeleton.users = users;
    }
    
  });

  return AppRouter;
});


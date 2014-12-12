/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      app = require('app'),
      SkeletonView = require('backoffice/profile/views/skeletonView'),
      UserModel = require('backoffice/profile/models/userModel'),
      GraphModel = require('backoffice/profile/models/graphModel'),
      FooterModel = require('backoffice/profile/models/footerModel'),
      ChatCollection = require('backoffice/profile/collections/chatCollection'),
      ChatsView = require('backoffice/profile/views/activities/chats/skeletonView'),
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

    initialize: function () {
      
      var userModel = new UserModel();
      var graphModel = new GraphModel();
      var footerModel = new FooterModel();
      
      var skeleton = new SkeletonView();
      app.skeleton  = skeleton;
      
      userModel.fetch().success(function () {
        skeleton.userEditView = new UserEditView({model: userModel});  
      });

        // All ready and good to go...
        // Create activities skeleton
        var activities = new ActivitiesView();
        skeleton.activities = activities;
          
        activities.statisticsView = new StatisticsView({
          model: {
            graph: graphModel, 
            footer: footerModel 
          } 
        });
        
        var chatCollection = new ChatCollection();
    
        chatCollection.fetch().success(function () {
          activities.chatsView = new ChatsView({
            collection: chatCollection
          });
        });   
   
    },

    home: function () {
    }
    
    
  });

  return AppRouter;
});


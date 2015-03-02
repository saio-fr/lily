/* ===========================
         	ROUTER
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('app'),

    UserCollection = require('backoffice/users/collections/userCollection'),
    UsersSkeletonView = require('backoffice/users/views/users/skeletonView'),

    GroupCollection = require('backoffice/users/collections/groupCollection'),
    GroupsView = require('backoffice/users/views/groups/groupsView'),
    GroupsSkeletonView = require('backoffice/users/views/groups/skeletonView'),

    // Object wrapper returned as a module
    AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'users',
      'groups': 'groups',
      '*path': 'users'
    },

    initialize: function() {
      app.userCollection = new UserCollection();
      app.groupCollection = new GroupCollection();
    },

    users: function() {

      if (typeof(app.skeleton) != 'undefined') {
        app.skeleton.remove();
      }

      app.skeleton = new UsersSkeletonView({
        collection: app.userCollection
      });
      
      app.userCollection.fetch();
      app.groupCollection.fetch();

      app.pageView("/users/users");
    },

    groups: function() {

      if (typeof(app.skeleton) != 'undefined') {
        app.skeleton.remove();
      }
        
      app.skeleton = new GroupsSkeletonView({
        collection: app.groupCollection
      });
      
      app.groupCollection.fetch();
        
      app.pageView("users/groups");
    }

  });

  return AppRouter;
});

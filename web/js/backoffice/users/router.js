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
    UsersView = require('backoffice/users/views/users/usersView'),
    UsersSkeletonView = require('backoffice/users/views/users/skeletonView'),
    UsersModalDeleteView = require('backoffice/users/views/users/modalDeleteView'),

    GroupCollection = require('backoffice/users/collections/groupCollection'),
    GroupsView = require('backoffice/users/views/groups/groupsView'),
    GroupsSkeletonView = require('backoffice/users/views/groups/skeletonView'),
    GroupsModalDeleteView = require('backoffice/users/views/groups/modalDeleteView'),

    // Object wrapper returned as a module
    AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'users',
      'groups': 'groups',
      '*path': 'users'
    },

    initialize: function() {
      var skeletons = {};
      app.skeletons = skeletons;

      var groupCollection = new GroupCollection();
      var userCollection = new UserCollection();

      groupCollection.fetch().success(function() {

        var skeleton = new GroupsSkeletonView({
          collection: groupCollection
        });
        app.skeletons.groups = skeleton;
        var groupsView = new GroupsView({
          collection: groupCollection
        });

      });

      userCollection.fetch().success(function() {

        var skeleton = new UsersSkeletonView({
          collection: userCollection,
          groups: groupCollection
        });
        app.skeletons.users = skeleton;
        var usersView = new UsersView({
          collection: userCollection
        });

      });
    },

    users: function() {

      $('.nav-tabs li').removeClass('active');
      $('.users-nav').addClass('active');

      $('.js-groups-container').addClass('hide');
      $('.js-users-container').removeClass('hide');

      app.pageView("/users/users");
    },

    groups: function() {

      $('.nav-tabs li').removeClass('active');
      $('.groups-nav').addClass('active');

      $('.js-users-container').addClass('hide');
      $('.js-groups-container').removeClass('hide');

      app.pageView("users/groups");
    }

  });

  return AppRouter;
});

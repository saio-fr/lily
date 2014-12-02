/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      app = require('app'),
      UserCollection = require('backoffice/users/collections/userCollection'),
      UserManagementModel = require('backoffice/users/models/userManagementModel'),
      UserManagementView = require('backoffice/users/views/userManagementView'),
      UserCollectionView = require('backoffice/users/views/userCollectionView'),

      // Object wrapper returned as a module
      AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      '*path': 'home'
    },

    initialize: function () {

      var userCollection = new UserCollection(),
          userCollectionView = {},
          userManagementModel = new UserManagementModel();

      // Store managementView in global namespace.
      app.userManagementView = {};


      function initViews () {
        userCollection.fetch().success(function() {
          app.userManagementView  = new UserManagementView({
            model: userManagementModel,
            collection: userCollection
          });
          userCollectionView = new UserCollectionView(userCollection);
        });
      }

      // Get max users allowed
      userManagementModel.fetch({
        // Bootstrap users list and fetch existing users.
        success: initViews
      });
    },

    home: function() {
      // todo: Adding more logic to the router (sort based on url...)
    }
  });

  return AppRouter;
});


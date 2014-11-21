/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var UserCollection = require('backoffice/users/collections/userCollection'),
      UserManagementModel = require('backoffice/users/models/userManagementModel'),
      UserManagementView = require('backoffice/users/views/userManagementView'),
      UserCollectionView = require('backoffice/users/views/userCollectionView'),

      // Object wrapper returned as a module
      AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      "" : "home",
      "*path" : "home"
    },

    initialize: function () {

      // We only want one userCollection and one userManagement view
      var userCollection = new UserCollection(),
          fetchUserCollection = userCollection.fetch(),

          userManagementModel = new UserManagementModel(),
          userManagementView = new UserManagementView();

      userManagementModel.fetch({
        success: function() {
          fetchUserCollection.success(function() {
            UserManagementView.setModel(userManagementModel)
            userCollectionView = new UserCollectionView(userCollection);
          });
        }
      });

    },

    home: function() {
      // todo: Adding more logic to the router (sort based on url...)
      return;
    }
  });

  return AppRouter;
});


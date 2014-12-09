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
      UsersView = require('backoffice/users/views/usersView'),
      SkeletonView = require('backoffice/users/views/skeletonView'),
      ModalDeleteView = require('backoffice/users/views/modalDeleteView'),

      // Object wrapper returned as a module
      AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      '*path': 'home'
    },

    initialize: function () {
      
      var userCollection = new UserCollection();
          
      userCollection.fetch().success(function() {

        var skeleton = new SkeletonView({collection: userCollection});
        app.skeleton  = skeleton;
        skeleton.usersView = new UsersView({collection: userCollection});
        
      });
   
    },

    home: function() {
      // todo: Adding more logic to the router (sort based on url...)
    }
  });

  return AppRouter;
});


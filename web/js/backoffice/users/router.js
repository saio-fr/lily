/* ===========================
         	ROUTER
   ========================== */

define('userRouter', ["", ""], function (userModule, ) {

  'use strict';

  userModule.AppRouter = Backbone.Router.extend({

    routes: {
      "" : "home",
      "*path" : "home"
    },

    initialize: function () {

      // TODO Make listUser a less dirty global... Local namespace for users module ?
      // Thanks :)
      userModule.listUser = new userModule.ListUser();
      userModule.listUser.url = "/rest/";
      userModule.listUserLoader = userModule.listUser.fetch();
    },

    home: function() {

      // Same here!
      var userManagementApp = new userModule.UserManagementApp(),
          self = this;

      if ( typeof(userModule.userManagementAppView) === "undefined" ) {
        userModule.userManagementAppView = new userModule.UserManagementAppView();
      }

      userManagementApp.url = "/rest/maxusers";
      userManagementApp.fetch({
        success: function() {
          userModule.listUserLoader.success( function() {
            userModule.userManagementAppView.setModel(userManagementApp)
            userModule.listUserView = new userModule.ListUserView(userModule.listUser);
          });
        }
      });
    },
  });

});

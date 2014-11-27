/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      UserManagementModel;

  UserManagementModel = Backbone.Model.extend({
    url: "/rest/maxusers"
  });

  return UserManagementModel;
});

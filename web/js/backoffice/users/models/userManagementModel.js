/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      UserManagementApp;

  UserManagementApp = Backbone.Model.extend({
    url: "/rest/maxusers"
  });

});

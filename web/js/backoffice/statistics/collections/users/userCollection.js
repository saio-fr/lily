/*======================================
        LOG COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      UserModel = require('backoffice/statistics/models/users/userModel'),

      // Object wrapper returned as a module
      UserCollection;

  UserCollection = Backbone.Collection.extend({
    
    model: UserModel,
    sortCriteria : 'lastname',
    url: function () {
      return '/../users';
    },
    
    initialize: function () {
    }
    
  });

  return UserCollection;
});

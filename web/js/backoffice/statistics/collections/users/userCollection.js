/*======================================
        LOG COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      g = require('globals'),

      // Object wrapper returned as a module
      UserCollection;

  UserCollection = Backbone.Collection.extend({

    sortCriteria : 'lastname',
    url: function () {
      return '../user';
    },
    
    initialize: function () {
    },
  });

  return UserCollection;
});

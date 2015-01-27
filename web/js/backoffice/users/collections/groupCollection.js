/*======================================
          GROUP COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      groupModel = require('backoffice/users/models/groupModel'),
  
      // Object wrapper returned as a module
      GroupCollection;

  GroupCollection = Backbone.Collection.extend({

    sortCriteria : "name",
    url: '/groups',
    model: groupModel,

    comparator: function(item) {

      return item.get('name');
    }

  });

  return GroupCollection;
});

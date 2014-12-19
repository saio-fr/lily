/*======================================
        CONVERSATION COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      CategoryCollection;

  CategoryCollection = Backbone.Collection.extend({

    url: function () {
      return '/avi/topcategories';
    },
    
    initialize: function () {
    }
    
  });

  return CategoryCollection;
});

/* ===========================
       Collections Data
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    Models = require('backoffice/knowledge/data/models'),

    // Object wrapper returned as a module
    Collections = {};

  Collections.Questions = Backbone.Collection.extend({
    model: Models.Question
  });
  
  Collections.Categories = Backbone.Collection.extend({
    model: Models.Category,
    
    setType: function(type) {
      this.url = '/' + type + '/categories';
    }
  });

  return Collections;
});

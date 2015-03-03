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
    url: '/questions',
    model: Models.Question
  });

  return Collections;
});
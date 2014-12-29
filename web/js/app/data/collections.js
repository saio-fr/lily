/* ===========================
       Faq Model
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    Models = require('app/data/models'),

    // Object wrapper returned as a module
    Collections = {};

  Collections.Messages = Backbone.Collection.extend({
    model: Models.ChatMessage,
  });

  return Collections;
});

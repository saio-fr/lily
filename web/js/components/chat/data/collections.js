/* ===========================
       Collections Data
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    Models = require('backoffice/components/chat/data/models'),

    // Object wrapper returned as a module
    Collections = {};

  Collections.Users = Backbone.Collection.extend({
    model: Models.Operator
  });

  Collections.Messages = Backbone.Collection.extend({
    model: Models.Messages
  });

  return Collections;
});

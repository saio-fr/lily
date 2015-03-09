/* ===========================
       Collections Data
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    Models = require('backoffice/chat/data/models'),

    // Object wrapper returned as a module
    Collections = {};

  Collections.Users = Backbone.Collection.extend({
    model: Models.Operator
  });
  
  Collections.Shortcuts = Backbone.Collection.extend({
    url: '/shortcuts',
    model: Models.Shortcut
  });

  return Collections;
});

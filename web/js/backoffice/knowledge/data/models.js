/* ===========================
            Models
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    NestedModel = require('backbone-nested'),
    g = require('globals'),
    // Object wrapper returned as a module
    Models = {};

  Models.Question = Backbone.Model.extend({});

  return Models;
});

/*======================================
  Collection FAQs
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    Models = require('components/notifs/models'),

    // Object wrapper returned as a module
    FaqCollection;

  FaqCollection = Backbone.Collection.extend({
    model: Models.NotifModel,
  });

  return FaqCollection;
});

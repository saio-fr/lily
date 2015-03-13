/* ===========================
       Collections Data
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    Models = require('components/chat/data/models'),

    // Object wrapper returned as a module
    Collections = {};

  Collections.Users = Backbone.Collection.extend({
    model: Models.Operator
  });

  Collections.Messages = Backbone.Collection.extend({
    model: Models.Messages
  });
  
  Collections.ShellSuggestions = Backbone.Collection.extend({});
  
  Collections.Shortcuts = Backbone.Collection.extend({
    url: '/chat/shortcuts',
    initialize: function () {
      this.fetch();
    }
  });

  return Collections;
});

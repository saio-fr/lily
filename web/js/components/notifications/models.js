/*================================
  Model FAQ
====================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    globals = require('globals'),

    // Object wrapper returned as a module
    Models = {};

  Models.NotifModel = Backbone.Model.extend({});
  Models.NotifsModel = Backbone.Model.extend({
    defaults: {
      count: 0,
      countTitle: globals.notifications.countTitle(0)
    },
    initialize: function() {
      this.listenTo(this, 'change:count', this.uptateTitle);
    },

    uptateTitle: function() {
      this.set({
        countTitle: globals.notifications.countTitle(this.get('count'))
      });
    }
  });

  return Models;
});

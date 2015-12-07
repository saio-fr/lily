/*================================
  Model FAQ
====================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    config = require('config'),

    // Object wrapper returned as a module
    Models = {};

  Models.NotifModel = Backbone.Model.extend({});
  Models.NotifsModel = Backbone.Model.extend({
    defaults: {
      count: 0,
      countTitle: config.notifications.countTitle(0)
    },

    initialize: function() {
      this.listenTo(this, 'change:count', this.uptateTitle);
    },

    uptateTitle: function() {
      this.set({
        countTitle: config.notifications.countTitle(this.get('count'))
      });
    }
  });

  return Models;
});

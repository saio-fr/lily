/*========================================
      DASHBOARD SKELETON VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),

    // Object wrapper returned as a module
    ConnectedView;

  ConnectedView = Backbone.View.extend({

    tagName: 'li',
    className: 'list-group-item',
    template: _.template($('#dashboardConnectedTpl').html()),

    events: {},

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.js-dashboard-connected ul');
      return this;
    }

  });

  return ConnectedView;
});

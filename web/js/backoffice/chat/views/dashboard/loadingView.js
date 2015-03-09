/*========================================
      DASHBOARD LOADING VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    utils = require('utils/statistics-easypiechart'),

    // Object wrapper returned as a module
    LoadingView;

  LoadingView = Backbone.View.extend({

    el: '.js-dashboard-loading',
    template: _.template($('#dashboardLoadingTpl').html()),

    events: {},

    initialize: function() {
      this.render();
      utils.chatLoading($('.js-dashboard-loading-chart'));
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    update: function(c) {

      var load = 0;

      if (c.available.length)  {

        load = (c.visitors.length / c.available.length) * 20;
        if (load > 100) {
          load = 100;
        }
      } else if (c.visitors.length) {
        load = 100;
      } else {
        load = 0;
      }

      $('.js-dashboard-loading-chart').data('easyPieChart').update(load);
    }

  });

  return LoadingView;
});

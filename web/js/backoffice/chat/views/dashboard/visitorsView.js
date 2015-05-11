/*========================================
      DASHBOARD VISITORS VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    moment = require('moment'),

    // Object wrapper returned as a module
    VisitorsView;

  VisitorsView = Backbone.View.extend({

    el: '.js-dashboard-visitors-info',
    template: _.template($('#dashboardVisitorsTpl').html()),

    events: {},

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    update: function(c) {

      var stats = {};

      stats.waiting = 0;
      stats.pages = 0;
      stats.satisfaction = 0;
      stats.satisfied = 0;
      stats.now = moment();

      // Calculs
      if (c.available.length && c.visitors.chatting.length) {

        $.each(c.visitors, function(key, visitor) {

          var o = visitor.get('operator');

          if (typeof(o) !== 'undefined' && o) {

            stats.waiting += visitor.get('startChatTime') - visitor.get('startTime');

            if (visitor.get('satisfaction') !== null) {
              stats.satisfaction += 1;
            }
            if (visitor.get('satisfaction') === true) {
              stats.satisfied += 1;
            }
          }

          $.each(visitor.get('pages'), function(key, page) {
            stats.pages += 1;
          });
        });

        // Waiting time for visitor before chat
        stats.waiting = Math.round(stats.waiting / c.visitors.chatting.length * 1000);
        stats.waiting = moment(stats.waiting).format('mm:ss');

        // Pages seen by visitors
        stats.pages = Math.round(stats.pages / c.visitors.length);

        // Visitors' satisfaction
        if (stats.satisfaction) {
          stats.satisfaction = Math.round(100 * stats.satisfied / stats.satisfaction);
        } else {
          stats.satisfaction = 100;
        }
      }

      this.$el.find('.connected span').text(c.visitors.length);
      this.$el.find('.icon-time').text(stats.waiting);
      this.$el.find('.icon-eye-open').text(stats.pages);
      this.$el.find('.icon-thumbs-up').text(stats.satisfaction + '%');
    }

  });

  return VisitorsView;
});

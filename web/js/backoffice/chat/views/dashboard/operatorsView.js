/*========================================
      DASHBOARD OPERATORS VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    moment = require('moment'),
    Backbone = require('backbone'),

    // Object wrapper returned as a module
    OperatorsView;

  OperatorsView = Backbone.View.extend({

    el: '.js-dashboard-operators-info',
    template: _.template($('#dashboardOperatorsTpl').html()),

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

      stats.duration = 0;
      stats.messages = 0;
      stats.chats = 0;
      stats.now = moment();

      // Calculs
      if (c.available.length && c.visitors.chatting.length) {

        $.each(c.visitors, function(key, visitor) {

          var o = visitor.get('operator');

          if (typeof(o) !== 'undefined' && o) {

            stats.messages += visitor.get('messages').length;
            stats.duration += stats.now.diff(moment(visitor.get('startChatTime') * 1000));
          }

        });

        // Messages per chat
        stats.messages = Math.round(stats.messages / c.visitors.chatting.length);

        // Time spent by operators per chat
        stats.duration = Math.round(stats.duration / c.visitors.chatting.length);
        stats.duration = moment(stats.duration).format('mm:ss');

        // Simultaneous chats per operator
        stats.chats = Math.round(c.visitors.chatting.length / c.available.length * 10) / 10;
      }

      this.$el.find('.connected span').text(c.available.length);
      this.$el.find('.icon-male').text(stats.chats);
      this.$el.find('.icon-time').text(stats.duration);
      this.$el.find('.icon-comments').text(stats.messages);
    }

  });

  return OperatorsView;
});

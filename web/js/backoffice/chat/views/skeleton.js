/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
    _ = require("underscore"),
    Backbone = require("backbone"),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.js-skeleton-container',
    template: _.template($('#skeletonTpl').html()),

    events: {
      'click .status a[data="unavailable"]': 'setUnavailable',
      'click .status a[data="available"]': 'setAvailable',
      'click .windows ul li': 'setMaxWindows'
    },

    initialize: function() {
      this.render();

      if (app.available) {
        this.setAvailable();
      } else {
        this.setUnavailable();
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    setAvailable: function(e) {

      if (typeof(e) !== 'undefined') {
        e.preventDefault();
      }
      // Set the operator available on the server
      app.trigger("operator:available");

      $('.header .status icon').removeClass('unavailable').addClass('available');
      $('.header .status span').html('Disponible');
    },

    setUnavailable: function(e) {

      if (typeof(e) !== 'undefined') {
        e.preventDefault();
      }
      // Set the operator unavailable on the server
      app.trigger('operator:unavailable');

      $('.header .status icon').removeClass('available').addClass('unavailable');
      $('.header .status span').html('Indisponible');
    },

    setMaxWindows: function(e) {

      if (typeof(e) !== 'undefined') {

        e.preventDefault();
        this.live.maxWindows = $(e.target).attr('data');

        this.$el.find('.windows span').html(
          this.live.maxWindows === 1 ?
          this.live.maxWindows + ' Conversation' :
          this.live.maxWindows + ' Conversations'
        );
      }

      if (this.live.maxWindows < this.live.windows.length) {

        var diff = this.live.windows.length - this.live.maxWindows;
        for (var i = 0; i < diff; i++) {
          this.live.windows[this.live.windows.length - 1].minus();
        }
      }
    }

  });

  return SkeletonView;
});

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
      'click .windows ul li': 'setMaxWindows'
    },

    initialize: function() {
      this.render();
      app.trigger('operator:setAvailability', app.available);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    setMaxWindows: function(e) {
      var liveView = app.skeleton.live;

      if (typeof(e) !== 'undefined') {

        e.preventDefault();
        liveView.maxWindows = $(e.target).attr('data');

        this.$el.find('.windows span').html(
          liveView.maxWindows === 1 ?
          liveView.maxWindows + ' Conversation' :
          liveView.maxWindows + ' Conversations'
        );
      }

      if (liveView.maxWindows < liveView.windows.length) {

        var diff = liveView.windows.length - liveView.maxWindows;
        for (var i = 0; i < diff; i++) {
          liveView.windows[liveView.windows.length - 1].minus();
        }
      }
    }

  });

  return SkeletonView;
});

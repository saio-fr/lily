/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      Utils = require('statistics-morris'),

      // Object wrapper returned as a module
      MediaView;

  MediaView = Backbone.View.extend({

    el: '.usage-wrapper .media-wrapper',
    template: _.template($('#usageMediaTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
      Utils.renderBars(this);
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });

  return MediaView;
});

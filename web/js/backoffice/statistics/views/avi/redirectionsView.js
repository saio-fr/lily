/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      Utils = require('statistics-flot'),

      // Object wrapper returned as a module
      RedirectionsView;

  RedirectionsView = Backbone.View.extend({

    el: '.avi-wrapper .redirections-wrapper',
    template: _.template($('#aviRedirectionsTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
      Utils.renderPie(this);
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });

  return RedirectionsView;
});

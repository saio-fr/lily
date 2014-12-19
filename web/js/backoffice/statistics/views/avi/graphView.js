/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      Utils = require('statistics-flot'),

      // Object wrapper returned as a module
      GraphView;

  GraphView = Backbone.View.extend({

    el: '.avi-wrapper .graph-wrapper',
    template: _.template($('#aviGraphTpl').html()),
    templateFooter: _.template($('#aviFooterTpl').html()),

    events: {
      'hide.daterangepicker' : 'plot'
    },

    initialize: function() {
      this.render();
      this.plot();
      Utils.daterangepicker(this);
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    },
    
    plot: function () {
      Utils.renderFooter(this);
      Utils.renderGraph(this);
    }

  });

  return GraphView;
});

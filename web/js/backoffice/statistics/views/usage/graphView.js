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

    el: '.usage-wrapper .graph-wrapper',
    template: _.template($('#usageGraphTpl').html()),
    templateFooter: _.template($('#usageGraphFooterTpl').html()),

    events: {
      'click footer a': 'select',
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
    
    select: function (e) {  
      this.$el.find('footer .active').removeClass('active');
      $(e.currentTarget).addClass('active');
      this.model.graph.type = $(e.currentTarget).data('type');
      Utils.renderGraph(this, null);
    },
    
    plot: function () {
      Utils.renderFooter(this);
      Utils.renderGraph(this);
    }

  });

  return GraphView;
});

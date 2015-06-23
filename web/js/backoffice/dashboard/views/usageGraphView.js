/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      Utils = require('statistics-flot'),

      // Object wrapper returned as a module
      GraphView;

  GraphView = Backbone.View.extend({

    el: '.usage-graph-wrapper',
    template: _.template($('#usageGraphTpl').html()),
    templateFooter: _.template($('#usageFooterTpl').html()),

    events: {
      'click footer a': 'select'
    },

    initialize: function() {
      this.render();
      this.plot();
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    },
    
    select: function (e) {  
      this.$el.find('footer .active').removeClass('active');
      $(e.currentTarget).addClass('active');
      this.model.graph.type = $(e.currentTarget).data('type');
      var spinner = this.$el.find('.icon-spinner');
      Utils.renderGraph(this, this.$el.find('.icon-spinner'));
    },
    
    plot: function () {
      Utils.renderFooter(this);
      Utils.renderGraph(this, this.$el.find('.icon-spinner'));
    }

  });

  return GraphView;
});

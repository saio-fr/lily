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

    el: '.chat-graph-wrapper',
    template: _.template($('#chatGraphTpl').html()),
    templateFooter: _.template($('#chatFooterTpl').html()),

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
      Utils.renderGraph(this, this.$el.find('.icon-spinner'));
    },
    
    plot: function () {
      Utils.renderFooter(this);
      Utils.renderGraph(this, this.$el.find('.icon-spinner'));
    }

  });

  return GraphView;
});

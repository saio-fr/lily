/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      Utils = require('utils/statistics'),
      g = require('globals'),

      // Object wrapper returned as a module
      StatisticsView;

  StatisticsView = Backbone.View.extend({

    el: '#statistics',
    template: _.template($('#activitiesStatisticsGraphTpl').html()),
    templateFooter: _.template($('#activitiesStatisticsFooterTpl').html()),

    events: {
      'click footer a': 'select',
      'hide.daterangepicker' : 'plot'
    },

    initialize: function() {
      this.render();
      Utils.daterangepicker(this);
      Utils.renderGraph(this);
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    },
    
    select: function (e) {  
      this.$el.find('footer .active').removeClass('active');
      $(e.currentTarget).addClass('active');
      this.model.graph.type = $(e.currentTarget).attr('id');
      Utils.renderGraph(this);
    },
    
    plot: function () {
      Utils.renderGraph(this);
    }

  });

  return StatisticsView;
});

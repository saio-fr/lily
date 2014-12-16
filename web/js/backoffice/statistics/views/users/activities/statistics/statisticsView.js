/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      Utils = require('statistics'),
      g = require('globals'),

      // Object wrapper returned as a module
      StatisticsView;

  StatisticsView = Backbone.View.extend({

    el: '#statistics',
    template: _.template($('#usersActivitiesStatisticsGraphTpl').html()),
    templateFooter: _.template($('#usersActivitiesStatisticsFooterTpl').html()),

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
      this.model.graph.type = $(e.currentTarget).attr('id');
      Utils.renderGraph(this, null);
    },
    
    plot: function () {
      Utils.renderFooter(this);
      Utils.renderGraph(this);
    }

  });

  return StatisticsView;
});

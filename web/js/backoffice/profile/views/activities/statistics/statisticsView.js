/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      Utils = require('statistics'),
      g = require('globals'),

      // Object wrapper returned as a module
      StatisticsView;

  StatisticsView = Backbone.View.extend({

    tagName: 'section',
    className: 'scrollable',
    template: _.template($('#activitiesStatisticsGraphTpl').html()),
    templateFooter: _.template($('#activitiesStatisticsFooterTpl').html()),

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
      $('#statistics').append(this.$el.html(this.template()));
      return this;
    },
    
    select: function (e) {  
      this.$el.find('footer .active').removeClass('active');
      $(e.currentTarget).addClass('active');
      this.model.graph.type = $(e.currentTarget).data('type');
      Utils.renderGraph(this, $('.icon-spinner'));
    },
    
    plot: function () {
      Utils.renderFooter(this);
      Utils.renderGraph(this, $('.icon-spinner'));
    }

  });

  return StatisticsView;
});

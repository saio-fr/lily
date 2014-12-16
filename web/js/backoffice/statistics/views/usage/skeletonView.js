/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      UsageGraphModel = require('backoffice/statistics/models/usage/graphModel'),
      UsageFooterModel = require('backoffice/statistics/models/usage/footerModel'),
      UsageGraphView = require('backoffice/statistics/views/usage/graphView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '#usage',
    template: _.template($('#usageSkeletonTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
      
      // Models & Collection
      var usageGraphModel = new UsageGraphModel();
      var usageFooterModel = new UsageFooterModel();
      
      usage.graphView = new UsageGraphView({model:
        {
          graph: usageGraphModel,
          footer: usageFooterModel
        }
      });
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });

  return SkeletonView;
});

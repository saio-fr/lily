/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      GraphModel = require('backoffice/statistics/models/usage/graphModel'),
      FooterModel = require('backoffice/statistics/models/usage/footerModel'),
      MediaModel = require('backoffice/statistics/models/usage/mediaModel'),
      GraphView = require('backoffice/statistics/views/usage/graphView'),
      MediaView = require('backoffice/statistics/views/usage/mediaView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.usage-wrapper',
    template: _.template($('#usageSkeletonTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
      
      // Models & Collection
      var graphModel = new GraphModel();
      var footerModel = new FooterModel();
      var mediaModel = new MediaModel();
      
      var graphView = new GraphView({
        model: {
          graph: graphModel,
          footer: footerModel
        }
      });
      
      var mediaView = new MediaView({
        model: mediaModel
      });
      
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });

  return SkeletonView;
});

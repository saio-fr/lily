/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      GraphModel = require('backoffice/statistics/models/chat/graphModel'),
      FooterModel = require('backoffice/statistics/models/chat/footerModel'),
      GraphView = require('backoffice/statistics/views/chat/graphView'),
      
      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.chat-wrapper',
    template: _.template($('#chatSkeletonTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
          
      // Models & Collection
      var graphModel = new GraphModel();
      var footerModel = new FooterModel();
      
      var graphView = new GraphView({
        model: {
          graph: graphModel,
          footer: footerModel
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

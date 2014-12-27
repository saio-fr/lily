/*========================================
      DASHBOARD SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

	  tagName: 'section',
    className: 'js-dashboard-container hbox stretch hide',
    template: _.template($('#dashboardSkeletonTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template());
      this.$el.appendTo('.js-main-container');
      return this;
    }

  });

  return SkeletonView;
});

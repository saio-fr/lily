/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.aside-activities',
    template: _.template($('#activitiesSkeletonTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });

  return SkeletonView;
});

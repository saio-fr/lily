/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '#avi',
    template: _.template($('#aviSkeletonTpl').html()),

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

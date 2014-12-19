/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      CategoriesView;

  CategoriesView = Backbone.View.extend({

    el: '.avi-wrapper .top-categories-wrapper',
    template: _.template($('#aviTopCategoriesTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template({
        categories: this.collection.toJSON()
      }));
      return this;
    }

  });

  return CategoriesView;
});

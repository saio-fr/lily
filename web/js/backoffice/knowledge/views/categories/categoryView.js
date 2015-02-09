/*======================================
              Category View
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),

    // Object wrapper returned as a module
    QuestionView;

  QuestionView = Backbone.View.extend({

    tagName: "li",

    template: _.template($('#categoriesCategoryTpl').html()),

    events: {
      'click .icon-angle-down' : 'dropdown',
      'click .icon-angle-up' : 'dropup',
      'click .category-parent' : 'select'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    dropdown: function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.$el.find('.icon-angle-down')
        .first().addClass('icon-angle-up')
        .removeClass('icon-angle-down');
      this.$el.find('ul').first().removeClass('hide');
    },
    
    dropup: function(e) {
      
      e.preventDefault();
      e.stopImmediatePropagation(); 
      
      this.$el.find('.icon-angle-up')
        .first().addClass('icon-angle-down')
        .removeClass('icon-angle-up');
      this.$el.find('ul').first().addClass('hide');     
    },
    
    select: function (e) {
      
      e.preventDefault();
      e.stopImmediatePropagation();
      
      if (this.$el.attr('checked')) {
        
        this.$el.find('.icon-check-sign')
          .toggleClass('icon-check-sign icon-sign-blank');
          this.$el.attr('checked', false);
          app.trigger('questions:categories:unselect', this.model.get('id'));
      } else {
        
        this.$el.find('.icon-sign-blank')
          .toggleClass('icon-sign-blank icon-check-sign');
          this.$el.attr('checked', true);
          app.trigger('questions:categories:select', this.model.get('id'));  
      }
    },

    destroy: function() {
      this.model.destroy();
      this.remove();
    }

  });

  return QuestionView;
});

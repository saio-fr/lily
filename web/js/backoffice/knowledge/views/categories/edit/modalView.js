/*======================================
          MODAL CATEGORIES
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    EditSkeletonView = require('backoffice/knowledge/views/categories/edit/skeletonView'),
    CategoryView = require('backoffice/knowledge/views/categories/edit/categoryView'),

    // Object wrapper returned as a module
    ModalCategories;


  ModalCategories = Backbone.View.extend({

    attributes: {
      'tabindex': -1,
      'role': 'dialog',
      'aria-labelledby': 'close',
      'aria-hidden': 'true'
    },
    className: 'modal',
    template: _.template($('#modalAppTpl').html()),

    events: {
      'click': 'remove'
    },

    initialize: function(options) {
      this.appendEl = options.appendEl;
      this.childViews = new Backbone.ChildViewContainer();

      this.render();
      this.$el.modal('show');
    },

    render: function() {
      var container = $(this.appendEl);
      var self = this;

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.prependTo(container);
/*

      this.collection.each(function(category) { // iterate through the collection
        var view = new CategoryView({
          model: category
        });
        self.childViews.add(view);
        self.$el.find('.js-modal-categories-list').append(view.el);
      });

      return this;
*/
    },

    remove: function(e) {
      if (e.target.classList.contains('modal-backdrop')) {

        // Bootstrap modal plugin takes care of the displaying non stuff,
        // so we just remove the view and model.
        var self = this;
        this.childViews.forEach(function(view) {
          // delete index for that view
          self.childViews.remove(view);
          // remove the view
          view.remove();
        });
        this.model.destroy();
        Backbone.View.prototype.remove.call(this);
      }
    }

  });

  return ModalCategories;
});

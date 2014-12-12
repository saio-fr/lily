/*========================================
    Liste FAQs
  =========================================*/


define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      CategoryView = require('backoffice/faq/views/categoryView'),
      ContentView = require('backoffice/faq/views/contentView'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),

      FaqCollectionView;

  FaqCollectionView = Backbone.View.extend({

    tagName: 'ul',

    className: 'js-faq-list list-group list-group-sp sortable',

    initialize: function () {

      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo( this.collection, 'add', this.add );

      this.childViews = new Backbone.ChildViewContainer();

      this.render();
    },

    render: function () {
      // render this view;
      $("#faq-list").prepend(this.$el);
      // Render subviews
      this.collection.each(this.add, this);
      return this;
    },

    add: function (model) {

      var view;

      if (model.get('type') === 'category') {
        view = new CategoryView({ model: model });
      } else {
        view = new ContentView({ model: model });
      }

      this.childViews.add(view);
      this.$el.append(view.render().el);
      // bind drag events again on new list
      if (this.childViews.length === this.collection.length) {
        this.makeSortable();
      }
    },

    closeChildren: function () {
      this.childViews.forEach(function (view){
        // delete index for that view
        this.remove(view);
        // remove the view
        view.remove();
      });
      // Reset index of child views
      this.childViews = [];
    },

    makeSortable: function () {
      $('.js-faq-list')
        .off('sortupdate', this.triggerDrop)
        .sortable('destroy')
        // Unbind before rebinding to avoid shadow events
        .sortable()
        .on('sortupdate', this.triggerDrop);
    },

    triggerDrop: function (e, el) {
      if (el && el.item) {
        el.item.trigger('dropped', el.item.index());
      }
    },

    close: function () {
      this.closeChildren();
      $('.js-faq-list')
        .off('sortupdate', this.triggerDrop)
        .sortable('destroy');
      this.remove();
    }
  });

  return FaqCollectionView;
});
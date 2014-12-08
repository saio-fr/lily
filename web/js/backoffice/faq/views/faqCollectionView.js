/*========================================
    Liste FAQs
  =========================================*/


define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      CategoryView = require('backoffice/faq/views/categoryView'),
      ContentView = require('backoffice/faq/views/contentView'),

      FaqCollectionView;

  FaqCollectionView = Backbone.View.extend({

    tagName: 'ul',

    className: 'js-faq-list list-group list-group-sp sortable',

    initialize: function () {

      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo( this.collection, 'add', this.add );

      this.childViews = [];

      this.render();

      $('.js-faq-list')
        .sortable()
        .bind( 'sortupdate', function(e, ui) {
          ui.item.trigger('dropped', ui.item.index());
        });
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

      this.childViews.push(view);
      this.$el.append(view.render().el);
    },

    closeChildren: function () {
      this.childViews.forEach(function (view){
        view.remove();
      });
      // Reset index of child views
      this.childViews = [];
    },
  });

  return FaqCollectionView;
});
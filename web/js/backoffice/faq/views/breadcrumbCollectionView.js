/*========================================
    Liste BREADCRUMBs
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      BreadcrumbView = require('backoffice/faq/views/breadcrumbView'),

      // Object wrapper returned as a module
      BreadcrumbsView;

  BreadcrumbsView = Backbone.View.extend({

    className: 'breadcrumb m-n',

    tagName: 'ul',

    initialize: function () {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo( this.collection, 'add', this.add );

      this.childViews = [];
      this.render();
    },

    render: function () {
      // render this view;
      $("#breadcrumbs").html(this.$el);
      // render subviews;
      this.collection.each(this.add, this);
      // set last as active;
      $('.breadcrumb li:last-child').addClass('active');
      return this;
    },

    add: function (model) {

      var view = new BreadcrumbView({
        model: model,
      });

      this.childViews.push(view);
      this.$el.prepend(view.render().el);
    },

    closeChildren: function () {

      this.childViews.forEach(function (view) {
        view.remove();
      });
      // Reset index of child views
      this.childViews = [];
    },

  });

  return BreadcrumbsView;
});

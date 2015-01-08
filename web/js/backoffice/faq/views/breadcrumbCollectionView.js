/*========================================
    Liste BREADCRUMBs
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      BreadcrumbView = require('backoffice/faq/views/breadcrumbView'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),

      // Object wrapper returned as a module
      BreadcrumbsView;

  BreadcrumbsView = Backbone.View.extend({

    className: 'breadcrumb',
    tagName: 'ul',

    initialize: function () {

      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo( this.collection, 'add', this.add );

      this.childViews = new Backbone.ChildViewContainer();
      this.render();
    },

    render: function () {

      // render this view;
      $(".js-breadcrumbs-container").html(this.$el);
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

      this.childViews.add(view);
      this.$el.prepend(view.render().el);
    },

    closeChildren: function () {

      var self = this;
      this.childViews.forEach(function (view){
        // delete index for that view
        self.childViews.remove(view);
        // remove the view
        view.remove();
      });
    },

  });

  return BreadcrumbsView;
});

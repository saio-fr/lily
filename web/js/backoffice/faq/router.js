/*========================================
    Router
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      app = require('app'),
      SkeletonView = require('backoffice/faq/views/skeletonView'),
      FaqCollectionView = require('backoffice/faq/views/faqCollectionView'),
      BreadcrumbCollectionView = require('backoffice/faq/views/breadcrumbCollectionView'),
      BreadcrumbCollection = require('backoffice/faq/collections/breadcrumbCollection'),
      FaqCollection = require('backoffice/faq/collections/faqCollection'),

      // Object wrapper returned as a module
      AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      "" : "category",
      "category/:id" : "category",
    },

    initialize: function () {

      app.skeleton = new SkeletonView();
      app.faqCollection = new FaqCollection();
      app.breadcrumbs = new BreadcrumbCollection();
    },

    category: function (id) {
      this.showView(id);
    },

    showView: function (id) {

      id = typeof id !== "undefined" ? id : "";

      if (typeof app.faqCollectionView !== 'undefined') {
        app.faqCollectionView.closeChildren();
      }

      if (typeof(app.breadcrumbsView) !== 'undefined') {
        app.breadcrumbsView.closeChildren();
      }

      app.faqCollection.url = "/rest/" + id;
      app.breadcrumbs.url = "/breadcrumbs/" + id;

      // Fetch breadcrumb models and init view
      app.breadcrumbs.fetch({
        reset: true,
        success: function() {
          app.breadcrumbsView = app.breadcrumbsView ||
            new BreadcrumbCollectionView({
              collection: app.breadcrumbs
            });

          fetchItems();
        }
      });

      // Fetch faq models and init view.
      function fetchItems () {
        app.faqCollection.fetch({
          reset: true,
          success: function() {
            app.faqCollectionView = app.faqCollectionView ||
              new FaqCollectionView({
                collection: app.faqCollection
              });
          }
        });
      }
    }

  });

  return AppRouter;
});

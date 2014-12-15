/*========================================
    Router
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      app = require('app'),
      globals = require('backoffice/globals'),
      SkeletonView = require('backoffice/faq/views/skeletonView'),
      FaqCollectionView = require('backoffice/faq/views/faqCollectionView'),
      BreadcrumbCollectionView = require('backoffice/faq/views/breadcrumbCollectionView'),
      BreadcrumbCollection = require('backoffice/faq/collections/breadcrumbCollection'),
      FaqCollection = require('backoffice/faq/collections/faqCollection'),
      ModalView = require('components/modals/modalAlertView'),
      ModalModel = require('components/modals/modalAlertModel'),


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

      var self = this;
      id = id  || null;

      if (app.faqCollectionView) {
        app.faqCollectionView.closeChildren();
      }

      if (app.breadcrumbsView) {
        app.breadcrumbsView.closeChildren();
      }

      if (app.contentEditView) {
        app.contentEditView.remove();
        app.contentEditView = null;
      }

      app.faqCollection.url = "/" + id;
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
        }, error: function () {
          app.router.navigate('/', {trigger: true});
          self.notFound();
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
    },

    notFound: function () {
      // Show modal with error:
      var modalModel = new ModalModel(globals.modalAlert.faq);

      if (app.skeleton.modalView) {
        app.skeleton.modalView.remove();
      }
      app.skeleton.modalView = new ModalView({
        model: modalModel,
        appendEl: "#faq"
      });
    }

  });

  return AppRouter;
});

/*========================================
    Router
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    app = require('backoffice/app'),
    config = require('config'),
    SkeletonView = require('backoffice/faq/views/skeletonView'),
    FaqCollectionView = require('backoffice/faq/views/faqCollectionView'),
    BreadcrumbCollectionView = require('backoffice/faq/views/breadcrumbCollectionView'),
    BreadcrumbCollection = require('backoffice/faq/collections/breadcrumbCollection'),
    FaqCollection = require('backoffice/faq/collections/faqCollection'),


    // Object wrapper returned as a module
    AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'category',
      'category/:id': 'category',
    },

    initialize: function() {

      app.skeleton = new SkeletonView();
      app.skeleton.faqCollection = new FaqCollection();
      app.skeleton.breadcrumbs = new BreadcrumbCollection();
    },

    category: function(id) {
      this.showView(id);
      app.trackPageView('Faq page, id: ' + id || '');
    },

    showView: function(id) {

      var self = this;
      id = id || null;

      if (app.skeleton.faqCollectionView) {
        app.skeleton.faqCollectionView.closeChildren();
      }

      if (app.skeleton.breadcrumbsView) {
        app.skeleton.breadcrumbsView.closeChildren();
      }

      if (app.skeleton.contentEditView) {
        app.skeleton.closeEditView();
      }

      app.skeleton.faqCollection.url = '/faqs/' + id;
      app.skeleton.breadcrumbs.url = '/faqs/breadcrumbs/' + id;

      // Fetch breadcrumb models and init view
      app.skeleton.breadcrumbs.fetch({
        reset: true,
        success: function() {
          app.skeleton.breadcrumbsView = app.skeleton.breadcrumbsView ||
            new BreadcrumbCollectionView({
              collection: app.skeleton.breadcrumbs
            });

          fetchItems();
        },

        error: function(model, err) {
          app.router.navigate('/', {
            trigger: true
          });
          if (err.status === 404) {
            self.notFound();
          }
        }
      });

      // Fetch faq models and init view.
      function fetchItems() {
        app.skeleton.faqCollection.fetch({
          reset: true,
          success: function() {
            app.skeleton.faqCollectionView = app.skeleton.faqCollectionView ||
              new FaqCollectionView({
                collection: app.skeleton.faqCollection
              });
          }
        });
      }
    },

    notFound: function() {
      // Show modal with error:
      var modal = app.createModal.alert(config.modalAlert.faq);
    }

  });

  return AppRouter;
});

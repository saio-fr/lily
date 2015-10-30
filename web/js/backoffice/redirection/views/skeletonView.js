/*========================================
      Redirection View
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    RedirectionCollectionView = require('backoffice/redirection/views/redirectionCollectionView'),
    RedirectionEditView = require('backoffice/redirection/views/redirectionEditView'),
    RedirectionCollection = require('backoffice/redirection/collections/redirectionCollection'),
    config = require('config'),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    initialize: function() {

      this.fetchRedirections();
      app.on('itemView:select', this.onSelectItem, this);
      app.on('itemView:deletePrevented', this.onDeletePrevented, this);
    },

    fetchRedirections: function() {

      var collection = new RedirectionCollection(),
        listView;

      collection.fetch({
        success: function() {
          listView = new RedirectionCollectionView(collection);
        }
      });

      this.collection = collection;
    },

    onSelectItem: function(model) {
      // Rerender edit view
      if (this.editView) {
        this.editView.remove();
      }

      this.editView = new RedirectionEditView({
        model: model
      });
      $('.js-main-container').append(this.editView.render().el);
    },

    onDeletePrevented: function() {
      app.createModal.alert(config.modalAlert.redirection);
    },

    getActiveItem: function() {

      return this.collection.where({
        'bydefault': true
      });
    },

    close: function() {

      app.off('itemView:select', this.selectItem, this);
      this.remove();
    }

  });

  return SkeletonView;
});

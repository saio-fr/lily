/*========================================
      Redirection View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      RedirectionCollectionView = require('backoffice/redirection/views/redirectionCollectionView'),
      RedirectionEditView = require('backoffice/redirection/views/redirectionEditView'),
      RedirectionCollection = require('backoffice/redirection/collections/redirectionCollection'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    initialize: function () {

      this.fetchRedirections();
      app.on('itemView:select', _.bind(this.selectItem, this));
    },

    fetchRedirections: function () {

      var collection = new RedirectionCollection();

      collection.fetch({
        success: function () {
          var listView = new RedirectionCollectionView(collection);
        }
      });

      this.collection = collection;
    },

    selectItem: function (model) {

      var editView = new RedirectionEditView(model);
      return editView;
    },

    getActiveItem: function () {

      return this.collection.where({ 'bydefault': true });
    },

    close: function () {

      app.off('itemView:select', _.bind(this, this.selectItem));
      this.remove();
    }

  });

  return SkeletonView;
});


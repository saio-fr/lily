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
      globals = require('backoffice/globals'),
      ModalView = require('components/modals/alertView'),
      ModalModel = require('components/modals/model'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    initialize: function () {

      this.fetchRedirections();
      app.on('itemView:select', this.onSelectItem, this);
      app.on('itemView:deletePrevented', this.onDeletePrevented, this);
    },

    fetchRedirections: function () {

      var collection = new RedirectionCollection(),
          listView;

      collection.fetch({
        success: function () {
          listView = new RedirectionCollectionView(collection);
        }
      });

      this.collection = collection;
    },

    onSelectItem: function (model) {
      // Rerender edit view
      if (this.editView) {
        this.editView.remove();
      }
      this.editView = new RedirectionEditView({model: model});
      $('.js-main-container').append(this.editView.render().el);
    },

    onDeletePrevented: function () {

      var modalModel = new ModalModel(globals.modalAlert.redirection);

      this.modalView = new ModalView({
        model: modalModel ,
        appendEl: ".js-app"
      });
      this.modalView.$el.modal('show');
    },

    getActiveItem: function () {

      return this.collection.where({ 'bydefault': true });
    },

    close: function () {

      app.off('itemView:select', this.selectItem, this);
      this.remove();
    }

  });

  return SkeletonView;
});


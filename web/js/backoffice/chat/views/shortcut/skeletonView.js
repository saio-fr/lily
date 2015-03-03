/*========================================
      Shortcut skeleton View
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    ListView = require('backoffice/chat/views/shortcut/listView'),
    EditView = require('backoffice/chat/views/shortcut/editView'),
    Collections = require('backoffice/chat/data/collections'),
    globals = require('globals'),
    ModalView = require('components/modals/alertView'),
    ModalModel = require('components/modals/model'),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({
    
    tagName: 'section',
    className: 'hbox stretch',
    
    template: _.template($('#shortcutsSkeletonTpl').html()),

    initialize: function() {
      this.listenTo(app, 'itemView:select', this.onSelectItem);
      this.render();
      this.fetchShortcuts();
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    },

    fetchShortcuts: function() {

      this.collection = new Collections.Shortcuts();
      
      this.collection.fetch({
        success: function() {
          var listView = new ListView(this.collection);
        }
      });
    },

    onSelectItem: function(model) {
      // Rerender edit view
      if (this.editView) {
        this.editView.remove();
      }
      this.editView = new EditView({
        model: model
      });
      $('.js-skeleton-container').append(this.editView.render().el);
    }

  });

  return SkeletonView;
});

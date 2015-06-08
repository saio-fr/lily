/*========================================
      Shortcut skeleton View
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    ListView = require('backoffice/chat/views/shortcut/listView'),
    EditView = require('backoffice/chat/views/shortcut/editView'),
    Collections = require('backoffice/chat/data/collections'),
    globals = require('globals'),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({
    
    tagName: 'section',
    
    template: _.template($('#shortcutsSkeletonTpl').html()),

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.render();
      this.fetchShortcuts();
      
      this.listenTo(app, 'itemView:select', this.onSelectItem);
    },
    
    render: function () {
      $('.js-skeleton-container').append(this.$el.html(this.template()));
      return this;
    },

    fetchShortcuts: function() {
      var that = this;
      this.collection = new Collections.Shortcuts();
      
      this.collection.fetch({
        success: function() {
          var listView = new ListView({
            collection: that.collection
          });
          that.childViews.add(listView);
        }
      });
    },

    onSelectItem: function(model) {
      var editView = this.childViews.findByCustom('editView');
      
      if (editView) {
        this.childViews.remove(editView);
        editView.remove();
      }
      // Rerender edit view
      editView = new EditView({
        model: model
      });
      this.childViews.add(editView, 'editView');
      $('.js-shortcuts').append(editView.render().el);
    },
    
    remove: function () {
      var that = this;
      
      this.childViews.forEach(function (view){
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return SkeletonView;
});

/*========================================
            SUGGESTIONS VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    app = require('app'),
    _ = require('underscore'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    SuggestionsItemView = require('components/chat/views/shell/suggestionsItemView'),
    
    // Object wrapper returned as a module
    SuggestionsView;

  SuggestionsView = Backbone.View.extend({

    el: '.js-suggestions-container',
    template: _.template($('#liveConversationShellSuggestionsListTpl').html()),

    events: {
    },

    initialize: function() {
      this.collection = new Backbone.Collection();
      this.childViews = new Backbone.ChildViewContainer();
      this.listenTo(this.collection, 'add change remove', this.render);
    },

    render: function() {

      this.$el.html(this.template({
        type: this.type
      }));
      this.renderItems();
      return this;
    },
    
    renderItems: function () {
      
      var that = this;
      
      this.collection.each(function (item) {
        var view = new SuggestionsItemView({
          model: item
        });
        $('.js-suggestions-list').append(view.$el);
        that.childViews.add(view);
      });
    },
    
    setType: function (type) {
      this.type = type;
    },

    remove: function () {
      
      var that = this;
      
      this.childViews.forEach(function (view) {
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return SuggestionsView;
});

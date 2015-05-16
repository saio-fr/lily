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
      this.selectFirstItem();
      return this;
    },
    
    renderItems: function () {
      
      var that = this;
      this.removeChildren();

      this.collection.each(function (item) {
        var view = new SuggestionsItemView({
          model: item
        });
        that.$('.js-suggestions-list').append(view.$el);
        that.childViews.add(view);
      });
    },
    
    setCollection: function (options) {
      
      this.type = options.type;
      this.collection.set(options.suggestions);
      
      if (options.suggestions.length) {
        this.show();
      } else {
        this.hide();
      }
    },    
    
    selectFirstItem: function () {
      if (this.collection.length) {   
             
        this.collection.at(0).trigger('suggestions:focus');
              
        // The id of the current focused model in suggestions list
        this.selectedId = 0;
      }
    },
    
    selectNextItem: function () {

      this.selectedId += 1;
    
      if (this.selectedId > this.collection.length - 1) {
        this.selectedId = 0;
      }

      this.collection.at(this.selectedId).trigger('suggestions:focus');
    },

    selectPrevItem: function () {
      
      this.selectedId -= 1;
      
      if (this.selectedId < 0) {
        this.selectedId = this.collection.length - 1;
      }

      this.collection.at(this.selectedId).trigger('suggestions:focus');      
    },
    
    show: function () {
      this.$el.removeClass('hide');
      
      // Listen to click outside the shell
      var that = this;
      $('body').click(function (e) {
        
        if (!$(e.target).parents('.conversation-footer').length || 
          targetParentFooterId !== parentFooterId) {
          
          that.hide();
          
        } else {
          
          var parentFooterId = that.$el.parents('.conversation-footer').attr('id'),  
              targetParentFooter = $(e.target).parents('.conversation-footer'),
              targetParentFooterId = targetParentFooter.attr('id');
          
          if (parentFooterId !== targetParentFooterId) {
            that.hide();
          }   
        }
      });
    },
    
    hide: function () {
      this.$el.addClass('hide');
      $('body').off('click'); 
    },
    
    removeChildren: function () {
      
      var that = this;
      
      this.childViews.forEach(function (view) {
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
    },

    remove: function () {
      this.removeChildren();
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return SuggestionsView;
});

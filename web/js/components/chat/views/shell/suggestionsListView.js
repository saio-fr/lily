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
      this.listenTo(this.collection, 'add remove', this.render);
      this.listenTo(this.collection, 'shell:suggestions:select', this.onItemSelect);
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
      if (this.collection.length) {
        this.changeFocus(0);        
      }
      this.selectedId = 0;
    },
    
    onItemSelect: function (model) {
      var id = this.collection.indexOf(model);
      this.selectedId = id;
      this.changeFocus(id);
    },
    
    changeFocus: function (id) {
      this.collection.invoke('set', {focused: false});
      this.collection.at(id).set({focused: true});
    },
    
    selectNextItem: function () {
      
      if (this.collection.length) {
        this.selectedId = (this.selectedId >= this.collection.length - 1) ? 0 : this.selectedId + 1;
        app.trigger('shell:suggestions:select', this.collection.at(this.selectedId).attributes);
        this.changeFocus(this.selectedId);
      }
    },

    selectPrevItem: function () {
      
      if (this.collection.length) {
        this.selectedId = (this.selectedId <= 0) ? this.collection.length - 1 : this.selectedId - 1;
        app.trigger('shell:suggestions:select', this.collection.at(this.selectedId).attributes);
        this.changeFocus(this.selectedId);          
      }    
    },
    
    getSelectedItem: function () {
      return this.collection.at(this.selectedId).attributes;
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

/*========================================
          SUGGESTION ITEM VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    app = require('app'),
    _ = require('underscore'),
    
    // Object wrapper returned as a module
    SuggestionView;

  SuggestionView = Backbone.View.extend({

    tagName: 'li',
    className: 'suggestions-item',
    template: _.template($('#liveConversationShellSuggestionsItemTpl').html()),

    events: {
      'mouseover' : 'onSelect',
      'click' : 'onValidate'
    },

    initialize: function() {
      this.listenTo(this.model, 'change:focused', this.onFocus);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    onFocus: function () {
      if (this.model.get('focused')) {
        $('.js-suggestions-list .focus').removeClass('focus');
        this.$el.addClass('focus');
        
        var toScroll = $('.suggestions-content');
        var top = this.$el.position().top;

        if (top > 182) {
          toScroll.scrollTop(toScroll.scrollTop() + top - 180);
        }
        
        if (top < 32) {
          toScroll.scrollTop(toScroll.scrollTop() + top - 32);
        }
      }  
    },
    
    onSelect: function () {
      this.model.trigger('shell:suggestions:select', this.model);
      app.trigger('shell:suggestions:select', this.model.attributes);
    },
    
    onValidate: function (e) {
      app.trigger('shell:suggestions:validate');
    }

  });

  return SuggestionView;
});

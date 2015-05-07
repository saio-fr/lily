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
      'mouseover' : 'onFocus',
      'click' : 'onValidate'
    },

    initialize: function() {
      this.listenTo(this.model, 'suggestions:focus', this.onFocus);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    onFocus: function () {
      
      $('.js-suggestions-list .focus').removeClass('focus');
      this.$el.addClass('focus');
      
      app.trigger('shell:suggestions:focus', this.model.attributes);
    },
    
    onValidate: function (e) {
      app.trigger('shell:suggestions:validate');
    }

  });

  return SuggestionView;
});

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

    className: 'suggestions-item',
    template: _.template($('#liveConversationShellSuggestionsItemTpl').html()),

    events: {
      'hover' : 'onHoverSelect',
      'keypress' : 'onKeypressRemove'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    onHoverSelect: function () {
    },
    
    onKeypressRemove: function (e) {
      this.remove();
    }

  });

  return SuggestionView;
});

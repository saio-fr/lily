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

    template: _.template($('#liveConversationShellSuggestionsListTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return SuggestionView;
});

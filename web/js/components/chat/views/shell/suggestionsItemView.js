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
      'mouseover' : 'onMouseoverSelect',
      'click' : 'onClickSelect'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    onMouseoverSelect: function (e) {

      $('.js-suggestions-list .selected').removeClass('selected');
      this.$el.addClass('selected');
      
      var commandTitle = this.model.get('title');
      app.trigger('shell:suggestions:mouseover', commandTitle);
    },
    
    onClickSelect: function (e) {
      var commandTitle = this.model.get('title');
      app.trigger('shell:suggestions:enter', commandTitle);
    }

  });

  return SuggestionView;
});

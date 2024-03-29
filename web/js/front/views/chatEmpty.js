
define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _        = require('underscore'),

      // Object wrapper returned as a module
      ChatEmptyView;

  ChatEmptyView = Backbone.View.extend({

    className: 'lily-empty-wrapper lily-chat-empty-wrapper',
    template: _.template($('#chat-empty').html()),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('#chat-box-messages');
      return this;
    },
  });

  return ChatEmptyView;
});

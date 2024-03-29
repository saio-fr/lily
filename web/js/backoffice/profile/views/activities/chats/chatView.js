/*========================================
      ACTIVITIES CHAT VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
    ChatDetailsView = require('backoffice/profile/views/activities/chats/detailsView'),

    // Object wrapper returned as a module
    ChatView;

  ChatView = Backbone.View.extend({

    tagName: 'li',
    className: 'list-group-item view',
    template: _.template($('#activitiesChatsChatTpl').html()),

    events: {
      'click': 'select'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      $('.conversations-list').append(this.$el);
      return this;
    },

    select: function(e) {
      e.preventDefault();

      this.$el.parent().find('li.active').removeClass('active');
      this.$el.addClass('active');

      if (typeof app.skeleton.activities.chatDetails !== 'undefined') {
        app.skeleton.activities.chatDetails.remove();
      }
      app.skeleton.activities.chatDetails = new ChatDetailsView({
        model: this.model
      });
      $('.conversation-details').removeClass('hide');

    }

  });

  return ChatView;
});

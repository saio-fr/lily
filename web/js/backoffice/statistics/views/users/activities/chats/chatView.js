/*========================================
      ACTIVITIES CHAT VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      ChatDetailsView = require('backoffice/statistics/views/users/activities/chats/detailsView'),

      // Object wrapper returned as a module
      ChatView;

  ChatView = Backbone.View.extend({

    tagName:  'li',
    className: 'list-group-item view',
    template: _.template($('#usersActivitiesChatsChatTpl').html()),

    events: {
      'click' : 'select'
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      $('.conversations-list').append(this.$el);
      return this;
    },
    
    select: function(e) {
      e.preventDefault();
  
      this.$el.parent().find('li.active').removeClass('active');
      this.$el.addClass('active');
      
      if (typeof app.skeleton.users.chatDetails !== 'undefined') {
        app.skeleton.users.chatDetails.remove();
      }
      app.skeleton.users.chatDetails = new ChatDetailsView({model: this.model});
      $('.conversation-details').removeClass('hide');
      
    }

  });

  return ChatView;
});

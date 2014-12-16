/*========================================
      ACTIVITIES SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      utils = require('statistics'),
      ChatView = require('backoffice/profile/views/activities/chats/chatView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '#chats',
    template: _.template($('#activitiesChatsSkeletonTpl').html()),

    events: {
      'hide.daterangepicker' : 'range',
      'click .sort-menu li': 'sort'
    },

    initialize: function() {
      this.$el.html(this.template());
      utils.daterangepicker(this);
      var that = this;
      this.render();
    },
    
    render: function () {
      $('.conversations-list').empty();
      this.collection.each(this.add, this);
	    if (!this.collection.length) {
		    $('.conversations-list').html('<li class="list-group-item view"><h6>Aucune conversations.</h6></li>');
	    }
      $('.loader').fadeOut();
    },
    
    add: function (chat) {
      this.view = new ChatView({model: chat});
      $('.conversations-list').append(this.view.render().el);
    },
    
    range: function () {
      var that = this;
      $('.loader').fadeIn();   
      this.collection.fetch({          
        success: function() {
          $('.conversation-details').addClass('hide');
          that.render();
        }   
      });
    },
    
    sort: function(e) { 
      var target = $(e.target);

      target.parent().find('.active').removeClass('active');
      target.addClass('active');

      this.collection.sortCriteria = target.data('criteria');
      this.collection.sort();
      this.render();
    },

  });

  return SkeletonView;
});

/*========================================
      ACTIVITIES SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      utils = require('statistics-flot'),
      ChatView = require('backoffice/statistics/views/users/activities/chats/chatView'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '#users-chats-skeleton',
    template: _.template($('#usersActivitiesChatsSkeletonTpl').html()),

    events: {
      'hide.daterangepicker' : 'range',
      'click .sort-menu li': 'sort'
    },

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.$el.html(this.template());
      utils.daterangepicker(this);
      var that = this;
      this.render();
    },
    
    render: function () {
      this.closeChildren();
      $('.conversations-list').empty();

      this.collection.each(this.add, this);
	    if (!this.collection.length) {
		    $('.conversations-list').html('<li class="list-group-item view"><h6>Aucune conversation.</h6></li>');
	    }
      $('.loader').fadeOut();
    },
    
    add: function (chat) {
      var view = new ChatView({model: chat});
      this.childViews.add(view);
      $('.conversations-list').append(view.render().el);
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
    
    closeChildren: function () {

      var self = this;
      this.childViews.forEach(function (view){
        // delete index for that view
        self.childViews.remove(view);
        // remove the view
        view.remove();
      });
    }

  });

  return SkeletonView;
});

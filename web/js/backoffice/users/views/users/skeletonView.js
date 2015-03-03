/*========================================
      SKELETON APP VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      UserModel = require('backoffice/users/models/userModel'),
      UsersView = require('backoffice/users/views/users/usersView'),
      UserEditView = require('backoffice/users/views/users/userEditView'),
      GroupsButtonView = require('backoffice/users/views/users/groupsButtonView'),
      g = require('globals'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'vbox',
    template: _.template($('#usersSkeletonTpl').html()),

    events: {
      'click .add-user' : 'create',
      'click .sort-menu li': 'sort',
      'click .groups-widget' : 'openGroupsWidget',
      'click .groups-widget .update' : 'openGroupsWidget'
    },

    initialize: function () {
      this.childViews = new Backbone.ChildViewContainer();
      this.render();
      
      this.listenTo(this.collection, 'add remove', this.checkMaxUsers);
    },
    
    render: function () {
      $('.js-skeleton-container').append(this.$el.html(this.template()));
    
      $('.nav-tabs li').removeClass('active');
      $('.users-nav').addClass('active');
      
      var groupsButtonView = new GroupsButtonView({
        collection: app.groupCollection
      });
      this.childViews.add(groupsButtonView);
      
      var usersView = new UsersView({
        collection: this.collection
      });
      this.childViews.add(usersView);
      
      return this;
    },

    create: function () {
      app.trigger('closeEditView', this);

      var userModel = new UserModel({ 'converted.avatar': g.avatarUrl });
      var editView = new UserEditView({model: userModel});

      $('#user-list .active').removeClass('active');
    },

    sort: function(e) { 
      var target = $(e.target);

      target.parent().find('.active').removeClass('active');
      target.addClass('active');
      
      // Listen in userCollection
      app.trigger("users:sort", target.data('criteria'));
    },
    
    closeGroupsWidget: function () {
      // Close the dropdown
      $('.groups-widget').removeClass('open');
      $('body').unbind('click');
    },
    
    openGroupsWidget: function (e) {
      
      var that = this;
      var btn = this.$el.find('.groups-widget');
      btn.addClass('open');
    
      // Listen to click outside of the .groups-widget dropdown
      $('body').off().on('click', function (e) {
        
        if ($(e.target).hasClass('btn-update')) {
          
          var groups = [];
          
          $('.groups-widget .checkbox input').each(function (key, item) {
            if ($(item).is(':checked')) {
              groups.push($(item).data('id'));
              $(item).prop('checked', false);
            }
          });
          
          app.trigger('users:groups:update', groups);
          that.closeGroupsWidget();
        }
        
        if (!$(e.target).parents('.groups-widget').length) {
          that.closeGroupsWidget();
        }
      });
    },
    
    checkMaxUsers: function () {

      if (this.collection.length >= g.maxusers) {
        
        $('.max-users-reached-alert').show();
        $('.users-counter').addClass('with-alert');
        $('.groups-widget').addClass('with-alert');
        $('.add-user').hide();
      } else {

        $('.max-users-reached-alert').hide();
        $('.users-counter').removeClass('with-alert');
        $('.groups-widget').removeClass('with-alert');
        $('.add-user').show();
      }

      this.counter = this.collection.length +
        (this.collection.length <= 1 ? " compte utilisé" : " comptes utilisés") +
        " sur " + g.maxusers +
        (g.maxusers <= 1 ? " disponible" : " disponibles");

      $('.users-counter').text(this.counter);

    },
    
    remove: function () {

      var that = this;
      
      this.childViews.forEach(function (view){
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this, arguments);
    }
  });

  return SkeletonView;
});

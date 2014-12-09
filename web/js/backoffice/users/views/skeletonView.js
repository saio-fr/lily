/*========================================
      USER MANAGEMENT APP VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      UserModel = require('backoffice/users/models/userModel'),
      UserEditView = require('backoffice/users/views/userEditView'),
      g = require('globals'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '#wrapper',
    template: _.template($('#skeletonTpl').html()),
    editedUserId : null,

    events: {
      "click .add-user"   : "create",
      'click .sort-menu li': 'sort',
    },

    initialize: function() {
      this.render();
      this.checkMaxUsers();
    },
    
    render: function () {
      this.$el.removeClass('hide');
      this.$el.html(this.template());

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
      app.trigger("skeleton:sort", target.data('criteria'));
    },

    checkMaxUsers: function() {
      if( this.collection.length >= g.maxusers ) {
        $('.max-users-reached-alert').show();
        $('.add-user').hide();
      } else {
        $('.max-users-reached-alert').hide();
        $('.add-user').show();
      }

      this.counter = this.collection.length +
        (this.collection.length <= 1 ? " compte" : " comptes") +
        " sur " + g.maxusers +
        (g.maxusers <= 1 ? " disponible" : " disponibles");

      $('.users-counter').text(this.counter);

    },

    close: function () {
      utils.closeModelView(this);
    }
  });

  return SkeletonView;
});

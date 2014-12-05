/*========================================
      USER MANAGEMENT APP VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      globals = require('globals'),
      UserModel = require('backoffice/users/models/userModel'),
      UserEditView = require('backoffice/users/views/userEditView'),

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

      // todo: change the logic here!
      if( $(document).find(this.$el).length === 0 ) {
        // parent view has been rebuild, we have to update our $el
        this.$el = $(this.this.__proto__.el);
        this.delegateEvents();
      }

      this.$el.removeClass('hide');
      this.$el.html(this.template());

      return this;
    },

    create: function (e) {
      e.preventDefault();

      app.trigger('closeEditView');

      var userModel = new UserModel({ avatar: globals.avatarUrl }),
          editView = new UserEditView(userModel);

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

      var listCounter,
          userCount = this.collection.length;

      if( userCount >= globals.maxusers ) {
        $('#userListCounter').addClass('limitReached');
        $('#userMaxReachedAlert').show();
        $('#addUserButton').hide();
      } else {
        $('#userListCounter').removeClass('limitReached');
        $('#userMaxReachedAlert').hide();
        $('#addUserButton').show();
      }

      listCounter = userCount +
        (userCount <= 1 ? " compte" : " comptes") +
        " sur " + globals.maxusers +
        (globals.maxusers <= 1 ? " disponible" : " disponibles");

      $('#userListCounter').text(listCounter);

    },

    close: function () {
      utils.closeModelView(this);
    }
  });

  return SkeletonView;
});

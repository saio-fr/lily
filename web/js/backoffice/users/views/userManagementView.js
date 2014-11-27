/*========================================
      USER MANAGEMENT APP VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      utils = require('backoffice/utils'),
      globals = require('backoffice/globals'),
      UserModel = require('backoffice/users/models/userModel'),
      UserEditView = require('backoffice/users/views/userEditView'),

      // Object wrapper returned as a module
      UserManagementView;

  UserManagementView = Backbone.View.extend({

    el: '#users',
    template: _.template($('#app').html()),
    editedUserId : null,

    events: {
      "click .new-user"   : "createUser",
      'click #sortMenu li': 'changeSortCriteria',
    },

    initialize: function(options) {
      if (options) {
        this.model = options.model;
        this.collection = options.collection;
      }
      this.render();
    },

    setModel: function (model) {

      if( this.model !== model ) {
        this.model = model;
        this.render();
      }

      return this;
    },

    render: function () {

      // todo: change the logic here!
      if( $(document).find(this.$el).length === 0 ) {
        // parent view has been rebuild, we have to update our $el
        this.$el = $(this.this.__proto__.el);
        this.delegateEvents();
      }

      this.$el.removeClass('hide');
      this.$el.html(this.template(this.model.toJSON()));
      this.checkMaxUser();

      return this;
    },

    createUser: function (e) {
      e.preventDefault();

      app.trigger('closeEditView');

      var userModel = new UserModel({ avatar: globals.avatarUrl }),
          editView = new UserEditView(userModel);

      $('#user-list .active').removeClass('active');
      return this;
    },

    changeSortCriteria: function(e) {
      var target = $(e.target);

      if( target.data('criteria') !== undefined ) {

        target.parent().find('.active').removeClass('active');
        target.addClass('active');
        // Listen in userCollection
        app.trigger("managementView:sort", target.data('criteria'));
      }

      return this;
    },

    checkMaxUser: function() {

      var maxUsers,
          listCounter,
          userCount = this.collection.length;

      if ( this.model ) {
        maxUsers = this.model.get('maxusers');
      }

      if( userCount >= maxUsers ) {
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
        " sur " + maxUsers +
        (maxUsers <= 1 ? " disponible" : " disponibles");

      $('#userListCounter').text(listCounter);

      return this;
    },

    close: function () {
      utils.closeModelView(this);
    }
  });

  return UserManagementView;
});

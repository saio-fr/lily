/*========================================
      SKELETON APP VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      UserModel = require('backoffice/users/models/userModel'),
      UserEditView = require('backoffice/users/views/users/editView'),
      g = require('globals'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.menu-header',
    template: _.template($('#headerTpl').html()),
    editedUserId : null,

    events: {
      "click .add-user"    : "create",
      'click .sort-menu li': 'sort',
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.removeClass('hide');
      this.$el.append(this.template());

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

    close: function () {
      utils.closeModelView(this);
    }
  });

  return SkeletonView;
});

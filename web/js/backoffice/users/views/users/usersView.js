/*========================================
      Collection of users View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      UserView = require('backoffice/users/views/users/userView'),

      // Object wrapper returned as a module
      UsersView;

  UsersView = Backbone.View.extend({

    el: '.js-users-list',

    initialize: function () {
      // Associated collection events
      this.listenTo(this.collection, 'add', this.add);
      this.listenTo(this.collection, 'remove', this.remove);

      this.render();

      // Listen to event triggered by skeleton
      app.on('users:sort', _.bind(this.sort, this));
    },

    render: function () {
      this.$el.empty();
      this.collection.each(this.add, this);
      return this;
    },

    // Add user to the list
    add: function (user) {
      var view = new UserView({model: user});
      this.$el.append(view.render().el);

      app.skeletons.users.checkMaxUsers();
    },

    remove: function () {
      app.skeletons.users.checkMaxUsers();
    },

    sort: function (criteria) {
      if (criteria) {
        this.collection.sortCriteria = criteria;
        this.collection.sort();
        this.render();
      }
    }

  });

  return UsersView;
});

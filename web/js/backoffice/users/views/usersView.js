/*========================================
      Collection of users View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      UserView = require('backoffice/users/views/userView'),

      // Object wrapper returned as a module
      UsersView;

  UsersView = Backbone.View.extend({

    el: '#user-list',

    initialize: function () {
      // Associated collection events
      this.listenTo(this.collection, 'add', this.add);
      this.listenTo(this.collection, 'remove', this.remove);

      this.render();

      // Listen to event triggered by skeleton
      app.on('skeleton:sort', _.bind(this.sort, this));
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

      app.skeleton.checkMaxUsers();
    },

    remove: function () {
      app.skeleton.checkMaxUsers();
    },

    sort: function (criteria) {
      if (criteria) {
        this.collection.sortCriteria = criteria;
      }
      this.collection.sort();
      this.$el.empty();
      this.render();
    }

  });

  return UsersView;
});

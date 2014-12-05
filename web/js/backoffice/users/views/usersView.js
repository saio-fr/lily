/*========================================
      Collection of users View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      UserView = require('backoffice/users/views/userView'),

      // Object wrapper returned as a module
      UsersView;

  UsersView = Backbone.View.extend({

    el: '#user-list',

    initialize: function () {
      // Associated collection events
      this.listenTo(this.collection, 'add', this.add);
      this.listenTo(this.collection, 'remove', this.remove);
      this.listenTo(this.collection, "sort", this.sort);

      this.render();

      // Listen to event triggered by skeleton
      app.on('skeleton:sort', _.bind(this.sort, this));
      app.on('userEditView:create', _.bind(this.create, this));
    },

    render: function () {
      this.$el.empty();
      this.collection.each(this.add, this);

      return this;
    },

    // Not optimal / redundant with add... But archi is not optimal either...
    create: function (model) {
      this.collection.create( model, { wait: true } );
    },

    // Add user to the list
    add: function (user) {
      var view = new UserView({model: user});
      this.$el.append(view.render().el);

      app.skeleton.checkMaxUsers();
    },

    remove: function () {
      app.skeleton.checkMaxUser();
    },

    sort: function (criteria) {
      if (criteria) this.collection.sortCriteria = criteria;
      this.collection.sort();
      this.$el.empty();
      this.render();
    }

  });

  return UsersView;
});

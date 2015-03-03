/*========================================
      Collection of users View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      UserView = require('backoffice/users/views/users/userView'),

      // Object wrapper returned as a module
      UsersView;

  UsersView = Backbone.View.extend({

    el: '.js-users-list',

    initialize: function () {
      this.childViews = new Backbone.ChildViewContainer();
      this.render();
      
      // Associated collection events
      this.listenTo(this.collection, 'add', this.add);

      // Listen to event triggered by skeleton
      this.listenTo(app, 'users:sort', this.sort);
    },

    render: function () {
      this.$el.empty();
      this.collection.each(this.add, this);
      return this;
    },

    // Add user to the list
    add: function (user) {
      var view = new UserView({model: user});
      this.childViews.add(view);
      this.$el.append(view.render().el);
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

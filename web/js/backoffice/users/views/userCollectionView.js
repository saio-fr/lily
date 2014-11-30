/*========================================
      Collection of users View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      utils = require('backoffice/utils'),
      UserView = require('backoffice/users/views/userView'),

      // Object wrapper returned as a module
      UserCollectionView;

  UserCollectionView = Backbone.View.extend({

    el: '#user-list',

    initialize: function (userCollection) {
      // Relevant Users collection passed when the
      // view gets instanciated.
      if (userCollection) {
        this.collection = userCollection;

        // Associated collection events
        this.listenTo(userCollection, 'add', this.add);
        this.listenTo(userCollection, 'remove', this.remove);
        this.listenTo(userCollection, "sort", this.updateView);

        this.render();
      }
      // Listen to event triggered by management view
      app.on('managementView:sort', _.bind(this.onChangeSortCriteria, this));
      app.on('userEditView:create', _.bind(this.create, this));
    },

    render: function () {

      // todo: look at a more efficient and correct way to do this
      if( $(document).find(this.$el).length === 0 ) {
        // parent view has been rebuild, we have to update our $el
        this.$el = $(this.this.__proto__.el);
        this.delegateEvents();
      }
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

      var view = new UserView();
      view.setModel(user);
      this.$el.append(view.render().el);

      app.userManagementView.checkMaxUser();
      return this;
    },

    remove: function () {
      app.userManagementView.checkMaxUser();
    },

    onChangeSortCriteria: function (criteria) {
      if (criteria) {
        this.collection.sortCriteria = criteria;
      }
      this.collection.sort();
    },

    updateView: function() {

      this.$el.empty();
      this.render();

      return this;
    },

    close: function () {
      utils.closeCollectionView(this);
      app.off('managementView:sort', _.bind(this.onChangeSortCriteria, this));
      app.off('userEditView:create', _.bind(this.add, this));
    }

  });

  return UserCollectionView;
});

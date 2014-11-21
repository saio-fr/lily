/*========================================
      Collection of users View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      utils = require('backoffice/utils'),
      UserView = require('backoffice/users/views/userView'),

      // Object wrapper returned as a module
      UserCollectionView;

  UserCollectionView = Backbone.View.extend({

    el: '#user-list',

    initialize: function (userCollection) {
      // Relevant Users collection passed when the
      // view gets instanciated.
      this.collection = userCollection;
      this.listenTo(userCollection, 'add', this.add);
      this.listenTo(userCollection, "sort", this.updateView);
      this.render();
    },

    render: function () {

      // todo: look at a more efficient and correct way to do this
      if( $(document).find(this.$el).length === 0 ) {
        // parent view has been rebuild, we have to update our $el
        this.$el = $(this.__proto__.el);
        this.delegateEvents();
      }
      this.$el.empty();
      this.collection.each(this.add, this);

      return this;
    },

    // Add user to the list
    add: function (user) {

      var view = new UserView();
      view.setModel(user)
      this.$el.append(view.render().el);

      return this;
    },

    updateView: function() {

      this.$el.empty();
      this.render();

      return this;
    },

    close: utils.closeCollectionView

  });

  return UserCollectionView;
});

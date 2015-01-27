/*========================================
      Collection of users View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      GroupView = require('backoffice/users/views/groups/groupView'),

      // Object wrapper returned as a module
      GroupsView;

  GroupsView = Backbone.View.extend({

    el: '.js-groups-list',

    initialize: function () {
      // Associated collection events
      this.listenTo(this.collection, 'add', this.add);
      this.render();
    },

    render: function () {
      this.collection.each(this.add, this);
      return this;
    },

    // Add group to the list
    add: function (group) {
      var view = new GroupView({model: group});
      this.$el.append(view.render().el);
    }

  });

  return GroupsView;
});

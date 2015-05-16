/*========================================
      Collection of users View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      GroupView = require('backoffice/users/views/groups/groupView'),

      // Object wrapper returned as a module
      GroupsView;

  GroupsView = Backbone.View.extend({

    el: '.js-groups-list',

    initialize: function () {
      this.childViews = new Backbone.ChildViewContainer();
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

  });

  return GroupsView;
});

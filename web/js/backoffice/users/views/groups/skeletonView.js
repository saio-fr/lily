/*========================================
      SKELETON APP VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      GroupModel = require('backoffice/users/models/groupModel'),
      GroupsView = require('backoffice/users/views/groups/groupsView'),
      GroupEditView = require('backoffice/users/views/groups/groupEditView'),
      g = require('config'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'vbox',
    template: _.template($('#groupsSkeletonTpl').html()),

    events: {
      "click .add-group" : "create"
    },

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.render();
    },

    render: function () {
      $('.js-skeleton-container').append(this.$el.html(this.template()));

      var view = new GroupsView({
        collection: this.collection
      });
      this.childViews.add(view);

      $('.nav-tabs li').removeClass('active');
      $('.groups-nav').addClass('active');

      return this;
    },

    create: function () {

      app.trigger('closeEditView', this);
      var model = this.collection.create({}, { wait:true });
      $('#group-list .active').removeClass('active');
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
    }

  });

  return SkeletonView;
});

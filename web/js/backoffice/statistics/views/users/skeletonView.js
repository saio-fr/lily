/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      UserCollection = require('backoffice/statistics/collections/users/userCollection'),
      ActivitiesSkeletonView = require('backoffice/statistics/views/users/activities/skeletonView'),
      UserView = require('backoffice/statistics/views/users/userView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.users-wrapper',
    template: _.template($('#usersSkeletonTpl').html()),

    events: {
    },

    initialize: function() {
      var that = this;
      this.collection = new UserCollection();
      this.collection.fetch().success(function () {
        that.render();
        that.activities = new ActivitiesSkeletonView(that.collection.at(0).id);
      });
      this.listenTo(this.collection, 'select', this.select);
    },
    
    render: function () {
      this.$el.html(this.template());
      this.collection.each(function (user) {
        var view = new UserView({model: user});
      });
      this.$el.find('.users-list-item').first().addClass('active');
      return this;
    },
    
    select: function (user) {
      this.activities.setUser(user.id);
      
      this.$el.find('.tab-pane').removeClass('active');
      this.$el.find('#users-charts-skeleton').addClass('active');
      this.$el.find('.nav-tabs li').removeClass('active');
      this.$el.find('.users-charts-nav').addClass('active');
    }

  });

  return SkeletonView;
});

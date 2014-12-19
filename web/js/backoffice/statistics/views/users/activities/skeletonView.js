/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      GraphModel = require('backoffice/statistics/models/users/graphModel'),
      FooterModel = require('backoffice/statistics/models/users/footerModel'),
      ChatCollection = require('backoffice/statistics/collections/users/chatCollection'),
      LogCollection = require('backoffice/statistics/collections/users/logCollection'),
      GraphView = require('backoffice/statistics/views/users/activities/charts/graphView'),
      ChatsSkeletonView = require('backoffice/statistics/views/users/activities/chats/skeletonView'),
      LogsSkeletonView = require('backoffice/statistics/views/users/activities/logs/skeletonView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.users-activities-wrapper',
    template: _.template($('#usersActivitiesSkeletonTpl').html()),

    events: {
    },

    initialize: function(id) {
      var that = this;
      this.render();
      
      this.graphModel = new GraphModel();
      this.footerModel = new FooterModel();
      this.chatCollection = new ChatCollection();
      this.logCollection = new LogCollection();
      
      this.setUser(id);
      
      this.graphView = new GraphView({
        model: {
          graph: that.graphModel,
          footer: that.footerModel
        }
      });
      
      this.chatCollection.fetch().success(function () {
        that.chatsView = new ChatsSkeletonView({
          collection: that.chatCollection
        });
      });
      
      this.logCollection.fetch().success(function () {
        that.logsView = new LogsSkeletonView({
          collection: that.logCollection
        });
      });
      
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    },
    
    setUser: function (id) {
      this.graphModel.userId = id;
      this.footerModel.userId = id;
      if (typeof this.graphView !== 'undefined') {
        this.graphView.plot();
      }
      
      this.chatCollection.userId = id;
      if (typeof this.chatsView !== 'undefined') {
        this.chatsView.range();
      }
      
      this.logCollection.userId = id;
      if (typeof this.logsView !== 'undefined') {
        this.logsView.range();
      }
    },

  });

  return SkeletonView;
});

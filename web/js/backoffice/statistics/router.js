/* ===========================
         	ROUTER
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('backoffice/app'),
    SkeletonView = require('backoffice/statistics/views/skeletonView'),

    UsageSkeletonView = require('backoffice/statistics/views/usage/skeletonView'),
    AviSkeletonView = require('backoffice/statistics/views/avi/skeletonView'),
    ChatSkeletonView = require('backoffice/statistics/views/chat/skeletonView'),
    UsersSkeletonView = require('backoffice/statistics/views/users/skeletonView'),

    // Object wrapper returned as a module
    AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'usage',
      'avi': 'avi',
      'chat': 'chat',
      'users': 'users',
      '*path': 'usage'
    },

    initialize: function() {
      var skeleton = new SkeletonView();
      app.skeleton = skeleton;
      this.bind('all', app.trackPageView());
    },

    home: function() {
      app.trackPageView('Statistics page, home tab');
    },

    usage: function() {
      $('.tab-content-wrapper').addClass('scrollable');
      $('.tab-pane').removeClass('active');
      $('.usage-wrapper').addClass('active');
      $('.nav-tabs li').removeClass('active');
      $('.usage-nav').addClass('active');

      if (typeof app.skeleton.usage === 'undefined') {
        var usageView = new UsageSkeletonView();
        app.skeleton.usage = usageView;
      }

      app.trackPageView('Statistics page, usage tab');
    },

    avi: function() {
      $('.tab-content-wrapper').addClass('scrollable');
      $('.tab-pane').removeClass('active');
      $('.avi-wrapper').addClass('active');
      $('.nav-tabs li').removeClass('active');
      $('.avi-nav').addClass('active');

      if (typeof app.skeleton.avi === 'undefined') {
        var aviView = new AviSkeletonView();
        app.skeleton.avi = aviView;
      }

      app.trackPageView('Statistics page, avi tab');
    },

    chat: function() {
      $('.tab-content-wrapper').addClass('scrollable');
      $('.tab-pane').removeClass('active');
      $('.chat-wrapper').addClass('active');
      $('.nav-tabs-wrapper li').removeClass('active');
      $('.chat-nav').addClass('active');

      if (typeof app.skeleton.chat === 'undefined') {
        var chatView = new ChatSkeletonView();
        app.skeleton.chat = chatView;
      }

      app.pageView('Statistics page, chat tab');
    },

    users: function() {
      $('.tab-content-wrapper').removeClass('scrollable');
      $('.tab-pane').removeClass('active');
      $('.users-wrapper').addClass('active');
      $('.nav-tabs li').removeClass('active');
      $('.users-nav').addClass('active');
      $('.users-charts-nav').addClass('active');
      $('#users-charts-skeleton').addClass('active');

      if (typeof app.skeleton.users === 'undefined') {
        var users = new UsersSkeletonView();
        app.skeleton.users = users;
      }

      app.pageView('Statistics page, users tab');
    }

  });

  return AppRouter;
});

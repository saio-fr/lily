/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      app = require('app'), 

      // Object wrapper returned as a module
      AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'questions',
      'files': 'files',
      'links': 'links',
      '*path': 'questions'
    },

    initialize: function () {
    },
    
    questions: function () {
      $('.js-app-navigator .active').removeClass('active');
      $('.js-app-navigator .questions-nav').addClass('active');
    },

    files: function () {
      $('.js-app-navigator .active').removeClass('active');
      $('.js-app-navigator .files-nav').addClass('active');
    },
    
    links: function () {
      $('.js-app-navigator .active').removeClass('active');
      $('.js-app-navigator .links-nav').addClass('active');
    },
    
    users: function () {
      $('.tab-content-wrapper').removeClass('scrollable');
      $('.tab-pane').removeClass('active');
      $('.users-wrapper').addClass('active');
      $('.nav-tabs li').removeClass('active');
      $('.users-nav').addClass('active');
      $('.users-charts-nav').addClass('active');
      $('#users-charts-skeleton').addClass('active');
      
      if (typeof app.skeleton.users == 'undefined') {           
        var users = new UsersSkeletonView();
        app.skeleton.users = users;
      }
    }
    
  });

  return AppRouter;
});


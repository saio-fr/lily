/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      app = require('app'), 
      CategoriesSkeletonView = require('backoffice/knowledge/views/categories/skeletonView'),
      QuestionsSkeletonView = require('backoffice/knowledge/views/questions/skeletonView'),

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
      app.changeCounters();
    },
    
    questions: function () {
      $('.js-app-navigator .active').removeClass('active');
      $('.js-app-navigator .questions-nav').addClass('active');
      if (typeof(app.skeleton) !== "undefined") {
        app.skeleton.remove();
      }
      app.skeleton = new QuestionsSkeletonView();
      app.skeleton.categories = new CategoriesSkeletonView();
      app.skeleton.categories.fetch('questions');
    },

    files: function () {
      $('.js-app-navigator .active').removeClass('active');
      $('.js-app-navigator .files-nav').addClass('active');
    },
    
    links: function () {
      $('.js-app-navigator .active').removeClass('active');
      $('.js-app-navigator .links-nav').addClass('active');
    }
    
  });

  return AppRouter;
});


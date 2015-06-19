/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      app = require('backoffice/app'),
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
      app.categories = new CategoriesSkeletonView();
    },
    
    questions: function () {
      if (typeof(app.skeleton) != 'undefined') {
        app.categories.collection.reset();
        app.skeleton.remove();
      }
      app.skeleton = new QuestionsSkeletonView();
    },

    files: function () {
      if (typeof(app.skeleton) != 'undefined') {
        app.categories.collection.reset();
        app.skeleton.remove();
      }
    },
    
    links: function () {
      if (typeof(app.skeleton) != 'undefined') {
        app.categories.collection.reset();
        app.skeleton.remove();
      }
    }
    
  });

  return AppRouter;
});


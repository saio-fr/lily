/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      GraphModel = require('backoffice/statistics/models/avi/graphModel'),
      FooterModel = require('backoffice/statistics/models/avi/footerModel'),
      RedirectionModel = require('backoffice/statistics/models/avi/redirectionModel'),
      CategoryCollection = require('backoffice/statistics/collections/avi/categoryCollection'),
      QuestionCollection = require('backoffice/statistics/collections/avi/questionCollection'),
      GraphView = require('backoffice/statistics/views/avi/graphView'),
      CategoriesView = require('backoffice/statistics/views/avi/categoriesView'),
      QuestionsView = require('backoffice/statistics/views/avi/questionsView'),
      RedirectionsView = require('backoffice/statistics/views/avi/redirectionsView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.avi-wrapper',
    template: _.template($('#aviSkeletonTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
      
      // Models
      var graphModel = new GraphModel();
      var footerModel = new FooterModel();
      var redirectionModel = new RedirectionModel();
      
      // Collections
      var questionCollection = new QuestionCollection();
      var categoryCollection = new CategoryCollection();

      var graphView = new GraphView({
        model: {
          graph: graphModel,
          footer: footerModel
        }
      });
      
      categoryCollection.fetch().success(function () {
        var categoriesView = new CategoriesView({
          collection: categoryCollection
        });
      });
      
      questionCollection.fetch().success(function () {
        var questionsView = new QuestionsView({
          collection: questionCollection
        });
      });
      
      var redirectionsView = new RedirectionsView({
        model: redirectionModel
      });
      
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });

  return SkeletonView;
});

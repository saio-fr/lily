/*========================================
        Skeleton VIEW
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      app = require('app'),
      globals = require('globals'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      Models = require('backoffice/knowledge/data/models'),
      Collections = require('backoffice/knowledge/data/collections'),
      CategoryView = require('backoffice/knowledge/views/categories/categoryView'),
      ModalModel = require('components/modals/model'),
      ModalView = require('backoffice/knowledge/views/categories/edit/modalView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: $('.js-app-navigator'),

    events: {
      'click .show-all-categories' : 'showAll',
      'click .hide-all-categories' : 'hideAll',
      'click .manage-categories' : 'manage'
    },
    
    initialize: function () {
      this.childViews = new Backbone.ChildViewContainer();
      
      // Create a null category
      var nullCategory = new Models.QuestionsCategoryNull();
      var nullCategoryView = new CategoryView({model: nullCategory});
      $('.js-categories-list').append(nullCategoryView.render().el);
    },
    
    render: function () {
      var that = this;
      
      this.childViews.forEach(function (view){
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      
      this.collection.each(function(category) {
        
        var view = new CategoryView({model: category});
        that.childViews.add(view);
        $('.js-categories-list').append(view.render().el);
        
        that.renderChild(view);
      });
    },
    
    renderChild: function (parentView) {
      
      var that = this;
      var children = parentView.model.get('children');
      
      if (!(_.isEmpty(children))) {

        _.each(children, function (model) {
          
          var child = new Models.QuestionsCategory(model);
          var childView = new CategoryView({model: child});
          that.childViews.add(childView);
          parentView.$el.find('ul').append(childView.render().el);
          
          that.renderChild(childView);
        });
      }
    },
    
    fetch: function (type) {
      
      var that = this;
      
      switch (type) {
        case 'questions':
          this.collection = new Collections.QuestionsCategories();
          this.collection.fetch().success(function() {
            that.render();
          });
      }
    },
    
    showAll: function () {

      this.$el.find('.icon-angle-down')
        .addClass('icon-angle-up')
        .removeClass('icon-angle-down');
      this.$el.find('.js-categories-list ul').removeClass('hide');
    },
    
    hideAll: function () {
      
      this.$el.find('.icon-angle-up')
        .addClass('icon-angle-down')
        .removeClass('icon-angle-up');
      this.$el.find('.js-categories-list ul').addClass('hide');
    },
    
    manage: function () {

      var modalModel = new ModalModel();
      modalModel.set(globals.modalApp.categoriesManagement);

      var modalView = new ModalView({
        model: modalModel,
        collection: this.collection,
        appendEl: ".js-skeleton-container"
      });
    }
    
  });

  return SkeletonView;
});
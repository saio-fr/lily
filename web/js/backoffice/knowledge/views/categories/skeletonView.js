/*========================================
        Skeleton VIEW
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      app = require('app'),
      globals = require('globals'),
      Interact = require('utils/interact'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      Models = require('backoffice/knowledge/data/models'),
      Collections = require('backoffice/knowledge/data/collections'),
      CategoryView = require('backoffice/knowledge/views/categories/categoryView'),
      ModalModel = require('components/modals/model'),
      ModalView = require('backoffice/knowledge/views/categories/edit/modalView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: $('.app-navigator'),

    events: {
      'click .btn-collapse a' : 'collapse',
      'click .btn-add': 'create',
      'click .btn-fullscreen': 'fullscreen'
    },
    
    initialize: function () {
      this.childViews = new Backbone.ChildViewContainer();
      this.collection = new Collections.Categories();
      
      this.listenTo(app, 'categories:select', this.selectCategory);
      this.listenTo(app, 'categories:unselect', this.unselectCategory);
      this.listenTo(this.collection, 'add remove change', this.render);
      
      // Create a null category
      var nullCategory = new Models.CategoryNull();
      var nullCategoryView = new CategoryView({model: nullCategory});
      $('.js-categories-list').append(nullCategoryView.render().el);
      
      this.listenTo(this.collection, 'reset', this.render);
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

      Interact.dropzoneCategories();
    },
    
    renderChild: function (parentView) {
      
      var that = this;
      var children = parentView.model.get('children');
      
      if (!(_.isEmpty(children))) {

        _.each(children, function (model) {
          
          var child = new Models.Category(model);
          var childView = new CategoryView({model: child});
          that.childViews.add(childView);
          parentView.$('.category-children').append(childView.render().el);
          
          that.renderChild(childView);
        });
      }
    },
    
    collapse: function (e) {
      
      var children = this.$el.find('.js-categories-list ul');      
      $(e.target).data('collapse') === 'down' ? children.removeClass('hide') 
        : children.addClass('hide');
    },
    
    unselectCategory: function (category) {
      
      var ids = [category.get('id')];
      
      var unselectChildren = function (category) {
        _.each(category.children, function (child) {
          ids.push(child.id);
          unselectChildren(child);
        });
      }
      
      _.each(category.get('children'), function (child) {
        ids.push(child.id);
        unselectChildren(child);
      });
      
      app.sortRequest.categories = _.without.apply(
        _, [app.sortRequest.categories].concat(ids)
      );
      if (_.isEmpty(app.sortRequest.categories)) {
        app.sortRequest.categories.push('all');
      }
      app.post();
    },
    
    selectCategory: function (category) {
      
      var that = this;
      app.sortRequest.categories.push(category.get('id'));
      
            
      var selectChildren = function (category) {
        _.each(category.children, function (child) {
          app.sortRequest.categories.push(child.id);
          selectChildren(child);
        });
      }
      
      _.each(category.get('children'), function (child) {
        app.sortRequest.categories.push(child.id);
        selectChildren(child);
      });

      app.sortRequest.categories = _.without(app.sortRequest.categories, 'all');
      app.post();
    },
    
    fullscreen: function () {
      
      app.trigger('closeEditView');
      var nav = $('.app-navigator');
      
      if (nav.hasClass('fullscreen')) {
        nav.removeClass('fullscreen');
        nav.width('220px');
      } else {
        nav.addClass('fullscreen');
        nav.width('100%');
      }
    },
    
    updateModal: function (categoryModel) {
      
      var modalModel = new ModalModel();
      
      if (!categoryModel) {
        categoryModel = new Models.Category();
        modalModel.set(globals.modalApp.newCategory);       
      } else {
        modalModel.set(globals.modalApp.updateCategory); 
      }

      var modalView = new ModalView({
        model: modalModel,
        category: categoryModel,
        appendEl: ".js-skeleton-container"
      });      
    },
    
    create: function () {
      this.updateModal(null);
    }
    
  });

  return SkeletonView;
});
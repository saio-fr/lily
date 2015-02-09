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
      QuestionView = require('backoffice/knowledge/views/questions/questionView'),
      QuestionEditView = require('backoffice/knowledge/views/questions/edit/skeletonView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: $('.js-skeleton-container'),
    template: _.template($('#questionsSkeletonTpl').html()),

    events: {
      'click a' : 'preventDefault',
      'click .btn-group-create' : 'create',
      'click .btn-group-select a' : 'select',
      'click .btn-group-sort a' : 'sort',
      'click .paginator-nav' : 'paginateNav',
      'click .paginator-max a' : 'paginateMax',
      'click .btn-group-trash' : 'trash'
    },
    
    initialize: function () {
      this.render();
      
      this.collection = new Collections.Questions();
      this.childViews = new Backbone.ChildViewContainer();
      
      this.listenTo(app, 'questions:select', this.checkDisabledButton);
      this.listenTo(app, 'questions:categories:select', this.selectCategory);
      this.listenTo(app, 'questions:categories:unselect', this.unselectCategory);
      this.listenTo(app, 'closeEditView', this.closeEditView);
      
      this.sortRequest = {
        'categories': ['all'],
        'tags': ['all'],
        'max': 50,
        'page': 0,
        'sortBy': {
          'name': 'date',
          'order': 'DESC'
        }
      }
      // Fetch our collection
      this.post();
    },
    
    render: function () {
      this.$el.append(this.template());
      return this;
    },
    
    post: function () {
      var that = this;
      $('.icon-spinner').removeClass('hide');
      $.post('/questions/sort', JSON.stringify(this.sortRequest), function (data) {
        that.collection.set(data.questions);
        that.updatePaginator(data.counter);
        that.renderQuestions();
      });
    },
    
    renderQuestions: function () {
      var that = this;
      
      this.childViews.forEach(function (view){
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      
      this.collection.each(function(question) {
        var view = new QuestionView({model: question});
        that.childViews.add(view);
        $('.js-questions-list ul').append(view.render().el);
      });
      
      $('.icon-spinner').addClass('hide');
    },
    
    preventDefault: function (e) {
      e.preventDefault();
    },
    
    select: function (e) {
      
      if ($(e.target).data('select') === "all") {
        
        $('.js-questions-list li').each(function (index, item) {
          $(item).find('input').prop('checked', true);
        });
      } else {
        
        $('.js-questions-list li').each(function (index, item) {
          $(item).find('input').prop('checked', false);
        });
      }
      app.trigger('questions:select');
    },
    
    sort: function (e) {
      this.sortRequest.sortBy.name = $(e.target).data('sort');
      this.sortRequest.sortBy.order = $(e.target).data('order');
      // Reset the paginator current page
      this.sortRequest.page = 0;
      this.post();
    },
    
    trash: function () {
      var that = this;
      
      if (!$('.btn-group-trash button').attr('disabled')) {
        app.createModal(globals.modalConfirm.questionsTrash, function() {
          app.trigger('questions:trash');
        }, that);
      }
    },
    
    paginateNav: function (e) {
      
      if ($(e.target).find('button').attr('disabled')) {
        return;
      }

      if ($(e.target).hasClass('next')) {
        this.sortRequest.page += 1;
      } else if (this.sortRequest.page) {
        this.sortRequest.page -= 1;
      }
      this.post();
    },
    
    paginateMax: function (e) {
      this.sortRequest.max = $(e.target).data('max');
      this.post();
    },
    
    updatePaginator: function (counter) {
      // Counter is the number of current sorted questions
      if (!this.sortRequest.page) {
         $('.paginator-nav.prev button').attr('disabled', true);
      } else {
        $('.paginator-nav.prev button').attr('disabled', false);
      }

      if ((this.sortRequest.page + 1) * this.sortRequest.max < counter) {
        $('.paginator-nav.next button').attr('disabled', false);
      } else {
        $('.paginator-nav.next button').attr('disabled', true);
      }
    },
    
    checkDisabledButton: function () {

      if ($('.js-questions-list input[type="checkbox"]:checked').length) {
        $('.btn-group-trash button').attr('disabled', false);
      } else {
        $('.btn-group-trash button').attr('disabled', true);
      }
    },
    
    unselectCategory: function (id) {
      
      this.sortRequest.categories = _.without(this.sortRequest.categories, id);
      if (_.isEmpty(this.sortRequest.categories)) {
        this.sortRequest.categories.push('all');
      }
      this.post();
      console.log(this.sortRequest.categories);
    },
    
    selectCategory: function (id) {
      
      this.sortRequest.categories = _.without(this.sortRequest.categories, 'all');
      this.sortRequest.categories.push(id);
      this.post();
      console.log(this.sortRequest.categories);
    },
    
    create: function () {
      app.trigger('closeEditView', this);

      var questionModel = new Models.Question();
      var editView = new QuestionEditView({model: questionModel});

      $('.js-questions-list .active').removeClass('active');
    },
    
    closeEditView: function () {
      $('.js-questions-list .active').removeClass('active');
    }
    
  });

  return SkeletonView;
});
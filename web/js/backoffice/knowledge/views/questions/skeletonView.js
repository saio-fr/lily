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
      Counters = require('backoffice/knowledge/utils/counters'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      Models = require('backoffice/knowledge/data/models'),
      Collections = require('backoffice/knowledge/data/collections'),
      QuestionView = require('backoffice/knowledge/views/questions/questionView'),
      QuestionEditView = require('backoffice/knowledge/views/questions/edit/skeletonView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'vbox',
    template: _.template($('#questionsSkeletonTpl').html()),

    events: {
      'click a' : 'preventDefault',
      'click .btn-group-create' : 'create',
      'click .btn-group-select a' : 'select',
      'click .btn-group-sort ul ul a' : 'sort',
      'click .btn-group-trash' : 'trash',
      'click .paginator-nav' : 'paginateNav',
      'click .paginator-max a' : 'paginateMax'
    },
    
    initialize: function () {
      
      var that = this;
      this.render();
      
      app.categories.collection.setType('questions');
      app.categories.collection.fetch();
      
      this.collection = new Collections.Questions();
      this.childViews = new Backbone.ChildViewContainer();
      
      this.listenTo(this.collection, 'add change', this.renderQuestions);
      this.listenTo(app, 'questions:select', this.checkDisabledButton);
      
      app.sortRequest = {
        'categories': ['all'],
        'tags': ['all'],
        'max': 50,
        'page': 0,
        'sortBy': {
          'name': 'date',
          'order': 'DESC'
        }
      }
      
      app.postUrl = globals.knowledge.questionsSortUrl;
      
      app.postCallback = function (data) {
        that.collection.set(data.questions);
        that.updatePaginator(data.counter);
        that.renderQuestions();
        app.trigger('closeEditView', this);
      }
      
      // Fetch our collection
      app.post();
    },
    
    render: function () {
      $('.js-skeleton-container').append(this.$el.html(this.template()));
      
      $('.app-navigator .active').removeClass('active');
      $('.app-navigator .questions-nav').addClass('active');
      
      // Make the .js-skeleton-list resizable
      Interact.resizeList();
      Interact.draggableQuestion();
      
      return this;
    },
    
    renderQuestions: function () {
      var that = this;
      $('.js-questions-list').empty();
      
      this.childViews.forEach(function (view){
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      
      if (this.collection.length) {      
        this.collection.each(function(question) {
          var view = new QuestionView({model: question});
          that.childViews.add(view);
          $('.js-questions-list').append(view.render().el);
        });        
      } else {
        $('.js-questions-list').html(globals.knowledge.noQuestions);
      }
    },
    
    preventDefault: function (e) {
      e.preventDefault();
    },
    
    select: function (e) {
      $('.js-questions-list li').each(function (index, item) {
        var checked = ($(e.target).data('select') === "all") ? true : false;
        $(item).find('input').prop('checked', checked);
      });
      app.trigger('questions:select');
    },
    
    sort: function (e) {
      app.sortRequest.sortBy.name = $(e.target).data('sort');
      app.sortRequest.sortBy.order = $(e.target).data('order');
      // Reset the paginator current page
      app.sortRequest.page = 0;
      app.post();
    },
    
    trash: function () {
      var that = this;
      
      if (!$('.btn-group-trash button').attr('disabled')) {
        app.createModal.confirm(globals.modalConfirm.questionsTrash, function() {
          app.trigger('questions:toTrash');
        }, that);
      }
    },
    
    paginateNav: function (e) {
      
      if ($(e.target).find('button').attr('disabled')) {
        return;
      }

      if ($(e.target).hasClass('next')) {
        app.sortRequest.page += 1;
      } else if (app.sortRequest.page) {
        app.sortRequest.page -= 1;
      }
      app.post();
    },
    
    paginateMax: function (e) {
      app.sortRequest.max = $(e.target).data('max');
      app.post();
    },
    
    updatePaginator: function (counter) {
      // Counter is the number of current sorted questions      
      var disabled = (!app.sortRequest.page) ? true : false;
      $('.paginator-nav.prev button').attr('disabled', disabled);
      
      var disabled = ((app.sortRequest.page + 1) * app.sortRequest.max < counter)
        ? false : true;
      $('.paginator-nav.next button').attr('disabled', disabled);
    },
    
    checkDisabledButton: function () {
      var disabled = ($('.js-questions-list input[type="checkbox"]:checked').length)
        ? false : true;
      $('.btn-group-trash button').attr('disabled', disabled);      
    },
    
    create: function () {
      app.trigger('closeEditView', this);

      var questionModel = new Models.Question();
      var editView = new QuestionEditView({model: questionModel});
    },
    
    remove: function () {
      var that = this;
      
      this.childViews.forEach(function (view){
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this, arguments);
    }
    
  });

  return SkeletonView;
});
/*======================================
              Tree View
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    Scribe = require('scribe'),
    Models = require('backoffice/knowledge/data/models'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    scribePluginToolbar = require('scribe-plugin-toolbar'),
    scribePluginSmartLists = require('scribe-plugin-smart-lists'),
    scribePluginHeadingCommand = require('scribe-plugin-heading-command'),

    // Object wrapper returned as a module
    TreeView;

  TreeView = Backbone.View.extend({

    tagName: "li",

    template: _.template($('#questionsEditTreeTpl').html()),

    events: {
      'click a.clearAnswer' : 'clearAnswer',
      'click a.remove' : 'remove',
      'click .title input' : 'editTitle',
      'blur .title input' : 'leaveEditTitle',
      'click .answer .editor' : 'editAnswer',
      'click .new-answer a' : 'newAnswer',
      'click .btn-collapse .collapse' : 'collapse',
      'click .btn-collapse .expand' : 'expand'
    },

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.listenTo(app, 'remove:childView', this.removeChildView);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      if (this.model.get('answerType')) {
        this.getWysiEditor();
      }
      return this;
    },
    
    getWysiEditor: function () {
      var edit = this.$('.answer .editor')[0];
      var toolbar = this.$('.answer .toolbar')[0];
      var scribe = new Scribe(edit);
      scribe.use(scribePluginToolbar(toolbar));
      scribe.use(scribePluginSmartLists());
      scribe.use(scribePluginHeadingCommand(5));
    },
    
    editTitle: function (e) {
      e.stopImmediatePropagation();
      $('.editing').removeClass('editing');
      this.$('.title').first().addClass('editing');
      this.$('.title input').first().focus().select();
    },
    
    leaveEditTitle: function (e) {
      e.stopImmediatePropagation();
      this.$('.editing').removeClass('editing');
      var title = this.$('.title input').first().val();
      this.model.set({title: title});
    },

    editAnswer: function (e) {
      e.stopImmediatePropagation();
      $('.editing').removeClass('editing');
      this.$('.child').first().addClass('editing');
      
      var that = this;
      
      $('body').on('click', function (e) {
        if (!$(e.target).parents('.answer.editing')
          .length && getSelection() == "") {
            
          that.$('.editing').removeClass('editing');
          var answer = that.$('.child .editor').first().html();
          that.model.set({answer: answer});
          $('body').off('click');
        }
      });
    },

    newAnswer: function(e) {
      e.stopImmediatePropagation();
      var type = $(e.target).data('type');
      this.model.setAnswerType(type);
      this.render();
      
      switch (type) {
        
        case 'precision':
          
          var action1 = new Models.QuestionTree();
          action1.setQuestionType('action');
          this.newChildView(action1);
          
          var action2 = new Models.QuestionTree();
          action2.setQuestionType('action');
          this.newChildView(action2);
          
          break; 
      }
    },
     
    clearAnswer: function () {
      this.removeChildrenViews();
      this.model.set({answer: null, answerType: null});
      this.render();
    },   
    
    newChildView: function (child) {
      var view = new TreeView({
        model: child
      });
      this.$('.js-tree-el-children')
        .first().append(view.render().el);
      this.childViews.add(view);
      this.$('.btn-collapse .expand').first().addClass('hide');
      this.$('.btn-collapse .collapse').first().removeClass('hide');
      
      return view;
    },
    
    removeChildView: function (view) {
      
      var childView = this.childViews.findByCid(view.cid);
      
      if (typeof(childView) !== 'undefined') {
        this.childViews.remove(childView);
        childView.remove();
      }
      
      if (!this.$('.js-tree-el-children')
        .children().length) {
          
        this.$('.btn-collapse .expand').addClass('hide');
        this.$('.btn-collapse .collapse').addClass('hide');
      }
    },
    
    removeChildrenViews: function () {
      var that = this;
      
      this.childViews.forEach(function (view){
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
    },
    
    collapse: function (e) {
      e.stopImmediatePropagation();
      this.$('.js-tree-el-children').first().addClass('hide');
      this.$('.btn-collapse .collapse').first().addClass('hide');
      this.$('.btn-collapse .expand').first().removeClass('hide');
    },
    
    expand: function (e) {
      e.stopImmediatePropagation();
      this.$('.js-tree-el-children').first().removeClass('hide');
      this.$('.btn-collapse .collapse').first().removeClass('hide');
      this.$('.btn-collapse .expand').first().addClass('hide');      
    },

    remove: function() {
      app.trigger('remove:childView', this);
      this.removeChildrenViews();
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return TreeView;
});

/*========================================
          ANSWER EDIT LIST
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    globals = require('globals'),
    when = require('when'),
    Counters = require('backoffice/knowledge/utils/counters'),
    Models = require('backoffice/knowledge/data/models'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    AnswerItemView = require('backoffice/knowledge/views/questions/edit/answer/itemView'),

    // Object wrapper returned as a module
    ListView;

  ListView = Backbone.View.extend({

    events: {
    },

    initialize: function() {
      
      this.childViews = new Backbone.ChildViewContainer();
      this.render();
    },

    render: function() {
      
      // Render the parent tree view
      var parentTreeModel = new Models.QuestionTree();
      parentTreeModel.set(this.model.toJSON());
      this.parentTreeView = new AnswerItemView({
        model: parentTreeModel
      });

      $('.js-answer-tree').append(this.parentTreeView.render().el);
      this.renderTree(this.parentTreeView);

      return this;
    },
    
    renderTree: function (parentView) {
      
      var that = this;
      var children = parentView.model.get('children');
      
      $.each(children, function (index, child) {
        
        var model = new Models.QuestionTree();
        model.set(child);
        var childView = parentView.newChildView(model);
        that.renderTree(childView);
      });
    },
    
    generateTree: function (parentView) {
      
      var that = this;
      var promises = [];
      
      if (parentView.childViews.length) {
        parentView.childViews.forEach(function (childView) {
          promises.push(that.generateTree(childView));
        });
        
        return when.all(promises).then(
          function (value) {
            parentView.model.set({children: value});
            return _.pick(parentView.model.toJSON(),
              'answer',
              'title',
              'children',
              'id',
              'questionType',
              'answerType'
            );
          }
        );
                
      } else {
        parentView.model.set({children: null});
        return when(_.pick(parentView.model.toJSON(),
          'answer',
          'title',
          'children',
          'id',
          'questionType',
          'answerType'
        ));
      }
    },

    update: function() {

      var that = this;
      return this.generateTree(this.parentTreeView).then(
        function (value) {
          that.model.set(value);
        }
      );
    },
    
    
    remove: function () {
      
      this.parentTreeView.remove();
      
      var that = this;
      
      this.childViews.forEach(function (view) {
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this, arguments);
    }
  });

  return ListView;
});

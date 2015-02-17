/*========================================
          QUESTIONS EDIT
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    globals = require('globals'),
    when = require('when'),
    Counters = require('backoffice/knowledge/utils/counters'),
    Models = require('backoffice/knowledge/data/models'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    TreeView = require('backoffice/knowledge/views/questions/edit/treeView'),

    // Object wrapper returned as a module
    EditView;

  EditView = Backbone.View.extend({

    tagName: "section",
    className: "vbox",

    template: _.template($('#questionsEditTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
    },

    initialize: function() {
      
      this.childViews = new Backbone.ChildViewContainer();
      
      this.listenTo(app, 'closeEditView', this.cancel);
      this.listenTo(this.model, 'destroy', this.cancel);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      $('.js-question-edit').append(this.$el);
      this.show();
      
      // Render the parent tree view
      var parentTreeModel = new Models.QuestionTree();
      parentTreeModel.set(this.model.toJSON());
      this.parentTreeView = new TreeView({
        model: parentTreeModel
      });

      $('.js-question-tree').append(this.parentTreeView.render().el);
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
            return parentView.model.toJSON();
          }
        );
                
      } else {
        parentView.model.set({children: null});
        return when(parentView.model.toJSON());
      }
    },
    
    hide: function () {
      $('.js-questions-list .active').removeClass('active');
      $('.js-question-edit').addClass('hide');
      $('.aside-divider').addClass('hide');
    },
    
    show: function () {
      $('.js-question-edit').removeClass('hide');
      $('.aside-divider').removeClass('hide');
    },

    cancel: function() {
      // Resync data from serv since backbone does not 
      // include a revertLastSync function. Can be improved
      this.model.fetch();
      this.remove();
    },    

    update: function() {
      
      var isNew = this.model.isNew();
      
      var that = this;
      this.generateTree(this.parentTreeView).then(
        function (value) {
          
          if (isNew) {
            var categories = _.clone(app.sortRequest.categories);
            var id = categories.splice(0, categories.length)[0];
            value.category = (id === 'all') ? null : id;
          }
          
          that.model.save(value, {
            success: function () {
              if (isNew) {
                Counters.increase('questions');
                app.post();
              }
              that.remove();
            }
          });
        }
      );
    },
    
    remove: function () {
      
      this.hide();
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

  return EditView;
});

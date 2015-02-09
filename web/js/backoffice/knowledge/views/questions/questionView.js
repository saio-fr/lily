/*======================================
              Question View
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    EditView = require('backoffice/knowledge/views/questions/edit/skeletonView'),

    // Object wrapper returned as a module
    QuestionView;

  QuestionView = Backbone.View.extend({

    tagName: "li",
    className: "list-group-item clear hover",

    template: _.template($('#questionsQuestionTpl').html()),

    events: {
      'click .checkbox' : 'select',
      'click' : 'edit'
    },

    initialize: function() {
      this.listenTo(app, 'questions:trash', this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    edit: function () {
      
      if (this.$el.hasClass('active')) {
        return;
      }
      
      app.trigger('closeEditView');
      var edit = new EditView({model: this.model});
      $('.js-questions-list .active').removeClass('active');
      this.$el.addClass('active');
    },

    select: function(e) {
      app.trigger('questions:select');
    },
    
    trash: function () {
      if (this.$el.find('.checkbox input').is(':checked')) {
        this.destroy();
      }
    },

    destroy: function() {
      this.model.destroy();
      this.remove();
    }

  });

  return QuestionView;
});

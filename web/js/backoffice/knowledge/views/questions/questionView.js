/*======================================
              Question View
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    Counters = require('backoffice/knowledge/utils/counters'),
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
      this.listenTo(app, 'questions:toTrash', this.trash);
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
      this.$el.addClass('active');
      app.track.click('Select a question in kb');
    },

    select: function(e) {
      e.stopImmediatePropagation();
      app.trigger('questions:select');
    },

    trash: function () {
      if (this.$el.find('.checkbox input').is(':checked')) {
        Counters.decrease('questions');
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

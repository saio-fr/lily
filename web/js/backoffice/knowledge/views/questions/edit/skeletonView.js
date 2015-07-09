/*========================================
          QUESTIONS EDIT
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
    AnswerListView = require('backoffice/knowledge/views/questions/edit/answer/listView'),
    AlternativesListView = require('backoffice/knowledge/views/questions/edit/alternatives/listView'),

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

      this.listenTo(app, 'closeEditView', this.remove);
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      $('.js-question-edit').append(this.$el);

      // Create answer list view
      var answerListView = new AnswerListView({
        model: this.model
      });
      this.childViews.add(answerListView, 'answerList');

      // Create alternative questions list view
      var alternativesListView = new AlternativesListView({
        model: this.model
      });
      this.childViews.add(alternativesListView, 'alternativesList');

      this.show();
      return this;
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
      if (!this.model.isNew) {
        this.model.fetch();
      }

      this.remove();
    },

    update: function() {

      var that = this;
      var isNew = this.model.isNew();
      var promises = [];

      this.childViews.each(function(view){
        promises.push(view.update());
      });

      // when answer tree & questions alt have been updated
      when.all(promises).then(
        function () {

          if (isNew) {
            var categories = _.clone(app.sortRequest.categories);
            var id = categories.splice(0, categories.length)[0];
            var category = (id === 'all') ? null : id;
            that.model.set({category : category});
          }

          that.model.save({}, {
            success: function () {
              if (isNew) {
                Counters.increase('questions');
                app.post();
                app.track.funnel('Create new question in the kb', {
                  totalQuestionsCount: Counters.questions,
                  question: that.model.get('title')
                });
              } else {
                app.track.funnel('Update a question in the kb', {
                  totalQuestionsCount: Counters.questions,
                  question: that.model.get('title')
                });
              }

              that.remove();
            }
          });
        }
      );

    },

    remove: function () {
      this.hide();

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

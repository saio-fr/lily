/*======================================
              Answer Tree View
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    config = require('config'),
    Scribe = require('scribe'),
    scribePluginToolbar = require('scribe-plugin-toolbar'),
    scribePluginSanitizer = require('scribe-plugin-sanitizer'),
    scribePluginPromptLink = require('utils/scribe-plugin-link-prompt-command'),
    Models = require('backoffice/knowledge/data/models'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),

    // Object wrapper returned as a module
    TreeView;

  TreeView = Backbone.View.extend({

    tagName: "li",

    template: _.template($('#questionsEditAnswerTpl').html()),

    events: {
      'click a.clear-answer' : 'clearAnswer',
      'click .add-action a' : 'addAction',
      'click a.remove' : 'remove',
      'focus .title .editor' : 'editTitle',
      'blur .title .editor' : 'leaveEditTitle',
      'blur .answer .editor' : 'leaveEditAnswer',
      'focus .answer .editor' : 'editAnswer',
      'click .new-answer-type a' : 'newAnswerType',
      'click .btn-collapse .collapse' : 'collapse',
      'click .btn-collapse .expand' : 'expand'
    },

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.listenTo(app, 'remove:childView', this.removeChildView);
      // To remove for multiple precision question
      this.model.setAnswerType('answer');
      // To remove for multiple precision question
      this.model.setQuestionType('question');
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      if (this.model.get('answerType') === 'answer') {
        this.getWysiEditor();
      }
      return this;
    },

    getWysiEditor: function () {
      var edit = this.$('.answer .editor')[0];
      var toolbar = this.$('.answer .toolbar')[0];
      var scribe = new Scribe(edit, {
        allowBlockElements: false
      });
      scribe.use(scribePluginToolbar(toolbar));
      scribe.use(scribePluginPromptLink());
      scribe.use(scribePluginSanitizer(config.wysiSanitize));
      scribe.on('content-changed', this.makeLinksExternal.bind(this));
    },

    makeLinksExternal: function() {
      this.$('.answer .editor')
          .find('a')
          .attr('target', '_blank');
    },

    editTitle: function (e) {
      e.stopImmediatePropagation();
      $('.editing').removeClass('editing');
      this.$('.title').first().addClass('editing');
    },

    leaveEditTitle: function (e) {
      e.stopImmediatePropagation();
      this.$('.editing').removeClass('editing');
      var title = this.$('.title .editor').first().text();
      this.model.set({title: title});
    },

    editAnswer: function (e) {
      e.stopImmediatePropagation();
      $('.editing').removeClass('editing');
      this.$('.child').first().addClass('editing');

      var that = this;

      $('body').on('click', function (e) {

        // Ugly but we need such to prevent loosing focus
        // when click on modal etc
        var cond1 = !$(e.target).parents('.answer.editing').length,
            cond2 = !$(e.target).parents('.modal').length;

        if (cond1 && cond2 && getSelection().toString() === '') {
            that.$('.editing').removeClass('editing');
            $('body').off('click');
        }
      });
    },

    leaveEditAnswer: function () {
      var answer = this.$('.child .editor').first().html();
      this.model.set({answer: answer});
    },

    addAction: function (e, nb) {

      if (e) {
        e.stopImmediatePropagation();
        nb = $(e.target).data('nb');
        $(e.target).parents('.open').removeClass('open');
      }

      for (var i = 0; i < nb; i++) {
        var action = new Models.QuestionTree();
        action.setQuestionType('action');
        this.newChildView(action);
      }
    },

    newAnswerType: function(e) {
      e.stopImmediatePropagation();
      var type = $(e.target).data('type');
      this.model.setAnswerType(type);
      this.render();

      switch (type) {

        case 'precision':
          this.addAction(null, 2);
          break;
      }
    },

    clearAnswer: function () {
      this.removeChildrenViews();
      this.model.set({answer: '', answerType: ''});
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

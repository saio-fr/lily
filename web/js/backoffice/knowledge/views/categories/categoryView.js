/*======================================
              Category View
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    interact = require('interact'),
    globals = require('globals'),

    // Object wrapper returned as a module
    CategoryView;

  CategoryView = Backbone.View.extend({

    tagName: "li",
    className: "category",

    template: _.template($('#categoriesCategoryTpl').html()),

    events: {
      'click .category-parent': 'select',
      'click .btn-category-minus': 'minus',
      'click a.btn-add-child:first': 'addChild',
      'click a.btn-update:first': 'update',
      'click a.btn-remove:first': 'trash'
    },

    initialize: function() {
      this.listenTo(app, 'questions:set:category', this.setCategory);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    preventDefault: function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
    },

    minus: function(e) {
      this.preventDefault(e);

      var children = this.$('.category-children').first();
      (children.hasClass('hide')) ? children.removeClass('hide')
        : children.addClass('hide');
    },

    select: function(e) {
      this.preventDefault(e);

      app.trigger('closeEditView');

      if (this.$('.category-parent').hasClass('selected')) {
        this.$('.selected').removeClass('selected');
        app.trigger('categories:unselect', this.model);
      } else {
        $('.js-categories-list .selected').removeClass('selected');
        this.$('.category-parent').addClass('selected');
        app.trigger('categories:select', this.model);
      }
    },

    setCategory: function() {

      var questions = [];
      var that = this;

      if (this.$el.hasClass('drop-target')) {

        this.$el.removeClass('drop-target');

        _.forEach(this.model.get('questions'), function(question) {
          questions.push(question.id);
        });

        _.forEach($('.js-questions-list .checkbox input'), function(checkbox) {

          if ($(checkbox).is(':checked')) {
            var id = $(checkbox).data('id');
            if (_.indexOf(questions, id)) {
              questions.push(id);
            }
          }
        });

        this.model.save({'questions': questions}, {
          // Ugly but assure a put request is sent on setNullCategory
          type: 'put',
          success: function() {
            app.post();
          }
        });
      }
    },

    update: function(e) {
      app.trigger('category:edit', this.model);

      // Select the parent category to the parent of that one
      $('.modal-categories select[name="parent"]').val(this.model.get('parent'));
    },

    addChild: function(e) {
      app.trigger('category:edit');

      // Select the parent category to be that one
      $('.modal-categories select[name="parent"]').val(this.model.id);
    },

    trash: function(e) {
      var that = this;

      app.createModal.confirm(globals.modalConfirm.categoryTrash, function() {
        that.model.destroy();
        that.remove();
      }, that);
    }

  });

  return CategoryView;
});

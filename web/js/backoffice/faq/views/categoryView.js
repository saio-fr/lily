/*======================================
    View CONTENT
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),

      // Object wrapper returned as a module
      CategoryView;

  CategoryView = Backbone.View.extend({

    tagName:  "li",

    className: "list-group-item faq-category hover",

    template: _.template($('#categoryTpl').html()),

    events: {

      'click .destroy':       'destroy',
      'click .icon-reorder':  'navigate',
      'dblclick':             'navigate',
      'click .faq-name':      'edit',
      'click .view':          'navigate',
      'blur .edit':           'leaveEdit',
      'keypress .edit':       'updateOnEnter',
      'dropped':              'dropped',
    },

    initialize: function () {

      this.listenTo(this.model, 'select', this.select);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));

      this.$input = this.$('.edit');
      return this;
    },

    navigate: function (e) {
      if ( !e.target.classList.contains('faq-name') &&
           !e.target.classList.contains('edit') &&
           !e.target.classList.contains('destroy') ) {
        app.router.navigate( "category/" + this.model.get('id'), {
          trigger: true
        });
      }
    },

    edit: function (e) {

      if (app.skeleton.contentEditView) {
        app.skeleton.closeEditView();
      }

      this.$el.addClass("editing");
      this.$input.focus().select();

      app.skeleton.unsetActive();
      this.$el.addClass('active');
    },

    updateOnEnter: function (e) {

      if (e.keyCode === 13) {
        this.leaveEdit();
      }
    },

    dropped: function (event, index) {

      this.model.set({ position: index });
    },

    leaveEdit: function () {

      var value = this.$input.val();
      this.model.set({title: value});
      this.$el.removeClass("editing");
    },

    destroy: function () {

      this.model.destroy();
      this.remove();
    }

  });

  return CategoryView;
});
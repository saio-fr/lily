/*======================================
    View CONTENT
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    ContentEditView = require('backoffice/faq/views/contentEditView'),

    // Object wrapper returned as a module
    ContentView;

  ContentView = Backbone.View.extend({

    tagName: "li",
    className: "list-group-item faq-content hover",

    template: _.template($('#contentTpl').html()),

    events: {

      'click .destroy': 'destroy',
      'click .faq-name': 'edit',
      'click': 'select',
      'blur .edit': 'leaveEdit',
      'keypress .edit': 'updateOnEnter',
      'dropped': 'dropped'
    },

    initialize: function() {

      this.listenTo(this.model, 'select', this.select);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));

      this.$input = this.$('.edit');
      return this;
    },

    select: function(e) {
      
      if (!e.target.classList.contains('faq-name') &&
        !e.target.classList.contains('edit') &&
        !e.target.classList.contains('destroy')) {

        var id = this.model.id;

        if (app.skeleton.contentEditView) {

          // edit view already exists for that item ?
          if (app.skeleton.contentEditView.model.get('id') !== id) {

            app.skeleton.closeEditView();
            app.skeleton.contentEditView = new ContentEditView({
              model: this.model
            });
          } else {
            app.skeleton.contentEditView.show();
          }

        } else {
          app.skeleton.contentEditView = new ContentEditView({
            model: this.model
          });
        }

        app.skeleton.unsetActive();
        this.$el.addClass('active');
      }
    },

    edit: function(e) {

      this.$el.addClass("editing");
      this.$input.focus().select();

      app.skeleton.unsetActive();
      this.$el.addClass('active');
    },

    leaveEdit: function() {

      var value = this.$input.val();
      this.model.set({
        title: value
      });
      this.$el.removeClass("editing");
    },

    updateOnEnter: function(e) {

      if (e.keyCode === 13) {
        this.leaveEdit();
      }
    },

    dropped: function(event, index) {
      this.model.set({
        position: index
      });
    },

    destroy: function() {

      this.model.destroy();
      this.remove();
    }

  });

  return ContentView;
});

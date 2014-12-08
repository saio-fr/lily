/*======================================
    View CONTENT
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      ContentEditView = require('backoffice/faq/views/contentEditView'),

      // Object wrapper returned as a module
      ContentView;

  ContentView = Backbone.View.extend({

      tagName:  "li",

      className: "list-group-item faq-content hover",

      template: _.template($('#content').html()),

      events: {

          'click .destroy':   'destroy',
          'click .view':      'select',
          'blur .edit':       'leaveEdit',
          'keypress .edit':   'updateOnEnter',
          'dropped':          'dropped'
      },

      initialize: function () {

        this.listenTo(this.model, 'select', this.select);
        this.listenTo(this.model, 'change', this.render);
      },

      render: function () {

          this.$el.html(this.template(this.model.toJSON()));

          this.input = this.$('.edit');
          return this;
      },

      select: function (e) {

        e.preventDefault();

        var id = this.model.id;

        if ( typeof app.contentEditView !== 'undefined' ) {

          // edit view already exists for that item ?
          if (app.contentEditView.model.get('id') !== id) {

            app.contentEditView.close();
            app.contentEditView = new ContentEditView({
              model: this.model
            });

          } else {
            app.contentEditView.show();
          }

        } else {
          app.contentEditView = new ContentEditView({
            model: this.model
          });
        }

        this.$el.addClass('editing');
        this.input.focus();

        this.$el.parent().find('.active').removeClass('active');
        this.$el.addClass('active');

      },

      leaveEdit: function() {

        var value = this.input.val();
        this.model.set({ title: value });
        this.$el.removeClass("editing");
      },

      updateOnEnter: function(e) {

        if (e.keyCode === 13) {
          this.leaveEdit();
        }
      },

      dropped: function(event, index) {
        this.model.saveFaq();
      },

      destroy: function () {

        //this.model.rootUrl = "/rest";
        this.model.destroy();
        this.remove();
      },
  });

  return ContentView;
});

/*======================================
              USER VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      utils = require('backoffice/utils'),
      ModalDeleteView = require('backoffice/users/views/modalDeleteView'),
      UserEditView = require('backoffice/users/views/userEditView'),

      // Object wrapper returned as a module
      UserView;

  UserView = Backbone.View.extend({

    tagName:  "li",
    className: "list-group-item hover",
    template: _.template($('#user').html()),

    events: {
      'click .destroy': 'destroy',
      'click .view'   : 'edit'
    },

    setModel:function (model) {

      if ( this.model !== model ) {
        // Relevant User model passed when the
        // view gets instanciated.
        this.model = model;
        this.listenTo(this.model, 'select', this.select);
        this.listenTo(this.model, 'render', this.render);
        this.render();
      }

      return this;
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSONWithComputedValues()));
      return this;
    },

    destroy: function (e) {

      e.stopPropagation();

      var modal = new ModalDeleteView(),
          that = this;

      $('.modal-close-confirm').click( function() {

        that.model.url = "/rest/" + that.model.id;
        that.model.destroy();
        that.remove();

      });

    },

    edit: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var id = $(e.currentTarget).parent().data("id"),
          editView = new UserEditView();

      editView.setModel(this.model)

      this.$el.parent().find('li.active').removeClass('active');
      this.$el.addClass('active');
      return this;
    },

    close: utils.closeModelView
  });

  return UserView;
});

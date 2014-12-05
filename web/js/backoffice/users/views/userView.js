/*======================================
              USER VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      g = require('globals'),
      ModalDeleteView = require('backoffice/users/views/modalDeleteView'),
      UserEditView = require('backoffice/users/views/userEditView'),

      // Object wrapper returned as a module
      UserView;

  UserView = Backbone.View.extend({

    tagName:  "li",
    className: "list-group-item hover",
    template: _.template($('#userTpl').html()),

    events: {
      'click .destroy': 'destroy',
      'click .view'   : 'edit'
    },
    
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.render();    
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    destroy: function (e) {

      e.stopPropagation();
      app.skeleton.modalView.show();

      that = this;

      $('.modal-close-confirm').click( function() {

        that.model.destroy();
        that.remove();

      });

    },

    edit: function(e) {
      e.preventDefault();
      e.stopPropagation();

      app.trigger('userView:closeEditView', this);
      
      if (app.skeleton.editView !== undefined) {
        app.skeleton.editView.remove();
      }
      app.skeleton.editView = new UserEditView({model: this.model});

      this.$el.parent().find('li.active').removeClass('active');
      this.$el.addClass('active');
      return this;
    }
    
  });

  return UserView;
});

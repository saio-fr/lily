/*======================================
              USER VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      ModalDeleteView = require('backoffice/users/views/users/modalDeleteView'),
      UserEditView = require('backoffice/users/views/users/userEditView'),

      // Object wrapper returned as a module
      UserView;

  UserView = Backbone.View.extend({

    tagName:  "li",
    className: "list-group-item hover animated bounceInLeft",
    template: _.template($('#userTpl').html()),

    events: {
      'click .destroy': 'destroy',
      'click .view'   : 'edit'
    },
    
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();    
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    destroy: function (e) {

      e.stopPropagation();
      if (typeof(app.skeletons.users.modalDeleteView) !== undefined)
      app.skeletons.users.modalDeleteView = new ModalDeleteView({model: this.model});

    },

    edit: function() {
      app.trigger('closeEditView', this);
      app.skeletons.users.editView = new UserEditView({model: this.model});

      this.$el.parent().find('li.active').removeClass('active');
      this.$el.addClass('active');
      return this;
    }
    
  });

  return UserView;
});

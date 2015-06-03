/*======================================
              USER VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      globals = require('globals'),
      UserEditView = require('backoffice/users/views/users/userEditView'),

      // Object wrapper returned as a module
      UserView;

  UserView = Backbone.View.extend({

    tagName:  "li",
    className: "list-group-item hover animated bounceInLeft",
    template: _.template($('#userTpl').html()),

    events: {
      'click .destroy' : 'destroy',
      'click .checkbox' : 'select',
      'click' : 'edit'
    },
    
    initialize: function () {
      this.listenTo(app, 'users:groups:update', this.updateGroups);
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
      var that = this;
      
      var modal = app.createModal.confirm(globals.modalConfirm.userTrash);
      modal.promise.then(function (res) {
        if (res) {
          this.model.destroy();          
        }
      }.bind(this));
    },

    edit: function () {
      
      app.trigger('closeEditView', this);
      app.skeleton.editView = new UserEditView({model: this.model});

      this.$el.parent().find('li.active').removeClass('active');
      this.$el.addClass('active');
      return this;
    },
    
    select: function (e) {
      
      e.stopPropagation();
      var btn = $('.groups-widget button');
      
      if (this.$el.find('.checkbox input').is(':checked')) {
        $.each(this.model.get('groups'), function(index, group) {
          app.trigger('users:groups:select', group.id);
        });
      }
      
      if ($('.js-users-list .checkbox input:checked').length) {
        btn.removeClass('disabled');
      } else {
        btn.addClass('disabled');
      }
      
    },
    
    updateGroups: function (groups) {

      if (this.$el.find('.checkbox input').is(':checked')) {
        this.model.set({groups: groups}, {silent:true});
        this.model.save();
      }
    }
    
  });

  return UserView;
});

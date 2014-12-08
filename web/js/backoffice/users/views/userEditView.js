/*========================================
      User Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      utils = require('utils/default'),
      validation = require('utils/backbone-validation'),

      // Object wrapper returned as a module
      UserEditView;

  UserEditView = Backbone.View.extend({

    className: 'vbox',
    template: _.template($('#editTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'close',
      'click .uploader': 'click input[name="avatarFile"]',
      'change img': 'utils.previewAvatar',
      'submit': 'noSubmit'
    },

    initialize: function () { 
      
      Backbone.Validation.bind(this);
      
      app.on('closeEditView', _.bind(this.close, this));
      this.listenTo(this.model, 'destroy', this.close);
      this.render();
      
      // HACK: trigger clicks events on roles
      this.setFormRoles();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.user-edit');
      $('.user-edit').removeClass('hide');
      
      return this;
    },

    update: function () { 
      var that = this;
      var data = this.$el.find('form').serializeObject();

      data.roles = this.getFormRoles();
      this.model.set(data);
      
      if(this.model.isValid(true)){
        app.skeleton.collection.create(this.model, {
          success: function (model) {
            that.close();
          },
          error: function (model, response) {
            var response = JSON.parse(response.responseText);
            if (response.errors.children.username.errors) {
              $('input[name="username"]')
                .closest('.form-group')
                .addClass('has-error has-feedback')
                .find('.help-block')
                .html(response.errors.children.username.errors)
                .removeClass('hidden');
            }
            if (response.errors.children.email.errors) {
              $('input[name="email"]')
                .closest('.form-group')
                .addClass('has-error has-feedback')
                .find('.help-block')
                .html(response.errors.children.email.errors)
                .removeClass('hidden');    
            }
          }
        });
      }
    },
    
    // Get roles and convert to save model
    getFormRoles: function () {
      var roles = [];
      $('.btn-roles li.active a').each(function() {
        if ($(this).attr('name') === 'admin') roles.push('ROLE_ADMIN');
        else {
          if ($(this).attr('name') === 'chat') roles.push('ROLE_CHAT_OPERATOR');
          if ($(this).attr('name') === 'knowledge') roles.push('ROLE_KNOWLEDGE_OPERATOR');
        }
      });
      return roles;
    },
    // TODO: Not ideal solution, clean it later ?
    setFormRoles: function () {
      var roles = this.model.get('roles');
      if (roles.indexOf('ROLE_ADMIN') !== -1) {
        this.$el.find('a[name="admin"]').click();
      } else {  
        if (roles.indexOf('ROLE_CHAT_OPERATOR') !== -1) {
          this.$el.find('a[name="chat"]').click();
        }      
        if (roles.indexOf('ROLE_KNOWLEDGE_OPERATOR') !== -1) {
          this.$el.find('a[name="knowledge"]').click();
        }
      }
    },
    
    noSubmit: function (e) {
      e.preventDefault();
    },
    
    close: function () {
      $('.list-group-item.active').removeClass('active');
      $('.user-edit').addClass('hide');
      Backbone.Validation.unbind(this);
      this.remove();
    }
    
  });

  return UserEditView;
});


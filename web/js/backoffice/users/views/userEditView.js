/*========================================
      User Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      g = require('globals'),
      utils = require('utils/dropzone'),

      // Object wrapper returned as a module
      UserEditView;

  UserEditView = Backbone.View.extend({

    className: 'vbox',
    template: _.template($('#editTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'close',
      'submit': 'noSubmit'
    },

    initialize: function () {      
      this.listenTo(this.model, 'destroy', this.close);
      this.render();
      
      // Call in utils/dropone the avatar function to do image preview
      this.dropzone = utils.avatar(this.$el.find('#avatar-widget'), this.model);
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
      
      this.model.set({'lastname': $('input[name="lastname"]').val()});
      this.model.set({'firstname': $('input[name="firstname"]').val()});
      this.model.set({'email': $('input[name="email"]').val()});
      this.model.set({'username': $('input[name="username"]').val()});
      this.model.set({'country': $('input[name="country"]').val()});
      this.model.set({'post': $('input[name="post"]').val()});
      this.model.set({'phone': $('input[name="phone"]').val()});
      this.model.set({'roles': this.getFormRoles()});
      
      this.model.set('plainPassword', {
        'first': $('input[name="first"]').val(),
        'second': $('input[name="second"]').val()
      });
      this.model.save().success(function() {
        // Delay the avatar sending in order to be sure User Entity is first persisted
        that.dropzone.processQueue();
      });
      this.close();
    },
    
    // Get roles and convert to save model
    getFormRoles: function () {
      var roles = [];
      $('.btn-roles li.active a').each(function() {
        if ($(this).attr('name') == 'admin') roles.push('ROLE_ADMIN');
        else {
          if ($(this).attr('name') == 'chat') roles.push('ROLE_CHAT_OPERATOR');
          if ($(this).attr('name') == 'knowledge') roles.push('ROLE_KNOWLEDGE_OPERATOR');
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
      $('.list-group-item .active').removeClass('active');
      $('.user-edit').addClass('hide');
      this.remove();
    }
    
  });

  return UserEditView;
});


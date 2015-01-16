/*========================================
      User Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      utils = require('utils/default'),
      validation = require('utils/backbone-validation'),

      // Object wrapper returned as a module
      UserEditView;

  UserEditView = Backbone.View.extend({

    className: 'vbox',
    template: _.template($('#usersEditTpl').html()),

    events: {
      'submit': 'noSubmit',
      'click .button-update': 'update',
      'click .button-cancel': 'close',
      'click .uploader': function () {
        this.$el.find('input[name="avatarFile"]').click();
      },
      'change input[name="avatarFile"]': function (e) {
        utils.previewAvatar(e.target, 1);
      }
    },

    initialize: function () {

      Backbone.Validation.bind(this);

      app.on('closeEditView', _.bind(this.close, this));
      this.listenTo(this.model, 'destroy', this.close);

      this.render();
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.user-edit');
      $('.user-edit').removeClass('hide');

      return this;
    },

    update: function () {

      var that = this;
      var data = utils.serializeObject(this.$el.find('form'));

      data.roles = this.getFormRoles();
      this.model.set(data);
      // Silent to not trigger userView render with an tmp groups array
      this.model.set({'groups': this.getGroups()}, {silent:true});

      if (this.model.isValid(true)) {

        app.skeletons.users.collection.create(this.model, {
          wait: true,
          success: function (model) {
            var avatar = that.$el.find('input[name="avatarFile"]')[0].files[0];
            utils.uploadAvatar(model, avatar);
            that.close();
          },

          error: function (model, response) {
            response = JSON.parse(response.responseText);

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

    // Get groups and convert to save model
    getGroups: function () {
      
      var groups = [];

      $.each(this.model.get('groups'), function (key, item) {
        groups.push(item.id);
      });
      
      return groups;
    },

    // Get roles and convert to save model
    getFormRoles: function () {
      
      var roles = [];
      
      $('.form-roles input:checked').each(function(index, item) {
        var id = $(item).attr('id');
        
        if (id === 'admin') {
          roles.push('ROLE_ADMIN');
        } else {
          if (id === 'chat') {
            roles.push('ROLE_CHAT_OPERATOR');
          }
          if (id === 'knowledge')  {
            roles.push('ROLE_KNOWLEDGE_OPERATOR');
          }
        }
      });
      return roles;
    },

    noSubmit: function (e) {
      e.preventDefault();
    },

    close: function () {
      $('.js-users-container .list-group-item.active').removeClass('active');
      $('.user-edit').addClass('hide');
      Backbone.Validation.unbind(this);
      this.remove();
    }

  });

  return UserEditView;
});


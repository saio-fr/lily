/*========================================
      Group Edit View
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
      GroupEditView;

  GroupEditView = Backbone.View.extend({

    className: 'vbox',
    template: _.template($('#groupsEditTpl').html()),

    events: {
      'submit': 'noSubmit',
      'click .button-update': 'update',
      'click .button-cancel': 'close'
    },

    initialize: function () {

      Backbone.Validation.bind(this);

      app.on('closeEditView', _.bind(this.close, this));
      this.listenTo(this.model, 'destroy', this.close);

      this.render();
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.group-edit');
      $('.group-edit').removeClass('hide');

      return this;
    },

    update: function () {
      
      var that = this;

      var name = $('input[name="name"]').val();
      var roles = this.getFormRoles();

      this.model.set({
        'name' : name,
        'roles' : roles
      });
      
      console.log(this.model);

      if (this.model.isValid(true)) {

        app.skeletons.groups.collection.create(this.model, {
          wait: true,
          success: function (model) {
            that.close();
          }
        });
      }
    },
    
    // Get roles and convert to save model
    getFormRoles: function () {
      
      var roles = [];
      
      $('.form-roles input:checked').each(function(index, item) {
        var name = $(item).attr('name');
        
        if (name === 'admin') {
          roles.push('ROLE_ADMIN');
        } else {
          if (name === 'chat') {
            roles.push('ROLE_CHAT_OPERATOR');
          }
          if (name === 'knowledge')  {
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
      $('.js-groups-container .list-group-item.active').removeClass('active');
      $('.group-edit').addClass('hide');
      Backbone.Validation.unbind(this);
      this.remove();
    }

  });

  return GroupEditView;
});


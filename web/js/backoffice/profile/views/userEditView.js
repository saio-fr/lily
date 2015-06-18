/*========================================
      User Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      utils = require('utils/default'),
      validation = require('utils/backbone-validation'),

      // Object wrapper returned as a module
      UserEditView;

  UserEditView = Backbone.View.extend({

    el: '.aside-user-edit',
    template: _.template($('#userEditTpl').html()),

    events: {
      'submit': 'noSubmit',
      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
      'keypress' : 'updateOnEnter',
      'click .uploader': function () {
        this.$el.find('input[name="avatarFile"]').click();
      },
      'change input[name="avatarFile"]': function (e) {
        utils.previewAvatar(e.target, 1);
      }
    },

    initialize: function () { 
      
      Backbone.Validation.bind(this);
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    update: function () { 
      var that = this;
      var data = utils.serializeObject(this.$el.find('form'));
      this.model.set(data);
      
      if(this.model.isValid(true)){
        this.model.save(null, {
          success: function (model) {
            var avatar = that.$el.find('input[name="avatarFile"]')[0].files[0];
            utils.uploadAvatar(model, avatar);
          }
        });
      }
    },
    
        
    updateOnEnter: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.update();
      }
    },
    
    cancel: function () {
      this.$el.empty();
      this.render();
    },

    noSubmit: function (e) {
      e.preventDefault();
    }
    
  });

  return UserEditView;
});


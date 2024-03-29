/*================================
          MODEL USER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      g = require('config'),

      // Object wrapper returned as a module
      UserModel;


  UserModel = Backbone.NestedModel.extend({

    id: '',

    initialize: function () {
      this.convertAvatar();
      this.convertRoles();
    },

    convertAvatar: function () {
      var avatar;
      if (this.get('config.avatar')) {
        avatar = g.BASE_AVATAR_URL + this.get('config.avatar');
      } else {
        avatar = g.UNKNOWN_AVATAR_URL;
      }
      this.set({'converted.avatar': avatar});
    },

    convertRoles: function () {
      var roles = this.get('roles');

      if (roles.indexOf('ROLE_ADMIN') !== -1) {
        this.convertedRoles = 'Administrateur';
      }
      else {
        if (roles.indexOf('ROLE_CHAT_OPERATOR') !== -1) {
          this.convertedRoles = 'Opérateur Live chat';
        }
        if (roles.indexOf('ROLE_KNOWLEDGE_OPERATOR') !== -1) {
          this.convertedRoles += (this.convertedRoles == '') ? 'Opérateur ' : ' et ';
          this.convertedRoles += 'Base de connaissance';
        }
      }

      this.set({'converted.roles': this.convertedRoles});
    }

  });

  return UserModel;
});


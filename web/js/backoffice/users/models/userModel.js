/*================================
          MODEL USER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      NestedModel = require('backbone-nested'),
      moment = require('moment'),
      g = require('globals'),

      // Object wrapper returned as a module
      UserModel;


  UserModel = Backbone.NestedModel.extend({

    id: '',
    url: function() {
        return this.id;
    },
    
    initialize: function () {
      this.convertRoles();
      this.convertLastlogin();
      this.convertAvatar();
    },

    convertRoles: function () {

      var roles = this.get('roles');
      
      if ( roles.indexOf('ROLE_ADMIN') !== -1 ) this.convertedRoles = "Administrateur";
      else {
        if ( roles.indexOf('ROLE_CHAT_OPERATOR') !== -1 ) this.convertedRoles = "Opérateur Live chat";
        if ( roles.indexOf('ROLE_KNOWLEDGE_OPERATOR') !== -1 ) {
          this.convertedRoles += (this.convertedRoles == '') ? "Opérateur " : " et ";
          this.convertedRoles += "Base de connaissance";
        }
      }
      
      this.set({'converted_roles': this.convertedRoles});

    },

    convertLastlogin: function () {

      var lastLogin = this.get('last_login');

      if ( lastLogin !== null && lastLogin.toUpperCase() !== 'NULL') {

        var d = moment(lastLogin);
        this.convertedLastlogin = "Dernière connexion le " + d.format('DD/MM/YY');

      } else this.convertedLastlogin = "Jamais connecté";
      
      this.set({'converted_last_login': this.convertedLastlogin});
    },
    
    convertAvatar: function () {
      
      var avatar = g.path.avatars + this.get('config').avatar;
      this.set({'converted_avatar': avatar});
      
    }

  });

  return UserModel;
});


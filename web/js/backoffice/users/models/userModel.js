/*================================
          MODEL USER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      moment = require('moment'),
      g = require('config'),

      // Object wrapper returned as a module
      UserModel;


  UserModel = Backbone.NestedModel.extend({

    defaults: {
      'firstname': '',
      'lastname': '',
      'phone': '',
      'post': '',
      'country': '',
      'username': '',
      'email': '',
      'groups': [],
      'roles': ['ROLE_USER'],
      'converted.avatar': g.UNKNOWN_AVATAR_URL
    },

    validation: {
      'firstname': {
        required: true,
        msg: 'Veuillez renseigner un prénom'
      },
      'lastname': {
        required: true,
        msg: 'Veuillez renseigner un nom'
      },
      'phone': {
        required: false,
        minLength: 10,
        msg: 'Au moins 10 caractères'
      },
      'email': {
        required: true,
        pattern: 'email',
        msg: 'Adresse email non valide'
      },
      'roles': {
        required: true,
        msg: 'Veuillez sélectionner au moins un role'
      },
      'plainPassword': {
        required: false,
        minLength: 4,
        msg: 'Le mot de passe est trop court'
      },
      'plainPasswordRepeat': {
        equalTo: 'plainPassword',
        msg: 'Les mots de passes ne sont pas identiques'
      }
    },

    initialize: function () {
      this.urlRoot = "/users";
      // If the model isnt new, convert server's attributes
      if (!this.isNew()) {
        this.convert();
      }

      this.listenTo(this, 'change', this.convert);
    },

    convert: function () {
      this.converted = {};
      this.convertRoles();
      this.convertLastlogin();
      this.convertAvatar();
    },

    convertRoles: function () {
      var roles = this.get('roles');
      this.convertedRoles = '';

      if (roles.indexOf('ROLE_ADMIN') !== -1) {
        this.convertedRoles = 'Administrateur';
      }
      else {
        if (roles.indexOf('ROLE_CHAT_OPERATOR') !== -1) {
          this.convertedRoles = 'Opérateur Live chat';
        }
        if (roles.indexOf('ROLE_KNOWLEDGE_OPERATOR') !== -1) {
          this.convertedRoles = (this.convertedRoles == '') ? 'Opérateur ' : this.convertedRoles + ' et ';
          this.convertedRoles += 'base de connaissance';
        }
      }

      this.set({'converted.roles': this.convertedRoles});
    },

    convertLastlogin: function () {
      var lastLogin = this.get('last_login');

      if (lastLogin) {
        var d = moment(lastLogin);
        this.convertedLastlogin = 'Dernière connexion le ' + d.format('DD/MM/YY');
      } else this.convertedLastlogin = 'Jamais connecté';

      this.set({'converted.last_login': this.convertedLastlogin});
    },

    convertAvatar: function () {
      var avatar;
      if (this.get('config.avatar')) {
        avatar = g.BASE_AVATAR_URL + this.get('config.avatar');
      } else {
        avatar = g.UNKNOWN_AVATAR_URL;
      }
      this.set({'converted.avatar': avatar});
    }

  });

  return UserModel;
});


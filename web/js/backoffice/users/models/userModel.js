/*================================
          MODEL USER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      moment = require('moment'),
      g = require('globals'),

      // Object wrapper returned as a module
      UserModel;


  UserModel = Backbone.NestedModel.extend({

    id: '',
    url: function() {
      return '/' + this.id;
    },
    
    defaults: {
      'firstname': '',
      'lastname': '',
      'phone': '',
      'post': '',
      'country': '',
      'username': '',
      'email': '',
      'roles': ['ROLE_ADMIN'],
      'converted.avatar': g.path.defaultAvatar
    },
    
    validation: {
      'firstname': {
        required: true,
      },
      'lastname': {
        required: true
      },
      'phone': {
        required: false,
        minLength: 10
      },
      'username': {
        required: true
      },
      'email': {
        required: true,
        pattern: 'email'
      },
      'roles': {
        required: true,
      },
      'plainPassword': {
        required: false,
        minLength: 4
      },
      'plainPasswordRepeat': {
        equalTo: 'plainPassword'
      }
    },
    
    initialize: function () {
      this.listenTo(this, 'change', this.convert);
      // If the model isnt new, convert server's attributes
      if (!this.isNew()) {
        this.convert();
      }
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
          this.convertedRoles = (this.convertedRoles == '') ? 'Opérateur ' : ' et ';
          this.convertedRoles += 'base de connaissance';
          console.log(this.convertedRoles);
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
      if (this.get('config.avatar')) {
        var avatar = g.path.avatars + this.get('config.avatar'); 
      } else {
        var avatar = g.path.defaultAvatar;
      }
      this.set({'converted.avatar': avatar});   
    }

  });

  return UserModel;
});


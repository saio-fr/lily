/*================================
          MODEL USER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      g = require('globals'),

      // Object wrapper returned as a module
      UserModel;


  UserModel = Backbone.NestedModel.extend({

    id: '',
    url: function() {
      return '/users/' + g.userId;
    },
    
    validation: {
      'firstname': {
        required: true,
        msg: 'Veuillez renseiger un prénom'
      },
      'lastname': {
        required: true,
        msg: 'Veuillez renseiger un nom'
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
      this.listenTo(this, 'change', this.convert);
      // If the model isnt new, convert server's attributes
      if (!this.isNew()) {
        this.convert();
      }
    },
    
    convert: function () {
      this.converted = {};          
      this.convertAvatar();
    },
    
    convertAvatar: function () {
      var avatar = g.path.avatars + this.get('config.avatar'); 
      this.set({'converted.avatar': avatar});   
    }

  });

  return UserModel;
});


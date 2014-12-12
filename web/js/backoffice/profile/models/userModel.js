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
      return '/user/' + g.userId;
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
      this.convertAvatar();
    },
    
    convertAvatar: function () {
      var avatar = g.path.avatars + this.get('config.avatar'); 
      this.set({'converted.avatar': avatar});   
    }

  });

  return UserModel;
});


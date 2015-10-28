/* ===========================
          Models
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    NestedModel = require('backbone-nested'),
    g = require('config'),
    // Object wrapper returned as a module
    Models = {};

  Models.Loading = Backbone.Model.extend({});
  Models.Operator = Backbone.NestedModel.extend({

    initialize: function() {
      this.convertAvatar();
    },

    convertAvatar: function() {
      var avatar;
      if (this.get('avatar')) {
        avatar = g.BASE_AVATAR_URL + this.get('avatar');
      } else {
        avatar = g.UNKNOWN_AVATAR_URL;
      }
      this.set({
        'converted.avatar': avatar
      });
    }
  });

  Models.Shortcut = Backbone.Model.extend({

    defaults: {
      title: "commande",
      description: "Nouveau message pré-enregistré",
      message: "Le message affiché au visiteur"
    },

    validation: {
      'title': {
        fn: function(value, attr, computedState) {

          var re = /\W/;

          if (re.exec(value)) {
            return "Votre commande ne doit pas contenir d'espaces ou de caractères spéciaux"
          }

          if (!value) {
            return "Veuillez renseigner une commande d'appel";
          }
        }
      },
      'message': {
        required: true,
        msg: "Veuillez renseigner un message"
      }
    }
  });

  return Models;
});

/* ===========================
       Faq Model
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    NestedModel = require('backbone-nested'),
    g = require('globals'),
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
        avatar = g.path.avatars + this.get('avatar');
      } else {
        avatar = g.path.defaultAvatar;
      }
      this.set({
        'converted.avatar': avatar
      });
    }
  });
  
  Models.Messages = Backbone.NestedModel.extend({

    convertAvatar: function() {
      var avatar;
      if (this.get('operator.avatar')) {
        avatar = g.path.avatars + this.get('operator.avatar');
      } else {
        avatar = g.path.defaultAvatar;
      }
      this.set({
        'operator.avatar': avatar
      });
    }
    
  });

  return Models;
});

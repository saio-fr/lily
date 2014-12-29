/* ===========================
       Faq Model
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      NestedModel = require('backbone-nested'),
      g = require('globals'),
      // Object wrapper returned as a module
      Models = {};

  Models.Loading = Backbone.Model.extend({});
  Models.Operator = Backbone.NestedModel.extend({
    
    initialize: function () {
      this.convertAvatar();
    },
    
    convertAvatar: function () {
      if (this.get('avatar')) {
        var avatar = g.path.avatars + this.get('avatar'); 
      } else {
        var avatar = g.path.defaultAvatar;
      }
      this.set({'converted.avatar': avatar});   
    }
  });

  return Models;
});

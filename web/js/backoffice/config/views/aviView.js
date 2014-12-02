/*======================================
             AVI VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    globals = require('globals'),

    // Object wrapper returned as a module
    AviView;

    AviView = Backbone.View.extend({
	
    tagName:  "section",
    className: "tab-pane",
    id: "avi",
    template: _.template($('#aviTpl').html()),
    
    initialize: function() {
      this.render();
	  },

    render: function () {
	    this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.tab-content');
    },
	
    update: function () {
      this.model.get('avi').set({active: false});
      console.log(this.model.get('avi'));
      // FIRST MESSAGE DISPLAYED BY THE AVI
      this.welcomeMsg = this.$el.find('div[name="welcomeMsg"]').text();
      this.model.set({'avi.welcomeMsg': this.welcomeMsg});
      
      // ACTIVATE AVI'S ANIMATIONS
      this.animations = this.$el.find('input[name="animations"]').is(':checked');
      this.model.set({'avi.animations': this.animations});
      
      // AVI'S REDIRECTIONS          
      this.redirections = {};
      this.redirections.phone = this.$el.find('input[name="phone"]').is(':checked');
      this.redirections.mail = this.$el.find('input[name="mail"]').is(':checked');
      this.redirections.chat = this.$el.find('input[name="chat"]').is(':checked');
      
      this.model.set({'redirections.phone': this.redirections.phone});
      this.model.set({'redirections.mail': this.redirections.mail});
      this.model.set({'redirections.chat': this.redirections.chat});
      
	  }
	
  });
  return AviView;
});

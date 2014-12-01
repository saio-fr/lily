/*======================================
             CHAT VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),

      // Object wrapper returned as a module
      ChatView;

  ChatView = Backbone.View.extend({
	  
    tagName:  "section",
	className: "tab-pane",
	id: "chat",
    template: _.template($('#chatTpl').html()),
    
    initialize: function() {
	  this.render();
	},

    render: function () {
	  this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.tab-content');
    },
	
	update: function () {
		
	}
	
  });
  return ChatView;
});

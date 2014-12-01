/*======================================
             AVI VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),

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
		
	  }
	
  });
  return AviView;
});

/*======================================
             SKELETON VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),

    // Object wrapper returned as a module
    Skeleton;

  Skeleton = Backbone.View.extend({
  	
    tagName:  "section",
    className: "vbox",
    template: _.template($('#skeletonTpl').html()),

    events: {
	    'click #save' : 'save'
    },
    
    initialize: function() {
	    this.render();
	  },

    render: function () {
	    this.$el.html(this.template());
      this.$el.appendTo('#wrapper');
    },
	
    save: function () {
		
		  // Call the children view to set new model attributes
      this.globalView.update();
      this.aviView.update();
      this.chatView.update();
      
      console.log(this.model);
		
      this.model.save(null, {
        success: function() {
		      
		      app.skeleton.modalView.$el.modal('show');
          setTimeout(function() { app.skeleton.modalView.$el.modal('hide') }, 2500);  
			  
        }
      });			
	  }
	
  });
  return Skeleton;
});

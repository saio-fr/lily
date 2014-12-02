/*======================================
             GLOBAL VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    globals = require('globals'),

    // Object wrapper returned as a module
    GlobalView;

  GlobalView = Backbone.View.extend({

    tagName: "section",
    className: "tab-pane active",
    id: "global",
    template: _.template($('#globalTpl').html()),

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.tab-content');
    },

    update: function () {
		  
      // MAINTENANCE
      this.maintenance = !$('input[name="maintenance"]').is(':checked');
      this.model.set({'maintenance': this.maintenance});
      
      // CHAT SERVICE
      if (globals.client.chat) {
        this.chat = this.$el.find('input[name="chat"]').is(':checked');
        this.model.set({'chat.active': this.chat});
      }
      
      // AVI SERVICE
      if (globals.client.avi) {
        this.avi = this.$el.find('input[name="avi"]').is(':checked');
        this.model.set({'avi.active': this.avi});
      }
      
      // FAQ SERVICE
      if (globals.client.faq) {
	      this.faq = this.$el.find('input[name="faq"]').is(':checked');
        this.model.set({'faq': this.faq});
      }      
      
      // TOP QUESTIONS SERVICE
      if (globals.client.topquestions) {
	      this.topquestions = this.$el.find('input[name="topquestions"]').is(':checked');
        this.model.set({'topquestions': this.topquestions});
	    }
	    
      // APP HOME PAGE
      if (globals.chat && globals.avi) {
        if ( this.$el.find('input[name="home"]').is(':checked') ) this.home = 'chat';
        else this.home = 'avi';
      } else {
        if (globals.avi) this.home = 'avi';
        if (globals.chat) this.home = 'chat';
      }
      this.model.set({'home': this.home});
	    
    }

  });
  return GlobalView;
});
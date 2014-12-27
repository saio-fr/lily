/*========================================
      Router
=========================================*/

define(function (require) {

  'use strict';

  var Backbone = require('backbone'),
      _ = require('underscore'),
      g = require('globals'),
      app = require('app'),
      SkeletonView = require('backoffice/chat/views/skeleton'),
      LiveSkeletonView = require('backoffice/chat/views/live/skeleton'),
      DashboardSkeletonView = require('backoffice/chat/views/dashboard/skeleton'),
      Collections = require('backoffice/chat/data/collections'),

      // Object wrapper returned as a module
      Router;

  Router = Backbone.Router.extend({

		url: '',

		routes: {
			'': 'dashboard',
      'dashboard': 'dashboard',
			'live': 'live'
		},

		initialize: function () {
      
      app.ws.subscribe('operator/' + g.licence, function (topic, records) { 
        app.users.set(records);
        
        // TO DELETE
        console.log(records);
      });
      
      app.users = new Collections.Users();     
      app.skeleton = new SkeletonView();
  		app.skeleton.live = new LiveSkeletonView({
    		collection: app.users
  		});
  		app.skeleton.dashboard = new DashboardSkeletonView({
    		collection: app.users
  		});
		},

		live: function () {
  		if (app.skeleton.available) {
  		  $('.nav-tabs .active').removeClass('active');
        $('.live-nav').addClass('active');
        app.skeleton.dashboard.$el.addClass('hide');
        app.skeleton.live.$el.removeClass('hide');
      } else {
        this.navigate('dashboard', {trigger: true});
      }
		},
		
		dashboard: function () {
  		$('.nav-tabs .active').removeClass('active');
      $('.dashboard-nav').addClass('active');
      app.skeleton.live.$el.addClass('hide');
      app.skeleton.dashboard.$el.removeClass('hide');
		}

	});

	return Router;
});
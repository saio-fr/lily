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
      ModalView = require('components/modals/confirmView'),
      ModalModel = require('components/modals/model'),
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

      app.users = new Collections.Users();
      app.skeleton = new SkeletonView();
  		app.skeleton.live = new LiveSkeletonView({
    		collection: app.users
  		});
  		app.skeleton.dashboard = new DashboardSkeletonView({
    		collection: app.users
  		});
        
      app.ws.subscribe('operator/' + g.licence, function (topic, records) { 
        app.users.set(records);
        
        // TO DELETE
        console.log(records);
      });
            
			app.ws.call('operator/isAvailable').then(
			
  			function (event) {
    			
  				if (event.result) {
  					app.skeleton.available = true;
  					app.skeleton.setAvailable();
  				} else {
  					app.skeleton.available = false;
  					app.skeleton.setUnavailable();
  				}
  				
  				// Start routing
          if (Backbone.History.started) {
            Backbone.history.stop();
			    }
			    Backbone.history.start();
  				
			  },
        function (error) {
          $('.js-modal-connection-lost').modal('show')
        }
      );
		},

		live: function () {
  		
  		if (app.skeleton.available) {
    		
  		  $('.nav-tabs .active').removeClass('active');
        $('.live-nav').addClass('active');
        app.skeleton.dashboard.$el.addClass('hide');
        app.skeleton.live.$el.removeClass('hide');
        
      } else {

        this.navigate('dashboard', {trigger: true});
               
        var modalModel = new ModalModel();
    		modalModel.set(g.modalConfirm.chatUnavailable);
        var modalUnavailableView = new ModalView({
          model: modalModel,
          appendEl: ".js-skeleton-container"
        });
       
        /* Listen to modal that prompt when attempting to 
        access live view when the operator is unavailable */
  	    $('.modal-unavailable .js-modal-action').click(function() {
          app.skeleton.setAvailable();
          app.skeleton.available = true;
          app.router.navigate('live', {trigger: true});
    		}); 
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
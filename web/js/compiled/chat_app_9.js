chat.Views.App = Backbone.View.extend({
	
	el: $('#chat'),
	
	events: {
		'click a[data="unavailable"]': 'setUnavailable',
		'click a[data="available"]': 'setAvailable',
		'click .windows ul li' : 'setMaxWindows',
		'click .parameters-nav' : 'showParameters',
		'click .dashboard-nav' : 'showDashboard',
		'click .live-nav' : 'showLive'
	},
	
	initialize: function() {
		
		// Create the view to show who's connecting and start chatting
		this.records = new chat.Records();
		this.live = new chat.LiveView( this.records );

		// Variables
		this.windows = [];
		this.maxWindows = 1;
		
		this.listenTo(this, 'change:windows', this.setWindows);		
		
		// Adjust windows on navigator resize
		$(window).resize(function() {
			chat.app.setWindows();
			chat.app.setInformationsWidth();
		});
		
		$(window).on('beforeunload', function() {
			if(this.available) {
				return "Vous êtes toujours ";
			}
		});
		
		// Connection to our WS Server
		sess = new ab.connect(
		
			'ws://dev2.saio.fr:8080/chat/' + licence // The host 		    
		    , function(session) {  // Once the connection has been established
				
				sess = session;
				sess.subscribe('operator', function (topic, payload) { chat.app.records.set(payload); });

				sess.call('chat/isAvailable').then(function(event) {
					if (event.result) { 
						chat.app.available = true;
						chat.app.setAvailable(); 
					} else { 
						chat.app.available = false; 
						chat.app.setUnavailable();
					}
				});	
							
			}

		    , function(code, reason, detail) { // When the connection is closed
		    	console.warn(code + reason + detail);
		    }
		    , { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
				'skipSubprotocolCheck': true,
				'maxRetries': 60,
				'retryDelay': 2000
		      }
		);
		
	},
	
	timers: function( record, type ) {

		// Setting up record variables
		now = new moment();
		start = record.model.get('startTime')*1000 - 1000;
		last = record.model.get('lastMsgTime')*1000 -1000;
		
		switch ( type ) {
			// Timer for chat			
			case 'chat':
			
				diff =  (now - start);
				timer = new moment(diff);
				hours = timer.hours()-1;
				minutes = timer.minutes();
				seconds = timer.seconds();
				
				if (hours == 0) {
					record.$el.find('.timer-chat').html( minutes + 'm ' + seconds + 's' );
					return;
				}
				
				if (this.hours == 0 && this.minutes == 0) {
					record.$el.find('.timer-chat').html( seconds + 's' );
					return;
				}
				
				record.$el.find('.timer-chat').html( hours + 'h ' + minutes + 'm ' + seconds + 's' );
				
				break;
			// Timer for last msg from operator	
			case 'lastMsg':	
			
				diff =  (now - last);
				timer = new moment(diff);
				hours = timer.hours()-1;
				minutes = timer.minutes();
				seconds = timer.seconds();
				
				if (record.model.get('messages').length > 0) {
					// If the visitor waited over 2 minutes for an answer
					if (timer.minutes() >= 2 && record.model.get('messages')[record.model.get('messages').length-1].from == 'visitor') {
						record.model.trigger('urgent');
					}
				}
				
				// Don't show the minutes
				if (minutes == 0) {
					record.$el.find('.timer-lastmsg').html( seconds );
					return;
				}
				
				record.$el.find('.timer-lastmsg').html( minutes + ' : ' + seconds );	
				
				break;
		}
		
	},

	interval: function( record, type ) {

		this.timers( record, type );
		// Handle all records timer
		setInterval(function() {
			chat.app.timers( record, type );					
		// Called every second	
		}, 1000);
		
	},
	
	setAvailable: function() {
		
		// Set the operator available on the server
		if (!this.available) {  sess.call('chat/available');  this.available = true; }
		
		this.$el.find('.status i').removeClass('unavailable').addClass('available');
		this.$el.find('.status span').html('Disponible');
		
		$('.nav-tabs .active').removeClass('active');
		$('.live-nav').addClass('active');
		$('.live-nav').removeClass('disable');
		
		if (typeof(this.view) !== 'undefined') this.view.remove();	
		this.live.$el.removeClass('hide');	
		
	},
	
	setUnavailable: function() {
	
		// Set the operator unavailable on the server
		if (this.available) {  sess.call('chat/unavailable');  this.available = false; }
		
		this.$el.find('.status span').html('Disponible');
		this.$el.find('.status i').removeClass('available').addClass('unavailable');
		
		this.live.$el.addClass('hide');
		this.view = new chat.DashboardView( this.records );
		
		$('.nav-tabs .active').removeClass('active');
		$('.dashboard-nav').addClass('active');
		$('.live-nav').addClass('disable');
		
	},
	
	setMaxWindows: function( ev ) {
		
		if ( ev !== false ) { this.maxWindows = $(ev.target).attr('data'); }
		
		if ( this.maxWindows < this.windows.length ) {
			
			diff = this.windows.length - this.maxWindows;
			for (var i = 0; i < diff ; i++ ) {
				this.windows[this.windows.length-1].minus();
			}
			
		}
		
	},
	
	setWindows: function () {
		
		if ( $('.conversations').width() > 850 ) { $('.btn-group.windows').show(); } 
		else { 
		
			$('.windows .dropdown-select li:first-child a').trigger( "click" );
			this.$el.find('.btn-group.windows').hide(); 
			$('.conversations').children().removeClass('multiple full-width half-width');
			return; 
		
		}
		
		// If there is more 1 windows, add "multiple" class to show them all
		if ( this.windows.length > 1 ) {
		
			$('.conversations').children().addClass('multiple');
			$('.conversations').children().addClass('half-width');
			
		} 
		
	},	
	
	setInformationsWidth: function () {
		
		// Hide informations if the windows is too small
		if ( ( $('.conversations').width() + $('.aside-chat-right').width() ) < 660 ) this.live.informations.reduce();
		else $('.informations-header .icon-angle-left').css( {'cursor': 'pointer'} );
		
	},
	
/*
	showParameters: function () {
		
		if (!$('.icon-gear').hasClass('active')) {
			
			$('.header-control .active').removeClass('active');
			$('.icon-gear').addClass('active');
			this.live.$el.addClass('hide');
			if (typeof(this.view) !== 'undefined') this.view.remove();
			this.view = new chat.ParametersView();
			
		}
		
	},
*/
	
	showDashboard: function () {
	
		if (!$('.dashboard-nav').hasClass('active')) {
		
			$('.nav-tabs .active').removeClass('active');
			$('.dashboard-nav').addClass('active');
			this.live.$el.addClass('hide');
			if (typeof(this.view) !== 'undefined') this.view.remove();
			this.view = new chat.DashboardView( this.records );
			
		}
		
	},
	
	showLive: function () {
	
		if (!$('.live-nav').hasClass('active') && this.available) {
		
			$('.nav-tabs .active').removeClass('active');
			$('.live-nav').addClass('active');
			if (typeof(this.view) !== 'undefined') this.view.remove();
			this.live.$el.removeClass('hide');
			
		}
		
	},
	
	// Change the badge in the header-control to show how much persons are waiting a response
	changeBadge: function () {

		$('.header-control .badge').text( $('.list-current .unanswered').length );
		
	}
	
});
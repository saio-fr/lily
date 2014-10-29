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
		/*		
		// Get a list of all enterprise' operators
		this.operators = new chat.Operators();
		this.operators.fetch();
		*/
		
		// Create the view to show who's connecting and start chatting
		this.records = new chat.Records();
		this.live = new chat.LiveView( this.records );

		// Variables
		this.windows = [];
		this.maxWindows = 1;
		
		// Adjust windows on navigator resize
		$(window).resize(function() {
			chat.app.setWindows();
			chat.app.setInformationsWidth();
		});
		
		this.listenTo(this, 'change:windows', this.setWindows);
		
		// Connection to our WS Server
		sess = new ab.connect(
		
			'ws://ws.saio.fr:80/' + licence +'/chat' // The host 		    
		    , function(session) {  // Once the connection has been established
				
				sess = session;
				sess.subscribe('operator', function (topic, payload) { chat.app.records.set(payload); });
				
				chat.app.setWindows();
				
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

		// Setting up timer variables
		now = new moment();
		start = moment(record.model.get('startTime')*1000-1000);
		last = moment(record.model.get('lastMsgTime')*1000-1000);
		
		switch ( type ) {
			// Timer for chat			
			case 'chat':
			
				if (now.diff(start) > 0) timer = moment(now.diff(start));
				else timer = moment(0);
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
			// Timer for last msg
			case 'lastMsg':	
			
				if (now.diff(last) > 0) timer = moment(now.diff(last));
				else timer = moment(0);
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
		
		this.$el.find('.status span').html('Indisponible');
		this.$el.find('.status i').removeClass('available').addClass('unavailable');
		
		this.live.$el.addClass('hide');
		this.view = new chat.DashboardView( this.records );
		
		$('.nav-tabs .active').removeClass('active');
		$('.dashboard-nav').addClass('active');
		$('.live-nav').addClass('disable');
		
	},
	
	setMaxWindows: function( ev ) {

		if ( typeof(ev) !== 'undefined' ) { this.maxWindows = $(ev.target).attr('data'); }
		
		if ( this.maxWindows < this.windows.length ) {
			
			diff = this.windows.length - this.maxWindows;
			for (var i = 0; i < diff ; i++ ) {
				this.windows[this.windows.length-1].minus();
			}
			
		}
		
	},
	
	setWindows: function () {
		
		
		// If there is more 1 windows, add "multiple" class to show them all
		if ( this.windows.length > 1 ) {
		
			$('.conversations').children().addClass('multiple');
			$('.conversations').children().addClass('half-width');
			if (this.windows.length > 2) $('.conversations').children().addClass('half-height');
			chat.app.setInformationsWidth();
			
		} else {
			
			$('.conversations').children().removeClass('multiple');
			$('.conversations').children().removeClass('half-width');
			chat.app.setInformationsWidth();
			
		}
		
		if (this.windows.length < 3) { $('.conversations').children().removeClass('half-height') }
		
		if ( $('#live').width() > 1090 ) { $('.btn-group.windows').show(); } 
		else { 
		
			$('.windows .dropdown-select li:first-child a').trigger( "click" );
			this.$el.find('.btn-group.windows').hide(); 
			$('.conversations').children().removeClass('multiple full-width half-width');
		
		}
		
		if ( $('#live').height() < 750) {
		
			$('.windows .dropdown-select li:nth-child(3) a').hide();
			if (this.maxWindows == 4) { 	
				$('.windows .dropdown-select li:nth-child(2) a').trigger( "click" );
				$('.conversations').children().removeClass('half-height');
			}		
		} else {
			$('.windows .dropdown-select li:nth-child(3) a').show();
		}
		
		if ($(window).width() > 768) $('.aside-chat-left').css({display: 'table-cell'});
		else {
			if (this.windows.length > 0) $('.aside-chat-left').css({display: 'none'});
			else $('.aside-chat-left').css({display: 'block'});
		}
		
	},	
	
	setInformationsWidth: function () {
			
		if (typeof(this.live.informations) !== 'undefined') {
		
			// Hide informations if the window is too small
			if ($('#live').width() < 950 || ($('#live').width() < 1300 && $('.conversations').children().hasClass('multiple')) ) this.live.informations.$el.addClass('hide');
			else this.live.informations.$el.removeClass('hide');
			
		}
		
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
		
	}
	
});
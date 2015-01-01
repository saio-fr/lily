define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var moment = require('moment'),
      Timers = {};

  Timers.status = function (record, type) {
    // Setting up timer variables
		var now = new moment();
		var start = moment(record.model.get('startTime')*1000);
		var last = moment(record.model.get('lastMsgTime')*1000);
		var timer;
    
    switch (type) {
			// Timer for chat			
			case 'chat':
			  
			  (now.diff(start)) ? timer = moment(now.diff(start)) : timer = moment(0);

				var hours = timer.hours()-1;
				var minutes = timer.minutes();
				var seconds = timer.seconds();
				
				if (!hours) {
					record.$el.find('.timer-chat').html( minutes + 'm ' + seconds + 's' );
					return;
				}
				
				if (!this.hours && !this.minutes) {
					record.$el.find('.timer-chat').html( seconds + 's' );
					return;
				}
				
				record.$el.find('.timer-chat').html( hours + 'h ' + minutes + 'm ' + seconds + 's' );
				
				break;
			// Timer for last msg
			case 'lastMsg':	

			  (now.diff(last)) ? timer = moment(now.diff(last)) : timer = moment(0);

				hours = timer.hours()-1;
				minutes = timer.minutes();
				seconds = timer.seconds();

				if (record.model.get('messages').length) {
  				
  				var messages = record.model.get('messages');
					// If the visitor waited over 2 minutes for an answer
					if (timer.minutes() >= 2 && messages[messages.length-1].from == 'visitor') {
						record.model.trigger('urgent');
					}
				}
				
				// Don't show the minutes
				if (!minutes) {
					record.$el.find('.timer-lastmsg').html(seconds);
					return;
				}
				
				record.$el.find('.timer-lastmsg').html( minutes + ' : ' + seconds );	

				break;
    }
  };
  
  Timers.interval = function (record, type) {
      
		Timers.status(record, type);
		// Handle all records timer
		setInterval(function() {
			Timers.status(record, type);					
		// Called every second	
		}, 1000);
	};
  
  return Timers;
});

// Socket
// Connection to our WS Server
sess = new ab.connect(

	'ws://' + window.location.hostname +':8080/chat/' + licence // The host 		    
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
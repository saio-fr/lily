
	/*================================
	Création du model Data
	====================================*/
	
	lily.Data = Backbone.Model.extend({
	
	    initialize: function () {
	        this.url = "/data";
	    },	
	});
	
	/*========================================
		  Router
		=========================================*/
		
	var AppRouter = Backbone.Router.extend({
	
		routes: {
		
			"" : "usage",
			"usage" : "usage",
			"avi" : "avi",
			"chat" : "chat",
			"users" : "users",
			"activity/:id/:tab" : "activity"
			
		},
		
		initialize: function () {
		},
		
		usage: function() {
		  
			$('#statistics-nav .active').removeClass('active');
			$('#statistics-nav .usage-nav').addClass('active');
			
			if (typeof(view) !== 'undefined') view.remove();
			var view = new lily.UsageView();
	 
	    }, 
	    
	    avi: function() {
	    	
			$('#statistics-nav .active').removeClass('active');
			$('#statistics-nav .avi-nav').addClass('active');
			
			if (typeof(view) !== 'undefined') view.remove();
			var view = new lily.AviView();
		  
	    }, 
	    
	    chat: function() {
	    
		  	$('#statistics-nav .active').removeClass('active');
			$('#statistics-nav .chat-nav').addClass('active');
			
			if (typeof(view) !== 'undefined') view.remove();
			var view = new lily.ChatView();
		  
	    },
	    
		users: function() {
	    	
			$('#statistics-nav .active').removeClass('active');
			$('#statistics-nav .users-nav').addClass('active');
			
			if (typeof(view) !== 'undefined') view.remove();
			view = new lily.UsersView();
			         
	    },
	    
	    activity: function(id, tab) {
			
			if (typeof(view) == 'undefined') {
				app.navigate("users", {trigger: true});
				return;
			}
			
			if (typeof(view.activity) !== 'undefined') view.activity.remove();
            view.activity = new lily.UserStatsAppView({model: view.users.get(id)});

            switch(tab) {
                case "chat":
                	$('.loader').fadeIn();
                	if (typeof(view.activity.conversationsview) !=="undefined") view.activity.conversationsview.remove();
                	if (typeof(view.activity.logsview) !=="undefined") view.activity.logsview.remove();
                    view.activity.data = new lily.Data({id:id});
                    view.activity.graph = new lily.UserStatsGraphView({model: view.activity.data});
					break;
                case "conversations":
                	$('.loader').fadeIn();
                	if (typeof(view.activity.data) !== "undefined") view.activity.data.remove();
                	if (typeof(view.activity.graph) !== "undefined") view.activity.graph.remove();
                	if (typeof(view.activity.activitiesview) !=="undefined") view.activity.activitiesview.remove();
                    view.activity.conversationsview = new lily.ConversationsView({id: id});
					break;
                case "logs":
                	$('.loader').fadeIn();
                	if (typeof(view.activity.data) !== "undefined") view.activity.data.remove();
                	if (typeof(view.activity.graph) !== "undefined") view.activity.graph.remove();
                	if (typeof(view.activity.conversationsview) !=="undefined") view.activity.conversationsview.remove();
                    view.activity.logsview = new lily.LogsView({id: id});
					break;
                default:
                    console.warn("tab not recognized in viewUserStats");
                break;
			} 
		}
	     		
	});
	
	// Let's rock
	var app = new AppRouter();	
	Backbone.history.start();
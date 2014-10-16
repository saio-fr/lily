	
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
		  "users" : "users"
		},
		
		initialize: function () {
		},
		
		usage: function() {
			
		  $('#statistics-nav .active').removeClass('active');
		  $('#statistics-nav .usage-nav').addClass('active');
		  
		  var usage = new lily.UsageView();
		  var usage_graph = new lily.UsageGraphView();	
		  var usage_media = new lily.UsageMediaView();
	 
	    }, 
	    
	    avi: function() {
	    
 		  $('#statistics-nav .active').removeClass('active');
		  $('#statistics-nav .avi-nav').addClass('active');
		  
		  var avi = new lily.AviView();
		  var avi_graph = new lily.AviGraphView();
		  var avi_redirections = new lily.RedirectionsMediaView();
		  
	    }, 
	    
	    chat: function() {
	    
		  
	    }, 
	     		
	});
	
	// Let's rock
	var app = new AppRouter();	
	Backbone.history.start();

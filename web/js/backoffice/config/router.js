/* ===========================
         	ROUTER
========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('app'),
    ConfigModel = require('backoffice/config/models/configModel'),
    SkeletonView = require('backoffice/config/views/skeletonView'),
    GlobalView = require('backoffice/config/views/globalView'),
    ChatView = require('backoffice/config/views/chatView'),
    AviView = require('backoffice/config/views/aviView'),
    ModalView = require('backoffice/config/views/modalView'),

    // Object wrapper returned as a module
    AppRouter;

  AppRouter = Backbone.Router.extend({

    routes: {
      '' : 'home',
      '*path' : 'home'
    },

    initialize: function () {
	  
	    var configModel = new ConfigModel();
	  
      configModel.fetch().success(function() {
	    
	      var skeleton = new SkeletonView({ model: configModel });
        app.skeleton = skeleton;
	    
        skeleton.globalView = new GlobalView({ model: configModel });
        skeleton.aviView = new AviView({ model: configModel.get('avi') });
        skeleton.chatView = new ChatView({ model: configModel.get('chat') });
        skeleton.modalView = new ModalView();
	    
	    });

    },

    home: function() {
      // todo: Adding more logic to the router (sort based on url...)      
    }
    
  });
  return AppRouter;  
});


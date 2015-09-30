var _        = require('underscore');
var Backbone = require('backbone');
Backbone.LocalStorage = require("../../libs/backbone-localstorage");

var config = window.config;

var widgetModel = Backbone.Model.extend({

  localStorage: new Backbone.LocalStorage("widgetModel"),

  defaults: {
    // General rules
    activeRoute: 'self-service', // Can either be 'self-service' or 'chat' at this point

    // Button rules
    hasCustomOperatorFigure: false,
    operatorFigureSrc: '',
    hasCustomBrandAvatar: false,
    brandAvatarSrc: '',
    notifCount: 0,

    // Attention Grabber rules
    isAttentionGrabberEnabled: true,
    isAttentionGrabberClosed: true,
    wasAttentionGrabberDismissed: false,
    attentionGrabberDelay: config.attentionGrabberDelay || 3000,
    attGrabberTitle: config.defaultAttGrabberTitle || 'Besoin d\'aide ?',
    attGrabberContent: config.defaultAttGrabberContent || '',
    attGrabberCta: config.defaultAttGrabberCta || 'Trouver des réponses'
  },

  initialize: function() {
    // Fetch previous value that could have been saved in local storage
    this.fetch();

    // When they change, store the new preperties in localStorage
    this.on('change', function(){
      this.save();
    });
  },
});

module.exports = widgetModel;



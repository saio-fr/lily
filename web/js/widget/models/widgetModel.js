var _        = require('underscore');
var Backbone = require('backbone');
Backbone.LocalStorage = require("../../libs/backbone-localstorage");

var config = window.config;

var widgetModel = Backbone.Model.extend({

  localStorage: new Backbone.LocalStorage("widgetModel"),

  defaults: {
    // General rules
    shouldOpenStandalone: false,
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
    attentionGrabberDelay: 3000,
    attGrabberTitle: 'Besoin d\'aide ?',
    attGrabberCta: 'Trouver des réponses',
    attGrabberContent: '',
  },

  initialize: function() {
    // Fetch previous value that could have been saved in local storage
    this.fetch();
    this.calculateProperties(false);

    // When they change, store the new preperties in localStorage
    this.on('change', function() {
      this.calculateProperties(true);
      this.save();
    });
  },

  calculateProperties: function(silent) {
    var activeRoute = this.get('activeRoute');
    var computedValues = {
      attGrabberTitle: activeRoute === 'chat' ? this.get('attGrabberTitleChat') : this.get('attGrabberTitleSelfService'),
      attGrabberCta: activeRoute === 'chat' ? this.get('attGrabberCtaChat') : this.get('attGrabberCtaSelfService'),
    };

    this.set(computedValues, { silent: silent });
  }
});

module.exports = widgetModel;



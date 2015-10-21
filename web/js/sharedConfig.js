define(function(require) {

  'use strict';

  var Modernizr = require('Modernizr');
  var _         = require('underscore');
  var mixins    = require('utils/mixins');

  var config = _.extend(window.config || {}, {
    BASE_PROTOCOL: _.getBaseProtocol(),
    CDN_HOST: _.getBaseProtocol() + 'cdn-saio.fr/',
  });

  var _config = {
    SYNAPSE_USER: config.licence,
    SYNAPSE_PASSWORD: config.synapsePassword,
    SYNAPSE_REST_ROOT: config.BASE_PROTOCOL +
    'search.saio.fr/api/saio/smartfaq/SmartFAQWCF.svc/rest/',
    UNKNOWN_AVATAR_URL: config.CDN_HOST + 'images/default-avatar.png',
    BASE_AVATAR_URL: config.CDN_HOST + 'customer/' + config.licence +
    '/images/avatars/',

    typeahead: {
      HAS_AUTOSELECT: true,
      HAS_HIGHLIGHT: true,
      MIN_LENGTH: 2,
      HAS_HINT: false,
    },

    animEndEventNames: {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd',
      'msAnimation': 'MSAnimationEnd',
      'animation': 'animationend'
    },

    transEndEventNames: {
      'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
      'MozTransition'    : 'transitionend',      // only for FF < 15
      'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
    },

    // support css animations
    supportAnimations: Modernizr.cssanimations,
    supportTransitions: Modernizr.csstransitions,

  };

  _.extend(config, _config);

  config.transEndEventName = config.transEndEventNames[Modernizr.prefixed('transition')];
  config.animEndEventName = config.animEndEventNames[Modernizr.prefixed('animation')];


  return config;

});

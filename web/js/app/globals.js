/*========================================
      Globals / i18 ?
=========================================*/

define(function (require) {

  'use strict';

  var _ = require('underscore'),
      Modernizr = require('Modernizr'),
      g = {};

    _.extend(g, window.config);


  g.sid = document.cookie.match('PHPSESSID=([^;]*)')[1];

  g.inClass = '';
  g.outClass = '';
  g.animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  };
  // animation end event name
  g.animEndEventName = g.animEndEventNames[window.Modernizr.prefixed('animation')];
  // support css animations
  g.support = window.Modernizr.cssanimations;

  //
  g.loadingTpl =  '<div class="lily-msg-avatar lily-cst-msg-avatar lily-message-show">' +
                    '<p class="lily-loading">' +
                      '<span></span>' +
                      '<span></span>' +
                      '<span></span>' +
                    '</p>' +
                    '<i class="lily-avatar-bubble"></i>' +
                  '</div>';

  //
  g.emptySearch = 'Il semblerait qu\'il y ait un problème. ' +
                  'Je n\'ai pas trouvé de réponse à votre question';

  return g;
});

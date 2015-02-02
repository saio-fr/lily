/*========================================
      Globals / i18 ?
=========================================*/

define(function(require) {

  'use strict';

  var _ = require('underscore'),
    Modernizr = require('Modernizr'),
    g = {};

  _.extend(g, window.config);

  g.inClass = '';
  g.outClass = '';
  g.animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  };
  // animation end event name
  g.animEndEventName = g.animEndEventNames[window.Modernizr.prefixed(
    'animation')];
  // support css animations
  g.support = window.Modernizr.cssanimations;

  // AVI
  g.loadingTpl =
    '<div class="lily-msg-avatar lily-cst-msg-avatar lily-message-show">' +
    '<p class="lily-loading">' +
    '<span></span>' +
    '<span></span>' +
    '<span></span>' +
    '</p>' +
    '<i class="lily-avatar-bubble"></i>' +
    '</div>';

  g.emptySearch = 'Il semblerait qu\'il y ait un problème. ' +
    'Je n\'ai pas trouvé de réponse à votre question';

  g.unknownAvatarUrl = 'http://cdn-saio.fr/images/default-avatar.png';
  g.baseAvatarUrl = "http://cdn-saio.fr/customer/" + g.licence +
    "/images/avatars/";

  // Mail
  g.mailSentMsg = "Votre mail a bien été envoyé";
  g.mailSentError = "Votre mail n'a pas pu être envoyé";
  g.connexionIssue =
    "Un problème est survenu. Nous tentons de vous reconnecter avec votre interlocuteur";

  g.inactivityAction = "Reconnecter";
  g.inactivityMsg = "La connexion a été interrompue pour cause d'inactivité";

  g.transferMsg = "a été transféré à";
  g.banMsg = "Vous avez été banni du chat par l'opérateur";
  g.closeMsg = "L'opérateur a clôt la conversation";

  g.unableToConnectError = "La connexion a été interrompue";
  return g;
});

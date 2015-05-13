/*========================================
      Globals / i18 ?
=========================================*/

define(function(require) {

  'use strict';

  var _ = require('underscore'),
    Modernizr = require('Modernizr'),
    g = {};

  _.extend(g, window.config);

  g.synapse = {
    user: 'saio',
    password: 'uJk9!-m',
    restRoot: 'http://search.saio.fr/api/saio/smartfaq/SmartFAQWCF.svc/rest/'
  };

  g.avi = g.avi || {};
  g.avi.messages = {
    welcomeMsg: 'Bonjour, je m\'appelle Lily! Vous pouvez me poser un question relative à SosMalus',
    satisfiedFeedback: 'Merci pour votre apréciation! N\'hesitez pas à me poser d\'autres questions!',
    unSatisfiedFeedback: 'Il semblerait que je ne peux pas répondre de façon satisfaisant à votre question. <p><b>Souhaitez vous être redirigé vers un de nos conseillers ?</b></p>',
    apologize: 'Je suis désolé de ne pas avoir pu vous répondre',
    askForedirection: 'Souhaitez vous être redirigé vers un de nos conseillers ?',
    askForFeedback: ''
  };

  g.avi.messages.redirection = {
    tel: 'Nous téléphoner',
    mail: 'Nous envoyer un mail',
    chat: 'Discuter avec un de nos conseillers via chat',
    none: 'Je ne veux pas être redirigé'
  };

  g.avi.messages.satisfaction = {
    incomplete: 'Cette réponse est incomplète',
    fausse:     'cette réponse ne répond pas à ma question'
  };

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
    '</div>';

  g.emptySearch = 'Il semblerait qu\'il y ait un problème. ' +
    'Je n\'ai pas trouvé de réponse à votre question';

  g.unknownAvatarUrl = 'http://cdn-saio.fr/images/default-avatar.png';
  g.baseAvatarUrl = 'http://cdn-saio.fr/customer/' + g.licence +
    '/images/avatars/';

  // Mail
  g.mailSentMsg = 'Votre mail a bien été envoyé';
  g.mailSentError = 'Votre mail n\'a pas pu être envoyé';
  g.connexionIssue =
    'Un problème est survenu. Nous tentons de vous reconnecter avec votre interlocuteur';

  g.chat = {
    inactivityAction: 'Reconnecter',
    inactivityMsg: 'La connexion a été interrompue pour cause d\'inactivité',
    transferMsg: 'a transféré la conversation à',
    banMsg: 'Vous avez été banni du chat par l\'opérateur',
    closeMsg: 'L\'opérateur a clôt la conversation',
    notationMsg: 'Cette conversation vous a-t-elle été utile ? Notez votre échange avec nos conseillers'
  };

  g.unableToConnectError = 'La connexion a été interrompue';
  return g;
});

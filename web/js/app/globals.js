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
    user: window.config.licence,
    password: window.config.synapsePassword,
    restRoot: 'http://search.saio.fr/api/saio/smartfaq/SmartFAQWCF.svc/rest/'
  };

  g.avi = g.avi || {};
  g.avi.messages = {
    welcomeMsg: 'Enchanté ! Je m\'appelle Labelette. En quoi puis-je vous aider ?',
    satisfiedFeedback: 'Merci pour votre apréciation! N\'hesitez pas à me poser d\'autres questions!',
    unSatisfiedRedirection: 'J\'ai dû faire une erreur dans la réponse que je vous ai donnée.' +
      '<p><b>Souhaitez vous que je vous mette en relation avec un conseiller ?</b></p>',
    noAnswerRedirection: '<b>Voulez-vous que je vous mette en relation avec un conseiller ?</b>',
    apologize: 'Malheureusement, je ne sais pas répondre à cette question pour le moment',
    askForedirection: 'Souhaitez vous être redirigé vers un de nos conseillers ?',
    askForFeedback: ''
  };

  g.avi.messages.redirection = {
    tel: 'Nous téléphoner',
    mail: 'Nous envoyer un mail',
    chat: 'Discuter en ligne avec un de nos conseillers',
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

  g.chat = g.chat || {};
  _.extend(g.chat, {
    inactivityAction: 'Relancer une discussion',
    inactivityMsg: 'Votre conversation a été coupée pour cause d\'inactivité',
    transferMsg: 'a transféré la conversation à',
    banMsg: 'Vous avez été banni du chat par l\'opérateur',
    closeMsg: 'Votre conversation est terminée. ' +
      'N\'hésitez pas à nous envoyer un message si vous avez une nouvelle question.',
    notationMsg: 'Cette conversation vous a-t-elle été utile ?'
  });

  g.unableToConnectError = 'La connexion a été interrompue';
  return g;
});

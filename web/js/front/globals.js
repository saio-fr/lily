/*========================================
      Globals / i18 ?
=========================================*/

define(function(require) {

  'use strict';

  var _       = require('underscore'),
    Modernizr = require('Modernizr'),

    g = {};

  _.extend(g, window.config);

  g.app = 'frontApp';

  g.synapse = {
    user: window.config.licence,
    password: window.config.synapsePassword,
    restRoot: 'http://search.saio.fr/api/saio/smartfaq/SmartFAQWCF.svc/rest/'
  };

  g.typeahead = {
    autoSelect: true,
    highlight: true,
    pendingTemplate:
      '<div class="tt-pending">Cherche une réponse à votre question' +
        '<svg class="tt-search-loader" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" ' +
        'preserveAspectRatio="xMidYMid" class="uil-ring">' +
          '<path fill="none" class="bk" d="M0 0h100v100H0z"></path>' +
          '<circle cx="50" cy="50" r="40" stroke-dasharray="163.36281798666926 87.9645943005142" stroke="#949494" ' +
          'fill="none" stroke-width="20" transform="rotate(51.3325 50 50)">' +
            '<animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" ' +
            'keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" begin="0s"></animateTransform>' +
          '</circle>' +
        '</svg>' +
      '</div>',
    notFoundTemplate:
      '<div class="tt-not-found">' +
        'Nous ne trouvons pas de réponse associée à cette question' +
        '<p class="tt-not-found-note"><em>Vous pouvez malgré tout poser votre question et être redirigé vers un conseiller</em></p>' +
      '</div>'
  };

  g.avi = g.avi || {};

  g.avi.onBoardingMessage = 'Vous pouvez demander par exemple:';
  g.avi.onBoardingMessageEmpty = 'Posez votre question. Nous vous répondons au plus vite';

  g.avi.messages = {
    satisfiedFeedback: 'Merci pour votre appréciation! N\'hésitez pas à poser d\'autres questions.',
    unSatisfiedRedirection: 'Nous sommes désolé que cette réponse ne vous ait pas convenu.' +
      '<p><b>Souhaitez vous être mis en relation avec un conseiller ?</b></p>',
    noAnswerRedirection: '<b>Voulez-vous être mis en relation avec un conseiller ?</b>',
    apologize: 'Nous n\'avons pas trouvé de réponse à votre question',
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

  g.transEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
    'MozTransition'    : 'transitionend',      // only for FF < 15
    'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
  };

  g.transEndEventName = g.transEndEventNames[Modernizr.prefixed('transition')];
  g.animEndEventName = g.animEndEventNames[Modernizr.prefixed('animation')];

  // support css animations
  g.supportAnimations  = Modernizr.cssanimations;
  g.supportTransitions = Modernizr.csstransitions;

  // AVI
  g.loadingTpl =
    '<div class="lily-msg-avatar lily-cst-msg-avatar lily-msg-loading">' +
    '<div class="msg-wrapper">' +
    '<p class="lily-loading">' +
    '<span></span>' +
    '<span></span>' +
    '<span></span>' +
    '</p>' +
    '</div>' +
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

  g.chat.onBoardingMsg = g.chat.onBoardingMsg ? g.chat.onBoardingMsg[0] :
    'n\'hesitez pas à poser une question, un de nos conseillers va vous répondre';

  _.extend(g.chat, {
    inactivityAction: 'Relancer une discussion',
    inactivityMsg: 'Votre conversation a été coupée pour cause d\'inactivité',
    transferMsg: 'a transféré la conversation à',
    banMsg: 'Vous avez été banni du chat par l\'opérateur',
    closeMsg: 'Votre conversation est terminée. ' +
      'N\'hésitez pas à nous envoyer un message si vous avez une nouvelle question.',
    notationMsg: 'Cette conversation vous a-t-elle été utile ?',
    onBoardingChat: 'Posez votre question. Un conseiller SOS Malus vous répondra le plus rapidement possible.'
  });

  g.unableToConnectError = 'La connexion a été interrompue';
  return g;
});

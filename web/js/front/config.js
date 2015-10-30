/*========================================
      config / i18 ?
=========================================*/

define(function(require) {

  'use strict';

  var _         = require('underscore');

  var sharedConfig = require('sharedConfig');
  var aviConfig    = require('front/config/avi');
  var chatConfig   = require('front/config/chat');
  var mailConfig   = require('front/config/mail');

  var config = _.extend({}, sharedConfig);
  config.avi = _.extend(config.avi || {}, aviConfig);
  config.mail = _.extend(config.mail || {}, mailConfig);
  config.chat = _.extend(config.chat || {}, chatConfig);

  _.extend(config, {

    APP_NAME: 'frontApp',

    loadingTpl:
      '<div class="lily-msg-avatar lily-cst-msg-avatar lily-msg-loading">' +
      '<div class="msg-wrapper">' +
      '<p class="lily-loading">' +
      '<span></span>' +
      '<span></span>' +
      '<span></span>' +
      '</p>' +
      '</div>' +
      '</div>',

    connexionIssue:
    'Un problème est survenu. Nous tentons de vous reconnecter avec votre interlocuteur',

    unableToConnectError: 'La connexion a été interrompue',

    dateFr: {
      previousMonth: 'Mois précédent',
      nextMonth: 'Mois suivant',
      months: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
      weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      weekdaysShort : ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
    }

  });

  return config;
});

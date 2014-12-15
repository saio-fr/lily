/*========================================
      Globals / i18 ?
=========================================*/

define(function (require) {

  'use strict';

  var _ = require('underscore'),
      moment = require('moment'),
      g = {};

    _.extend(g, window.config);

  g.path = {
    cdn: "http://cdn.saio.fr",
    customer: "http://cdn.saio.fr/customer/",
    avatars: "http://cdn.saio.fr/customer/"+g.licence+"/images/avatars/",
    defaultAvatar: "http://cdn.saio.fr/images/default-avatar.png" ,
  };

  g.date = {
    // Default period used to datepick
    start: moment().subtract(6, 'days'),
    end: moment().endOf('day'),
  };

  g.faqWysiConfig = {
    "font-styles": false,
    "emphasis": true,
    "lists": false,
    "html": false,
    "link": true,
    "image": false,
    "color": false
  };

  g.modalAlert = {};
  g.modalAlert.redirection = {
    title: 'Attention',
    body: 'Vous ne pouvez pas supprimer une redirection par défaut. ' +
          'Vous devez d\'abord choisir une nouvelle redirection par ' +
          'défaut avant de pouvoir supprimer celle-ci.'
  };
  g.modalAlert.faq = {
    title: 'Cette catégorie n\'existe plus.',
    body: 'Nous vous avons redirigé vers l\'accueil'
  };

  return g;
});

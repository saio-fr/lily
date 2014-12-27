/*========================================
      Globals / i18 ?
=========================================*/

define(function (require) {

  'use strict';

  var _ = require('underscore'),
      g = {};

    _.extend(g, window.config);

  g.path = {
    cdn: "http://cdn.saio.fr",
    customer: "http://cdn.saio.fr/customer/",
    avatars: "http://cdn.saio.fr/customer/"+g.licence+"/images/avatars/",
    defaultAvatar: "http://cdn.saio.fr/images/default-avatar.png" ,
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
  g.modalConfirm = {};
  g.modalApp = {};

  g.modalAlert.redirection = {
    title: "Attention",
    body: "Vous ne pouvez pas supprimer une redirection par défaut. " +
          "Vous devez d\'abord choisir une nouvelle redirection par " +
          "défaut avant de pouvoir supprimer celle-ci."
  };
  g.modalAlert.faq = {
    title: "Cette catégorie n\'existe plus.",
    body: "Nous vous avons redirigé vers l\'accueil"
  };
  

  g.modalConfirm.chatClose = {
    name:       "modal-close",
    title:      "Etes-vous sur de vouloir fermer la conversation ?",
    body:       "Une fois la conversation terminé, vous ne pourrez plus y " +
                "accéder tant que le visiteur n'aura pas de nouveau engagé " +
                "le dialogue.",
    cancel:     "Annuler",
    confirm:    "Terminer la conversation"
  };
  g.modalConfirm.chatBan = {
    name:       "modal-ban",
    title:      "Etes-vous sur de vouloir bannir l'interlocuteur ?",
    body:       "Une fois banni, votre interlocuteur ne pourra plus " +
                "engager le dialogue avec les opérateurs de chat pour " +
                "une durée de 20 minutes.",
    cancel:     "Annuler",
    confirm:    "Bannir l'interlocuteur", 
  };
  g.modalApp.chatTransfer = {
    name:       "modal-transfer",
    title:      "A qui souhaitais vous transférer la conversation ?"
  };

  return g;
});

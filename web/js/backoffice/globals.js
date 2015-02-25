/*========================================
      Globals / i18 ?
=========================================*/

define(function(require) {

  'use strict';

  var _ = require('underscore'),
    g = {};

  _.extend(g, window.config);

  g.path = {
    cdn: "http://cdn-saio.fr",
    customer: "http://cdn-saio.fr/customer/",
    avatars: "http://cdn-saio.fr/customer/" + g.licence + "/images/avatars/",
    defaultAvatar: "http://cdn-saio.fr/images/default-avatar.png",
  };
  
  g.knowledge = {};
  g.knowledge.questionsSortUrl = '/questions/sort';
  g.knowledge.noQuestions = '<h5 class="no-item">Aucune questions dans la (les) ' + 
    'catégories sélectionnée(s)</h5>';

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
    name: "modal-default-redirection",
    title: "Attention",
    body: "Vous ne pouvez pas supprimer une redirection par défaut. " +
      "Vous devez d\'abord choisir une nouvelle redirection par " +
      "défaut avant de pouvoir supprimer celle-ci."
  };
  g.modalAlert.faq = {
    name: "modal-redirection",
    title: "Cette catégorie n\'existe plus.",
    body: "Nous vous avons redirigé vers l\'accueil"
  };
  g.modalConfirm.groupTrash = {
    name: "modal-trash",
    title: "Etes-vous sur de vouloir ce groupe ?",
    body: "Vous allez supprimer un groupe, cette action est irréversible. Souhaitez vous continuer ?",
    cancel: "Annuler",
    confirm: "Supprimer"
  };
  g.modalConfirm.userTrash = {
    name: "modal-trash",
    title: "Etes-vous sur de vouloir cet utilisateur ?",
    body: "Vous allez supprimer un utilisateur, cette action est irréversible. Souhaitez vous continuer ?",
    cancel: "Annuler",
    confirm: "Supprimer"
  };

  g.modalConfirm.chatUnavailable = {
    name: "modal-unavailable",
    title: "Vous n'êtes pas disponible pour converser.",
    body: "Afin de pouvoir accéder au live, vous devez passer votre " +
      "statut en dispoible.",
    cancel: "Annuler",
    confirm: "Devenir disponible",
  };
  g.modalConfirm.chatClose = {
    name: "modal-close",
    title: "Etes-vous sur de vouloir fermer la conversation ?",
    body: "Une fois la conversation terminé, vous ne pourrez plus y " +
      "accéder tant que le visiteur n'aura pas de nouveau engagé " +
      "le dialogue.",
    cancel: "Annuler",
    confirm: "Terminer la conversation"
  };
  g.modalConfirm.chatBan = {
    name: "modal-ban",
    title: "Etes-vous sur de vouloir bannir l'interlocuteur ?",
    body: "Une fois banni, votre interlocuteur ne pourra plus " +
      "engager le dialogue avec les opérateurs de chat pour " +
      "une durée de 20 minutes.",
    cancel: "Annuler",
    confirm: "Bannir l'interlocuteur",
  };
  g.modalApp.chatTransfer = {
    name: "modal-transfer",
    title: "A qui souhaitez vous transférer la conversation ?"
  };
  g.modalConfirm.questionsTrash = {
    name: "modal-trash",
    title: "Etes-vous sur de vouloir supprimer ces questions ?",
    body: "Une fois les questions supprimées, vous ne pourrez plus y " +
      "avoir accès ",
    cancel: "Annuler",
    confirm: "Supprimer les questions"
  };
  g.modalConfirm.categoryTrash = {
    name: "modal-trash",
    title: "Etes-vous sur de vouloir cette catégorie ?",
    body: "Une fois supprimée, vous ne pourrez plus y " +
      "avoir accès ",
    cancel: "Annuler",
    confirm: "Supprimer la catégorie"
  };
  g.modalApp.newCategory = {
    name: "modal-categories",
    title: "Ajouter une catégorie"
  };
  g.modalApp.updateCategory = {
    name: "modal-categories",
    title: "Modifier une catégorie"
  }; 


  return g;
});

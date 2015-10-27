/*========================================
      config / i18 ?
=========================================*/

define(function(require) {

  'use strict';

  var _ = require('underscore');

  var sharedConfig = require('sharedConfig');

  var config = _.extend(sharedConfig, {

    APP_NAME: 'backofficeApp',

    wysiSanitize: {
      tags: {
        p: true,
        b: true,
        a: {
          href: true,
          target: '_blank'
        }
      }
    },

    knowledge: {
      questionsSortUrl: '/questions/sort',
      noQuestions: '<h5 class="no-item">Aucune questions dans la (les) ' +
    'catégories sélectionnée(s)</h5>',
    },

    faqWysiConfig: {
      'font-styles': false,
      'emphasis': true,
      'lists': false,
      'html': false,
      'link': true,
      'image': false,
      'color': false
    },

    modalAlert: {
      redirection: {
        name: 'modal-default-redirection',
        body: 'Vous ne pouvez pas supprimer une redirection par défaut. ' +
          'Vous devez d\'abord choisir une nouvelle redirection par ' +
          'défaut avant de pouvoir supprimer celle-ci.'
      },

      faq: {
        name: 'modal-redirection',
        body: 'Cette catégorie n\'existe plus. Nous vous avons redirigé vers l\'accueil'
      },

      configSucess: {
        name: 'modal-config-saved',
        body: 'Vos informations <strong>ont bien</strong> été sauvegardées.'
      },

      wsConnectionLost: {
        name: 'modal-connection-lost',
        body: 'La connexion avec nos serveurs n\'a pas pu être établi. Rafraichissez la page pour essayer de vous reconnecter.'
      }
    },

    modalConfirm: {
      groupTrash: {
        name: 'modal-trash',
        title: 'Etes-vous sur de vouloir ce groupe ?',
        body: 'Vous allez supprimer un groupe, cette action est irréversible. Souhaitez vous continuer ?',
        cancel: 'Annuler',
        confirm: 'Supprimer'
      },

      userTrash: {
        name: 'modal-trash',
        title: 'Etes-vous sur de vouloir cet utilisateur ?',
        body: 'Vous allez supprimer un utilisateur, cette action est irréversible. Souhaitez vous continuer ?',
        cancel: 'Annuler',
        confirm: 'Supprimer'
      },

      chatUnavailable: {
        name: 'modal-unavailable',
        title: 'Vous n\'êtes pas disponible pour converser.',
        body: 'Afin de pouvoir accéder au live, vous devez passer votre ' +
          'statut en dispoible.',
        cancel: 'Annuler',
        confirm: 'Devenir disponible',
      },

      chatClose: {
        name: 'modal-close',
        title: 'Etes-vous sur de vouloir fermer la conversation ?',
        body: 'Une fois la conversation terminé, vous ne pourrez plus y ' +
          'accéder tant que le visiteur n\'aura pas de nouveau engagé ' +
          'le dialogue.',
        cancel: 'Annuler',
        confirm: 'Terminer la conversation'
      },

      chatBan: {
        name: 'modal-ban',
        title: 'Etes-vous sur de vouloir bannir l\'interlocuteur ?',
        body: 'Une fois banni, votre interlocuteur ne pourra plus ' +
          'engager le dialogue avec les opérateurs de chat pour ' +
          'une durée de 20 minutes.',
        cancel: 'Annuler',
        confirm: 'Bannir l\'interlocuteur',
      },

      questionsTrash: {
        name: 'modal-trash',
        title: 'Etes-vous sur de vouloir supprimer ces questions ?',
        body: 'Une fois les questions supprimées, vous ne pourrez plus y ' +
          'avoir accès ',
        cancel: 'Annuler',
        confirm: 'Supprimer'
      },

      categoryTrash: {
        name: 'modal-trash',
        title: 'Etes-vous sur de vouloir supprimer cette catégorie ?',
        body: 'Une fois supprimée, vous ne pourrez plus y ' +
          'avoir accès ',
        cancel: 'Annuler',
        confirm: 'Supprimer'
      },

      shortcutTrash: {
        name: 'modal-trash',
        title: 'Etes-vous sur de vouloir supprimer ce message pré-enregistré ?',
        body: 'Une fois supprimé, vous ne pourrez plus y ' +
          'avoir accès ',
        cancel: 'Annuler',
        confirm: 'Supprimer'
      },
    },

    modalApp: {
      chatTransfer: {
        name: 'modal-transfer',
        title: 'A qui souhaitez vous transférer la conversation ?'
      },

      newCategory: {
        name: 'modal-categories',
        title: 'Ajouter une catégorie'
      },

      updateCategory: {
        name: 'modal-categories',
        title: 'Modifier une catégorie'
      }
    },

    modalPrompt: {
      insertLink: {
        name: 'modal-prompt',
        title: 'Veuillez entrer un lien',
        body: '',
        cancel: 'Annuler',
        confirm: 'Valider'
      }
    },

    loadingTpl:
      '<div class="msg-wrapper">' +
      '<p class="search-loading">' +
      '<span></span>' +
      '<span></span>' +
      '<span></span>' +
      '</p>' +
      '</div>',

    notifications: {
      countTitle: function(count) {
        return 'Vous avez ' + count + ' notification' +
          (count <= 1 ? '' : 's') + ' en attente';
      },
      messageUnAnswered: 'Message en attente',
      messageUrgent: 'Message urgent'
    },

  });

  return config;
});

define(function(require) {

  return {
    mailSentMsg: 'Votre mail a bien été envoyé',
    mailSentError: 'Votre mail n\'a pas pu être envoyé',

    onBoardingMessage: 'Veuillez renseigner ces informations afin qu\'un de nos conseillers puisse traiter votre demande',
    contactFormTitle: 'Ces informations nous permettront de répondre à votre requête dans les meilleurs délais',
    callbackFormTitle: 'Je souhaite être rappelé(e)',

    formEmailPlaceholder: 'Votre adresse Email *',
    formNamePlaceholder: 'Votre nom (Nom et prénom)',
    formMsgPlaceholder: 'Votre message à l\'intention de nos conseillers *',
    formTelPlaceholder: 'Votre numéro de téléphone *',
    formDatePlaceholder: 'Date de rappel souhaitée',
    formTimePlaceholder: 'Horaire souhaité',

    formEmailLabel: 'Adresse e-mail *',
    formNameLabel: 'Objet *',
    formMsgLabel: 'Message *',
    formTelLabel: 'Numéro de Téléphone',
    formDateLabel: 'Date',
    formTimeLabel: 'Horaire souhaité',

    redirectionTypeSwitchLabel: 'Je souhaite être rappelé',

    buttonCtaCallBack: 'Je souhaite être rappelé',
    buttonCtaContact: 'Envoyer ma demande',

    validationMessages: {
      required: 'Ce champ doit être rempli.',
      "default": 'Le champ %s a toujours sa valeur par défault. Veuillez la changer.',
      maxLength: 'Le champ {0} doit contenir un maximum de {1} caractères.',
    },

    validation: {
      email: {
        required: true,
        pattern: 'email',
        msg: 'L\'adresse renseignée doit être une adresse email valide.'
      },
      message: {
        required: true,
      },
      tel: {
        required: true,
        maxLength: 15,
        msg: 'Le numéro de téléphone renseigné n\'est pas valide'
      }
    }
  };

});

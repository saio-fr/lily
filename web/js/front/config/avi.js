define(function(require) {

  return {
    onBoarding: {
      title: 'Vous pouvez demander par exemple:',
      empty: 'Posez votre question. Nous vous répondons au plus vite',
    },
    messages: {
      satisfiedFeedback: 'Merci pour votre appréciation! N\'hésitez pas à poser d\'autres questions.',
      unSatisfiedRedirection: 'Nous sommes désolés que cette réponse ne vous ait pas convenu.' +
        '<p><b>Souhaitez vous être mis en relation avec un conseiller ?</b></p>',
      noAnswerRedirection: '<b>Voulez-vous être mis en relation avec un conseiller ?</b>',
      apologize: 'Nous n\'avons pas trouvé de réponse à votre question',
      askForedirection: 'Souhaitez vous être redirigé vers un de nos conseillers ?',
      askForFeedback: '',
      redirection: {
        tel: 'Etre rappelé par un conseiller',
        mail: 'Etre recontacté par mail',
        chat: 'Discuter en ligne avec un de nos conseillers',
        none: 'Je ne veux pas être redirigé'
      },
      satisfaction: {
        incomplete: 'Cette réponse est incomplète',
        fausse:     'cette réponse ne répond pas à ma question'
      },
    },

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

});

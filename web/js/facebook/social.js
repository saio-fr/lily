/*
 * Trigger this function with any javascript action to let the user invite friends who might use Lily
 */

function newInvite(){
   var receiverUserIds = FB.ui({
    method : 'apprequests',
    message: 'Viens découvrir Lily, l\'avatar intelligent de SAIO. Des questions ? http://saio.fr',
    },
function(receiverUserIds) {
  console.log("IDS : " + receiverUserIds.request_ids);
});
}

/*
 * Allow the user to share Lily on Facebook
 */
function streamPublish(name, description, userPrompt){
    FB.ui({ method : 'feed',
        message: userPrompt,
        link   :  'https://www.facebook.com/appcenter/integration-saio' ,
        caption:  'Découvrez Lily, l\'avatar intelligent de SAIO !'
    },
    /* Maybe we shoulde use console.log instead of alert */
    function(response) {
        if (response && !response.error_code) {
            alert('Post was published.');
        } else {
            alert('Post was not published.');
        }
    });
}

function publishStream(){
    streamPublish("Stream Publish", 'Grâce à son Lily, son avatar intelligent, SAIO dynamise votre site web et booste votre service client !', "SAIO, l'innovation à la française !");
}


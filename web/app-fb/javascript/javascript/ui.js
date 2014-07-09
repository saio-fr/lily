function onShare() {
  sendChallenge(null,'SAIO is amazing! Come and check it out!', function(response) {
    console.log('sendRequest',response);
  });
}


function onFeed() {
  sendFeed('I just asked Lily some questions ! Wanna try ?', function(){
    showHome();
  });
}

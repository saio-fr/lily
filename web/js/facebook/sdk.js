// Initialize the JS SDK

$(document).ready(function() {
  FB.init({
    appId  : '680445818695698',
    status : true, // check login status
    cookie : true, // enable cookies to allow the server to access the session
    xfbml  : true , // parse XFBML
    version: 'v2.0'
  });
});

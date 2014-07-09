
$(document).ready(function() {
  FB.init({
    appId: 680446005362346, //not the final appId
    frictionlessRequests: true,
    status: true,
    version: 'v2.0'
  });

  FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
  FB.Event.subscribe('auth.statusChange', onStatusChange);
});

$(document).on( 'click', '#menu button.share', onShare );
$( document ).on( 'click', '#menu button.feed', onFeed );

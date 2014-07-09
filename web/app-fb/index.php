<?php

require 'server/fb-php-sdk/facebook.php';

  // Production
  $app_id = '680445818695698';
  $app_secret = 'd432b835cef2a92f68b453c32b6001f0';
  $app_namespace = 'saio-service';

  $app_url = 'http://apps.facebook.com/' . $app_namespace . '/';
  $scope = 'email,publish_actions';

  // Init the Facebook SDK
  $facebook = new Facebook(array(
    'appId'  => $app_id,
    'secret' => $app_secret,
  ));

  // Get the current user
  $user = $facebook->getUser();

  // If the user has not installed the app, redirect them to the Login Dialog
  if (!$user) {
    $loginUrl = $facebook->getLoginUrl(array(
      'scope' => $scope,
      'redirect_uri' => $app_url,
    ));
    //print('<script> top.location.href=\'' . $loginUrl . '\'</script>');
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <title>SAIO</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="javascript/jquery-1.11.1.min.js"></script>
  </head>

  <body>

    <div id="test" ><p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim varius mattis. Donec molestie vehicula justo, a ultricies leo fermentum in. Aliquam egestas interdum orci, eu imperdiet nunc pulvinar vel. Praesent varius enim sit amet quam scelerisque ullamcorper. Vestibulum quam urna, ultricies in magna a, tincidunt hendrerit massa. Suspendisse potenti. Donec sodales orci eu nunc tempor, sed euismod lectus suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin auctor lacinia velit nec suscipit. Donec imperdiet urna eget faucibus faucibus. Mauris vitae consectetur turpis, a sodales lacus. Donec nulla lacus, congue eu lacus non, iaculis malesuada dui. Integer consectetur tempus tincidunt. Integer iaculis sem at dignissim rutrum.

    </p></div>

    <div id="menu">
      <button class="share"></button>
      <button class="feed"></button>
    </div>

    <script src="//connect.facebook.net/en_US/all.js" ></script>

    <script type="text/javascript" src="javascript/social.js"></script>
    <script type="text/javascript" src="javascript/core.js"></script>
    <script type="text/javascript" src="javascript/ui.js"></script>

    <!--
    <script>
          FB.init({
        appId: appId,
        frictionlessRequests: true,
        cookie: true,
      });

      FB.getLoginStatus(function(response) {
        uid = response.authResponse.userID ? response.authResponse.userID : null;
      });
    </script>
  -->
  </body>
</html>

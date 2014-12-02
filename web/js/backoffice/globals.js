/*========================================
      Globals / i18 ?
=========================================*/

define(function (require) {

  'use strict';

  var _ = require('underscore'),

  globals = {
    avatarUrl: "http://saio.fr/images/avatar-utilisateur.png",

  };

  _.extend(globals, window.config);

  return globals;
});

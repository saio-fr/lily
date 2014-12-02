/*========================================
      Globals / i18 ?
=========================================*/

define(function (require) {

  // Require CommonJS like includes
	var _ = require('underscore');
	
  'use strict';

  var globals = {
    avatarUrl: "http://saio.fr/images/avatar-utilisateur.png",
  };
  
  _.extend(globals, config);
  
  return globals;
});

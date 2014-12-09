/*========================================
      Globals / i18 ?
=========================================*/

define(function (require) {

  'use strict';

  var _ = require('underscore'),  
  var g = {};
  
    _.extend(g, config);

  g.path = {
    cdn: "http://cdn.saio.fr",
    customer: "http://cdn.saio.fr/customer/",
    avatars: "http://cdn.saio.fr/customer/"+g.licence+"/images/avatars/",
    defaultAvatar: "http://cdn.saio.fr/images/default-avatar.png" ,
  };

  return g;

});

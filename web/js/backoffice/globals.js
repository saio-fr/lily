/*========================================
      Globals / i18 ?
=========================================*/

define(function (require) {

  'use strict';

  var _ = require('underscore'),
      moment = require('moment'), 
      date = {},
      g = {};
  
    _.extend(g, config);

  g.path = {
    cdn: "http://cdn.saio.fr",
    customer: "http://cdn.saio.fr/customer/",
    avatars: "http://cdn.saio.fr/customer/"+g.licence+"/images/avatars/",
    defaultAvatar: "http://cdn.saio.fr/images/default-avatar.png" ,
  };
  
  g.date = {
    // Default period used to datepick
    start: moment().subtract(6, 'days'),
    end: moment().endOf('day'),
  }

  return g;

});

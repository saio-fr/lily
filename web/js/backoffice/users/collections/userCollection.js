/*======================================
          USER COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var UserModel = require('backoffice/users/models/userModel'),

      // Object wrapper returned as a module
      UserCollection;

  UserCollection = Backbone.Collection.extend({

    model : UserModel,
    sortCriteria : "lastname",
    url: '/',

    comparator: function(item) {

      var roles = item.get('roles'),
          rolesInt = 0,
          lastLogin;

      if ( this.sortCriteria === "lastname" ) {
        return item.get('lastname').toUpperCase();

      } else if ( this.sortCriteria === "roles" ) {
        
        if (roles.indexOf('ROLE_ADMIN') !== -1) {
          rolesInt += 4;
        }
        if ( roles.indexOf('ROLE_KNOWLEDGE_OPERATOR') !== -1 ){
          rolesInt += 2;
        }
        if ( roles.indexOf('ROLE_CHAT_OPERATOR') !== -1 ){
          rolesInt += 1;
        }

        return -rolesInt; //Par défaut, ROLE_ADMIN en premier

      } else if ( this.sortCriteria === "services" ) {
        //Tri par ordre alphabétique sur les premiers éléments, puis second, etc)
        return item.get('services').join('/');

      } else if ( this.sortCriteria === "last_login" ) {
        if (item.get('last_login')) {

          lastLogin = new Date(item.get('last_login'));
          lastLogin = -lastLogin.getTime();
          return lastLogin;

        } else {
          return Infinity;
        }
        
      } else {
        if( this.sortCriteria !== "id" ){
          console.warn("Sort criteria not recognized");
        }
        return item.get('id') || "0";
      }

      return;
    }
  });

  return UserCollection;
});

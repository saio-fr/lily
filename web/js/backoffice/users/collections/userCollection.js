/*======================================
          USER COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      UserModel = require('backoffice/users/models/useModel'),

      // Object wrapper returned as a module
      UsersCollection;

  UsersCollection = Backbone.Collection.extend({

    model : UserModel,
    sortCriteria : "lastname",
    'url': '/rest/',
    
    initialize: function () {
      this.fetch();
    },

    comparator: function(item) {

      var roles = item.get('roles'),
          rolesInt = 0,
          last_login;

      if ( this.sortCriteria === "lastname" ) {
        return item.get('lastname');

      } else if ( this.sortCriteria === "roles" ) {
        // Convert roles into an integer
        // ROLE_ADMIN : += 4
        // ROLE_KNOWLEDGE_OPERATOR : += 2
        // ROLE_CHAT_OPERATOR : += 1

        if ( roles.indexOf('ROLE_ADMIN') !== -1 )
          rolesInt += 4;
        if ( roles.indexOf('ROLE_KNOWLEDGE_OPERATOR') !== -1 )
          rolesInt += 2;
        if ( roles.indexOf('ROLE_CHAT_OPERATOR') !== -1 )
          rolesInt += 1;

        return -rolesInt; //Par défaut, ROLE_ADMIN en premier

      } else if ( this.sortCriteria === "services" ) {
        //Tri par ordre alphabétique sur les premiers éléments, puis second, etc)
        return item.get('services').join('/');

      } else if ( this.sortCriteria === "last_login" ) {
        if ( item.get('last_login') !== null) {

          last_login = new Date(item.get('last_login'));
          last_login = -last_login.getTime();
          return last_login;

        } else {
          return Infinity;
        }
      } else {
        if( this.sortCriteria !== "id" )
          console.warn("Sort criteria not recognized");
        return item.get('id') || "0";
      }

      return a;
    },
  });
  
  return UsersCollection;
});

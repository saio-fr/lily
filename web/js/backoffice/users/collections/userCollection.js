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
    url: '/users',

    comparator: function(item) {

      var roles = item.get('roles'),
          rolesInt = 0,
          lastLogin;
          
      switch (this.sortCriteria) {
        
        case 'lastname':
          return item.get('lastname').toUpperCase();
          break;
          
        case 'roles':
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
          break;
          
        case 'services':
          return item.get('services').join('/');
          break;
          
        case 'last_login':
          if (item.get('last_login')) {

          lastLogin = new Date(item.get('last_login'));
          lastLogin = -lastLogin.getTime();
          return lastLogin;

          } else {
          return Infinity;
          }
          break;
        
        case 'id':
          return item.get('id') || "0";
          break;
          
        default: 
          console.warn("Sort criteria not recognized");
          break;
      }
      return;
    }
  });

  return UserCollection;
});

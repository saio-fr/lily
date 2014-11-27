/*================================
          MODEL USER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      UserModel;


  UserModel = Backbone.Model.extend({

    url: '/rest',

    getRolesHuman: function () {

      var roles = this.get('roles'),
          roleHuman = "";

      if ( typeof(roles) === "undefined" ) {
        return "";
      }

      if ( roles.indexOf('ROLE_ADMIN') !== -1 ) {
        roleHuman = "Administrateur";

      } else {
        if ( roles.indexOf('ROLE_CHAT_OPERATOR') !== -1 ) {
          roleHuman += "Opérateur Live chat";
        }
        if ( roles.indexOf('ROLE_KNOWLEDGE_OPERATOR') !== -1 ) {
          roleHuman += (roleHuman === "") ? "Opérateur " : " et ";
          roleHuman += "Base de connaissance";
        }
      }

      return roleHuman;
    },

    getLastLoginHuman: function () {

      var lastLogin = this.get('last_login'),
          lastLoginDay,
          lastLoginMonth,
          lastLoginYear,
          d;

      if (typeof(lastLogin) !== "undefined" &&
        lastLogin !== null &&
        lastLogin.toUpperCase() !== 'NULL') {

        d = new Date(lastLogin);

        lastLoginDay = (d.getDate() < 10 ? '0' : '') + d.getDate();
        lastLoginMonth = (d.getMonth() < 9 ? '0' : '') + (d.getMonth()+1);
        lastLoginYear = (d.getYear() - 100);

        return "Dernière connexion le " + lastLoginDay + '/' + lastLoginMonth + '/' + lastLoginYear;

      } else {
        return "Jamais connecté";
      }
    },

    toJSONWithComputedValues: function () {

      var data = this.toJSON();

      // todo: replace with camelCase notation in both this file and template
      data.last_login_human=this.getLastLoginHuman();
      data.roles_human=this.getRolesHuman();

      return data;
    },
  });

  return UserModel;
});


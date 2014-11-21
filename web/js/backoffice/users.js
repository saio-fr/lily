$(function () {
  'use strict';

  function closeModelView() {
    this.model = undefined;
    this.$el.empty();
    this.stopListening();
    return this;
  }

  function closeCollectionView() {
    this.model = undefined;
    this.$el.empty();
    this.stopListening();
    return this;
  }

  $.ajaxPrefilter(function (options) {
    options.url = root + options.url;
  });

  var lily = lily || {},
      UserModule = lily.UserModule = {};

  /*================================
      Model User
    ====================================*/

  UserModule.User = Backbone.Model.extend({

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

      if (typeof(lastLogin) !== "undefined"
          && lastLogin !== null
          && lastLogin.toUpperCase() !== 'NULL') {

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

      data.last_login_human=this.getLastLoginHuman();
      data.roles_human=this.getRolesHuman();

      return data;
    },
  });

  /*======================================
      Collection User
    =======================================*/

  UserModule.ListUser = Backbone.Collection.extend({

    model : UserModule.User,
    sortCriteria : "lastname",

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


  /*======================================
      Modal Delete
    =========================================*/

  UserModule.ModalDelete = Backbone.View.extend({

    id: 'delete',
    className: 'modal fade',
    template: _.template( $('#modal-delete').html()),

    initialize: function() {
      this.render();
    },

    render: function() {

      this.$el.html(this.template());
      this.$el.appendTo('#users');
      this.$el.attr({
        'tabindex': '-1',
        'role': 'dialog',
        'aria-labelledby': 'close',
        'aria-hidden': 'true'
      });
      this.$el.modal('show');

      return this;
    }

  });


  /*======================================
      UserView
    =========================================*/

  UserModule.UserView = Backbone.View.extend({

    tagName:  "li",
    className: "list-group-item hover",
    template: _.template($('#user').html()),

    events: {
      'click .destroy': 'destroy',
      'click .view'   : 'edit'
    },

    setModel:function (model) {

      if ( this.model !== model ) {
        this.model = model,
          this.listenTo(this.model, 'select', this.select);
        this.listenTo(this.model, 'render', this.render);
        this.render();
      }

      return this;
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSONWithComputedValues()));
      return this;
    },

    destroy: function (e) {

      e.stopPropagation();

      new UserModule.ModalDelete();

      var that = this;

      $('.modal-close-confirm').click(function() {

        that.model.url = "/rest/" + that.model.id;
        that.model.destroy();
        that.remove();

      });

    },

    edit: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var id = $(e.currentTarget).parent().data("id");

      if ( typeof(UserModule.userEditView) === "undefined" ) {
        UserModule.userEditView = new UserModule.UserEditView();
      }

      UserModule.userEditView.setModel(this.model)

      this.$el.parent().find('li.active').removeClass('active');
      this.$el.addClass('active');
      return this;
    },

    close: UserModule.closeModelView,
  });

  /*========================================
      User List View
    =========================================*/

  UserModule.ListUserView = Backbone.View.extend({

    el: '#user-list',

    initialize: function (listUser) {
      this.collection = listUser;
      this.listenTo(listUser, 'add', this.add);
      this.listenTo(listUser, "sort", this.updateView);
      this.render();
    },

    render: function () {

      if( $(document).find(this.$el).length === 0 ) {
        // parent view has been rebuild, we have to update our $el
        this.$el = $(this.__proto__.el);
        this.delegateEvents();
      }
      this.$el.empty();
      this.collection.each(this.add, this);

      return this;
    },

    // Add user to the list
    add: function (user) {

      var view = new UserModule.UserView();
      view.setModel(user)
      this.$el.append(view.render().el);

      return this;
    },

    updateView: function() {

      this.$el.empty();
      this.render();

      return this;
    },

    close: closeCollectionView

  });

  /* ============================================================================================
                                 User Management
   ========================================================================================== */

  /*========================================
      User Edit View
    =========================================*/

  UserModule.UserEditView = Backbone.View.extend({

    el: '#user-detail',
    template: _.template($('#userEdit').html().replace(/<\\\/script/g, '</script')),

    setModel:function (model) {

      var that = this;

      if ( this.model !== model ) {
        this.model = model;
        this.listenTo(this.model, 'destroy', this.remove);
        this.render();
        this.widget = this.$el.find('#avatarWidget');

        this.widget.load(function() {

          that.widget.contents().find('input').change(function() {
            that.changeAvatar();
          });
        });

      }

      return this;
    },

    events: {
      'click .button-update' : 'update',
      'click .button-cancel' : 'cancel',
      'keyup input' : 'checkIfValid',
      'submit #user-editor' : 'noSubmit'
    },

    changeAvatar: function () {
      this.widget.contents().find('#avatarWidgetForm').submit();
    },

    // TODO: Look into a better way to do that kind of data binding... OR/AND
    // Break into multiple subFunctions
    update: function (e) {

      if (this.model.get('id') === undefined) {
        $('#user-editor').jsFormValidator('validate', {recursive:true});
      }

      if( $('#user-editor')[0].jsFormValidator.isValid() ) {

        // Dirty Selectors for form inputs
        var classicInputs = $('#user-editor input:not([type="checkbox"]):not([type="password"]):not([name="avatar"]'),
            multipleChoicesInputs = $('#user-editor .dropdownSelect'),
            passwordInputFirst = $('#lily_userbundle_user_plainPassword_first'),
            passwordInputSecond = $('#lily_userbundle_user_plainPassword_second'),
            avatarUrl;

        // Fill model with values from classic inputs
        for ( var i = 0; i < classicInputs.length; i++ ) {
          this.model.set(classicInputs.eq(i).attr('name'), classicInputs.eq(i).val());
        }

        // Fill model with values from multiple choice inputs
        for ( var i = 0; i < multipleChoicesInputs.length; i++ ) {

          var multipleValues = [],
              multipleChoices = multipleChoicesInputs.eq(i).find(':checked');

          for ( var j = 0; j < multipleChoices.length; j++ ) {
            multipleValues.push(multipleChoices.eq(j).attr('name'));
          }

          this.model.set(multipleChoicesInputs.eq(i).data('name'), multipleValues);
        }

        // Fill model with avatar url
        avatarUrl = $('iframe#avatarWidget')
        .contents()
        .find('input#lily_userbundle_user_avatar')
        .val(); // au format url("url") ou url("data:@@;")

        this.model.set('avatar', avatarUrl);

        // Same with password
        this.model.set('plainPassword', {
          'first': passwordInputFirst.val(),
          'second': passwordInputSecond.val()
        });

        if ( this.model.get('id') === undefined ) {
          UserModule.listUser.create(this.model, { wait: true });

        } else {
          this.model.url = "/rest/"+this.model.get('id');
          this.model.save();
        }

        this.model.trigger('render');

        $('#user-list .active').removeClass('active');
        this.remove();

      }

      return this;
    },

    cancel: function () {
      $('#user-list .active').removeClass('active');
      this.remove();
    },

    render: function () {

      if( $(document).find(this.$el).length === 0 ) {
        // parent view has been rebuild, we have to update our $el
        this.$el = $(this.__proto__.el);
        this.delegateEvents();
      }

      UserModule.userManagementAppView.editedUserId = this.model.id;

      this.$el.removeClass('hide');
      this.$el.html(this.template(this.model.toJSON()));

      $('iframe#avatarWidget').load(function () {
        $('.loader').hide()
      });

      return this;
    },

    noSubmit: function (e) {

      e.preventDefault();
      return this;
    },

    checkIfValid: function (e) {

      e.target.jsFormValidator.validate();
      return this;
    },

    remove: function () {

      UserModule.userManagementAppView.editedUserId = null;
      this.$el.addClass('hide');
      this.close();
    },

    close: UserModule.closeModelView
  });


  /*========================================
      APP
    =========================================*/

  UserModule.UserManagementApp = Backbone.Model.extend();


  /*========================================
      USER MANAGEMENT APP VIEW
    =========================================*/

  UserModule.UserManagementAppView = Backbone.View.extend({

    el: '#users',
    template: _.template($('#app').html()),
    editedUserId : null,

    events: {
      "click .new-user"   : "createUser",
      'click #sortMenu li': 'changeSortCriteria',
    },

    initialize: function() {

      this.listenTo(UserModule.listUser, 'add', this.updateNumberOfUser);
      this.listenTo(UserModule.listUser, 'remove', this.updateNumberOfUser);
    },

    setModel: function (model) {

      if( this.model !== model ) {
        this.model = model;
        this.render();
      }

      return this;
    },

    render: function () {

      if( $(document).find(this.$el).length == 0 ) {
        // parent view has been rebuild, we have to update our $el
        this.$el = $(this.__proto__.el);
        this.delegateEvents();
      }

      this.$el.removeClass('hide');
      this.$el.html(this.template(this.model.toJSON()));
      this.updateNumberOfUser();

      return this;
    },

    createUser: function (e) {
      e.preventDefault();

      if ( typeof(UserModule.userEditView) !== 'undefined' ) {
        UserModule.userEditView.remove();
      }

      var user = new UserModule.User({ avatar:"http://saio.fr/images/avatar-utilisateur.png" });
      user.url = '/rest';

      if ( typeof(UserModule.userEditView) === "undefined" )
        UserModule.userEditView = new UserModule.UserEditView();

      UserModule.userEditView.setModel(user);

      $('#user-list .active').removeClass('active');

      return this;
    },

    changeSortCriteria: function(e) {

      var target = $(e.target),
          listUser = UserModule.listUser;

      if( target.data('criteria') !== undefined ) {

        UserModule.listUser.sortCriteria = target.data('criteria');
        target.parent().find('.active').removeClass('active');
        target.addClass('active');
        UserModule.listUser.sort();
        UserModule.listUserView.updateView();
      }

      return this;
    },

    updateNumberOfUser: function() {

      var maxUsers,
          listCounter;

      if ( this.model ) {
        maxUsers = this.model.get('maxusers');
      }

      if( UserModule.listUser.length >= maxUsers ) {
        $('#userListCounter').addClass('limitReached');
        $('#userMaxReachedAlert').show();
        $('#addUserButton').hide();
      } else {
        $('#userListCounter').removeClass('limitReached');
        $('#userMaxReachedAlert').hide();
        $('#addUserButton').show();
      }

      listCounter = UserModule.listUser.length
      + (UserModule.listUser.length <= 1 ? " compte" : " comptes")
      + " sur " + maxUsers
      + (maxUsers <= 1 ? " disponible" : " disponibles");

      $('#userListCounter').text(listCounter);

      return this;
    },

    close: UserModule.closeModelView
  });

  /* ============================================================================================
                                            Router
   ========================================================================================== */

  UserModule.AppRouter = Backbone.Router.extend({

    routes: {
      "" : "home",
      "*path" : "home"
    },

    initialize: function () {

      // TODO Make listUser a less dirty global... Local namespace for users module ?
      // Thanks :)
      UserModule.listUser = new UserModule.ListUser();
      UserModule.listUser.url = "/rest/";
      UserModule.listUserLoader = UserModule.listUser.fetch();
    },

    home: function() {

      // Same here!
      var userManagementApp = new UserModule.UserManagementApp(),
          self = this;

      if ( typeof(UserModule.userManagementAppView) === "undefined" ) {
        UserModule.userManagementAppView = new UserModule.UserManagementAppView();
      }

      userManagementApp.url = "/rest/maxusers";
      userManagementApp.fetch({
        success: function() {
          UserModule.listUserLoader.success( function() {
            UserModule.userManagementAppView.setModel(userManagementApp)
            UserModule.listUserView = new UserModule.ListUserView(UserModule.listUser);
          });
        }
      });
    },
  });

  // Let's rock
  var app = new UserModule.AppRouter();
  Backbone.history.start();
});

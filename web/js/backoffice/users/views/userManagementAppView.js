/*========================================
      USER MANAGEMENT APP VIEW
=========================================*/

'use strict';

var UserModule = UserModule || {};

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

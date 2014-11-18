/*========================================
      User List View
=========================================*/

'use strict';

var UserModule = UserModule || {};

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

  close: UserModule.closeCollectionView

});

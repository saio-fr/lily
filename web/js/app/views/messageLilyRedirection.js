/* ===========================
       Chat Operator View
   ========================== */

define(function(require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    app = require('app/app'),
    config = require('app/globals'),
    api = require('app/data/api'),
    MessageView = require('app/views/message'),

    // Object wrapper returned as a module
    MessageLilyRedirection;

MessageLilyRedirection = MessageView.extend({

  className: 'lily-msg-avatar lily-msg lily-msg-redirection',
  template: _.template($('#lily-message-redirection').html()),

  initialize: function() {
    this.listenTo(this, 'render', this.triggerRedirections);
  },

  redirectionMail: function() {
    api.redirectionMail('mail', this.model.get('id'));
  },

  triggerRedirections: function() {
    this.$('.lily-redirection-tel')
      .on('click', this.triggerRedirection, 'redirectionTel', this);
    this.$('.lily-redirection-mail')
      .on('click', this.triggerRedirection, 'redirectionMail', this);
    this.$('.lily-redirection-chat')
      .on('click', this.triggerRedirection, 'redirectionChat', this);
  },

  triggerRedirection: function(redirection) {
    var id = this.model.get('id');
    app.trigger(redirection, id, 'true', '', this);
  }

});

return MessageLilyRedirection;
});

/*======================================
             CHAT VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    config = require('config'),

    // Object wrapper returned as a module
    ChatView;

  ChatView = Backbone.View.extend({

    tagName:  "section",
    className: "tab-pane",
    id: "chat",
    template: _.template($('#chatTpl').html()),

    initialize: function() {
	    this.render();
	  },

    render: function () {
	    this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.tab-content');
    },

    update: function () {

      // AUTO SET OPERATOR (not in that view but in global view)
      this.autoSetOperator = $('input[name="autoSetOperator"]').is(':checked');
      this.model.set({'chat.autoSetOperator': this.autoSetOperator});

      // MAX CHATS PER OPERATORS
      this.max = this.$el.find('input[name="max"]').val();
      this.model.set({'chat.max': this.max});

      // ACTIVATE QUEUE
      this.queue = this.$el.find('input[name="queue"]').is(':checked');
      this.model.set({'chat.queue': this.queue});

      // MAX VISITORS PER QUEUE
      this.maxQueue = this.$el.find('input[name="maxQueue"]').val();
      this.model.set({'chat.maxQueue': this.maxQueue});

      // SHOW CONTACT FORM ON CONNTECT
      this.contactForm = this.$el.find('input[name="contactForm"]').is(':checked');
      this.model.set({'chat.contactForm': this.contactForm});

      // CONTACT FORM MSG
      this.contactFormMsg = this.$el.find('div[name="contactFormMsg"]').text();
      this.model.set({'chat.contactFormMsg': this.contactFormMsg});

      // SHOW CONTACT FORM FIRST NAME FIELD
      this.contactFirstNameField = this.$el.find('input[name="contactFirstNameField"]').is(':checked');
      this.model.set({'chat.contactFirstNameField': this.contactFirstNameField});

      // SHOW CONTACT FORM LAST NAME FIELD
      this.contactLastNameField = this.$el.find('input[name="contactLastNameField"]').is(':checked');
      this.model.set({'chat.contactLastNameField': this.contactLastNameField});

      // SHOW CONTACT FORM EMAIL FIELD
      this.contactEmailField = this.$el.find('input[name="contactEmailField"]').is(':checked');
      this.model.set({'chat.contactEmailField': this.contactEmailField});

      // IS CONTACT FORM AVOIDABLE ?
      this.contactFormAvoidable = this.$el.find('input[name="contactFormAvoidable"]').is(':checked');
      this.model.set({'chat.contactFormAvoidable': this.contactFormAvoidable});

	  }

  });
  return ChatView;
});

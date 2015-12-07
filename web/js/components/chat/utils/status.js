/*========================================
      RECORD CURRENT VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      _ = require('underscore');

  return {

    status: function() {
      var messages = this.model.get('messages'),
          msgLength = messages.length,
          lastMsg = messages[msgLength - 1];

      var visitorMsgCount = _.filter(messages, function(msg) {
        return msg.from === 'visitor';
      }).length;

      // Test if status is unanswered
      if (visitorMsgCount > 0 && lastMsg.from === 'visitor' &&
        this.model.get("status") !== 'urgent') {

        this.changeStatus(this.model, 'unanswered');
      } else if (lastMsg.from === 'operator' || (lastMsg.from === 'server' && lastMsg.action !== 'transfer')) {
        this.changeStatus(this.model, 'answered');
      } else if (this.model.get("status") === 'urgent') {
        this.changeStatus(this.model, 'urgent');
      } else if (lastMsg.from === 'server' && lastMsg.action === 'transfer') {
        this.onConversationTranfered(lastMsg);
      }
    },

    changeStatusSign: function(status) {
      var $stateSign = this.$el.find('.status');

      switch (status) {
        case "answered":
          $stateSign
            .removeClass('urgent')
            .removeClass('unanswered')
            .addClass('answered');
          break;

        case "unanswered":
          $stateSign
            .removeClass('answered')
            .addClass('unanswered');
          break;

        case "urgent":
          $stateSign
            .removeClass('answered')
            .addClass('urgent');
          break;

        default:
          return;
      }
    },

    changeStatus: function(model, st) {
      var status = st || model.get('status');

      this.changeStatusSign(status);
      this.model.set('status', status);

      this.onStatusChange(status);
    },

    onStatusChange: function (status) {
      var msgsCount = this.model.get('messages').length,
          lastMsg = this.model.get('messages')[msgsCount - 1].msg,
          lastMsgSnippet = lastMsg ? truncate(lastMsg) : '';

      app.trigger('conversation:stateChange', {
        state: status,
        type: this.model.get('operator') ? 'current' : 'queued',
        id: this.model.get('id'),
        name: this.model.get('name'),
        msg: lastMsgSnippet,
        date: this.model.get('lastMsgTime')
      });

      function truncate(string) {
        if (string.length > 60) {
          return string.substring(0, 60) + '...';
        }
        return string;
      }

    },

    onConversationTranfered: function(transferMsg) {
      if (transferMsg.transfer_to.id !== this.model.get('operator')) {
        return;
      }

      app.trigger('conversation:transfered', {
        id: this.model.get('id'),
        date: this.model.get('lastMsgTime'),
        type: this.model.get('operator') ? 'current' : 'queued',
        name: this.model.get('name'),
        wasTransfered: true
      });
    },

  };

});

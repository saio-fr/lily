/* ===========================
       Messages View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    // Object wrapper returned as a module
    Messages = {};

  Messages.template = Backbone.View.extend({

    initialize: function() {
      this.render();
    },

    render: function(section) {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo(section);

      this.trigger('render');
      return this;
    },

  });

  Messages.Operator = Messages.template.extend({
    tagName: 'li',
    className: 'conversation-section-item animated',
    template: _.template($('#liveMessageOperatorTpl').html()),
  });

  Messages.Server = Messages.template.extend({
    tagName: 'p',
    className: 'msg-server',
    template: _.template($('#liveMessageServerTpl').html())
  });

  Messages.Visitor = Messages.template.extend({
    tagName: 'li',
    className: 'conversation-section-item animated',
    template: _.template($('#liveMessageVisitorTpl').html()),
    
    events: {
      'click .btn-flag-question': 'flagQuestion'
    },
    
    flagQuestion: function () {
      
      var that = this;
      this.$('.btn-flag-question').addClass('show');
      
      $.ajax({
        url: '/questions/unanswered',
        type: 'POST',
        data: JSON.stringify({title: this.model.get('msg')}),
        contentType: 'json'
      }).done(function () {
        that.$('.btn-flag-question')
          .text('Question remontée')
          .addClass('sent');
        setTimeout(function () {
          that.$('.btn-flag-question').removeClass('show');
        }, 2000);
      });
    }
    
  });
  
  return Messages;
});

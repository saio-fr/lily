/* ===========================
        Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    app = require('app/app'),
    config = require('app/globals'),
    Models = require('app/data/models'),
    api = require('app/data/api'),
    PageView = require('app/views/page'),
    // Object wrapper returned as a module
    MailPage;

  MailPage = PageView.extend({

    events: {
      'click button': 'send',
    },

    model: Models.Mail,
    template: _.template($('#lily-page-mail-template').html()),

    initialize: function() {
      $(this.render({
        page: true
      }).el).appendTo('#lily-wrapper-page');
      this.errors = {};
    },

    render: function() {
      this.$el.html(this.template());
      return PageView.prototype.render.apply(this, arguments);
    },

    send: function() {

      this.from = this.$el.find('#from').val() || null;
      this.object = this.$el.find('#object').val() || null;
      this.msg = this.$el.find('#msg').val() || null;

      var $labeFrom = this.$el.find('label.from'),
        $inputFrom = this.$el.find('input#from'),
        $labeObj = this.$el.find('label.object'),
        $inputObj = this.$el.find('input#object'),
        $labeMsg = this.$el.find('label.msg'),
        $inputMsg = this.$el.find('textarea#msg'),

        that = this;

      if (this.from === null) {
        $labeFrom.show();
        $inputFrom.addClass('warning');
        this.errors.from = true;
      } else {
        $inputFrom.removeClass('warning');
        $labeFrom.hide();
        this.errors.from = false;
      }

      if (this.object === null) {
        $labeObj.show();
        $inputObj.addClass('warning');
        this.errors.object = true;
      } else {
        $inputObj.removeClass('warning');
        $labeObj.hide();
        this.errors.object = false;
      }

      if (this.msg === null) {
        $labeMsg.show();
        $inputMsg.addClass('warning');
        this.errors.msg = true;
      } else {
        $inputMsg.removeClass('warning');
        $labeMsg.hide();
        this.errors.msg = false;
      }

      if (this.errors.from || this.errors.msg || this.errors.object) {
        return;
      }

      api.sendMail({
        from: that.from,
        object: that.object,
        msg: that.msg
      }).then(function(res) {
        app.showInfo("success", config.mailSentMsg);
        if (app.mailOnly) {
          return;
        } else {
          app.router.navigate('home', {
            trigger: true
          });
        }
      }, function(err) {
        app.showInfo("error", config.mailSentError);
      });
    }

  });

  return MailPage;
});

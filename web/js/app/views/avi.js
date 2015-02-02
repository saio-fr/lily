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
    PageView = require('app/views/page'),
    // Object wrapper returned as a module
    AviView;

  AviView = PageView.extend({

    events: {
      'submit #lily-search-form': 'doSearch',
      'click #lily-go': 'doSearch'
    },

    initialize: function() {

      this.$input = this.$('#lily-search-form input.lily-search-input');

      this.listenTo(this, 'render', this.avatar);

      app.on('precision', this.sendPrecision, this);
      app.on('satisfied', this.sendNotation, this);
      app.on('notSatisfied', this.sendNotation, this);
      app.on('redirectionTel', this.sendRedirectionTel, this);
      app.on('redirectionMail', this.sendRedirectionMail, this);

      $(this.render({
        page: true
      }).el).appendTo('#lily-wrapper-page');
    },

    render: function() {

      var template = _.template($('#lily-page-avi-template').html());
      this.$el.html(template());
      this.trigger('render');
      $('input, textarea').placeholder();

      return PageView.prototype.render.apply(this, arguments);
    },

    doSearch: function(e) {

      e.preventDefault();

      this.$input = this.$el.find('.lily-search-input');

      var query = this.$input.val(),
        messageModel,
        msgCollection = app.skeleton.collectionView;

      if ($.trim(query).length > 0) {
        // Check for empty or
        // ou contient uniquement des espaces
        this.search(query);

        messageModel = new Models.MessageUser({
          message_content: this.$input.val()
        });

        msgCollection.addItem(messageModel, 'user-simple');
        this.showLoading();
      }
      // clear the search field
      this.clearInput();
    },

    search: function(question) {

      var avi = this;

      app.ws.call('visitor/newAviQuestion', {
        question: question
      });

      $.ajax({
        type: 'POST',
        url: '/api/' + config.licence + '/avi/query',
        data: {
          query: question
        },

        success: function(data, textStatus, request) {

          var type = request.getResponseHeader('type'),
            messageModel,
            messageType,
            msgCollection = app.skeleton.messages;

          avi.clearLoading();

          if (!data) {
            this.trigger('emptySearch');
          }

          switch (type) {

            case 'insult':
              messageType = 'lily-simple';
              messageModel = new Models.LilySimple({
                message_content: data
              });
              avi.mood = 'angry';
              msgCollection.addItem(messageModel, messageType);
              break;

            case 'answer':
              messageType = 'lily-simple';
              messageModel = new Models.LilySimple({
                message_content: data.answer
              });
              msgCollection.addItem(messageModel, messageType);

              messageType = 'lily-notation';
              messageModel = new Models.LilyNotation({
                id: data.id
              });
              avi.mood = data.mood;
              msgCollection.addItem(messageModel, messageType);
              break;

            case 'personal':
              messageType = 'lily-simple';
              messageModel = new Models.LilySimple({
                message_content: data.answer
              });
              avi.mood = data.mood;
              msgCollection.addItem(messageModel, messageType);
              break;

            case 'misunderstood':
              messageType = 'lily-simple';
              messageModel = new Models.LilySimple({
                message_content: "Désolé, je n\'ai pas compris votre question."
              });
              msgCollection.addItem(messageModel, messageType);

              if (data.isMail || data.isTel || data.isChat) {
                messageModel = new Models.LilyRedirection({
                  data: data
                });
                messageType = 'lily-redirection';
                avi.mood = 'sceptical';
                msgCollection.addItem(messageModel, messageType);
              }
              break;

            case 'precision':
              messageType = 'lily-precision';
              messageModel = new Models.LilyPrecision({
                actions: data.actions,
                precision: data.parent.answer,
                idparent: data.parent.id
              });
              avi.mood = data.mood;
              msgCollection.addItem(messageModel, messageType);
              break;
          }
        }

      });

    },

    sendPrecision: function(id, idparent, parent) {

      var avi = this;

      $.ajax({
        url: config.root + '/precision/' + id,
        data: id,

        success: function(data, textStatus, request) {

          var type = request.getResponseHeader('type'),
            messageModel,
            messageType,
            msgCollection = app.skeleton.messages;

          console.log(type);

          avi.clearLoading();

          if (!data) {
            this.trigger('emptySearch');
            avi.clearLoading();
          }
          if (type === 'answer') {
            messageModel = new Models.LilySimple({
              message_content: data.answer
            });
            messageType = 'lily-simple';
            msgCollection.addItem(messageModel, messageType);
            messageModel = new Models.LilyNotation({
              id: idparent
            });
            messageType = 'lily-notation';
            msgCollection.addItem(messageModel, messageType);
          }
          // Delete the parent bubble
          //parent.remove();
        }
      });
    },

    sendRedirectionMail: function(id) {

      $.ajax({
        type: 'POST',
        url: config.root + '/logredirection/' + id,
        data: JSON.stringify({
          canal: 'mail'
        }),
      });
    },

    sendRedirectionTel: function(id) {

      $.ajax({
        type: 'POST',
        url: config.root + '/logredirection/' + id,
        data: JSON.stringify({
          canal: 'tel'
        }),
      });
    },

    sendNotation: function(id, satisfied, reason, view) {

      var messageType,
        messageModel,
        msgCollection = app.skeleton.messages;

      $.ajax({
        type: 'POST',
        url: config.root + '/notation/' + id,
        data: JSON.stringify({
          satisfied: satisfied,
          reason: reason
        }),

        success: function(data, textStatus, request) {

          if (satisfied === true) {
            messageType = 'lily-simple';
            messageModel = new Models.LilySimple({
              message_content: "Merci pour votre réponse! N\'hesitez pas" +
                "à me poser d'autres questions"
            });
          } else {
            messageType = 'lily-redirection';
            messageModel = new Models.LilyRedirection({
              data: data
            });
          }

          msgCollection.addItem(messageModel, messageType);
          view.remove();
        }

      });
    },

    showLoading: function() {
      this.$('#lily-box-messages').append(config.loadingTpl);
    },

    clearInput: function() {

      if (config.isMobile) {
        this.$input.val('').blur();
      } else {
        this.$input.val('');
      }
    },

    clearLoading: function() {

      if (this.$('.lily-loading').length) {
        setTimeout(function() {
          this.$('.lily-loading')
            .parent()
            .fadeOut(function() {
              $(this).remove();
            });
        }, 500);
      }
    },

    emptySearch: function() {

      this.clearLoading();
      // Append and display the new message.
      var model = new Models.LilySimple({
        message_content: config.emptySearch
      });
      app.skeleton.messages.addItem(model, 'lily-simple');
    },

    avatar: function() {
      // On charge l'avatar du client
      setTimeout(function() {
        $.getScript('http://cdn-saio.fr/customer/' + config.licence +
          '/js/avatar.js', function(data) {});
      }, 500);
    }

  });

  return AviView;
});

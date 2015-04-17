/* ===========================
    		Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _              = require('underscore'),
    app              = require('app/app'),
    config           = require('app/globals'),
    Models           = require('app/data/models'),
    api              = require('app/data/api'),
    PageView         = require('app/views/page'),
    synapse_suggest  = require('synapse'),
    typeahead        = require('typeahead'),
    MessagesCollectionView = require('app/views/messagesCollection'),

    // Object wrapper returned as a module
    AviView;

  AviView = PageView.extend({

    events: {
      'submit #lily-search-form': 'doSearch',
      'click #lily-go': 'doSearch'
    },

    initialize: function() {

      this.$input = this.$('#lily-search-form input.lily-search-input');

      // this.listenTo(this, 'render', this.avatar);
      this.listenTo(this, 'page:transitionnedIn', this.setupSynapse, this);
      this.msgsCollectionView = new MessagesCollectionView();

      app.on('precision',       this.sendPrecision, this);
      app.on('satisfied',       this.sendNotation, this);
      app.on('notSatisfied',    this.sendNotation, this);
      app.on('redirectionTel',  this.sendRedirectionTel, this);
      app.on('redirectionMail', this.sendRedirectionMail, this);

      this.render({ page: true }).$el
        .appendTo('#lily-wrapper-page');
    },

    render: function() {

      var template = _.template($('#lily-page-avi-template').html());
      this.$el.html(template());
      this.trigger('render');
      $('input, textarea').placeholder();

      return PageView.prototype.render.apply(this, arguments);
    },

    setupSynapse: function () {
      var avi = this;
      // After rendering the view, hooks the input with synapse:
      this.suggest = new synapse_suggest(config.synapse.user, config.synapse.password);
      this.suggest.addSuggestionsToInput('.lily-search-input', 'suggestions', 3, 3);
      this.setQuestionSelectedHandler(this.getAnswer);
    },

    setQuestionSelectedHandler: function(handler) {
      var avi = this;
      var callback = _.bind(handler, avi);
      $('.lily-search-input').on('typeahead:selected', function(event, suggest, dataset) {
        callback(suggest);
      });
    },

    doSearch: function (e) {

      if (e) { e.preventDefault(); }

      this.$input = this.$el.find('.lily-search-input');
      var query = this.$input.val();

      // Check for empty or
      // ou contient uniquement des espaces
      if ($.trim(query).length <= 0) { return; }

      this.printVisitorMsg(query);
      this.showLoading();
      // clear the search field
      this.clearInput();
    },

    getAnswer: function (suggestion) {
      var avi = this;

      this.doSearch();

      api.getAnswerFromId(suggestion.answerId).then(function(data) {
        avi.clearLoading();
        avi.printAviAnswer(data.item.text);
      }, function(err) {
        console.log(err);
      });
    },

    printAviAnswer: function(answer) {
      var messageModel, messageType;
      // print answer in chat
      messageModel = new Models.LilySimple({
        message_content: answer
      });
      messageType = 'lily-simple';
      this.msgsCollectionView.addItem(messageModel, messageType);

      // Add Notation to answer
      messageModel = new Models.LilyNotation({});
      messageType = 'lily-notation';
      this.msgsCollectionView.addItem(messageModel, messageType);
    },

    printVisitorMsg: function(msg) {
      var messageModel,
          msgCollection = this.msgsCollectionView;

      messageModel = new Models.MessageUser({
        message_content: msg
      });

      msgCollection.addItem(messageModel, 'user-simple');
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
            msgCollection = this.msgsCollectionView;

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
      if (config.avi.animations) {
        setTimeout(function() {
          $.getScript('http://cdn-saio.fr/customer/' + config.licence +
            '/js/avatar.js', function(data) {});
        }, 500);
      }
    }

  });

  return AviView;
});

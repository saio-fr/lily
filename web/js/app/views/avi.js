/* ===========================
    		Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _              = require('underscore'),
    Backbone         = require('backbone'),
    app              = require('app/app'),
    config           = require('app/globals'),
    Models           = require('app/data/models'),
    api              = require('app/data/api'),
    PageView         = require('app/views/page'),
    synapse_suggest  = require('synapse'),
    typeahead        = require('typeahead'),
    when             = require('when'),

    MessageUserSimple = require('app/views/messageUserSimple'),
    MessageLilySimple = require('app/views/messageLilySimple'),
    MessageLilyRedirection = require('app/views/messageLilyRedirection'),
    MessageLilyPrecision = require('app/views/messageLilyPrecision'),
    MessageLilyNotation = require('app/views/messageLilyNotation'),
    MessageLilyCompletion = require('app/views/messageLilyCompletion'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),

    // Object wrapper returned as a module
    AviView;

  AviView = PageView.extend({

    events: {
      'submit #lily-search-form': 'getAnswer',
    },

    initialize: function() {
      // this.listenTo(this, 'render', this.avatar);
      this.listenTo(this, 'page:transitionnedIn', this.setupSynapse, this);
      this.childViews = new Backbone.ChildViewContainer();

      this.listenTo(app, 'precision',       this.sendPrecision);
      this.listenTo(app, 'satisfied',       this.sendNotation);
      this.listenTo(app, 'notSatisfied',    this.sendNotation);
      this.listenTo(app, 'redirection',     this.sendRedirectionTel);
      this.listenTo(app, 'redirection',     this.sendRedirectionMail);

      this.listenTo(this, 'conversation:newMessage', this.onNewMessage);

      this.render({ page: true }).$el
        .appendTo('#lily-wrapper-page');

      this.$input = this.$('.lily-search-input');

      this.welcome();
    },

    render: function() {

      var template = _.template($('#lily-page-avi-template').html());
      this.$el.html(template());
      this.trigger('render');
      $('input, textarea').placeholder();

      return PageView.prototype.render.apply(this, arguments);
    },

    welcome: function() {
      var welcome = new Models.LilySimple({
        message_content: config.avi.welcomeMsg
      });
      this.addMessage(welcome, 'lily-simple');
    },

    addMessage: function(messageModel, messageType) {
      // remove waiting message if exists.

      // create an instance of the sub-view to render the single message item.
      var message, indexer;
      switch ( messageType ) {
        case 'user-simple':
          message = new MessageUserSimple({
            model: messageModel
          }).render();
          break;
        case 'lily-simple':
          message = new MessageLilySimple({
            model: messageModel
          }).render();
          break;
        case 'lily-redirection':
          message = new MessageLilyRedirection({
            model: messageModel
          }).render();
          break;
        case 'lily-precision':
          message = new MessageLilyPrecision({
            model: messageModel
          }).render();
          break;
        case 'lily-notation':
          message = new MessageLilyNotation({
            model: messageModel
          }).render();
          break;
        case 'lily-completion':
          message = new MessageLilyCompletion({
            model: messageModel
          }).render();
          break;
      }

      if (messageType === 'lily-notation') {
        indexer = 'notationView';
      } else {
        this.trigger('conversation:newMessage');
      }

      this.childViews.add(message, indexer);
    },

    setupSynapse: function () {
      // After rendering the view, hooks the input with synapse:
      this.suggest = new synapse_suggest(config.synapse.user, config.synapse.password);
      this.suggest.addSuggestionsToInput('.lily-search-input', 'suggestions', 3, 3);
      this.setQuestionSelectedHandler(this.getAnswer);
    },

    setQuestionSelectedHandler: function(handler) {
      var avi = this;
      var callback = _.bind(handler, avi);
      $('.lily-search-input').on('typeahead:selected', function(event, suggest, dataset) {
        callback(null, suggest);
      });
    },

    askQuestion: function (e) {

      if (e) { e.preventDefault(); }
      var query = this.$input.val();

      // Check for empty or
      // ou contient uniquement des espaces
      if ($.trim(query).length <= 0) { return; }

      this.printVisitorMsg(query);
      // clear the search field
      this.clearInput();
    },

    getAnswer: function (e, suggestion) {

      // The method was triggered by the "submit" event handler
      if (e) { e.preventDefault(); }
      var avi = this;

      // print the visitor question
      this.askQuestion();

      // There was no mathing question
      if (!suggestion) {
        return this.AviNoAnswer(this.$input.val());
      }

      // Get the answer from this question
      this.showLoading();
      api.getAnswerFromId(suggestion.answerId).then(function(data) {
        avi.clearLoading().then(function(){
          avi.printAviAnswer(data.item.text);
        });
      }, function(err) {
        console.log(err);
      });
    },

    printAviAnswer: function(answer) {
      // Print answer in chat
      var messageModel = new Models.LilySimple({
        message_content: answer
      });
      this.addMessage(messageModel, 'lily-simple');

      // Add Notation to answer
      this.addNotationView(messageModel);
    },

    AviNoAnswer: function(question) {
      this.emptySearch();
    },

    printVisitorMsg: function(msg) {

      var messageModel = new Models.MessageUser({
        message_content: msg
      });
      this.addMessage(messageModel, 'user-simple');
    },

    onNewMessage: function() {
      this.removeNotationView();
      this.clearLoading();
    },

    addNotationView: function(message) {
      var messageModel = new Models.LilyNotation({
        message_content: message
      });

      this.addMessage(messageModel, 'lily-notation');
    },

    removeNotationView: function() {
      var notationView = this.childViews.findByCustom('notationView');
      if (!notationView) { return; }
      this.childViews.remove(notationView);
      notationView.remove();
    },

    sendRedirection: function(id, type) {
      app.trigger('avi:redirection', type, id);
    },

    sendSatisfaction: function(id, satisfied, reason) {
      app.trigger('avi:satisfaction', satisfied, reason);
    },

    sendUnanswered: function(question) {
      app.trigger('avi:unanswered', question);
    },

    satisfied: function(id, satisfied) {
      var messageModel = new Models.LilySimple({
        message_content: config.avi.messages.satisfiedFeedback
      });
      this.addMessage(messageModel, 'lily-simple');
    },

    unsatisfied: function(id, satisfied, reason) {
      var messageModel = new Models.LilySimple({
        message_content: config.avi.messages.unSatisfiedFeedback
      });
      this.addMessage(messageModel, 'lily-redirection');
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

    showLoading: function() {
      setTimeout(function() {
        this.$('#lily-box-messages').append(config.loadingTpl);
        this.isLoadingShown = true;
      }, 300);
    },

    clearInput: function() {

      if (config.isMobile) {
        this.$input.val('').blur();
      } else {
        this.$input.val('');
      }
    },

    clearLoading: function() {
      var defer = when.defer();
      var avi = this;

      if (!avi.isLoadingShown) {
        defer.resolve();
      }

      if (this.$('.lily-loading').length) {
        this.$('.lily-loading')
          .parent()
          .fadeOut(function() {
            $(this).remove();
            avi.isLoadingShown = false;
          });
        setTimeout(function() {
          defer.resolve();
        }, 500);
      }

      return defer.promise;
    },

    emptySearch: function() {

      this.clearLoading().then(function() {
      // Append and display the new message.
        var model = new Models.LilySimple({
          message_content: config.emptySearch
        });
        this.addMessage(model, 'lily-simple');
      });
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

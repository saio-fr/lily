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
      'submit #lily-search-form': 'getAviToAnswer'
    },

    initialize: function() {
      // this.listenTo(this, 'render', this.avatar);
      this.listenTo(this, 'page:transitionnedIn', this.setupSynapse, this);
      this.childViews = new Backbone.ChildViewContainer();

      this.listenTo(app, 'precision',        this.sendPrecision);
      this.listenTo(app, 'avi:satisfaction', this.onSatisfaction);
      this.listenTo(app, 'redirection',      this.sendRedirectionMail);

      this.listenTo(this, 'conversation:newMessage', this.onNewMessage);

      this.render({ page: true }).$el
        .appendTo('#lily-wrapper-page');

      this.$input = this.$('.lily-search-input');

      this.welcomeVisitor();
    },

    render: function() {

      var template = _.template($('#lily-page-avi-template').html());
      this.$el.html(template());
      this.trigger('render');
      $('input, textarea').placeholder();

      return PageView.prototype.render.apply(this, arguments);
    },

    // ==============================================
    // Search Methods:
    // ==============================================

    setupSynapse: function() {
      // After rendering the view, hooks the input with synapse:
      this.suggest = new synapse_suggest(config.synapse.user, config.synapse.password);
      this.suggest.addSuggestionsToInput('.lily-search-input', 'suggestions', 3, 3);
      this.setQuestionSelectedHandler(this.getAviToAnswer);
    },

    setQuestionSelectedHandler: function(handler) {
      var that = this,
          callback = _.bind(handler, that);
      $('.lily-search-input').on('typeahead:selected', function(event, suggest, dataset) {
        callback(null, suggest);
      });
    },

    // ==============================================




    // ==============================================
    // Visitor Methods:
    // ==============================================

    askQuestion: function (question) {

      var query = question || this.$input.val();

      // Check for empty or
      // ou contient uniquement des espaces
      if ($.trim(query).length <= 0) { return; }

      this._printVisitorMsg(query);
    },

    // ==============================================


    // ==============================================
    // AVI Methods:
    // ==============================================

    welcomeVisitor: function() {
      return this._printAviMsg(config.avi.messages.welcomeMsg);
    },

    offerRedirection: function(question) {
      return this._addMessage(question, 'lily-redirection');
    },

    hasNoAnswer: function(question) {
      var that = this;
      that._doAsyncMsg(function() {
        // 1) Log the unAnswered question to create a ticket
        api.logUnanswered(question);
      }, 500)
      .then(function() {
        // 2) Propose the visitor to be forwarded to tel/mail/chat
        that.apologise();
        return that.offerRedirection(question);
      });
    },

    sayThanks: function(id, satisfied) {
      return this._printAviMsg(config.avi.messages.satisfiedFeedback);
    },

    apologise: function() {
      return this._printAviMsg(config.avi.messages.unSatisfiedFeedback);
    },

    askForFeedback: function(msg, showNotation) {
      if (!showNotation) {
        return;
      }

      return this._addMessage(msg, 'lily-notation');
    },

    askPrecisionOnFeedback: function() {
      var choices = [
        config.avi.messages.satisfaction.incompete,
        config.avi.messages.satisfaction.fausse
      ];
      this._createChoicesView(choices, this.handleFeedback);
    },

    handleFeedbackPrecision: function(reason) {

    },

    // ==============================================



    // ==============================================
    // Internals:
    // ==============================================

    _doAsyncMsg: function(callback, delay) {
      var that = this;

      // 1) Show loading indicator
      // ------------------------------------
      return that._showLoading(delay)

      // 2) call callback method
      // ------------------------------------
      .then(function() {
        if (callback && _.isFunction(callback)) {
          return callback();
        } else {
          return;
        }
      })

      // 3) Clear the loading sign
      // ------------------------------------
      .then(function(answer) {
        return that._clearLoading(answer);
      }, that._failedPromise);
    },

    _printVisitorMsg: function(msg) {
      this._addMessage(msg, 'user-simple');
      return msg;
    },

    _printAviMsg: function(msg) {
      this._addMessage(msg, 'lily-simple');
      return msg;
    },

    _addMessage: function(msg, messageType) {
      // remove waiting message if exists.

      var messageModel = new Models.Message({
        message_content: msg
      });

      // create an instance of the sub-view to render the single message item.
      var message, indexer;
      switch (messageType) {
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

      return msg;
    },

    _createChoicesView: function(choices, handler) {

    },

    /**
     * Shows a 'writing' indicator to show that the avi is thinking
     * Semi random delay before showing an avi answer
     * (affordance: something is hapenning)
     *
     * @param  int  delay (takes valors between 1 and 10)
     * @return undefined
     */
    _showLoading: function(delay, args) {
      var defer = when.defer();
      var typeDelay = delay + (Math.random() * -1) * (Math.random() * 300);

      if (this.isLoadingShown) {
        defer.resolve(args);
      } else {
        this.$('#lily-box-messages').append(config.loadingTpl);
        this.isLoadingShown = true;
        setTimeout(function() {
          defer.resolve(args);
        }, typeDelay);
      }

      return defer.promise;
    },

    _clearInput: function() {
      if (config.isMobile) {
        this.$input.typeahead('val', '').blur();
      } else {
        this.$input.typeahead('val', '');
      }
    },

    _clearLoading: function(args) {
      var defer = when.defer(),
          that = this;

      if (this.$('.lily-loading').length) {
        this.$('.lily-loading')
          .parent()
          .fadeOut(function() {
            $(this).remove();
            that.isLoadingShown = false;
          });

        setTimeout(function() {
          defer.resolve(args);
        }, 500);
      }

      return defer.promise;
    },

    _removeNotationView: function() {
      var notationView = this.childViews.findByCustom('notationView');
      if (!notationView) { return; }

      this.childViews.remove(notationView);
      notationView.remove();
    },

    _addNotationView: function(msg, showNotation) {
      if (!showNotation) {
        return;
      }

      return this._addMessage(msg, 'lily-notation');
    },

    _stripIdPrefix: function(id) {
      var prefix = /^r_/;
      return id.replace(prefix, '');
    },

    _failedPromise: function(err) {
      console.error('handle error: ' + err.stack);
      throw err;
    },

    // ==============================================



    // Chat Logic
    // ==============================================
    getAviToAnswer: function(e, suggestion) {

      // The method was triggered by the "submit" event handler
      if (e) { e.preventDefault(); }

      var that = this;
      var question = that.$input.val();
      var id;

      // print the visitor question
      that.askQuestion(question);

      // clear the search field
      that._clearInput();

      // There was no mathing question
      if (!suggestion) {
        return that.hasNoAnswer(question);
      }

      id = that._stripIdPrefix(suggestion.answerId);

      // 1) Get the answer from this question
      // ------------------------------------
      that._doAsyncMsg(function() {
        return api.getAnswerFromId(id);
      }, 500)

      // 2) Print answer
      // ------------------------------------
      // 4) Print avi message
      // ------------------------------------
      .then(function(answer) {
        // answer is empty or white spaces
        if (answer.answer && !/^\s+$/.test(answer.answer)) {
          that._printAviMsg(answer.answer);
          api.logQuestion(answer.answer, answer.id);
        }

        return answer;
      }, that._failedPromise)

      // 3) Ask for feedback
      // ------------------------------------
      .then(function(answer) {
        return that._addNotationView(answer, app.showAviAnswerNotation);
      }, that._failedPromise);
    },

    onNewMessage: function() {
      this._removeNotationView();
    },

    onSatisfaction: function(satisfaction, answer) {
      if (satisfaction === true) {
        api.logSatisfaction(answer.id, satisfaction);
      } else {
        this.askForFeedback(answer);
      }
    },

    sendRedirection: function(id, type) {
      app.trigger('avi:redirection', type, id);
    },

    sendSatisfaction: function(id, satisfied, reason) {

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

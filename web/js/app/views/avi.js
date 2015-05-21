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
    isMobile         = require('isMobile'),

    MessageUserSimple      = require('app/views/messageUserSimple'),
    MessageLilySimple      = require('app/views/messageLilySimple'),
    MessageLilyRedirection = require('app/views/messageLilyRedirection'),
    MessageLilyPrecision   = require('app/views/messageLilyPrecision'),
    MessageLilyNotation    = require('app/views/messageLilyNotation'),
    MessageLilyCompletion  = require('app/views/messageLilyCompletion'),
    ChildViewContainer     = require('utils/backbone-childviewcontainer'),

    // Object wrapper returned as a module
    AviView;

  AviView = PageView.extend({

    events: {
      'submit  .avi-input-component': 'getAviToAnswer',
      'keydown .avi-input':           'getAviToAnswer'
    },

    initialize: function() {
      var that = this;
      that.listenTo(this, 'page:transitionnedIn', that.setupSynapse, that);
      that.childViews = new Backbone.ChildViewContainer();

      that.listenTo(app, 'precision',              that.sendPrecision);
      that.listenTo(app, 'avi:satisfaction',       that.onSatisfaction);
      that.listenTo(app, 'avi:choicesViewDismiss', that._onDismissChoicesView);

      that.listenTo(that, 'conversation:newMessage', that.onNewMessage);

      that.render({ page: true }).$el
        .appendTo('#lily-wrapper-page');

      that.$input  =         that.$('.avi-input').myedit();
      that.$avi    =         that.$('.avatar-wrapper');
      that.$inputComponent = that.$('.avi-input-component');
      that.$msgBox = $('.lily-box-messages');

      // fix bug where [contenteditable="true"] elements would not
      // take focus on touchend on iOS (Android ?) devices
      that.$input.on('touchstart', function(ev) {
        $(ev.currentTarget).focus();
        // force scroll to bottom when virtual keyboard scrolls into view
        if (!isMobile.any) return;
        window.scrollTo(0,document.body.scrollHeight);
      });

      that.showAvi = true;
      that._handleAvi();

      this.welcomeVisitor();
    },

    render: function() {

      var template = _.template($('#lily-page-avi-template').html());
      this.$el.html(template());
      this.trigger('render');

      return PageView.prototype.render.apply(this, arguments);
    },

    // ==============================================
    // Search Methods:
    // ==============================================

    setupSynapse: function() {
      // After rendering the view, hooks the input with synapse:
      this.suggest = new synapse_suggest(config.synapse.user, config.synapse.password);
      this.suggest.addSuggestionsToInput('.avi-input', 'suggestions', 3, 3);
      this.setQuestionSelectedHandler(this.getAviToAnswer);
    },

    setQuestionSelectedHandler: function(handler) {
      var that = this,
          callback = _.bind(handler, that);
      $('.avi-input').on('typeahead:selected', function(event, suggest, dataset) {
        callback(null, suggest);
      })

      .on('typeahead:showed', function() {
        $('.lily-box-messages').addClass('tt-overlay');
      })

      .on('typeahead:hidden', function() {
        $('.lily-box-messages').removeClass('tt-overlay');
      });
    },

    // ==============================================




    // ==============================================
    // Visitor Methods:
    // ==============================================

    askQuestion: function(question) {

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
      console.log(config.avi.messages.welcomeMsg);
      return this._printAviMsg(config.avi.messages.welcomeMsg);
    },

    offerRedirection: function(question, context) {
      var that = this,
          redirectionMsg = context === 'unSatisfied' ?
            config.avi.messages.unSatisfiedRedirection :
            config.avi.messages.noAnswerRedirection;


      that._printAviMsg(redirectionMsg);
      var model = new Models.Message({
        config: {
          hasTel: config.avi.redirections.mail,
          hasMail: config.avi.redirections.phone,
          hasChat: config.avi.redirections.chat,
          chatAvailable: config.chatAvailable
        },
        redirections: {
          mail: config.avi.redirections.values.mail,
          tel: config.avi.redirections.values.phone
        },
        copy: {
          tel: config.avi.messages.redirection.tel,
          mail: config.avi.messages.redirection.mail,
          chat: config.avi.messages.redirection.chat,
          none: config.avi.messages.redirection.none
        }
      });

      that._disableInput(true);
      that._asyncWithoutLoading(null, 800)
      .then(function() {
        // return that._addMessage(question, 'lily-redirection', model);
        return that._createRedirectionView(model);
      });
    },

    hasNoAnswer: function(question) {
      var that = this;

      // 1) Log the unAnswered question to create a ticket
      if (question) {
        api.logRequest(question);
      }

      that._asyncWithLoading(function() {
      }, 500)
      .then(function() {
        // 2) Propose the visitor to be forwarded to tel/mail/chat
        that.apologise();
        that._asyncWithoutLoading(null, 0)
        .then(function() {
          return that.offerRedirection(question, 'notFound');
        });
      });
    },

    sayThanks: function() {
      return this._printAviMsg(config.avi.messages.satisfiedFeedback);
    },

    apologise: function() {
      return this._printAviMsg(config.avi.messages.apologize);
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

    _asyncWithLoading: function(callback, delay, failure) {
      var that = this;

      // 1) Show loading indicator
      // ------------------------------------
      return that._showLoading(delay)

      // 2) call callback method
      // ------------------------------------
      .then(function() {
        try {
          if (callback && _.isFunction(callback)) {
            return callback();
          } else {
            return;
          }
        } catch (error) {
          return _.isFunction(failure) ? failure(error) : undefined;
        }
      }, failure || that._failedPromise)

      // 3) Clear the loading sign
      // ------------------------------------
      .then(function(answer) {
        return that._clearLoading(answer);
      }, that._failedPromise);
    },

    _asyncWithoutLoading: function(callback, delay) {
      var defer = when.defer();

      setTimeout(function() {

        // 2) call callback method
        // ------------------------------------
        try {
          if (callback && _.isFunction(callback)) {
            callback();
          }

          defer.resolve();
        } catch (error) {
          defer.reject(error);
        }
      }, delay);

      return defer.promise;
    },

    _printVisitorMsg: function(msg) {
      this._addMessage(msg, 'user-simple');
      return msg;
    },

    _printAviMsg: function(msg) {
      this._addMessage(msg, 'lily-simple');
      return msg;
    },

    _addMessage: function(msg, messageType, model) {
      // remove waiting message if exists.

      var messageModel = model || new Models.Message({
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
        // if message is notation, keep an index of it to be able to remove it when needed
        indexer = 'notationView';
      } else {
        // If message is not notation, trigger the onNewMessage method
        this.trigger('conversation:newMessage');
      }

      this.isMsgAnimating = true;
      this.childViews.add(message, indexer);
      this._isNotMsgAnimating();
      return msg;
    },

    _createChoicesView: function(choices, handler) {

    },

    _createRedirectionView: function(model) {
      var indexer = 'redirectionView';

      if (this.childViews.findByCustom(indexer)) {
        return;
      }

      this._showAvi(false);
      this.$inputComponent
        .removeClass('component-show')
        .addClass('component-hide');

      var redirection = new MessageLilyRedirection({
        model: model
      }).render();

      this.childViews.add(redirection, indexer);
    },

    _onDismissChoicesView: function(viewType) {
      this.$inputComponent
        .removeClass('component-hide')
        .addClass('component-show');

      var choicesView = this.childViews.findByCustom(viewType);
      this.childViews.remove(choicesView);
      choicesView.remove();
      this._showAvi(true);
      this._disableInput(false);
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
        this.$('.lily-box-messages').append(config.loadingTpl);
        this.isLoadingShown = true;
        this.isMsgAnimating = true;
        setTimeout(function() {
          defer.resolve(args);
        }, typeDelay);
      }

      return defer.promise;
    },

    _clearInput: function() {
      if (config.isMobile) {
        this.$input.typeahead('val', '')
          .blur();
      } else {
        this.$input.typeahead('val', '');
      }
    },

    _disableInput: function(disable) {
      if (disable) {
        this.$input
          .blur()
          .typeahead('close')
          .attr('contenteditable', 'false');
      } else {
        this.$input
          .focus()
          .typeahead('open')
          .attr('contenteditable', 'true').myedit();
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
          that.isMsgAnimating = false;
        }, 500);
      }

      return defer.promise;
    },

    _removeNotationView: function() {
      var notationView = this.childViews.findByCustom('notationView');
      if (!notationView) { return; }

      this.childViews.remove(notationView);
      notationView.remove();
      this._isNotMsgAnimating();
    },

    _addNotationView: function(msg) {
      if (!app.showAviAnswerNotation) { return; }

      return this._addMessage(msg, 'lily-notation');
    },

    _handleAvi: function() {
      var that = this;
      function logScroll() {
        var topAvatar = that.$avi.offset().top;
        var lastMessage = $('.lily-box-messages .lily-msg:last-child');
        var lastMessageOffsetTop = lastMessage.offset() ? lastMessage.offset().top + 40 : 0;
        var lastMessageOffsetBottom = lastMessageOffsetTop + lastMessage.height();
        var covers = lastMessageOffsetBottom - 50 > topAvatar;
        var showAvi = !covers;

        if (that.isMsgAnimating) {return;}

        if (showAvi !== that.showAvi) {
          that.showAvi = showAvi;
          that._showAvi(showAvi);
        }
      }

      var throttled = _.throttle(logScroll, 1);

      $('.lily-box-messages')[0].onscroll = throttled;

      // Rectify padding if header button is shown
      if ($('.lily-cst-header').is(':visible')) {
        that.$msgBox.css('padding-top', 69);
      }
    },

    _handleAviAnswer: function(answer) {

      api.logRequest(answer.answer, answer.id);

      // answer is empty or white spaces
      if (!answer.answer || /^\s+$/.test(answer.answer)) {
        return answer;
      }

      // Simple answer
      if (!answer.children || answer.children.length <= 0) {
        return this._printAviMsg(answer.answer);
      }

      // Handle complex answer (with precisions/actions needed)
      // Do that for now, until complex answer Logic gets implemented
      return this._printAviMsg(answer.answer);
    },

    _isNotMsgAnimating: function() {
      var that = this;
      setTimeout(function() {
        that.isMsgAnimating = false;
      }, 300);
    },

    _showAvi: function(show) {
      var that = this;
      var animClassIn = show ? 'lily-avi-show' : 'lily-avi-hide';
      var animClassOut = show ? 'lily-avi-hide' : 'lily-avi-show';

      if (that.aviAnimating) {return;}

      that.aviAnimating = true;

      that.$avi
        .addClass(animClassIn)
        .removeClass(animClassOut)
        .on(config.animEndEventName, function() {
          that.aviAnimating = false;
          return that.$avi.off(config.animEndEventName);
        });

      setTimeout(function() {
        that.aviAnimating = false;
        return;
      }, 400);
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
    getAviToAnswer: function(ev, suggestion) {

      // The method was triggered by the "submit" event handler
      if (ev && ev.type === 'submit') {
        ev.preventDefault();
      }

      // if key pressed is not Enter, don't submit
      if (ev && ev.keyCode && ev.keyCode !== 13) {
        return;
      }

      var that = this;
      var question = that.$input.val();
      var id;

      // Question is empty or only spaces
      if ($.trim(question).length <= 0) {
        return;
      }

      // print the visitor question
      that.askQuestion(question);
      app.trigger('avi:newAviQuestion', question);

      // clear the search field
      that._clearInput();

      // There was no mathing question
      if (!suggestion) {
        return that.hasNoAnswer(question);
      }

      id = that._stripIdPrefix(suggestion.answerId);

      // 1) Get the answer from this question
      // ------------------------------------
      that._asyncWithLoading(function() {
        return api.getAnswerFromId(id);
      }, 500, that.hasNoAnswer)

      // 2) Print answer
      // ------------------------------------
      .then(function(answer) {
        return that._handleAviAnswer(answer);
      }, that._failedPromise)

      // 3) Ask for feedback
      // ------------------------------------
      .then(function(answer) {
        return that._addNotationView(answer);
      }, that._failedPromise);
    },

    onNewMessage: function() {
      this._removeNotationView();
    },

    onSatisfaction: function(satisfaction, answer) {
      var that = this;
      this._removeNotationView();
      api.logSatisfaction(answer.id, satisfaction);

      if (satisfaction === true) {
        that.sayThanks();
      } else {
        // For later:
        // Ask for precision on bad answer
        that._asyncWithoutLoading(null, 0)
        .then(function() {
          return that.offerRedirection(answer.id, 'unSatisfied');
        });
      }
    },

    sendRedirection: function(id, type) {
      app.trigger('avi:redirection', type, id);
    },

    avatar: function() {
      // On charge l'avatar du client
      if (config.avi.animations) {
        setTimeout(function() {
          $.getScript('http://cdn-saio.fr/customer/' + config.licence +
            '/js/avatar.js', function(data) {});
        }, 500);
      }
    },

    closeChildren: function() {

      var that = this;
      this.childViews.forEach(function(view) {

        // delete index for that view
        that.childViews.remove(view);

        // remove the view
        view.remove();
      });
    },

    remove: function() {
      this.closeChildren();

      // app.skeleton.chatCollection = null;
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return AviView;
});

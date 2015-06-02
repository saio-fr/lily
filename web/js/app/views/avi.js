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
    SynapseSuggest   = require('synapse'),
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
      this.childViews = new Backbone.ChildViewContainer();
      this.listenTo(this, 'page:transitionnedIn', this.onPagetransitionnedIn);

      this.listenTo(app, 'precision',              this.sendPrecision);
      this.listenTo(app, 'avi:satisfaction',       this.onSatisfaction);
      this.listenTo(app, 'avi:choicesViewDismiss', this._onDismissChoicesView);
      this.listenTo(app, 'avi:chooseRedirection',  this.chooseRedirection);

      // Search ev listeners
      this.listenTo(this, 'search:asyncrequest', this.indicateLoading);
      this.listenTo(this, 'search:asyncreceive', this.concealLoading);
      this.listenTo(this, 'search:render',       this.makeSuggestionsScrollable);
      this.listenTo(this, 'search:open',         this.onSearchOpen);
      this.listenTo(this, 'search:close',        this.onSearchClose);
      this.listenTo(this, 'search:select',       this.getAviToAnswer);
      this.listenTo(this, 'search:select',       this.onSearchSelect);

      this.listenTo(this, 'conversation:newMessage', this.onNewMessage);

      this.aviShown = true;
      this.lastQuestionWasUnanswered = false;
      this.lastQuestionReceivedBadFeedBack = false;
      this.countQuestionsAsked = 0;

      this.render({ page: true }).$el.appendTo('#lily-wrapper-page');

      this.welcomeVisitor();
    },

    specialKeyCodeMap: {
      9: 'tab',
      37: 'left',
      39: 'right',
      38: 'up',
      40: 'down'
    },

    render: function() {
      var template = _.template($('#lily-page-avi-template').html());
      this.$el.html(template());
      this.trigger('render');

      return PageView.prototype.render.apply(this, arguments);
    },

    onPagetransitionnedIn: function() {
      this.$input   =   this.$('.avi-input');
      this.$avi     =   this.$('.avatar-wrapper');
      this.$choices =   this.$('.avi-input-component');
      this.$msgBox  =   $('.lily-box-messages');
      this.$header  =   $('#lily-toolbar');

      $('.lily-box-messages').on('scroll', this._toggleAviOnScroll.bind(this));

      this.setupSynapse();
      this.setupTypeahead();
      this.hideAviOnKeyup();
      this.hideOnboardingOnBlur();
    },

    // ==============================================
    // Search Methods:
    // ==============================================

    setupSynapse: function() {
      // After rendering the view, hooks the input with synapse:
      var credentials = {
        'user': config.synapse.user,
        'password': config.synapse.password
      },
      typeaheadOptions = config.typeahead,
      restRoot = config.synapse.restRoot;

      this.suggest = new SynapseSuggest(credentials, restRoot, typeaheadOptions);
      this.suggest.addSuggestionsToInput('.avi-input', 'suggestions', 3, 3);
    },

    setupTypeahead: function() {
      var that = this;
      // Listen to typeahead events and translate them into backbone events
      _.each(['active', 'idle', 'open', 'close', 'change', 'render', 'select',
        'autocomplete', 'cursorchange', 'asyncrequest', 'asynccancel', 'asyncreceive'
      ], function(action) {
        that.$input.on('typeahead:' + action, function() {
          var args = Array.prototype.slice.call(arguments);
          args.unshift('search:' + action);
          that.trigger.apply(that, args);
        });
      });
    },

    // Adds a highlight class if autoselect is true
    // (rather than actually moving the cursor down
    // which would overwrite the user's typing)
    highlightFirstItem: function() {
      $('.tt-suggestion:first').addClass('tt-cursor');
    },

    makeSuggestionsScrollable: function() {
      var maxMenuHeight = this.$msgBox[0].clientHeight;
      $('.tt-menu')
        .css('max-height', maxMenuHeight)
        .scrollTop($('.tt-menu')[0].scrollHeight);
    },

    hideAviOnKeyup: function() {
      var that = this;

      that.$input.on('keyup', function(ev) {
        if (that.specialKeyCodeMap[ev.which || ev.keyCode] || $(this).val().length <= 1) {
          return;
        }
        if ($('.tt-menu').is(':visible')) {
          that.$avi.removeClass('overlay');
          that._showAvi(false);
        }

        // If it was hidden after scroll, show it again
        that._showMsgListOverlay();
      });
    },

    hideOnboardingOnBlur: function() {
      var that = this;
      that.$input.on('blur', function() {
        that._endFocusSuggestion();
      });
    },

    onSearchOpen: function() {
      var overlayMsg = this.getOverlayMsg();

      // Increase focus on suggestions by partialy hiding the conversation
      this.isSearchOpen = true;
      this._showMsgListOverlay();

      // Show Avi onboarding message
      if (overlayMsg) {
        this.$avi.attr('data-msg', overlayMsg);
        this.$avi.addClass('overlay');
      }

      this._showAvi(true);
    },

    onSearchClose: function() {
      this.isSearchOpen = false;
      this._endFocusSuggestion();
    },

    onSearchSelect: function() {
      this._endFocusSuggestion();
    },

    _endFocusSuggestion: function() {
      this.$avi.removeClass('overlay');
      this._showAvi(this._isMsgListScrolled());
      this._hideMsgListOverlay();
      this.$avi.removeClass('lily-avi-show');
    },

    _showMsgListOverlay: function() {
      if (this.isSearchOpen && !this.$msgBox.hasClass('tt-overlay')) {
        this.$msgBox.addClass('tt-overlay');
      }
    },

    _hideMsgListOverlay: function() {
      if (!this.aviShown || !this.isSearchOpen) {
        this.$msgBox.removeClass('tt-overlay');
      }
    },

    getOverlayMsg: function() {
      var firstMsg = this.countQuestionsAsked === 0,
          overlayMsg;

      if (firstMsg) {
        overlayMsg = config.avi.overlay.onboardingMsg;
      } else if (this.lastQuestionWasUnanswered) {
        overlayMsg = config.avi.overlay.lastQuestionUnanswered;
      } else if (this.lastQuestionReceivedBadFeedBack) {
        overlayMsg = config.avi.overlay.lastQuestionReceivedBadFeedBack;
      } else {
        overlayMsg = config.avi.overlay.defaultMsg;
      }

      return overlayMsg;
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
      this.countQuestionsAsked += 1;
    },

    // ==============================================


    // ==============================================
    // AVI Methods:
    // ==============================================

    welcomeVisitor: function() {
      console.log(config.avi.messages.welcomeMsg);
      return this._printAviMsg(config.avi.messages.welcomeMsg);
    },

    offerRedirection: function(context) {
      var that = this,
          redirectionMsg = context === 'unSatisfied' ?
            config.avi.messages.unSatisfiedRedirection :
            config.avi.messages.noAnswerRedirection;


      that._printAviMsg(redirectionMsg);
      var model = new Models.Message({
        config: {
          hasTel:        config.avi.redirections.mail,
          hasMail:       config.avi.redirections.phone,
          hasChat:       config.avi.redirections.chat,
          chatAvailable: config.chatAvailable
        },
        redirections: {
          mail: config.avi.redirections.values.mail,
          tel:  config.avi.redirections.values.phone
        },
        copy: {
          tel:  config.avi.messages.redirection.tel,
          mail: config.avi.messages.redirection.mail,
          chat: config.avi.messages.redirection.chat,
          none: config.avi.messages.redirection.none
        }
      });

      that._disableInput(true);
      that._asyncWithoutLoading(null, 300)
      .then(function() {
        return that._createRedirectionView(model);
      });
    },

    hasNoAnswer: function(question) {
      var that = this;

      that.lastQuestionWasUnanswered = true;

      if(that._isPromise(question)) {
        question = null;
      }

      that._asyncWithLoading(function() {
      }, 500)
      .then(function() {
        // 2) Propose the visitor to be forwarded to tel/mail/chat
        that.apologise();
        that._asyncWithoutLoading(null, 0)
        .then(function() {
          return that.offerRedirection('notFound');
        });
      });
    },

    sayThanks: function() {
      return this._printAviMsg(config.avi.messages.satisfiedFeedback);
    },

    apologise: function() {
      return this._printAviMsg(config.avi.messages.apologize);
    },

    askForFeedback: function(msg) {
      if (!app.showAviAnswerNotation) { return; }

      return this._addMessage(msg, 'lily-notation');
    },

    // ==============================================



    // ==============================================
    // Internals:
    // ==============================================

    _asyncWithLoading: function(callback, delay) {
      var that = this;

      // 1) Show loading indicator
      // ------------------------------------
      return that._showLoading(delay)

      // 2) call callback method
      // ------------------------------------
      .then(function() {
        return callback();
      })

      // 3) Clear the loading sign
      // ------------------------------------
      .then(function(answer) {
        return that._clearLoading(answer);
      });
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

      var msgViews = {
        'user-simple': MessageUserSimple,
        'lily-simple': MessageLilySimple,
        'lily-redirection': MessageLilyRedirection,
        'lily-precision': MessageLilyPrecision,
        'lily-notation': MessageLilyNotation,
        'lily-completion': MessageLilyCompletion,
      };

      if (!msgViews[messageType]) { return; }

      message = new msgViews[messageType]({
        model: messageModel
      }).render();

      if (messageType === 'lily-notation') {
        // if message is notation, keep an index of the view
        // to be able to remove it when needed
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

    _createRedirectionView: function(model) {
      var indexer = 'redirectionView';

      if (this.childViews.findByCustom(indexer)) {
        return;
      }

      this._showAvi(false);
      this.$choices
        .removeClass('component-show')
        .addClass('component-hide');

      var redirection = new MessageLilyRedirection({
        model: model
      }).render();

      this.childViews.add(redirection, indexer);
    },

    // Not used yet
    _onDismissChoicesView: function(viewType) {
      this.$choices
        .removeClass('component-hide')
        .addClass('component-show');

      var choicesView = this.childViews.findByCustom(viewType);
      this.childViews.remove(choicesView);
      choicesView.remove();
      this._showAvi(true);
    },

    /**
     * Shows a 'writing' indicator to show that the avi is thinking
     * Semi random delay before showing an avi answer
     * (affordance: something is hapenning)
     *
     * @param  int  delay (takes valors between 1 and 10)
     * @return promise
     */
    _showLoading: function(delay, args) {
      var defer = when.defer();
      var typeDelay = delay + (Math.random() * -1) * (Math.random() * 300);

      if (this.isLoadingShown) {
        defer.resolve(args);
      } else {
        this.$('.avatar-wrapper').append(config.loadingTpl);
        this.isLoadingShown = true;
        this.isMsgAnimating = true;

        // Scroll all the way down
        var objDiv = document.getElementsByClassName('lily-box-messages')[0];
        objDiv.scrollTop = objDiv.scrollHeight;

        setTimeout(function() {
          defer.resolve(args);
        }, typeDelay);
      }

      return defer.promise;
    },

    _clearLoading: function(args) {
      var defer = when.defer(),
          that = this;

      if (this.$('.lily-msg-loading').length) {
        this.$('.lily-msg-loading')
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

    _clearInput: function() {
      this.$input.typeahead('val', '')
        .typeahead('close')
        .blur();
    },

    _disableInput: function(disable) {
      if (disable) {
        this.$input
          .blur()
          .typeahead('close');
      } else {
        this.$input
          .focus()
          .typeahead('open');
      }
    },

    _removeNotationView: function() {
      var notationView = this.childViews.findByCustom('notationView');
      if (!notationView) { return; }

      this.childViews.remove(notationView);
      notationView.remove();
      this._isNotMsgAnimating();
    },

    _printAnswer: function(answer) {

      // answer is empty or white spaces
      if (!answer.answer || /^\s+$/.test(answer.answer)) {
        return answer;
      }

      // Simple answer
      if (!answer.children || answer.children.length <= 0) {
        this._printAviMsg(answer.answer);
        return answer;
      }

      // Handle complex answer (with precisions/actions needed)
      // Do that for now, until complex answer Logic gets implemented
      this._printAviMsg(answer.answer);
      return answer;
    },

    _toggleAviOnScroll: function(ev) {
      var elem = $(ev.currentTarget);
      var that = this;

      // while a msg is animating into view, don't do anything
      if (this.isMsgAnimating) { return; }

      function _toggleAvi() {
        if (elem[0].scrollHeight - elem.scrollTop() === elem.outerHeight()) {
          that._showMsgListOverlay();
          that._showAvi(true);
        } else {
          that._showAvi(false);
          that._hideMsgListOverlay();
        }
      }

      // Msg list scrolled all the way down. Debounce to avoid hundreds of call/s
      // 3rd argument set as true to have "debounce immediate"
      // (see http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
      var toggle = _.debounce(_toggleAvi, 50, true);
      toggle();
    },

    _isMsgListScrolled: function() {
      var elem = $('.lily-box-messages');
      return elem[0].scrollHeight - elem.scrollTop() === elem.outerHeight();
    },

    // Todo: refactor that w/ animationEnd event handler
    _isNotMsgAnimating: function() {
      var that = this;
      setTimeout(function() {
        that.isMsgAnimating = false;
      }, 300);
    },

    _showAvi: function(show) {
      var animClassIn = show ? 'lily-avi-show' : 'lily-avi-hide';
      var animClassOut = show ? 'lily-avi-hide' : 'lily-avi-show';

      this.$avi
        .removeClass(animClassOut)
        .addClass(animClassIn);

      this.aviShown = show;
    },

    _stripIdPrefix: function(id) {
      var prefix = /^r_/;
      return id.replace(prefix, '');
    },

    _failedPromise: function(err) {
      console.error('handle error: ' + err.stack);
      throw err;
    },

    _isPromise: function(obj) {
      return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
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

      if (ev && ev.keyCode && ev.keyCode === 13) {
        ev.preventDefault();
      }

      this.onSearchSelect();

      var that = this;
      var question = that.$input.val().trim();
      var id;

      // Question is empty or only spaces
      if (question.length <= 0) {
        return;
      }

      // Clear the search field
      that._clearInput();

      // Print the visitor question
      that.askQuestion(question);
      that.resetConversationState();
      app.trigger('avi:newAviQuestion', question);

      // Convert the question id from synapse's syntax;
      // ex: "r_54" to ours: "54"
      id = suggestion ? that._stripIdPrefix(suggestion.answerId) : 0;

      // Log request a this question
      api.logRequest(question, id);

      // There was no mathing question
      if (!suggestion) {
        return that.hasNoAnswer(question);
      }

      // 1) Get the answer from this question
      // ------------------------------------
      that._asyncWithLoading(function() {
        return api.getAnswerFromId(id);
      }, 0)

      // 2) Print answer
      // ------------------------------------
      .then(function(answer) {
        return that._printAnswer(answer);
      })

      // 3) Ask for feedback
      // ------------------------------------
      .then(function(answer) {
        return that.askForFeedback(answer);
      }, that.hasNoAnswer.bind(that));
    },

    onNewMessage: function() {
      this._removeNotationView();
    },

    resetConversationState: function() {
      this.lastQuestionReceivedBadFeedBack = false;
      this.lastQuestionWasUnanswered = false;
    },

    onSatisfaction: function(satisfaction, answer) {
      var that = this;
      this._removeNotationView();
      api.logSatisfaction(answer.id, satisfaction);

      if (satisfaction === true) {
        that.sayThanks();
        this.lastQuestionReceivedBadFeedBack = false;
      } else {
        this.lastQuestionReceivedBadFeedBack = true;
        // For later:
        // Ask for precision on bad answer
        that._asyncWithoutLoading(null, 0)
        .then(function() {
          return that.offerRedirection('unSatisfied');
        });
      }
    },

    chooseRedirection: function(canal) {
      api.logRedirection(canal);
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
      this.suggest.destroy();

      this.$input.typeahead('destroy')
        .off('keyup')
        .off('blur');

      $('.lily-box-messages').off('scroll');

      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return AviView;
});

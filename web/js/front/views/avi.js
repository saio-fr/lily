/* ===========================
        Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _              = require('underscore'),
    Backbone         = require('backbone'),
    app              = require('front/app'),
    config           = require('front/config'),
    Models           = require('front/data/models'),
    api              = require('front/data/api'),
    PageView         = require('front/views/page'),
    search           = require('components/search/search'),
    when             = require('when'),
    isMobile         = require('isMobile'),

    MessageUserSimple      = require('front/views/messageUserSimple'),
    MessageLilySimple      = require('front/views/messageLilySimple'),
    MessageLilyRedirection = require('front/views/messageLilyRedirection'),
    MessageLilyPrecision   = require('front/views/messageLilyPrecision'),
    MessageLilyNotation    = require('front/views/messageLilyNotation'),
    MessageLilyCompletion  = require('front/views/messageLilyCompletion'),
    AviEmptyView           = require('front/views/aviEmpty'),
    ChildViewContainer     = require('utils/backbone-childviewcontainer');


  var AviView = PageView.extend({

    template: _.template($('#lily-page-avi-template').html()),

    events: {
      'submit  .avi-input-component': 'getAviToAnswer',
      'keydown .avi-input':           'getAviToAnswer'
    },

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.listenTo(this, 'page:transitionnedIn', this.setupSearch);

      this.listenTo(app, 'precision',              this.sendPrecision);
      this.listenTo(app, 'avi:satisfaction',       this.onSatisfaction);
      this.listenTo(app, 'avi:choicesViewDismiss', this.onDismissChoicesView);
      this.listenTo(app, 'avi:chooseRedirection',  this.chooseRedirection);
      this.listenTo(app, 'avi:askFromTopQuestion', this.askFromTopQuestion);
      this.listenTo(app, 'avi:addMessage',         this.printAviMsg);

      // Search ev listeners
      this.listenTo(this, 'search:asyncrequest', this.indicateLoading);
      this.listenTo(this, 'search:asyncreceive', this.concealLoading);
      this.listenTo(this, 'search:asyncreceive', this.onAsyncReceived);
      this.listenTo(this, 'search:render',       this.makeSuggestionsScrollable);
      this.listenTo(this, 'search:open',         this.onSearchOpen);
      this.listenTo(this, 'search:close',        this.onSearchClose);
      this.listenTo(this, 'search:select',       this.getAviToAnswer);
      this.listenTo(this, 'search:select',       this.onSearchSelect);

      this.listenTo(this, 'conversation:newMessage', this.onNewMessage);

      // Flags used to get the conversation status and choose the apropriate msg
      // to show the user, in the right context
      this.lastQuestionReceivedBadFeedBack = false;
      this.lastQuestionWasUnanswered = false;
      this.countQuestionsAsked = 0;

      // Render \o/
      this.render().$el.appendTo('#lily-wrapper-page');

      // OnAfterRender
      this.$input   =   this.$('.avi-input');
      this.$choices =   this.$('.avi-input-component');
      this.$msgBox  =   $('.lily-box-messages');
      this.$header  =   $('#lily-toolbar');

      // Handles bahaviours related to showing/hiding the avi,
      // or showing/hihing the suggestions overlay
      this.$input
        .on('keyup', this.onInputKeyup.bind(this))
        .on('blur',  this.endFocusSuggestion.bind(this))
        .on('focus', this.onFocusInput.bind(this));

      this.setupEmptyView();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.trigger('render');

      return PageView.prototype.render.apply(this, arguments);
    },

    setupEmptyView: function() {
      var that = this;

      api.getTopQuestions().then(function(questions) {
        if (!questions || _.isEmpty(questions)) {
          questions = {};
        }

        var topQuestions = _.filter(questions, function(question) {
          return question && question.title.trim().toLowerCase() !== 'bonjour';
        });

        var emptyViewModel = new Models.AviEmptyView({
          questions: topQuestions,
          onBoarding: config.avi.onBoarding
        });

        that.emptyView = new AviEmptyView({
          model: emptyViewModel
        });
      }, function(err) {
        console.error(err);
      });
    },

    /**
     * Method called after the page view was rendered and it transitionned in
     * (Instantiating typeahead before transitionEnd won't work)
     *
     * @return {undefined}
     */
    setupSearch: function() {
      var options = {
        credentials: {
          'user': config.SYNAPSE_USER,
          'password': config.SYNAPSE_PASSWORD
        },
        typeahead: _.extend(config.typeahead, {
          pendingTemplate: this.model.get('pendingTemplate'),
          notFoundTemplate: this.model.get('notFoundTemplate'),
        }),

        url: config.SYNAPSE_REST_ROOT
      };

      this.setupSynapse(options);
      this.setupTypeahead('.avi-input');

      // Needs to happen after typeahead has been setup
      // for the element to exist
      this.$suggestionsMenu = $('.tt-menu');
    },

    // ==============================================
    // Search Methods:
    // ==============================================

    /**
     * When the suggestion menu is rendered, make it scrollable
     * (has to happen at render time to get the right height for the element)
     * Important for mobile/small screens
     *
     * @return {undefined}
     */
    makeSuggestionsScrollable: function() {
      var maxMenuHeight = this.$msgBox[0].clientHeight;

      if (!this.$suggestionsMenu) { return; }

      this.$suggestionsMenu
        .css('max-height', maxMenuHeight)
        .scrollTop(this.$suggestionsMenu[0].scrollHeight);
    },

    /**
     * A bit cryptic, handles corner cases when interacting w/ the input
     *
     * @param  {jQuery event} ev keyup event
     * @return {undefined}
     */
    onInputKeyup: function(ev) {
      // If key used is an action key (esc, arrowLeft...)
      if (this.specialKeyCodeMap[ev.which || ev.keyCode] || $(ev.currentTarget).val().length <= 1) {
        return;
      }

      // If it was hidden after scroll, show it again
      this.showMsgListOverlay();
    },

    /**
     * When the search is open (happens when the input was focused)
     * See Typeahead documentation:
     * https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#custom-events,
     * Create an overlay on top of the conversation and show a custom avatar msg
     *
     * @return {undefined}
     */
    onSearchOpen: function() {
      // Increase focus on suggestions by partialy hiding the conversation
      this.isSearchOpen = true;
      this.showMsgListOverlay();
    },

    // Async suggestions for some reason don't trigger autoselect.
    // Do it manually
    onAsyncReceived: function() {
      var firstSuggestion = $('.tt-menu .tt-suggestion') ?
        $('.tt-menu .tt-suggestion').eq(0) : null;

      if (firstSuggestion) {
        firstSuggestion.addClass('tt-cursor');
      }
    },

    /**
     * When the search is closed (again see typeahead doc for when that happens),
     *
     * @return {undefined}
     */
    onSearchClose: function() {
      this.isSearchOpen = false;
      this.endFocusSuggestion();
    },

    // Do the same when a user selects a suggestion
    onSearchSelect: function() {
      this.endFocusSuggestion();
    },

    /**
     * Hide the overlay above the conversation
     *
     * @return {undefined}
     */
    endFocusSuggestion: function() {
      this.hideMsgListOverlay();
    },

    onFocusInput: function() {
      app.track.click('Visitor focused search Input');
    },

    showMsgListOverlay: function() {
      if (this.isSearchOpen && !this.$msgBox.hasClass('tt-overlay')) {
        this.$msgBox.addClass('tt-overlay');
      }
    },

    hideMsgListOverlay: function() {
      if (!this.isSearchOpen) {
        this.$msgBox.removeClass('tt-overlay');
      }
    },

    // ==============================================


    // ==============================================
    // Visitor Methods:
    // ==============================================

    askQuestion: function(question) {
      var query = question || this.$input.val().trim();

      // Check for empty
      if (!query.length) { return; }

      this.printVisitorMsg(query);
      this.countQuestionsAsked += 1;
    },

    askFromTopQuestion: function(question) {
      var that = this;
      if (!question || _.isEmpty(question)) { return; }

      this.askQuestion(question.title);
      this.printAnswer(question);

      app.trigger('avi:newAviQuestion', question.title);
      api.logRequest(question.title, question.id);
      app.track.funnel('Visitor asked question to avi', {
        question: question,
        suggestion: 'top Questions'
      });

      that.asyncWithoutLoading(function() {
        return that.askForFeedback(question.answer);
      }, 500);
    },

    // ==============================================


    // ==============================================
    // AVI Methods:
    // ==============================================

    offerRedirection: function(context) {
      var that = this,
          redirectionMsg = context === 'unSatisfied' ?
            config.avi.messages.unSatisfiedRedirection :
            config.avi.messages.noAnswerRedirection;


      that.printAviMsg(redirectionMsg);
      var model = new Models.Message({
        config: {
          hasMail:       config.avi.redirections.mail,
          hasTel:        config.avi.redirections.phone,
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

      that.disableInput(true);

      that.asyncWithoutLoading(function() {
        return that.createRedirectionView(model);
      }, 1000);

      app.track.funnel('Visitor was offered to be redirected', {
        chatAvailable: config.avi.redirections.chat
      });
    },

    hasNoAnswer: function(question) {
      var that = this;
      that.lastQuestionWasUnanswered = true;

      if(that.isPromise(question)) {
        question = null;
      }

      that.asyncWithLoading(function() {
        // 2) Propose the visitor to be forwarded to tel/mail/chat
        that.apologise();
        that.asyncWithoutLoading(function() {
          return that.offerRedirection('notFound');
        }, 500);
      }, 300);
    },

    sayThanks: function() {
      return this.printAviMsg(config.avi.messages.satisfiedFeedback);
    },

    apologise: function() {
      return this.printAviMsg(config.avi.messages.apologize);
    },

    askForFeedback: function(msg) {
      if (!app.showAviAnswerNotation) { return; }
      return this.addMessage(msg, 'lily-notation');
    },

    // ==============================================


    // Conversation Logic
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
      that.clearInput();

      // Print the visitor question
      that.askQuestion(question);
      that.resetConversationState();
      app.trigger('avi:newAviQuestion', question);

      id = suggestion ? suggestion.answerId : 0;

      // Log request a this question
      api.logRequest(question, id);
      app.track.funnel('Visitor asked question to avi', {
        question: question,
        suggestion: !!suggestion
      });

      // There was no mathing question
      if (!suggestion) {
        app.track.funnel('Avi couldn\'t find an answer to visitor question', {
          unansweredQuestion: question
        });

        return that.hasNoAnswer(question);
      }

      // 1) Get the answer from this question
      // ------------------------------------
      that.asyncWithLoading(function() {
        return api.getAnswerFromId(id);
      }, 0)

      // 2) Print answer
      // ------------------------------------
      .then(function(answer) {
        return that.printAnswer(answer);
      })

      // 3) Ask for feedback
      // ------------------------------------
      .then(function(answer) {
        return that.askForFeedback(answer);
      }, that.hasNoAnswer.bind(that));
    },

    /**
     * Before a new message is added to the conversation,
     * hide the notation (satisfaction) view if it's there
     *
     * @return {undefined} [description]
     */
    onNewMessage: function() {
      this.removeNotationView();
      this.removeEmptyView();
    },

    /**
     * Set some flags back to their initial state
     *
     * @return {undefined}
     */
    resetConversationState: function() {
      this.lastQuestionReceivedBadFeedBack = false;
      this.lastQuestionWasUnanswered = false;
    },

    onSatisfaction: function(satisfaction, answer) {
      var that = this;
      api.logSatisfaction(answer.id, satisfaction);
      app.track.click('Visitor was ' +
        (satisfaction ? '' : 'not ') + 'satisfied by the avi Answer', {
        answer: answer,
      });

      if (satisfaction) {
        that.asyncWithoutLoading(function() {
          that.sayThanks();
          this.removeNotationView();
        }, 500);
        this.lastQuestionReceivedBadFeedBack = false;
      } else {
        this.lastQuestionReceivedBadFeedBack = true;
        // For later:
        // Ask for precision on bad answer
        that.asyncWithoutLoading(function() {
          that.offerRedirection('unSatisfied');
          this.removeNotationView();
        }, 500);
      }
    },

    chooseRedirection: function(canal) {
      api.logRedirection(canal);

      if (canal === 'none') {
        this.printVisitorMsg(config.avi.messages.redirection.none);
        app.track.click('Visitor chose not to be redirected');
        return;
      }

      app.track.click('Visitor chose to be redirected', { canal: canal });
    },


    // ==============================================
    // Internals:
    // ==============================================

    /**
     * Do something asynchronous, and show a "avatar typing" spinner
     * to show something is happenning
     *
     * @param  {Function} callback A function to be executed after agiven wait timer
     * @param  {Number}   delay    A wait timer (in ms)
     * @return {promise}
     */
    asyncWithLoading: function(callback, delay) {
      var that = this;

      // 1) Show loading indicator
      // ------------------------------------
      return that.showLoading(delay)

      // 2) call callback method
      // ------------------------------------
      .then(function() {
        return callback();
      })

      // 3) Clear the loading sign
      // ------------------------------------
      .then(function(answer) {
        return that.clearLoading(answer);
      });
    },

    /**
     * Do something asynchronous, without showing a spinner
     *
     * @param  {Function} callback A function to be executed after agiven wait timer
     * @param  {Number}   delay    A wait timer (in ms)
     * @return {promise}
     */
    asyncWithoutLoading: function(callback, delay) {
      var defer = when.defer();

      setTimeout(function() {

        // Not sure that's the right way to do it...
        // Need to refactor the whole error handling in promises anyway
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

    addMessage: function(msg, messageType, model) {
      // remove waiting message if exists.

      var messageModel = model || new Models.Message({
        messageContent: msg
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

      // if message is notation, keep an index of the view
      // to be able to remove it when needed
      if (messageType === 'lily-notation') {
        indexer = 'notationView';
      } else {
        // If message is not notation, trigger the onNewMessage method
        this.trigger('conversation:newMessage');
      }

      this.isMsgAnimating = true;
      this.childViews.add(message, indexer);
      this.isNotMsgAnimating();
      return msg;
    },

    printVisitorMsg: function(msg) {
      this.addMessage(msg, 'user-simple');
      return msg;
    },

    printAviMsg: function(msg) {
      this.addMessage(msg, 'lily-simple');
      return msg;
    },

    createRedirectionView: function(model) {
      var indexer = 'redirectionView';

      if (this.childViews.findByCustom(indexer)) {
        return;
      }

      // Reajust height and scroll to bottom
      this.$msgBox.css('height', 'calc(100% - 120px');
      this.$msgBox[0].scrollTop = this.$msgBox[0].scrollHeight;

      this.$choices
        .removeClass('component-show')
        .addClass('component-hide');

      var redirection = new MessageLilyRedirection({
        model: model
      }).render();

      this.childViews.add(redirection, indexer);
    },

    onDismissChoicesView: function(viewType) {
      this.$choices
        .removeClass('component-hide')
        .addClass('component-show');

      this.$msgBox.css('height', 'calc(100% - 68px');

      var choicesView = this.childViews.findByCustom(viewType);
      this.childViews.remove(choicesView);
      choicesView.remove();
    },

    /**
     * Shows a 'writing' indicator to show that the avi is thinking
     * Semi random delay before showing an avi answer
     * (affordance: something is hapenning)
     *
     * @param  int  delay (takes valors between 1 and 10)
     * @return promise
     */
    showLoading: function(delay, args) {
      var defer = when.defer();
      var typeDelay = delay + (Math.random() * -1) * (Math.random() * 300);

      if (this.isLoadingShown) {
        defer.resolve(args);
      } else {
        this.isLoadingShown = true;
        this.isMsgAnimating = true;

        // Scroll all the way down
        var objDiv = this.$msgBox[0];
        objDiv.scrollTop = objDiv.scrollHeight;

        setTimeout(function() {
          defer.resolve(args);
        }, typeDelay);
      }

      return defer.promise;
    },

    clearLoading: function(args) {
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
        // Warning!
        //
        // Wait 500ms before resolving for the msg not to jump off brusquely into view
        // (500ms might be too much, consider making the number smaller/null
        // if fetching answers from the server takes too much time and the experience feels slugish)
      } else {
        return defer.resolve(args);
      }

      return defer.promise;
    },

    clearInput: function() {
      this.$input.typeahead('val', '')
        .typeahead('close')
        .blur();
    },

    disableInput: function(disable) {
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

    removeNotationView: function() {
      var notationView = this.childViews.findByCustom('notationView');
      if (!notationView) { return; }

      this.childViews.remove(notationView);
      notationView.remove();
      this.isNotMsgAnimating();
    },

    removeEmptyView: function() {
      if (this.emptyView) {
        this.emptyView.remove();
        this.emptyView = undefined;
      }
    },

    printAnswer: function(answer) {

      // answer is empty or white spaces
      if (!answer.answer || /^\s+$/.test(answer.answer)) {
        return answer;
      }

      // Simple answer
      if (!answer.children || answer.children.length <= 0) {
        this.printAviMsg(answer.answer);

        app.track.funnel('Avi answered visitor question', {
          answer: answer.answer,
          answerId: answer.id
        });

        return answer;
      }

      // Handle complex answer (with precisions/actions needed)
      // Do that for now, until complex answer Logic gets implemented
      this.printAviMsg(answer.answer);

      return answer;
    },

    // Todo: refactor that w/ animationEnd event handler
    isNotMsgAnimating: function() {
      var that = this;
      setTimeout(function() {
        that.isMsgAnimating = false;
      }, 300);
    },

    failedPromise: function(err) {
      console.error('handle error: ' + err.stack);
      throw err;
    },

    isPromise: function(obj) {
      return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    },

    // ==============================================

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
      this.removeEmptyView();

      // Destroy typeahead (will unbind any typeahead event bound to the input)
      this.suggest.destroy();

      this.$input
        .off('keyup')
        .off('blur');

      this.$msgBox.off('scroll');

      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  _.extend(AviView.prototype, search);

  return AviView;
});

/* ===========================
        Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _              = require('underscore'),
    Backbone         = require('backbone'),
    app              = require('front/app'),
    config           = require('front/globals'),
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
    ChildViewContainer     = require('utils/backbone-childviewcontainer'),

    // Object wrapper returned as a module
    AviView;

  AviView = PageView.extend({

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

      // Flag used to avoid visual conflicts between the avi && other UI elements
      // ex: suggestions overlay
      this.aviShown = true;

      // Flags used to get the conversation status and choose the apropriate msg
      // to show the user, in the right context
      this.lastQuestionReceivedBadFeedBack = false;
      this.lastQuestionWasUnanswered = false;
      this.countQuestionsAsked = 0;

      // Render \o/
      this.render({ page: true }).$el.appendTo('#lily-wrapper-page');

      // OnAfterRender
      this.$input   =   this.$('.avi-input');
      this.$avi     =   this.$('.avatar-wrapper');
      this.$choices =   this.$('.avi-input-component');
      this.$msgBox  =   $('.lily-box-messages');
      this.$header  =   $('#lily-toolbar');

      this.$msgBox.on('scroll', this.toggleAviOnScroll.bind(this));

      // Handles bahaviours related to showing/hiding the avi,
      // or showing/hihing the suggestions overlay
      this.$input
        .on('keyup', this.onInputKeyup.bind(this))
        .on('blur', this.endFocusSuggestion.bind(this));

      // Print Welcome msg (defined in globals.js)
      this.welcomeVisitor();
    },

    render: function() {
      this.$el.html(this.template());
      this.trigger('render');

      return PageView.prototype.render.apply(this, arguments);
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
          'user': config.synapse.user,
          'password': config.synapse.password
        },
        typeahead: config.typeahead,
        url: config.synapse.restRoot
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

      // If the suggestions menu is visible, hide the avi
      if (this.$suggestionsMenu && this.$suggestionsMenu.is(':visible')) {
        this.$avi.removeClass('overlay');
        this.showAvi(false);
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
      var overlayMsg = this.getOverlayMsg(),
          showAvi = this.$suggestionsMenu ? !this.$suggestionsMenu.is(':visible') : true;

      // Increase focus on suggestions by partialy hiding the conversation
      this.isSearchOpen = true;
      this.showMsgListOverlay();

      // Show Avi onboarding message
      if (overlayMsg) {
        this.$avi.attr('data-msg', overlayMsg);
        this.$avi.addClass('overlay');
      }

      this.showAvi(showAvi);
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
     * Hide the overlay above the conversation, and the custom msg,
     * Show the avi if showable.
     *
     * @return {undefined}
     */
    endFocusSuggestion: function() {
      this.$avi.removeClass('overlay');
      this.showAvi(this.isMsgListScrolled());
      this.hideMsgListOverlay();
      this.$avi.removeClass('lily-avi-show');
    },

    showMsgListOverlay: function() {
      if (this.isSearchOpen && !this.$msgBox.hasClass('tt-overlay')) {
        this.$msgBox.addClass('tt-overlay');
      }
    },

    hideMsgListOverlay: function() {
      if (!this.aviShown || !this.isSearchOpen) {
        this.$msgBox.removeClass('tt-overlay');
      }
    },

    /**
     * Get the current state of the conversation;
     * used to profide a custom msg for the user
     *
     * @return {string} custom msg
     */
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

      var query = question || this.$input.val().trim();

      // Check for empty
      if (!query.length) { return; }

      this.printVisitorMsg(query);
      this.countQuestionsAsked += 1;
    },

    // ==============================================


    // ==============================================
    // AVI Methods:
    // ==============================================

    welcomeVisitor: function() {
      console.log(config.avi.welcomeMsg);
      return this.printAviMsg(config.avi.welcomeMsg);
    },

    offerRedirection: function(context) {
      var that = this,
          redirectionMsg = context === 'unSatisfied' ?
            config.avi.messages.unSatisfiedRedirection :
            config.avi.messages.noAnswerRedirection;


      that.printAviMsg(redirectionMsg);
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

      that.disableInput(true);
      that.asyncWithoutLoading(null, 300)
      .then(function() {
        return that.createRedirectionView(model);
      });
    },

    hasNoAnswer: function(question) {
      var that = this;

      that.lastQuestionWasUnanswered = true;

      if(that.isPromise(question)) {
        question = null;
      }

      that.asyncWithLoading(function() {
      }, 500)
      .then(function() {
        // 2) Propose the visitor to be forwarded to tel/mail/chat
        that.apologise();
        that.asyncWithoutLoading(null, 0)
        .then(function() {
          return that.offerRedirection('notFound');
        });
      });
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

      // Convert the question id from synapse's syntax;
      // ex: "r_54" to ours: "54"
      id = suggestion ? suggestion.answerId : 0;

      // Log request a this question
      api.logRequest(question, id);

      // There was no mathing question
      if (!suggestion) {
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
      this.removeNotationView();
      api.logSatisfaction(answer.id, satisfaction);

      if (satisfaction) {
        that.sayThanks();
        this.lastQuestionReceivedBadFeedBack = false;
      } else {
        this.lastQuestionReceivedBadFeedBack = true;
        // For later:
        // Ask for precision on bad answer
        that.asyncWithoutLoading(null, 0)
        .then(function() {
          return that.offerRedirection('unSatisfied');
        });
      }
    },

    chooseRedirection: function(canal) {
      api.logRedirection(canal);

      if (canal === 'none') {
        this.printVisitorMsg(config.avi.messages.redirection.none);
      }
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

      this.showAvi(false);
      this.$choices
        .removeClass('component-show')
        .addClass('component-hide');

      var redirection = new MessageLilyRedirection({
        model: model
      }).render();

      this.childViews.add(redirection, indexer);
    },

    // Not used yet, build on the same logic as the redirection component.
    // Will be used for complex answers/polls & others.
    onDismissChoicesView: function(viewType) {
      this.$choices
        .removeClass('component-hide')
        .addClass('component-show');

      var choicesView = this.childViews.findByCustom(viewType);
      this.childViews.remove(choicesView);
      choicesView.remove();
      this.showAvi(true);
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
        this.$('.avatar-wrapper').append(config.loadingTpl);
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
      }

      return defer.promise;
    },

    clearInput: function() {
      this.$input.typeahead('val', '')
        .typeahead('close')
        .blur();
    },

    //
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

    printAnswer: function(answer) {

      // answer is empty or white spaces
      if (!answer.answer || /^\s+$/.test(answer.answer)) {
        return answer;
      }

      // Simple answer
      if (!answer.children || answer.children.length <= 0) {
        this.printAviMsg(answer.answer);
        return answer;
      }

      // Handle complex answer (with precisions/actions needed)
      // Do that for now, until complex answer Logic gets implemented
      this.printAviMsg(answer.answer);
      return answer;
    },

    /**
     * Hide the avi when the conversation view is scrolled up
     *
     * @param  {Jquery event} ev scroll event
     * @return {undefined}
     */
    toggleAviOnScroll: function(ev) {
      var elem = $(ev.currentTarget);
      var that = this;

      // while a msg is animating into view, don't do anything
      if (this.isMsgAnimating) { return; }

      function _toggleAvi() {
        if (elem[0].scrollHeight - elem.scrollTop() === elem.outerHeight()) {
          that.showMsgListOverlay();
          that.showAvi(true);
        } else {
          that.showAvi(false);
          that.hideMsgListOverlay();
        }
      }

      // Msg list scrolled all the way down. Debounce to avoid hundreds of call/s
      // 3rd argument set as true to have "debounce immediate"
      // (see http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
      var toggle = _.debounce(_toggleAvi, 50, true);
      toggle();
    },

    /**
     * Get current scroll state for the conversation view
     *
     * @return {Boolean} Conversation view scrolled all the way down
     */
    isMsgListScrolled: function() {
      var elem = this.$msgBox;
      return elem[0].scrollHeight - elem.scrollTop() === elem.outerHeight();
    },

    // Todo: refactor that w/ animationEnd event handler
    isNotMsgAnimating: function() {
      var that = this;
      setTimeout(function() {
        that.isMsgAnimating = false;
      }, 300);
    },

    /**
     * Show/hide the avi
     *
     * @param  {Boolean}    show
     * @return {undefined}
     */
    showAvi: function(show) {
      var animClassIn = show ? 'lily-avi-show' : 'lily-avi-hide';
      var animClassOut = show ? 'lily-avi-hide' : 'lily-avi-show';

      this.$avi
        .removeClass(animClassOut)
        .addClass(animClassIn);

      this.aviShown = show;
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

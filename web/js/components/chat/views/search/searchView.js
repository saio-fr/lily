define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _              = require('underscore'),
    Backbone         = require('backbone'),
    app              = require('backoffice/app'),
    search           = require('components/search/search'),
    when             = require('when'),
    config           = require('config'),

    SearchAnswerView    = require('components/chat/views/search/searchAnswerView'),

    // Object wrapper returned as a module
    SearchView;

  SearchView = Backbone.View.extend({

    className: 'wrapper-search',

    initialize: function() {
      // Search ev listeners
      this.listenTo(this, 'search:asyncrequest', this.indicateLoading);
      this.listenTo(this, 'search:asyncreceive', this.concealLoading);
      this.listenTo(this, 'search:open',         this.onSearchOpen);
      this.listenTo(this, 'search:close',        this.onSearchClose);
      this.listenTo(this, 'search:select',       this.getSearchResult);

      // Render \o/
      this.render().$el.appendTo('.search-panel');

      // OnAfterRender
      this.$input             = this.$('.search-input');
      this.$searchPanel       = $('.search-panel');
      this.$searchHeader      = $('.header-search');
      this.$informationsPanel = $('.informations-panel');

      this.makeTogglable();

      this.setupSearch();
      this.refreshSuggestions();

      this.$input.on('keyup', this.onInputKeyup.bind(this));
    },

    render: function() {
      var template = _.template($('#searchKnowledgeTpl').html());
      this.$el.html(template());
      this.trigger('render');
      return this;
    },

    makeTogglable: function() {
      var that = this;
      this.$searchHeader.on('click', function() {
        that.$searchPanel.toggleClass('closed');
        that.trigger('search:resize');
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
        typeahead: config.typeahead,
        url: config.SYNAPSE_REST_ROOT
      };

      this.setupSynapse(options);
      this.setupTypeahead('.search-input');
    },

    refreshSuggestions: function() {
      if (!this.suggest) { return; }

      this.suggest.refresh();
      this.setupSearch();
    },

    // ==============================================
    // Search Methods:
    // ==============================================

    /**
     * A bit cryptic, handles corner cases when interacting w/ the input
     *
     * @param  {jQuery event} ev keyup event
     * @return {undefined}
     */
    onInputKeyup: function(ev) {
      // If key used is an action key (esc, arrowLeft...)
      if (this.specialKeyCodeMap[ev.which || ev.keyCode] || !$(ev.currentTarget).val().length) {
        return;
      }
    },

    // Conversation Logic
    // ==============================================
    getSearchResult: function(ev, suggestion) {

      // The method was triggered by the "submit" event handler
      if (ev && (ev.type === 'submit' || ev.keyCode && ev.keyCode === 13)) {
        ev.preventDefault();
      }

      // if key pressed is not Enter, don't submit
      if (ev && ev.keyCode && ev.keyCode !== 13) {
        return;
      }

      var that = this;
      var question = that.$input.val().trim();
      var id;

      // Question is empty or only spaces
      if (!question.length) {
        return;
      }

      id = suggestion ? suggestion.answerId : 0;

      // There was no mathing question
      if (!suggestion) {
        return;
      }

      // Track question asked
      app.track.funnel('Search answer in KB from LiveChat', {
        question: question,
      });

      // Clear the search field
      that.clearInput();

      // 1) Get the answer from this question
      // ------------------------------------
      that.showLoading();
      that.getAnswerFromId(id, question)

      // 2) Print answer
      // ------------------------------------
      .then(function(answer) {
        return that.printAnswer(answer);
      }, that.noAnswerFound.bind(that));
    },

    noAnswerFound: function() {
      // Try refreshing suggestions
      this.refreshSuggestions();
      this.printWarning('La réponse à cette question est inconnue. Il semblerait qu\'il y ait eu une erreur. Veuillez vérifier la base de connaissance');
      app.track.error('Search in LiveChat failed (no answer found for that id)');
    },

    // ==============================================
    // Internals:
    // ==============================================

    printKbAnswer: function(msg, type) {

      var AnswerModel = Backbone.Model.extend({});
      var messageModel = new AnswerModel({
        messageContent: msg,
        type: type || 'answer'
      });

      // create an instance of the sub-view to render the single message item.
      var message;

      message = new SearchAnswerView({
        model: messageModel
      }).render();
    },

    printWarning: function(msg) {
      this.printKbAnswer(msg, 'warning');
    },

    /**
     * Gets the answer to a question in the KB by its Id
     * @param  int answerId
     * @return {} answer:
     *
     *  id int
     *  children []
     *  title string
     *  answer string
     *  questionType string (question, action)
     *  answerType string (answer, precision)
     */
    getAnswerFromId: function(id, question) {
      return this.send('GET', '/' + config.licence + '/question/' + id);
    },

    send: function(method, url, data) {
      var deferred = when.defer();

      if (method && url) {
        $.ajax({
          external: true,
          type: method,
          url: url,
          data: data,

          success: function(data) {
            deferred.resolve(data);
          },

          error: function(err) {
            deferred.reject(err);
          }
        });
      }

      return deferred.promise;
    },

    /**
     * Shows a 'writing' indicator to show that the avi is thinking
     *
     * @param  int  delay (takes valors between 1 and 10)
     * @return promise
     */
    showLoading: function() {
      this.$('.answer-box').html(config.loadingTpl);
    },

    clearInput: function() {
      this.$input.typeahead('val', '')
        .typeahead('close')
        .blur();
    },

    printAnswer: function(answer) {
      // answer is empty or white spaces
      if (!answer.answer || /^\s+$/.test(answer.answer)) {
        return answer;
      }

      // Simple answer
      if (!answer.children || answer.children.length <= 0) {
        this.printKbAnswer(answer.answer);
        app.track.funnel('Showed KB answer in search view from LiveChat', {
          answer: answer.answer,
          answerId: answer.id
        });

        return answer;
      }
    },

    remove: function() {
      // Destroy typeahead (will unbind any typeahead event bound to the input)
      this.suggest.destroy();
      this.$input.off('keyup');
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  _.extend(SearchView.prototype, search);

  return SearchView;
});

/*========================================
          SHELL SKELETON VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    app = require('app'),
    _ = require('underscore'),
    SuggestionsListView = require('components/chat/views/shell/suggestionsListView'),
    AlertView = require('components/chat/views/shell/alertView'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    Shell = require('components/chat/utils/shell'),
    Scribe = require('scribe'),
    scribePluginToolbar = require('scribe-plugin-toolbar'),
    scribePluginShellCommand = require('scribe-plugin-shell-command'),
    scribePluginSanitizer = require('scribe-plugin-sanitizer'),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'shell-container',
    template: _.template($('#liveConversationShellTpl').html()),

    events: {
      'click .execute': 'onShellRequest',
      'keyup .editor': 'onShellRequest',
      'keydown .editor' : 'disableDefaultTabNav'
    },

    initialize: function(options) {

      if (options && options.appendEl) {
        this.appendEl = options.appendEl;
        this.model = options.model
      }

      this.childViews = new Backbone.ChildViewContainer();

      this.render();
      this.getWysiEditor();
      this.initSuggestions();

      this.listenTo(app, 'shell:suggestions:select', this.onSelectSuggestion);
      this.listenTo(app, 'shell:suggestions:validate', this.onValidateSuggestion);
    },

    render: function() {

      var container = $(this.appendEl);

      this.$el.html(this.template());
      this.$el.prependTo(container);

      // Render suggestionsView
      var suggestionsView = new SuggestionsListView({
        el: this.$('.js-suggestions-container')
      });

      this.$('.js-suggestions-container').append(suggestionsView.$el);
      this.childViews.add(suggestionsView, 'suggestionsView');

      return this;
    },

    getWysiEditor: function () {

      var editorEl = this.$('.editor')[0];
      var toolbarEl = this.$('.toolbar')[0];

      this.editor = new Scribe(editorEl);
      this.editor.use(scribePluginToolbar(toolbarEl));
      this.editor.use(scribePluginShellCommand());
      this.editor.use(scribePluginSanitizer({
        tags: {
          p: true,
          b: true,
          a: {
            href: true,
            target: '_blank'
          }
        }
      }));
      this.editor.on('content-changed', this.makeLinksExternal.bind(this));
    },

    makeLinksExternal: function() {
      this.$('.editor')
          .find('a')
          .attr('target', '_blank');
    },

    initSuggestions: function () {
      this.suggestions = {
        visible: false,
        type: null
      };
      this.childViews.findByCustom('suggestionsView').hide();
    },

    disableDefaultTabNav: function (e) {

      // disable the default browser tab navigation behaviour
      if (e.keyCode === 9) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },

    onShellRequest: function (e) {

      var textMsg = $(this.editor.el).text();
      var navAction = Shell.isNavigationAction(e);
      this.suggestions.type = Shell.isCommandType(textMsg);

      if (this.suggestions.type) {

        switch (navAction) {

          case 'validate':
            this.executeCommand();
            break;

          case 'next':
            this.childViews.findByCustom('suggestionsView').selectNextItem();
            break;

          case 'prev':
            this.childViews.findByCustom('suggestionsView').selectPrevItem();
            break;

          case 'left-right':
            break;

          default:
            this.setSuggestions();
        }
        return;
      }

      this.initSuggestions();

      // Else we want to send the msg
      if (navAction === 'validate') {
        var htmlMsg = $.trim($(this.editor.el).html());
        var textMsg = $.trim($(this.editor.el).text());

        if (textMsg.length) {
          this.sendMsg(htmlMsg);
        }
      }
    },

    onSelectSuggestion: function (selected) {

      var event = new CustomEvent('commandSelected', {
        detail: {
          commandTitle: selected.title
        }
      });
      this.editor.el.dispatchEvent(event);
    },

    onValidateSuggestion: function () {
      this.initSuggestions();
    },

    setSuggestions: function () {

      var commandsCollection,
      filteredCommands,
      translatedType,
      suggestionsView = this.childViews.findByCustom('suggestionsView'),
      textMsg = $(this.editor.el).text()
        .toLowerCase();

      switch (this.suggestions.type) {
        case 'shortcuts':
         commandsCollection = app.chatShortcuts;
         translatedType = 'Messages pré-enregistrés';
         break;
      }

      filteredCommands = commandsCollection.filter(function(command) {
        if (command.get('title').indexOf(textMsg) === 0) {
          return command;
        }
      });

      suggestionsView.setCollection({
        // TODO, add it to an translation file
        type: translatedType,
        suggestions: filteredCommands
      });

      if (filteredCommands.length) {
        suggestionsView.show();
        this.suggestions.visible = true;
      } else {
        suggestionsView.hide();
        this.suggestions.visible = false;
      }
    },

    executeCommand: function () {
      // TODO: handle the case where an incorrect shortcut is typed
      if (this.suggestions.visible) {
        var item = this.childViews.findByCustom('suggestionsView')
          .getSelectedItem();
        this.onSelectSuggestion(item);
        this.onValidateSuggestion();
        return;
      }

      switch (this.suggestions.type) {

        case 'shortcuts':

          var commandTitle = $.trim(
            $(this.editor.el).text()
            .toLowerCase().split(' ')[0]
          );
          var command = app.chatShortcuts.findWhere({title: commandTitle});

          if (command) {
            this.sendMsg(command.get('message'));
          } else {

            var alertView = new AlertView({
              title: commandTitle
            });

            var alertEl = this.$('.js-shell-alert');

            alertEl.html();
            alertEl.append(alertView.$el);
          }
          break;
      }
    },

    sendMsg: function (msg) {

      app.trigger('chat:send', {
        message: msg,
        id: this.model.id
      });
      this.clearInput();
    },

    clearInput: function () {
      var event = new Event('clearInput');
      this.editor.el.dispatchEvent(event);
    },

    remove: function () {

      var that = this;
      /* Unbind scribe events
       * Not implemented yet in scribe :'(
       * this.editor.destroy();
       */

      this.childViews.forEach(function (view) {
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return SkeletonView;
});

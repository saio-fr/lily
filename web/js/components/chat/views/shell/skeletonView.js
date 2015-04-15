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
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    Shell = require('components/chat/utils/shell'),
    Scribe = require('scribe'),
    ScribePluginToolbar = require('scribe-plugin-toolbar'),
    ScribePluginSmartLists = require('scribe-plugin-smart-lists'),
    ScribePluginHeadingCommand = require('scribe-plugin-heading-command'),
    ScribePluginShellCommand = require('scribe-plugin-shell-command'), 
    
    
    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'shell-container panel',
    template: _.template($('#liveConversationShellTpl').html()),

    events: {
      'click .execute': 'onShellRequest',
      'keyup .editor': 'onShellRequest'
    },

    initialize: function(options) {
      
      if (options && options.appendEl) {
        this.appendEl = options.appendEl;
        this.model = options.model
      }
      
      this.render();   
      
      this.childViews = new Backbone.ChildViewContainer();
      this.suggestionsView = new SuggestionsListView({});
      
      this.listenTo(app, 'shell:suggestions:mouseover', this.onSelectSuggestion);
      this.listenTo(app, 'shell:suggestions:enter', this.onEnterSuggestion);
      this.listenTo(this.model, 'change:selected', this.onSelectConversation);
    },

    render: function() {

      var container = $(this.appendEl);

      this.$el.html(this.template());
      this.$el.prependTo(container);
      return this;
    },
    
    getWysiEditor: function () {
      
      var editorEl = this.$('.editor')[0];
      var toolbarEl = this.$('.toolbar')[0];
      
      this.editor = new Scribe(editorEl);
      this.editor.use(ScribePluginToolbar(toolbarEl));
      this.editor.use(ScribePluginSmartLists());
      this.editor.use(ScribePluginHeadingCommand(5));
      this.editor.use(ScribePluginShellCommand());
    },
    
    onSelectConversation: function () {

      if (this.model.get('selected')) {
        this.getWysiEditor();
      } else {
        // Unbind scribe events
        // this.editor.destroy();
      }
    },
    
    onShellRequest: function (e) {
      
      var condition = e.type === 'click' ||
        e.keyCode === 13 && !e.shiftKey;
      
      var toExecute = (condition) ? true : false;
      
      var textMsg = $(this.editor.el).text().trim();
      var commandType = Shell.isCommand(textMsg);
      
      if (commandType) {
        
        if (toExecute) {
          var commandState = Shell.updateCommandState();
          this.executeCommand(commandState);
        }
        this.setSuggestions(commandType);
        return;
      }
      
      this.suggestionsView.hide();
      
      if (toExecute) {
        this.sendMsg();
      }
    },
    
    onSelectSuggestion: function (commandTitle) {
      var event = new CustomEvent('commandSelected', {
        detail: {
          commandTitle: commandTitle
        }
      });
      this.editor.el.dispatchEvent(event);
    },
    
    onEnterSuggestion: function (commandTitle) {

      this.onSelectSuggestion(commandTitle);
      this.suggestionsView.hide();
    },
    
    setSuggestions: function (commandType) {
      
      var commandsCollection,
      filteredCommands,
      translatedCommandType,
      textMsg = $(this.editor.el).text().trim().toLowerCase();
      
      switch (commandType) {
        case 'shortcuts':
         commandsCollection = app.chatShortcuts;
         translatedCommandType = 'Messages pré-enregistrés';
         break;
      }
      
      filteredCommands = commandsCollection.filter(function(command) {
        if (command.get('title').indexOf(textMsg) === 0) {
          return command;
        }
      });
      
      this.filteredCommands = filteredCommands;

      this.suggestionsView.setCollection({
        // TODO, add it to an translation file
        type: translatedCommandType,
        suggestions: filteredCommands
      });
    },
    
    executeCommand: function (commandState) {
      
    },
    
    sendMsg: function () {
      
      var htmlMsg = $.trim( $(this.editor.el).html() );
      
      if (htmlMsg.length) {
        app.trigger('chat:send', {
          message: htmlMsg,
          id: this.model.id
        });
      }
      this.clearInput();
    },
    
    clearInput: function () {
      var event = new Event('clearInput');
      this.editor.el.dispatchEvent(event);
    },

    remove: function () {
      
      var that = this;
      // Unbind scribe events
      // this.editor.destroy();
      
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

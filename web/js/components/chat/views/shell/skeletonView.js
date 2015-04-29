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
    ScribePluginShellCommand = require('scribe-plugin-shell-command'), 
    
    
    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'shell-container panel',
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
      
      /*
       * A command state to know what action to trigger on click/enter event
       * null, when isCommand return false
       * searching, when commands are found but no enter/click was fired
       * ready, when a command is selected and ready to execute
       */      
      this.initCommand();
      
      this.render();      
      this.getWysiEditor();
      
      this.listenTo(app, 'shell:suggestions:focus', this.onFocusSuggestion);
      this.listenTo(app, 'shell:suggestions:validate', this.onValidateSuggestion);
    },

    render: function() {

      var container = $(this.appendEl);

      this.$el.html(this.template());
      this.$el.prependTo(container);
      
      // Render suggestions view
      var suggestionsView = new SuggestionsListView();
      this.$('.js-suggestions-container').append(suggestionsView.$el);
      this.childViews.add(suggestionsView, 'suggestionsView');
      
      return this;
    },
    
    getWysiEditor: function () {
      
      var editorEl = this.$('.editor')[0];
      var toolbarEl = this.$('.toolbar')[0];
      
      this.editor = new Scribe(editorEl);
      this.editor.use(ScribePluginToolbar(toolbarEl));
      this.editor.use(ScribePluginShellCommand());
    },
    
    initCommand: function () {
      this.command = {
        attributes: null,
        type: null,
        state: null
      };
    },
    
    executeCommand: function () {
      
      // TODO: handle the case where an incorrect shortcut is typed
      if (this.command.state !== 'ready') {
        this.onValidateSuggestion();
        return;
      }

      switch (this.command.type) {
        case 'shortcuts':
          var msg = this.command.attributes.message;
          this.sendMsg(msg);
          break;
      }

      this.initCommand();
    },
    
    disableDefaultTabNav: function (e) {
      
      // disable the default browser tab navigation behaviour
      
      if (e.keyCode === 9) {
        e.preventDefault();
        e.stopImmediatePropagation();        
      }
    },
    
    onShellRequest: function (e) {

      var textMsg = $(this.editor.el).text().trim();
      var navAction = Shell.isNavigationAction(e);
      this.command.type = Shell.isCommand(textMsg);
      
      if (this.command.type) {

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
            
          default:
            this.setSuggestions();
        }
        
        return;
      }
      
      this.initCommand();  
      this.childViews.findByCustom('suggestionsView').hide();
      
      // Else we want to send the msg
      if (navAction === 'validate') {
        var htmlMsg = $.trim( $(this.editor.el).html() );
        var textMsg = $.trim( $(this.editor.el).text() );
      
        if (textMsg.length) {
          this.sendMsg(htmlMsg);
        }
      }
    },
    
    onFocusSuggestion: function (attributes) {

      this.command = {
        attributes: attributes,
        state: 'searching'
      }
    },
    
    onValidateSuggestion: function () {

      var commandTitle = this.command.attributes.title;
      this.command.state = 'ready';
      
      var event = new CustomEvent('commandSelected', {
        detail: {
          commandTitle: commandTitle
        }
      });
      this.editor.el.dispatchEvent(event);
      this.childViews.findByCustom('suggestionsView').hide();
    },
    
    setSuggestions: function (commandType) {
      
      var commandsCollection,
      filteredCommands,
      translatedCommandType,
      textMsg = $(this.editor.el).text().toLowerCase();
      
      switch (this.command.type) {
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

      this.childViews.findByCustom('suggestionsView').setCollection({
        // TODO, add it to an translation file
        type: translatedCommandType,
        suggestions: filteredCommands
      });
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

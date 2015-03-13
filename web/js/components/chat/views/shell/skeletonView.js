/*========================================
      SHORTCUTS SKELETON VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    app = require('app'),
    _ = require('underscore'),
    SuggestionsListView = require('components/chat/views/shell/suggestionsListView'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    Scribe = require('scribe'),
    scribePluginToolbar = require('scribe-plugin-toolbar'),
    scribePluginSmartLists = require('scribe-plugin-smart-lists'),
    scribePluginHeadingCommand = require('scribe-plugin-heading-command'), 
    
    
    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'shell-container panel',
    template: _.template($('#liveConversationShellTpl').html()),

    events: {
      'click .execute': 'onClickCommand',
      'keydown .editor': 'onKeydownCommand'
    },

    initialize: function(options) {
      
      if (options && options.appendEl) {
        this.appendEl = options.appendEl;
        this.id = options.id
      }
      
      this.render();
      this.getWysiEditor();
      
      this.childViews = new Backbone.ChildViewContainer();
      this.suggestionsView = new SuggestionsListView({});
    },

    render: function() {

      var container = $(this.appendEl);

      this.$el.html(this.template());
      this.$el.prependTo(container);
      return this;
    },
    
    getWysiEditor: function () {
      
      this.editor = this.$('.editor');
      this.toolbar = this.$('.toolbar');
      
      var scribe = new Scribe(this.editor[0]);
      scribe.use(scribePluginToolbar(this.toolbar[0]));
      scribe.use(scribePluginSmartLists());
      scribe.use(scribePluginHeadingCommand(5));
      // scribe.use(scribePluginShellCommand());
      
      
    },
    
    onClickCommand: function (e) {
      
      var textMsg = this.editor.text().trim();
      var htmlMsg = this.editor.html().trim();
      
      if (this.isCommand(textMsg)) {
        return;
      }
      
      this.send(htmlMsg);
    },
    
    onKeydownCommand: function (e) {
      
      var textMsg = this.editor.text().trim();
      var htmlMsg = this.editor.html().trim();
      
      if (this.isCommand(textMsg)) {
        return;
      }
      
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        this.send(htmlMsg);
      }
    },
    
    isCommand: function (textMsg) {
      
      var commandChar = textMsg.slice(0, 1);
      var commandTitle = textMsg.substr(1).toLowerCase();
      
      switch (commandChar) {
        case '/' :
        
          var suggestions = app.chatShortcuts.filter(function(shortcut) {

            if (shortcut.get('title').indexOf(commandTitle) === 0) {
              return shortcut;              
            }
          });
          
          this.suggestionsView.collection.set(suggestions);
          // TODO, add it to an translation file
          this.suggestionsView.type = 'Messages pré-enregistrés';
          
          return true;
      }
    },
    
    send: function (htmlMsg) {
      
      if (htmlMsg.length) {
        app.trigger('chat:send', {
          message: htmlMsg,
          id: this.id
        });
      }
      this.clearInput();
    },
    
    clearInput: function () {
      this.editor.html('');
    },

    remove: function () {
      
      var that = this;
      
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

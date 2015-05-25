/*======================================
              Alt Question View
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    Models = require('backoffice/knowledge/data/models'),
    Scribe = require('scribe'),
    scribePluginSanitizer = require('scribe-plugin-sanitizer'),

    // Object wrapper returned as a module
    AltQuestionView;

  AltQuestionView = Backbone.View.extend({

    tagName: "li",
    className: "alternative",

    template: _.template($('#questionsEditAlternativeTpl').html()),

    events: {
      'click .icon-remove' : 'remove',
      'click .title' : 'editTitle',
      'blur .title' : 'leaveEditTitle'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.getWysiEditor();
      return this;
    },
    
    getWysiEditor: function () {
      var edit = this.$('.title')[0];
      var scribe = new Scribe(edit, {
        allowBlockElements: false
      });
      scribe.use(scribePluginSanitizer({
        tags: {}
      }));
    },
    
    editTitle: function (e) {
      e.stopImmediatePropagation();
      $('.editing').removeClass('editing');
      this.$el.addClass('editing');
    },
    
    leaveEditTitle: function (e) {
      e.stopImmediatePropagation();
      this.$el.removeClass('editing');
      var title = this.$('.title').text();
      this.model.set({title: title});
    },

    remove: function() {
      app.trigger('remove:alternativeView', this);
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return AltQuestionView;
});

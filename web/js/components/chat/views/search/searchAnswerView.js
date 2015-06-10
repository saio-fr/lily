/* ===========================
      Search Answer
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Backbone = require('backbone'),
    Models = require('components/chat/data/models'),
    // MessageView = require('app/views/message'),
    // Object wrapper returned as a module
    SearchAnswerView;

SearchAnswerView = Backbone.View.extend({

  className: 'search-answer',
  model: Models.SearchAnswerModel,
  template: _.template($('#searchKnowledgeAnswerTpl').html()),

  initialize: function() {
    // bind model's changes to the render() method to mantain interface up to date.
    this.model.on('change', this.render, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    $('.answer-box').html(this.$el);
    return this;
  },
});

return SearchAnswerView;
});

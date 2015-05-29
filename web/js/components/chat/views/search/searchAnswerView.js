/* ===========================
      Search Answer
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Backbone = require('backbone'),
    Models = require('components/chat/data/models'),
    MessageView = require('app/views/message'),
    // Object wrapper returned as a module
    SearchAnswerView;

SearchAnswerView = Backbone.View.extend({

  className: 'search-answer',
  model: Models.SearchAnswerModel,
  template: _.template( $('#search-answer').html() )
});

return SearchAnswerView;
});

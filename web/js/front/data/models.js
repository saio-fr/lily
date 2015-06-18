/* ===========================
       Faq Model
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    // Object wrapper returned as a module
    Models = {};

  Models.Faq = Backbone.Model.extend({});
  Models.Mail = Backbone.Model.extend({});
  Models.Content = Backbone.Model.extend({});
  Models.TopQuestions = Backbone.Model.extend({});
  Models.MessageUser = Backbone.Model.extend({});
  Models.Message = Backbone.Model.extend({});
  Models.ChatMessage = Backbone.Model.extend({});
  Models.ServerMessage = Backbone.Model.extend({});

  return Models;
});

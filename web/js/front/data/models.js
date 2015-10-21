/* ===========================
       Faq Model
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    // Object wrapper returned as a module
    Models = {};

  Models.Chat = Backbone.Model.extend({});
  Models.Faq = Backbone.Model.extend({});
  Models.Content = Backbone.Model.extend({});
  Models.AviEmptyView = Backbone.Model.extend({});
  Models.ChatEmptyView = Backbone.Model.extend({});
  Models.MessageUser = Backbone.Model.extend({});
  Models.Message = Backbone.Model.extend({});
  Models.ChatMessage = Backbone.Model.extend({});
  Models.ServerMessage = Backbone.Model.extend({});
  Models.Mail = Backbone.Model.extend({
    defaults: {
      isRedirectionTel: false
    }
  });

  return Models;
});

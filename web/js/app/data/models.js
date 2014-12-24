/* ===========================
       Faq Model
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      // Object wrapper returned as a module
      Models = {};

  Models.Faq              = Backbone.Model.extend({});
  Models.Mail             = Backbone.Model.extend({});
  Models.Content          = Backbone.Model.extend({});
  Models.TopQuestions     = Backbone.Model.extend({});
  Models.MessageUser      = Backbone.Model.extend({});
  Models.LilySimple       = Backbone.Model.extend({});
  Models.LilyRedirection  = Backbone.Model.extend({});
  Models.LilyPrecision    = Backbone.Model.extend({});
  Models.LilyNotation     = Backbone.Model.extend({});
  Models.LilyCompletion   = Backbone.Model.extend({});

  return Models;
});


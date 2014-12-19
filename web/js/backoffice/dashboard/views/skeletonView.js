/*========================================
      Redirection View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      g = require('globals'),
      UsageGraphModel = require('backoffice/dashboard/models/usage/graphModel'),
      UsageFooterModel = require('backoffice/dashboard/models/usage/footerModel'),
      UsageGraphView = require('backoffice/dashboard/views/usageGraphView'),
      ChatGraphModel = require('backoffice/dashboard/models/chat/graphModel'),
      ChatFooterModel = require('backoffice/dashboard/models/chat/footerModel'),
      ChatGraphView = require('backoffice/dashboard/views/chatGraphView'),
      UserLogCollection = require('backoffice/dashboard/collections/logCollection'),
      UserLogsView = require('backoffice/dashboard/views/logsView'),
      AviFrameView = require('backoffice/dashboard/views/aviFrameView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    initialize: function () {
      console.log(g.client);
      this.usage();
      if (g.client.chat) {
        this.chat();
      }
      if (g.client.avi) {
        this.avi();
      }
      this.logs();
    },
    
    usage: function () {
      var usageGraphModel = new UsageGraphModel();
      var usageFooterModel = new UsageFooterModel();
      var usageGraphView = new UsageGraphView({
        model: {
          graph: usageGraphModel,
          footer: usageFooterModel
        }
      });
    },
    
    chat: function () {
      var chatGraphModel = new ChatGraphModel();
      var chatFooterModel = new ChatFooterModel();
      var chatGraphView = new ChatGraphView({
        model: {
          graph: chatGraphModel,
          footer: chatFooterModel
        }
      });
    },
    
    avi: function () {
      var aviFrameView = new AviFrameView();
    },
    
    logs: function () {
      var userLogCollection = new UserLogCollection();
      userLogCollection.fetch().success(function () {
        var userLogsView = new UserLogsView({
          collection: userLogCollection
        })
      });
    }

  });

  return SkeletonView;
});


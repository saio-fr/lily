'use strict';

var fs = module.require('fs'),
    requirejs = require('requirejs');

var config = {

  baseUrl: 'web/js',
  mainConfigFile: 'web/js/common.js',
  dir:'web/build/js',

  modules: [

    //module names are relative to baseUrl/paths config
    {
      name: 'front/config',
      include: ['./front/main'],
    },

    {
      name: 'common',
      include: [
        'jquery',
        'underscore',
        'backbone',
        'autobahn',
        'when',
        'moment',
        'todoTpl',
        'bootstrap',
        'moment-fr',
        'Modernizr',
        'backoffice/app',
        'globals',
        'utils/backbone-childviewcontainer',
        'polyfils'
      ],
    },

    {
      name: 'components/chat/main',
      insertRequire: ['components/chat/main'],
      include: [
        'components/notifications/notifsCollectionView',
        'components/chat/data/collections',
        'components/chat/views/skeletonView',
        'backoffice/app',
        'moment'
      ],
      exclude: ['common']
    },

    {
      name: 'backoffice/chat/main',
      insertRequire:['backoffice/chat/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },

    {
      name: 'backoffice/config/main',
      insertRequire:['backoffice/config/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },

    {
      name: 'backoffice/dashboard/main',
      insertRequire:['backoffice/dashboard/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },

    {
      name: 'backoffice/faq/main',
      insertRequire:['backoffice/faq/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },

    {
      name: 'backoffice/knowledge/main',
      insertRequire:['backoffice/knowledge/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },

    {
      name: 'backoffice/profile/main',
      insertRequire:['backoffice/profile/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },

    {
      name: 'backoffice/redirection/main',
      insertRequire:['backoffice/redirection/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },

    {
      name: 'backoffice/statistics/main',
      insertRequire:['backoffice/statistics/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },

    {
      name: 'backoffice/users/main',
      insertRequire:['backoffice/users/main'],
      exclude: [
        'common',
        'components/chat/main'
      ]
    },
  ],

  fileExclusionRegExp: /^(\.|css|font|images|node_modules|facebook|ie|grunt|php)/,

  // wrap: true,
  wrapShim: true,
  useStrict: true,
  optimize: 'none',
  removeCombined: true,
  skipDirOptimize: true,

  // Important to get a define() wrapper around non module deps (ex: Modernizer, Snap.js)
  skipModuleInsertion: false,
  findNestedDependencies: true,
  preserveLicenseComments: true,

  onBuildWrite: function( name, path, contents ) {
    console.log( 'Writing: ' + name );
    return contents;
  },
};

requirejs.optimize(config, function (buildResponse) {
  console.log('\nproject built in ' + config.dir + ' :');
  console.log(buildResponse);
}, function(err) {
  console.log('\nerror creating build !');
  console.log(err);
});

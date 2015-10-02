'use strict';

var config = {};

config.baseConfig = {
  baseUrl: 'web/js',
  mainConfigFile: 'web/js/common.js',

  // wrap: true,
  wrapShim: true,
  useStrict: true,
  optimize: 'uglify2',
  locale: 'fr',
  removeCombined: true,
  skipDirOptimize: true,
  generateSourceMaps: true,

  // Important to get a define() wrapper around non module deps (ex: Modernizer, Snap.js)
  skipModuleincludeion: false,
  findNestedDependencies: true,
  preserveLicenseComments: false,

  paths: {
    'front/app': 'front/app.v1',
    'front/views/chat': 'front/views/chat.v1',
    'front/views/avi': 'front/views/avi.v1',
  }
};

config.commonIncludes = [
  'common',
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
];

config.chatIncludes = [
  'components/notifications/notifsCollectionView',
  'components/chat/data/collections',
  'components/chat/views/skeletonView',
  'backoffice/app',
  'moment'
];

config.excludeAll = config.commonIncludes.concat(config.chatIncludes);

config.configs = {

  front: {
    name: '../../node_modules/almond/almond',
    include: ['front/config', 'front/main.v1'],
    insertRequire: ['front/main.v1'],
    out: 'web/build/js/front/main.v1.js',
    // Don't include 'front/main', but keep its dependancies.
    // Will result in a transparent error in production for v1
    // since 'front/main' is required in config.js, and never resolved in the build.
    excludeShallow: ['front/main']
  },

  common: {
    name: '../../node_modules/almond/almond',
    out: 'web/build/js/common.js',
    include: config.commonIncludes
  },

  chatComp: {
    name: 'components/chat/main',
    out: 'web/build/js/chatComp.js',
    include: config.chatIncludes,
    exclude: config.commonIncludes
  },

  chat: {
    name: 'backoffice/chat/main',
    insertRequire:['backoffice/chat/main'],
    out: 'web/build/js/chat/main.js',
    exclude: config.excludeAll
  },

  config: {
    name: 'backoffice/config/main',
    insertRequire:['backoffice/config/main'],
    out: 'web/build/js/config/main.js',
    exclude: config.excludeAll
  },

  dashboard: {
    name: 'backoffice/dashboard/main',
    insertRequire:['backoffice/dashboard/main'],
    out: 'web/build/js/dashboard/main.js',
    exclude: config.excludeAll
  },

  knowledge: {
    name: 'backoffice/knowledge/main',
    insertRequire:['backoffice/knowledge/main'],
    out: 'web/build/js/knowledge/main.js',
    exclude: config.excludeAll
  },

  profile: {
    name: 'backoffice/profile/main',
    insertRequire:['backoffice/profile/main'],
    out: 'web/build/js/profile/main.js',
    exclude: config.excludeAll
  },

  users: {
    name: 'backoffice/users/main',
    insertRequire:['backoffice/users/main'],
    out: 'web/build/js/users/main.js',
    exclude: config.excludeAll
  },

  redirection: {
    name: 'backoffice/redirection/main',
    insertRequire:['backoffice/redirection/main'],
    out: 'web/build/js/redirection/main.js',
    exclude: config.excludeAll
  },

  statistics: {
    name: 'backoffice/statistics/main',
    insertRequire:['backoffice/statistics/main'],
    out: 'web/build/js/statistics/main.js',
    exclude: config.excludeAll
  },

  faq: {
    name: 'backoffice/faq/main',
    insertRequire:['backoffice/faq/main'],
    out: 'web/build/js/faq/main.js',
    exclude: config.excludeAll
  }
};

// Add baseConfig to each "module" config:
config.mix = function(target) {
  target = config.configs[target];

  for (var prop in config.baseConfig) {
    if (config.baseConfig.hasOwnProperty(prop)) {
      target[prop] = config.baseConfig[prop];
    }
  }

  return target;
};

module.exports = config;

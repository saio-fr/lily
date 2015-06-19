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
    include: ['front/config', './front/main'],
    insertRequire: ['./front/main'],
    out: 'web/js-build/front/main.js'
  },

  common: {
    name: '../../node_modules/almond/almond',
    out: 'web/js-build/common.js',
    include: config.commonIncludes
  },

  chatComp: {
    name: 'components/chat/main',
    out: 'web/js-build/chatComp.js',
    include: config.chatIncludes,
    exclude: config.commonIncludes
  },

  chat: {
    name: 'backoffice/chat/main',
    insertRequire:['backoffice/chat/main'],
    out: 'web/js-build/chat/main.js',
    exclude: config.excludeAll
  },

  config: {
    name: 'backoffice/config/main',
    insertRequire:['backoffice/config/main'],
    out: 'web/js-build/config/main.js',
    exclude: config.excludeAll
  },

  dashboard: {
    name: 'backoffice/dashboard/main',
    insertRequire:['backoffice/dashboard/main'],
    out: 'web/js-build/dashboard/main.js',
    exclude: config.excludeAll
  },

  knowledge: {
    name: 'backoffice/knowledge/main',
    insertRequire:['backoffice/knowledge/main'],
    out: 'web/js-build/knowledge/main.js',
    exclude: config.excludeAll
  },

  profile: {
    name: 'backoffice/profile/main',
    insertRequire:['backoffice/profile/main'],
    out: 'web/js-build/profile/main.js',
    exclude: config.excludeAll
  },

  users: {
    name: 'backoffice/users/main',
    insertRequire:['backoffice/users/main'],
    out: 'web/js-build/users/main.js',
    exclude: config.excludeAll
  },

  redirection: {
    name: 'backoffice/redirection/main',
    insertRequire:['backoffice/redirection/main'],
    out: 'web/js-build/redirection/main.js',
    exclude: config.excludeAll
  },

  statistics: {
    name: 'backoffice/statistics/main',
    insertRequire:['backoffice/statistics/main'],
    out: 'web/js-build/statistics/main.js',
    exclude: config.excludeAll
  },

  faq: {
    name: 'backoffice/faq/main',
    insertRequire:['backoffice/faq/main'],
    out: 'web/js-build/faq/main.js',
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

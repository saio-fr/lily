'use strict';

var fs = module.require('fs'),
		requirejs = require('requirejs');

var config = {

  appDir: 'web/js/',
	baseUrl: './',
	mainConfigFile: 'web/js/app/config.js',
  dir:'web/js/appBuild/',

  // name: '../../node_modules/almond/almond',
  // include: ['./app/main'],
  // insertRequire: ['./app/main'],

  modules: [{
    name: 'app/config',
    include: ['./app/main'],
    insertRequire: ['./app/main'],
  }],

	wrap: true,
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

  onModuleBundleComplete: function (data) {
    console.log(data);
  },
};

requirejs.optimize(config, function (buildResponse) {
}, function(err) {
	console.error(err);
});

'use strict';

var fs = module.require('fs'),
		requirejs = require('requirejs'),
		amdclean = module.require('amdclean');

var config = {

	baseUrl: 'web/js',
	mainConfigFile: 'web/js/app/config.js',

	name: '../../node_modules/almond/almond',
	include: ['./app/main'],
	insertRequire: ['./app/main'],

	out: 'web/js/build/appBuild.js',

	wrap: true,
	wrapShim: true,
	useStrict: true,
	optimize: 'uglify2',
	skipModuleInsertion: true,
	findNestedDependencies: true,
	preserveLicenseComments: true,

	onBuildWrite: function( name, path, contents ) {
		console.log( 'Writing: ' + name );
		return contents;
	},

	onModuleBundleComplete: function (data) {

	},
};

requirejs.optimize(config, function (buildResponse) {
	// var contents = fs.readFileSync(config.out, 'utf8');
}, function(err) {
	console.error(err);
});

/* ===========================
         	CONFIG MODEL
   ========================== */

define(function (require) {

	'use strict';

	// Require CommonJS like includes
	var Backbone = require('backbone'),

		// Object wrapper returned as a module
		ConfigModel;

	ConfigModel = Backbone.Model.extend({
		url: "/rest"
	});

	return ConfigModel;
});
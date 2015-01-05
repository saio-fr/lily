/* ===========================
         	CONFIG MODEL
   ========================== */

define(function (require) {

	'use strict';

	// Require CommonJS like includes
	var NestedModel = require('backbone-nested'),

		// Object wrapper returned as a module
		ConfigModel;

  ConfigModel = Backbone.NestedModel.extend({
		url: "/config"
  });

	return ConfigModel;
});
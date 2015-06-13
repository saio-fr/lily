require.config({
	baseUrl: '/js',
	waitSeconds: 20,

	paths: {
		'jquery':             'bower_components/jquery/dist/jquery',
		'underscore':         'bower_components/underscore/underscore-min',
		'backbone':           'bower_components/backbone/backbone',
		'autobahn':           'libs/autobahn-v1',
		'isMobile':           'bower_components/isMobile/isMobile.min',
		'Snap':               'bower_components/snapjs/snap.min',
		'Modernizr':          'libs/modernizr-custom',
		'when':               'libs/when',
		'FastClick':          'bower_components/fastclick/lib/fastclick',
		'synapse':            'libs/synapse-suggest',
		'typeahead':          'libs/typeahead.jquery',
		'bloodhound':         'libs/bloodhound'
	},

	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'autobahn': {
			deps: ['when'],
			exports: 'ab'
		},
		'Snap': {
			exports: 'Snap'
		},
		'Modernizr': {
			exports: 'Modernizr'
		},
		isMobile: {
			exports: 'isMobile'
		},
		'synapse': {
			deps: ['jquery', 'typeahead', 'bloodhound'],
			exports: 'SynapseSuggest'
		},
		'typeahead': {
			deps: ['jquery'],
			exports: 'typeahead'
		},
		'bloodhound': {
			deps: ['jquery'],
			exports: 'Bloodhound'
		}
	}
});

require(['app/main']);

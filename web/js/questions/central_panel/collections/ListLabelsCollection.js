lily.ListLabels = Backbone.Collection.extend({
	model: lily.Label,

	initialize: function () {
		this.add([
			{title: 'Important'},
			{title: 'A faire'}
		]);
	},
});


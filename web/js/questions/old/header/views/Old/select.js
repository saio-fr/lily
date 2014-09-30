lily.selectView = Backbone.View.extend ({
	el: '#select-menu',

	template: _.template( $('#select').html() ),

	render: function () {
		this.$el.append(this.template);
		return this;
	},

	initialize: function () {
		this.render();
	},

	events: {
		'click .select_all_questions': 'select_all_questions',
		'click .unselect_all_questions': 'unselect_all_questions',
	},

	select_all_questions: function () {
		//set all checkbox to check
		$('#list-questions').find('i').addClass('checked');
	},

	unselect_all_questions: function () {
		//set all checkbox to uncheck
		$('#list-questions').find('i').removeClass('checked');
	},

});
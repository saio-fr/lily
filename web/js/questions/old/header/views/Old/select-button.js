/*Create the button to select all questions, unselect all questions, questions with label 1, with label 2*/
lily.selectButtonView = lily.standardHeaderView.extend({
    template: _.template($('#select-questions').html()),

    events: {
    	'click .select-button': 'init_select_view',
    },

    init_select_view: function () {
    	if (typeof(SelectView) === 'undefined') {
    		SelectView = new lily.selectView();
    	}
    },
});
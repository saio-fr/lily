/*View to generate the button to filter the list of questions displayed*/

lily.filterView = lily.standardHeaderView.extend({
	// className:"filter-buttons",
    template: _.template($('#filter-questions').html()),
});
lily.labelView = lily.standardHeaderView.extend({
    template: _.template($('#labels-questions').html()),

    events: {
    	'click .label-button': 'init_label_collection',
    },

    init_label_collection: function () {
    	if(typeof(ListLabels) == 'undefined') {
    		ListLabels = new lily.listLabels;
    		ListLabelsView = new lily.listLabelsView(ListLabels);
    	}
    },
});
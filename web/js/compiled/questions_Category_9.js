/*Side left Menu*/
lily.Category = Backbone.Model.extend({
    initialize: function () {
        this.url = "/categories/" + this.id;
    },
	    label: function () {
        return this.get("title");
    }
});




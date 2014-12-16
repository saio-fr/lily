lily.CategoryChoosenView=Backbone.View.extend({
    model: lily.Category,
	el:'#wrapper-category-choosen',
    template: _.template($('#category-choosen').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },
	initialize:function(){
		this.render();
	},
	events:{
		'click .destroy-label':'destroy'
	},
	destroy:function(e){
		$(e.currentTarget).parent().remove();
		$('#category').removeClass('hide');
		$('#category').val($('#category').val($(e.currentTarget).attr('data-title')));
		$('#wrapper-category-choosen').addClass('hide');
	}
});


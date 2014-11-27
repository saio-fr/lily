lily.VersionView = Backbone.View.extend({
	model : lily.Question,
    tagName: 'li',
	className:'version-item',
    template: _.template($('#version-item').html()),
    render: function () {
        this.$el.html(this.template( this.model.toJSON() ));
        return this;
    },
	initialize:function(){},
	events:{
	'click':'displayFullVersion',
},
		displayFullVersion : function(){
		$('.wrapper-precision.active').removeClass('active');
		if(questionFullView.versionDetailView!==null){
			questionFullView.versionDetailView.remove();
		}
		questionFullView.versionDetailView=new lily.VersionDetailView({model:this.model});
		
		}
});
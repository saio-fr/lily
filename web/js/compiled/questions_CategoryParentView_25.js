lily.CategoryParentView=Backbone.View.extend({model:lily.Category,tagName:"li",template:_.template($("#category-parent").html()),render:function(){this.$el.html(this.template(this.model.toJSON()));return this},events:{"click .category-parent":"chooseCategory"},chooseCategory:function(e){$("#categoryParent").attr("data-id",this.model.id)}});
lily.QuestionPersonalView=Backbone.View.extend({tagName:"li",className:"list-group-item resume-question",template:_.template($("#question-item-list").html()),render:function(){this.$el.html(this.template(this.model.toJSON()));return this},initialize:function(){$(".wrapper-categories").width($("#question-content").width()-"30");$(window).resize(function(){$(".wrapper-categories").width($("#question-content").width()-"30")})},events:{"click i":"toogle_checkbox","click .wrapper-right-question":"displayQuestion"},toogle_checkbox:function(e){this.$el.find("i").toggleClass("checked");e.stopImmediatePropagation()},close:function(){this.unbind();this.remove()},displayQuestion:function(){var idModel=this.model.id;var idFragment=Backbone.history.fragment.replace(/^\D+/g,"");if(typeof questionFullView=="undefined"){app.navigate("personal-detail/"+idModel,{trigger:true})}else{app.navigate("personal",{trigger:true});questionFullView.unbind();questionFullView.$el.empty();questionFullView.$el.addClass("hide");delete questionFullView}}});
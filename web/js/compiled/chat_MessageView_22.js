chat.Views.Message=Backbone.View.extend({initialize:function(){this.model.on("change",this.render,this)},render:function(section){this.$el.html(this.template(this.model.toJSON()));this.$el.appendTo(section);date=moment(this.model.get("date")*1e3);$('<span class="date">'+date.format("hh:mm")+"</span>").appendTo(this.$el.find("p"));this.trigger("render");return this}});
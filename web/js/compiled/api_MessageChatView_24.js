lily.Views.MessageChatView=Backbone.View.extend({initialize:function(){this.model.on("change",this.render,this)},render:function(){this.$el.html(this.template(this.model.toJSON()));this.$el.appendTo("#chat-box-messages");$("#chat-box-messages:last-child").scrollTop(1e4);this.trigger("render");return this}});
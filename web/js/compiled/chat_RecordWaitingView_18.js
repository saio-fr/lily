chat.Views.RecordWaiting=Backbone.View.extend({tagName:"li",className:"list-record-item animated fadeInUp",template:_.template($("#record").html()),events:{click:"doChat"},initialize:function(){this.listenTo(this.model,"change:operator",this.update);this.listenTo(this.model,"change:closed",this.update);this.listenTo(this.model,"change:messages",this.status);this.listenTo(this.model,"urgent",this.urgent);this.listenTo(this.model,"remove",this.close);this.render()},render:function(){this.$el.html(this.template(this.model.toJSON()));this.$el.appendTo(".list-waiting");this.status();this.timers();return this},status:function(){if(this.model.get("messages").length<=0)return;if(this.model.get("messages")[this.model.get("messages").length-1].from=="visitor"){this.$el.find(".status").removeClass("answered").addClass("unanswered")}else{this.$el.find(".status").removeClass("unanswered").addClass("answered")}},timers:function(){chat.app.interval(this,"chat");chat.app.interval(this,"lastMsg")},urgent:function(){this.$el.find(".status").addClass("urgent")},close:function(){this.remove();chat.app.live.counter.waiting-=1;$(".header-waiting span").html(chat.app.live.counter.waiting)},doChat:function(){that=this;sess.call("chat/set_operator",{sid:this.model.get("id")}).then(function(result){if(chat.app.windows.length<chat.app.maxWindows){chat.app.windows.unshift(new chat.Views.Conversation({model:that.model}));chat.app.trigger("change:windows")}else{chat.app.windows[chat.app.windows.length-1].model.trigger("minus");chat.app.windows.unshift(new chat.Views.Conversation({model:that.model}));chat.app.trigger("change:windows")}that.remove()},function(error){})},update:function(){if(this.model.get("operator")!==null)this.remove();if(this.model.get("closed"))this.remove()}});
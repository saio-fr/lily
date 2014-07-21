chat.Views.RecordWaiting=Backbone.View.extend({tagName:"li",className:"list-record-item animated fadeInUp",template:_.template($("#record").html()),events:{click:"doChat"},initialize:function(){this.listenTo(this.model,"change:messages",this.status);this.listenTo(this.model,"urgent",this.urgent);this.render()},render:function(){this.$el.html(this.template(this.model.toJSON()));this.$el.appendTo(".list-waiting");this.status();this.timers();return this},status:function(){if(this.model.get("messages").length<=0)return;if(this.model.get("messages")[this.model.get("messages").length-1].from=="visitor"){this.$el.find(".status").removeClass("answered").addClass("unanswered")}else{this.$el.find(".status").removeClass("unanswered").addClass("answered")}},timers:function(){chat.app.interval(this,"chat");chat.app.interval(this,"lastMsg")},urgent:function(){this.$el.find(".status").addClass("urgent")},doChat:function(){that=this;sess.call("chat/set_operator",{sid:this.model.get("id")}).then(function(result){that.remove();chat.app.live.counter.waiting-=1;$(".header-waiting span").html(chat.app.live.counter.waiting);if(chat.app.windows.length<chat.app.maxWindows){chat.app.windows.unshift(new chat.Views.Conversation({model:that.model}));chat.app.trigger("change:windows")}else{chat.app.windows[chat.app.windows.length-1].model.trigger("minus");chat.app.windows[chat.app.windows.length-1].remove();chat.app.windows.pop();chat.app.windows.unshift(new chat.Views.Conversation({model:that.model}));chat.app.trigger("change:windows")}},function(error){})}});
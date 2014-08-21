chat.Views.RecordCurrent=Backbone.View.extend({tagName:"li",className:"list-record-item animated fadeInUp",template:_.template($("#record").html()),events:{click:"doChat"},initialize:function(){this.listenTo(this.model,"change:messages",this.status);this.listenTo(this.model,"change:messages",chat.app.changeBadge);this.listenTo(this.model,"change:operator",this.close);this.listenTo(this.model,"change:closed",this.remove);this.listenTo(this.model,"change:banned",this.remove);this.listenTo(this.model,"unactive",this.unactive);this.listenTo(this.model,"active",this.active);this.listenTo(this.model,"urgent",this.urgent);this.listenTo(this.model,"remove",this.close);this.render()},render:function(){this.$el.html(this.template(this.model.toJSON()));this.$el.appendTo(".list-current");this.timers();this.status();this.model.trigger("render");return this},status:function(){if(this.model.get("messages").length<=0)return;if(this.model.get("messages")[this.model.get("messages").length-1].from=="visitor"){this.$el.find(".status").removeClass("answered").addClass("unanswered")}else{this.$el.find(".status").removeClass("unanswered urgent").addClass("answered")}},timers:function(){chat.app.interval(this,"chat");chat.app.interval(this,"lastMsg")},active:function(){this.$el.addClass("active")},unactive:function(){this.$el.removeClass("active")},urgent:function(){this.$el.find(".status").addClass("urgent")},close:function(){this.remove();chat.app.live.counter.current-=1;$(".header-current span").html(chat.app.live.counter.current)},doChat:function(){var that=this;if(this.$el.hasClass("active")&&chat.app.windows.length<=1){return}if(this.$el.hasClass("active")){$.each(chat.app.windows,function(index,value){if(value.model.id==that.model.get("id")){value.remove();chat.app.windows.splice(index,1);chat.app.windows.unshift(new chat.Views.Conversation({model:that.model}));chat.app.trigger("change:windows");return}});return}if(chat.app.windows.length<chat.app.maxWindows){chat.app.windows.unshift(new chat.Views.Conversation({model:this.model}));chat.app.trigger("change:windows")}else{chat.app.windows[chat.app.windows.length-1].model.trigger("minus");chat.app.windows.unshift(new chat.Views.Conversation({model:this.model}));chat.app.trigger("change:windows")}}});
lily.User=Backbone.Model.extend({getRolesHuman:function(roles){var roles=this.get("roles");if(typeof roles==="undefined")return"";var role_human="";if(roles.indexOf("ROLE_ADMIN")!==-1)role_human="Administrateur";else{if(roles.indexOf("ROLE_CHAT_OPERATOR")!==-1){role_human+="Opérateur Live chat"}if(roles.indexOf("ROLE_KNOWLEDGE_OPERATOR")!==-1){role_human+=role_human===""?"Opérateur ":" et ";role_human+="Base de connaissance"}}return role_human},getLastLoginHuman:function(){var last_login=this.get("last_login");if(typeof last_login!=="undefined"&&last_login!=null&&last_login.toUpperCase()!="NULL"){var d=new Date(last_login);return"Dernière connexion le "+(d.getDate()<10?"0":"")+d.getDate()+"/"+(d.getMonth()<9?"0":"")+(d.getMonth()+1)+"/"+(d.getYear()-100)}else{return"Jamais connecté"}},toJSONWithComputedValues:function(){var data=this.toJSON();data.last_login_human=this.getLastLoginHuman();data.roles_human=this.getRolesHuman();return data}});lily.ListUser=Backbone.Collection.extend({model:lily.User,sortCriteria:"lastname",comparator:function(item){if(this.sortCriteria==="lastname"){return item.get("lastname")}else if(this.sortCriteria==="roles"){var roles=item.get("roles");var rolesInt=0;if(roles.indexOf("ROLE_ADMIN")!==-1)rolesInt+=4;if(roles.indexOf("ROLE_KNOWLEDGE_OPERATOR")!==-1)rolesInt+=2;if(roles.indexOf("ROLE_CHAT_OPERATOR")!==-1)rolesInt+=1;return-rolesInt}else if(this.sortCriteria==="services"){return item.get("services").join("/")}else if(this.sortCriteria==="last_login"){if(item.get("last_login")!==null){last_login=new Date(item.get("last_login"));last_login=-last_login.getTime();return last_login}else return Infinity}else{if(this.sortCriteria!=="id")console.warn("Sort criteria not recognized");return item.get("id")||"0"}return a}});lily.UserView=Backbone.View.extend({tagName:"li",className:"list-group-item hover",template:_.template($("#user").html()),setModel:function(model){if(this.model!==model){this.model=model;this.listenTo(this.model,"select",this.select);this.listenTo(this.model,"render",this.render);this.render()}return this},render:function(){this.$el.html(this.template(this.model.toJSONWithComputedValues()));return this},events:{"click .view":"select"},select:function(e){e.preventDefault();e.stopPropagation();$("#statistics-row .selected").removeClass("selected");this.$el.addClass("selected")}});lily.ListUserView=Backbone.View.extend({el:"#statistics-row",initialize:function(listUser){this.collection=listUser;this.listenTo(listUser,"add",this.add);this.listenTo(listUser,"sort",this.updateView);this.render()},render:function(){if($(document).find(this.$el).length==0){this.$el=$(this.__proto__.el);this.delegateEvents()}this.$el.empty();this.collection.each(this.add,this);return this},add:function(user){var view=new lily.UserView;view.setModel(user);this.$el.append(view.render().el);return this},updateView:function(){this.$el.empty();this.render();return this}});lily.UsersView=Backbone.View.extend({el:"#statistics-row",template:_.template($("#user-app").html()),events:{"click #sortMenu li":"changeSortCriteria"},initialize:function(){this.render();this.users=new lily.ListUser;this.users.url="/../users/rest/";this.users.fetch();this.usersView=new lily.ListUserView(this.users)},render:function(){if($(document).find(this.$el).length==0){this.$el=$(this.__proto__.el);this.delegateEvents()}this.$el.removeClass("hide");this.$el.append(this.template());return this},changeSortCriteria:function(e){var target=$(e.target);if(target.data("criteria")!==undefined){listUser.sortCriteria=target.data("criteria");target.parent().find(".active").removeClass("active");target.addClass("active");listUser.sort();listUserView.updateView()}return this},remove:function(){this.$el.empty();this.$el.unbind();return this}});
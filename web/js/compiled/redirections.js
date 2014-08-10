/*Script main pour la page redirections*/
$.ajaxPrefilter(function (options) {
    options.url = root + options.url;
});
var lily = lily || {};

/*================================
Model 
====================================*/

lily.Redirection = Backbone.Model.extend({

    initialize: function () {
        this.urlRoot = "/rest";
        idAttribute  : "id";
    },
    cancel: function() {
    	this.trigger('cancelled', this);
	},
	
});


/*======================================
Collection
=======================================*/

lily.Redirections = Backbone.Collection.extend({
    model: lily.Redirection,
    url: "/rest",

    initialize: function () {}
});

/*======================================
Redirection View
=========================================*/

lily.RedirectionView = Backbone.View.extend({
    model: lily.Redirection,
    tagName: 'li',
    className: 'list-group-item animated bounceInLeft padder-xl',
    template: _.template($('#redirectionsList').html()),
    initialize: function() {
      this.listenTo(this.model, 'select', this.select);
      this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));

        if (this.model.get('bydefault') === true) {
	        this.$el.find('.icon-sign-blank').removeClass('icon-sign-blank').addClass('icon-check-sign default');
        }
        
        return this;
    },
    events: {
        'click .icon-remove': 'todelete',
        'click span' : 'select',
        'click .icon-sign-blank' : 'selectdefault',
    },
    select: function() {

      if (window.editView) window.editView.close();
      window.editView = new lily.RedirectionEditView(this.model);
      
      this.$el.parent().find('.active').removeClass('active');
      this.$el.addClass('active');
      
    },
    selectdefault: function() {
        
        if (this.model.get('bydefault') == false) {
        
	        this.$el.find('.icon-sign-blank').removeClass('icon-sign-blank').addClass('icon-check-sign default');
	        var active = list.where({ bydefault: true });
	        active[0].set({ 'bydefault': false });
	        active[0].save();
	        
	        this.model.set({ 'bydefault': true });
	        this.model.save(); 
        
        }
        
    },
    todelete: function () {

		if (this.model.get('bydefault') == true) {
			$('#default-redirection-delete').modal();
			return false;
		}
        list.remove(this.model); 
        this.remove(); 

        this.model.destroy();

    },
});

/*========================================
Redirection List View
=========================================*/

lily.RedirectionsListView = Backbone.View.extend({
    el: '#redirection',
    initialize: function (redirectionsList) {
        this.collection = redirectionsList;
        this.render();
    },

    render: function () {
        this.collection.each(function (item) {
            this.show(item);
        }, this);

    },
    events: {
        'click #redirection-new': 'add',
    },
    show: function (item) {
        var redirectionView = new lily.RedirectionView({
            model: item
        });
        this.$el.find('#redirections-list').append(redirectionView.render().el);
    },
    add: function () {

		redirection = this.collection.create({"title":"Nouvelle redirection", "frequency": 0, "phone":"+33 4 00 00 00 00", "mail":"Email@exemple.com", "object":"Objet du mail"},{wait:true});
		
		this.show(redirection);
    
    },
});


/*========================================
Redirection Edit
=========================================*/

lily.RedirectionEditView = Backbone.View.extend({

    model: lily.Redirection,
    el: '#redirection-edit',
    template: _.template($('#redirectionEdit').html()),
    initialize: function (redirection) {
    	this.$el.removeClass('hide');
        this.model = redirection;
        this.render();
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.close);
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .button-update': 'update',
        'click .button-cancel': 'cancel',
    },
    update: function () {
        
        var title = $(this.el).find('#title').val();
        var object = $(this.el).find('#object').val();
        var phone = $(this.el).find('#phone').val();
        var mail = $(this.el).find('#mail').val();
        
        this.model.set({'title': title, 'object': object, 'phone': phone, 'mail': mail});     
           
        this.model.save();
        
        this.close();


    },
    cancel: function () {

        this.model.cancel();
        this.close();
        $(this.el).addClass('hide');
        $('#list-redirections .active').removeClass('active');
     		
    },
    close: function () {
      this.$el.unbind();
      this.$el.empty();
      this.$el.addClass('hide');
    }

});


$(function () {


    list = new lily.Redirections;

    list.fetch({
        success: function () {
            initialView = new lily.RedirectionsListView(list);
        }

	}); 
}); 
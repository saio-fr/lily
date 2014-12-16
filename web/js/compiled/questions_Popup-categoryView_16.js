/******************************************************************
Wrapper Popup Categorie
*********************************************************************/
lily.PopupCategoryView = Backbone.View.extend({
    model: lily.Category,
    el: '#popup-categorie',
	idRedirectionByDefault:null,
    template: _.template($('#creation-category').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {
        var modelDisplayed = this.model;
        this.render();

        /*Creation Squares of color to representate categories*/
        new lily.ListSquaresColoredView();
        $('.' + this.model.get('color')).addClass('active');
        /*Creation list of redirections*/

		new lily.ListRedirectionsView(app.listRedirections);
		if ((typeof (modelDisplayed.get('redirection')) !== 'undefined')&&(modelDisplayed.get('redirection')!==null)) {
			$('.liste-redirection.' + modelDisplayed.get('redirection').id).parent().addClass('active');
         } 
		 app.listRedirections.each(function(item){
			if(item.get('bydefault')==true){
				this.idRedirectionByDefault=item.get('id');
		}
		 });
		/*Creation list categories*/

			var listCategoriesParentsView = new lily.ListCategoriesParentsView(app.listCategories);
		this.$el.removeClass('hide');

    },
    events: {
        'click .saveCategory ': 'saveCategory',
        'click .cancelCategory': 'hidePopup',
        'click .updateCategory': 'updateCategory',
		'click .deleteCategory' : 'deleteCategory',
    },
    saveCategory: function (e) {
	console.log('saveCategory');
		if($('#title-category').val().length>0){
			this.model.set({title:$('#title-category').val()});
		} else {
			this.model.set({title:'Nouvelle Catégorie'});
		}
		if(typeof($('#list-squares-colored').find('.square-colored.active').attr('data-color'))=='undefined'){
			var categoryColor = 'ee5a5a';
		} else {
			var categoryColor = $('#list-squares-colored').find('.square-colored.active').attr('data-color');
		}
		this.model.set({color:categoryColor});
		// régler le cas de pas de redirection choisie
		// if(typeof($('#redirectionToSave').attr('data-id'))!=='undefined'){
			// var idRedirectionToSave= $('#redirectionToSave').attr('data-id');
		// } else {
			// var idRedirectionToSave= this.idRedirectionByDefault;
		// }
		var idCategoryParent = $('#categoryParent').attr('data-id');
		this.model.url="/categories/create/NULL/"+idCategoryParent;
		Backbone.sync('create',this.model);
        // e.stopImmediatePropagation();
    },
    hidePopup: function (e) {
        this.undelegateEvents();
		this.$el.empty();
		this.$el.addClass('hide');
    },
    updateCategory: function (e) {	
	this.model.set({title:$('#title-category').val()});
	this.model.set({color:$('#list-squares-colored').find('.square-colored.active').attr('data-color')});
	var idParent = $('#categoryParent').attr('data-id');
	var idRedirection = $('#redirectionToSave').attr('data-id')
	this.model.url="/categories/update/"+this.model.id+"/"+idParent+"/"+idRedirection;
	Backbone.sync('update',this.model);
    },
	deleteCategory:function(e){
	console.log('deleteCategory');
		var categoryToDelete = new lily.Category;
		categoryToDelete.url="/categories/delete/"+this.model.id;
		Backbone.sync('delete', categoryToDelete);
		this.hidePopup();
		 
	}
});

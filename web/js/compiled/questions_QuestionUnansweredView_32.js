lily.QuestionUnansweredView = Backbone.View.extend({

    tagName: 'li',


    className: 'list-group-item resume-question',
    

    template: _.template($('#question-item-list').html()),
    

    render: function () {
        this.$el.html(this.template( this.model.toJSON() ));
        return this;
    },
    
    
    events: {
        'click i': 'toogle_checkbox',
		'click .wrapper-right-question':'displayQuestion',
    },

    
    toogle_checkbox: function (e) {
        this.$el.find('i').toggleClass('checked'); //add or remove a class "checked" for the css
        e.stopImmediatePropagation();
    },


    close: function () {
        this.unbind();
        this.remove();
    },
	displayQuestion:function(){
		var idModel = this.model.id;
		var idFragment = Backbone.history.fragment.replace( /^\D+/g, '');
		if(idModel==idFragment){
		console.log('1');
			questionFullView.closePanelRight();
			app.navigate('unanswered',{trigger:true});
		} else {

			app.navigate('unanswered-detail/'+idModel,{trigger:true});	
		}	

	}
  
});




















/***********************
View Question unanswered in item list
***********************/
// lily.QuestionUnansweredView = Backbone.View.extend({
    // model: lily.Question,
    // tagName: 'li',
    // className: 'list-group-item animated  resume-question',
    // template: _.template($('#question-unanswered-item-list').html()),
    // render: function () {
        // this.$el.html(this.template(this.model.toJSON()));
        // return this;
    // },
    // events: {
        // 'click .question-delete': 'deleteQuestionUnanswered',
        // 'click .question-show': 'showQuestionUnanswered',
    // },

    // /*Display full Question*/
    // showQuestionUnanswered: function () {
        // $('#question-content').removeClass('show');
        // $('#question-content').children().remove();
        // $('.resume-question').removeClass('active');
        // this.$el.addClass('active');
        // $('#question-content').removeClass('show');
        // if (idQuestionDisplay != this.model.get('id')) {
            // $('#question-content-existant').remove();
            // idQuestionDisplay = this.model.id;
            // if (this.model.get('category') != null) {
                // idCategory = this.model.get('category').id;
            // } else {
                // idCategory = 'NULL'
            // }
            // modelDisplay = new lily.Question;
            // modelDisplay.url = '/unanswered/get/' + idQuestionDisplay;
            // modelDisplay.fetch({
                // async: false
            // });
            // listCategories = new lily.listCategories;
            // listCategories.url = "/categorys/get";
            // listCategories.fetch({
                // async: false
            // });
            // new lily.QuestionFullView({
                // model: modelDisplay
            // });
        // } else {
            // idQuestionDisplay = 0;
            // $('#question-content-existant').remove();
            // $('#question-content').addClass('hide');
            // $('#question-content').removeClass('show');
            // $('.resume-question').removeClass('active')
        // }


    // },

    /*Delete question*/
    // deleteQuestionUnanswered: function () {

        /*========================================
FOnction suppression de la question OK
// =========================================*/
        // if (confirm('Êtes-vous sur de vouloir supprimer ce contenu ?')) {
            /*Faire une confirmation pour la suppression des questions*/
            // listQuestionsUnanswered.remove(this.model); /*Suppression du modèle de la collection*/
            // this.remove(); /*Suppression de la vue*/
            /*Supprimer l'affichage d'une question pour Backbone*/

            // this.model.url = '/unanswered/delete/' + this.model.id; /*On change l'url sur laquelle on va faire un DELETE*/
            /*On supprime le modèle en base*/
            // this.model.destroy();
            // idQuestionDisplay = 0;
            /*Faire la mise à jour du nombre de questions*/

        // }
        // $('#nombre-questions').children().remove();
        // new lily.meterView();
    // },

// });
// lily.QuestionPersonalView = Backbone.View.extend({
    // model: lily.Question,
    // tagName: 'li',
    // className: 'list-group-item animated resume-question',
    // template: _.template($('#question-personal-item-list').html()),
    // render: function () {
        // this.$el.html(this.template(this.model.toJSON()));
        // return this;
    // },
    // events: {
        // 'click .question-delete': 'deleteQuestionPersonal',
        // 'click .question-show': 'showQuestionPersonal',
    // },

    // /*Display full Question*/
    // showQuestionPersonal: function () {
        // console.log('showQuestionPersonal');
        // $('#question-content').removeClass('show');
        // $('#question-content').children().remove();
        // $('.resume-question').removeClass('active');
        // this.$el.addClass('active');
        // $('#question-content').removeClass('show');
        // if (idQuestionPersonalDisplay != this.model.get('id')) {
            // $('#question-content-existant').remove();
            // idQuestionPersonalDisplay = this.model.id;

            // modelDisplay = new lily.Question;
            // modelDisplay.url = '/personal/get/' + idQuestionPersonalDisplay;
            // modelDisplay.fetch({
                // async: false
            // });

            // new lily.QuestionPersonalFullView({
                // model: modelDisplay
            // });
        // } else {
            // idQuestionPersonalDisplay = 0;
            // $('#question-content-existant').remove();
            // $('#question-content').addClass('hide');
            // $('#question-content').removeClass('show');
            // $('.resume-question').removeClass('active')
        // }


    // },

    // /*Delete question*/
    // deleteQuestionPersonal: function () {

        // /*========================================
// FOnction suppression de la question OK
// =========================================*/
        // if (confirm('Êtes-vous sur de vouloir supprimer ce contenu ?')) {
            // /*Faire une confirmation pour la suppression des questions*/
            // listQuestionsUnanswered.remove(this.model); /*Suppression du modèle de la collection*/
            // this.remove(); /*Suppression de la vue*/
            // /*Supprimer l'affichage d'une question pour Backbone*/

            // this.model.url = '/personal/delete/' + this.model.id; /*On change l'url sur laquelle on va faire un DELETE*/
            // /*On supprime le modèle en base*/
            // this.model.destroy();
            // idQuestionDisplay = 0;
            // /*Faire la mise à jour du nombre de questions*/

        // }
        // $('#nombre-questions').children().remove();
        // new lily.meterView();
    // },

// });

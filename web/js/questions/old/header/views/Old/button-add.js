lily.buttonAddView = lily.standardHeaderViewTop.extend({
    template: _.template($('#add-question').html()),

    events: {
        'click #button-add-question': 'displayFullQuestion'
    },
    displayFullQuestion: function (e) {
	console.log('fragment');
	console.log(Backbone.history.fragment);
	/*FAIRE UNE REGEX SUR LE PARAGRAPHHE SUIVANT LES IF*/
	// if(Backbone.history.fragment.search('business')>0){
	// console.log('business');
	// app.navigate('business',{trigger:true});	
	// } else if(Backbone.history.fragment.search('personal')>0){
	// console.log('personal');
	// app.navigate('personal',{trigger:true});	
	// } else if(Backbone.history.fragment.search('unanswered')>0){
	// app.navigate('unanswered',{trigger:true});	
	// console.log('unanswered');
	// } else {
	// console.log('autre');
	// }
        console.log('displayFullQuestion');
        if ($('#question-content').children().length == 0) { //If right panel not displayed
          new lily.QuestionFullView({
                model: new lily.Question
            });
            e.stopImmediatePropagation();
        } else if (($('#question-content').children().length > 0) && ($('#contenant-questions-enfants').children('li').attr('data-id') == 0)) { //Right panel display already a new question
            $('#question-content').children().remove();
            $('#question-content').addClass('hide');

        } else { //Display an question already ewisting
            idQuestionDisplay = 0;
            $('.resume-question.active').removeClass('active');
            $('#question-content').children().remove();
            new lily.QuestionPersonalFullView({
                model: new lily.Question
            });
            e.stopImmediatePropagation();
        }
    }
});

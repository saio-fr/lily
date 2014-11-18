/*************************************
View the full personal question on the right side panel
*************************************/
lily.QuestionPersonalFullView = Backbone.View.extend({
    model: lily.Question,


    // el: '#question-content',

    template: _.template($('#full-personal-question').html()),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function() {
        this.render();


		$('#question-content').prepend(this.el);
		$('#question-content').removeClass('hide');
		this.$el.find('.list-moods').addClass('active');

		if(typeof(this.model.get('mood')=='undefined')){
			$('.select-mood').find('i').attr("class","lily-icon icon-neutral");
		} else {
		$('.select-mood').find('i').attr("class","lily-icon icon-"+this.model.get('mood'))
		}
		$('.select-mood').find('i').attr("data-name",this.model.get('mood'))
        // $('#question-content').removeClass('hide');
        new lily.ListMoodsView();
		var answer = new lily.Question;
		answer.set({title:this.model.get('answer')});
		new lily.AnswerView({model:answer});


    	/*************************************
	Needed to display in fixed position the input    
	 *************************************/
	 // $('.wrapper-categories').offset({left:($('#question-content').offset().left+'15')}) 
	$('.wrapper-categories').width($('#question-content').width()-'30');
	$( window ).resize(function(){
	 $('.wrapper-categories').width($('#question-content').width()-'30');
	 });
    /*yes, i am ashamed to do this like that*/
	},


    events: {
        'click .button-update': 'update',
        'click .button-cancel': 'cancel',
        'click .button-add-personal-answer': 'addAnswer',
        'click .button-save': 'save',
		'click .button-delete':'deleteQuestion',
    },
	deleteQuestion:function(){
		var modelToDelete = new lily.Question;
		modelToDelete.url="/personal/delete/"+questionFullView.model.id;
		Backbone.sync('delete',modelToDelete);
		questionFullView.cancel();
		app.navigate('personal',{trigger:true});
	
	},
    cancel: function() {
		questionFullView.stopListening();
		questionFullView.$el.empty();
		questionFullView.$el.addClass('hide');
		delete questionFullView;
		
		
    },
    update: function(e) {
        var questionPersonal = new lily.Question;
        // console.log('idQuestionPersonalDisplay ' + idQuestionPersonalDisplay);
        questionPersonal.url = "/personal/update/" + this.model.id;
        questionPersonal.set({
            title: $('.question-parent').val()
        });
        questionPersonal.set({
            answer: $('#wrapper-tree-answers').find('textarea').val()
        });
		var moodChoosen = $('.select-mood').children('i.lily-icon').attr('data-name')
        questionPersonal.set({
            mood: moodChoosen
        });
        Backbone.sync('update', questionPersonal);
		this.cancel();
		app.navigate('personal',{trigger:true});
        
    },
    addAnswer: function() {
        if ($('#questions-enfants').children().length == '0') {
            new lily.AnswerView({
                model: new lily.Question
            });
        }
    },
    save: function(e) {
        var questionPersonal = new lily.Question;
        questionPersonal.url = "/personal/create";
        questionPersonal.set({
            title: $('.question-parent').val()
        });
        questionPersonal.set({
            answer: $('#questions-enfants').find('textarea').val()
        });
        if (questionPersonal.get('answer') == null) {
            questionPersonal.set({
                answer: "Pas de réponse enregitrée"
            });
            // alert('Attention, vous n\'avez pas rentré de réponse pour cette question personnelle');
        }
		var moodChoosen =$('.select-mood').find('i.lily-icon').attr('data-name');
		questionPersonal.set({
            mood: moodChoosen
        });
        questionPersonal.save(null, {async:false});
		questionFullView.stopListening();
		questionFullView.$el.empty();
		questionFullView.$el.addClass('hide');
		delete questionFullView;
		/*Refresh the list personal list Questions*/
    }

});
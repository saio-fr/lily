lily.RemoveLabelView = Backbone.View.extend ({
	template: _.template ( $('#remove-label-template').html() ),

	render: function () {
		this.$el.html(this.template);
		return this;
	},

	events: {
		'click .remove_label': 'remove_label_from_select_questions',
	},

	remove_label_from_select_questions: function () {
		//only look at the displayed collection by checking Backbone.history.fragment
		
		//Business questions
		if(/business/i.test(Backbone.history.fragment)) {
			//we check if a 'checked' class is present in the right <i> in questions templates

			var arrayI = $('#list-questions i');

			var i = 0;
			_.each(listQuestionsBusiness, function () {
				if(arrayI.eq(i).hasClass('checked')) {
					var question = listQuestionsBusiness.models[i];
					question.set({label: ''});
					
					if (question.get('category') === null) {
							question.url = "/update/" + question.id + "/NULL/" + "NULL";
					}
					else {
						question.url = "/update/" + question.id + "/NULL/" + question.get('category').id;
					}
					question.save();

				}
				i++;
			});
		}
		//personal questions
		else if (/personal/i.test(Backbone.history.fragment)) {
			//we check if a 'checked' class is present in the right <i> in questions templates

			var arrayI = $('#list-questions i');

			var i = 0;
			_.each(listQuestionsPersonal, function () {
				if(arrayI.eq(i).hasClass('checked')) {
					var question = listQuestionsPersonal.models[i];
					question.set({label: ''});
					question.url = "/personal/update/" + question.id;
					question.save();
				}
				i++;
			});
		}
		//unanswered questions
		else if (/unanswered/i.test(Backbone.history.fragment)) {
			/*listQuestionsUnanswered.each(function (question) {
				if(question.get('checkbox') === true) {
					question.set({label: that.model.get('title')});
					question.url = ;
					question.save();
				}
			});*/
		}
		//All types of questions
		else if (Backbone.history.fragment === '') {
			//we check if a 'checked' class is present in the right <i> in questions templates

			var arrayI = $('#list-questions i');

			var i = 0;

			_.each(listQuestions, function () {
				if(arrayI.eq(i).hasClass('checked')) {
					
					var question = listQuestions.models[i];
					question.set({label: ''});
					
					//test about the type of question
					if (question.get('type') === 'business') {
						if (question.get('category') === null) {
							question.url = "/update/" + question.id + "/NULL/" + "NULL";
						}
						else {
							question.url = "/update/" + question.id + "/NULL/" + question.get('category').id;
						}
					}
					//else, it's a personal question
					else {
						question.url = "/personal/update/" + question.id;
					}
					question.save();
				}
				i++;
			});
		}
		
	},

})
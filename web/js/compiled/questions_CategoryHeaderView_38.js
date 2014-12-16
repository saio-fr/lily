lily.CategoryHeaderView = Backbone.View.extend ({
		
	tagName: 'li',


	events: {
		'click': 'change_category_of_select_questions',
	},

	
	render: function () {
		this.$el.html( this.model.get('title') );

		return this;
	},


	change_category_of_select_questions: function () {
		
		//To  determine if a question is checked or not, we look if a 'chacked' class is present on 'i' element in the questions
		var arrayI = $('#list-questions i');

		var that = this;
		var doWeHaveToRefreshTheQuestions = false;

		var i = 0;
		_.each(app.listQuestionsView.collection, function () {
			
			if(arrayI.eq(i).hasClass('checked')) {

				var question = app.listQuestionsView.collection.models[i];

				question.url = "/update/" + question.id + "/NULL/" + that.model.id;

				question.save(null,{async:false});

				doWeHaveToRefreshTheQuestions = true;

			}

			i++;
		
		});

		if (doWeHaveToRefreshTheQuestions === true) {
			app.postRequest.trigger('refresh');
		}

	},


	close: function () {
		this.unbind();
		this.remove();
	},

});

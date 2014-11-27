lily.LabelView = Backbone.View.extend ({
	
	tagName: 'li',

	
	tpl: _.template( $('#label-questions').html() ),

	
	render: function () {
		this.$el.html(this.tpl( this.model.toJSON() ) );

		return this;
	},

	
	events: {
		'click .label-item': 'add_label'
	},

	
	add_label: function () {
		// //We check the Backbone.fragment.history to put the good url and save the modifications in the right place

		// var that = this;
		
		// //Business questions
		// if(Backbone.history.fragment === '' || /business/i.test(Backbone.history.fragment)) {
		// 	//we check if a 'checked' class is present in the right <i> in questions templates

		// 	var arrayI = $('#list-questions i');

		// 	var i = 0;
		// 	_.each(app.listQuestionsView.collection, function () {
		// 		if(arrayI.eq(i).hasClass('checked')) {
					
		// 			var question = app.listQuestionsView.collection.models[i];
					
		// 			//get the tag array from question model
		// 			var arrayTagOfQuestionModel = question.get('tag');
		// 			var arrayTagOfQuestionModelSize = arrayTagOfQuestionModel.length;
					
					
		// 			//If there is no tag on the question
		// 			if (arrayTagOfQuestionModelSize === 0) {
						
		// 				//Adding the tag to the array
		// 				arrayTagOfQuestionModel.push( that.model.get('title') );
					
		// 			}
		// 			//else we check if the tag is already on the question to add it if it is not and to remove it if it is					
		// 			else {

		// 				var tag = that.model.get('title');
		// 				var positionInArray = $.inArray(tag, arrayTagOfQuestionModel);

		// 				//the tag is not present
		// 				if (positionInArray === -1) {
		// 					//Adding the tag to the array
		// 					arrayTagOfQuestionModel.push( that.model.get('title') );
		// 				}
		// 				else {
		// 					//removing the tag in the array
		// 					arrayTagOfQuestionModel.splice(positionInArray, 1);
		// 				}

		// 			}


		// 			//Setting the good question.url to save the Question model
		// 			if (question.get('category') === null) {
		// 					question.url = "/update/" + question.id + "/NULL/" + "NULL";
		// 			}
		// 			else {
		// 				question.url = "/update/" + question.id + "/NULL/" + question.get('category').id;
		// 			}
		// 			question.save();	
		// 			//ALternative 
		// 			//Backbone.sync('update',question);
				
		// 		}
				
		// 		i++;
		// 	});
		// }
		// //personal questions
		// else if (/personal/i.test(Backbone.history.fragment)) {
		// 	//we check if a 'checked' class is present in the right <i> in questions templates

		// 	/*var arrayI = $('#list-questions i');

		// 	var i = 0;
		// 	_.each(app.listQuestionsView.collection, function () {
		// 		if(arrayI.eq(i).hasClass('checked')) {
		// 			var question = app.listQuestionsView.collection.models[i];
		// 			question.set({label: that.model.get('title')});
		// 			question.url = "/personal/update/" + question.id;
		// 			question.save();
		// 		}
		// 		i++;
		// 	});*/
		// }
		// //unanswered questions
		// else if (/unanswered/i.test(Backbone.history.fragment)) {
		// 	/*listQuestionsUnanswered.each(function (question) {
		// 		if(question.get('checkbox') === true) {
		// 			question.set({label: that.model.get('title')});
		// 			question.url = ;
		// 			question.save();
		// 		}
		// 	});*/
		// }
	
	},

	close: function () {
		this.unbind();
		this.remove();
	},


});


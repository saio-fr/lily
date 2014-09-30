DATE : 10/07
Central panel is split in 3 directories, collections, models, views
/********************************************************
MODELS
********************************************************/
question.js : define the differents types of questions.
lily.Question = business question. E.G : "how can be refund ?".
lily.QuestionPersonal = personal question ? E.G : "what's your name"
lily.QuestionUnanswered = unanswered question : all the questions asked by the user, without answer.
/********************************************************
COLLECTIONS
********************************************************/
list-questions.js
lily.listQuestions = collection of the all business questions
lily.listQuestionsPersonal =  collection of the all personal questions
lily.listQuestionsUnanswered = collection of the all unanswered questions asked by the users

/********************************************************
VIEWS
********************************************************/
questions.js 
define the view of one question
list-questions.js
Define the view to display the entire collection.


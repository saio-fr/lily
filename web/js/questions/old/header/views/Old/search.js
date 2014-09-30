lily.searchView = lily.standardHeaderViewTop.extend({
template: _.template($('#search-form').html()),
    events: {
        'keyup  #filtreRecherche': 'searchQuestions',
        'click .button-search': 'searchQuestions'

    },
    searchQuestions: function (e) {

        //Business questions
        if (/business/i.test(Backbone.history.fragment)) {
		    console.log('search function questions business');
            
            search_pattern = $('#filtreRecherche').val();
			
            console.log('search_pattern '+search_pattern);
            
            search_string = new RegExp(search_pattern, "i");
            
            results = listQuestionsBusiness.filter(function (data) {
                return search_string.test(data.get("title"));
            });
            
            var listQuestionsFiltered = new lily.listQuestions();
            
            var k = 0;
            _.each(results, function () {
                listQuestionsFiltered.add(results[k]);
                k++;
            });

            new lily.listQuestionsView(listQuestionsFiltered);
        } 
        //personal questions
        else if(/personal/i.test(Backbone.history.fragment)){
	        
            console.log('search function questions without answers');
	        
            search_pattern = $("#filtreRecherche").val();
            
            search_string = new RegExp(search_pattern, "i");
            
            results = listQuestionsPersonal.filter(function (data) {
                return search_string.test(data.get("title"));
            });
            
            var listQuestionsFiltered = new lily.listQuestions();
            
            var k = 0;
            _.each(results, function () {
                listQuestionsFiltered.add(results[k]);
                k++;
            });

            new lily.listQuestionsView(listQuestionsFiltered);
	   
	    } 
        
        //unanswered questions
        else if(/unanswered/i.test(Backbone.history.fragment)){
	        /*console.log('search function personal questions');
	   	    search_pattern = $("#filtreRecherche").val();
            search_string = new RegExp(search_pattern, "i");
            results = listQuestionsUnanswered.filter(function (data) {
                return search_string.test(data.get("title"));
            });
            var listQuestionsFiltered = new lily.listQuestions();
            var k = 0;
            _.each(results, function () {
                listQuestionsFiltered.add(results[k]);
                k++;
            });
            
            new lily.listQuestionsPersonalView(listQuestionsFiltered);
	       */
	   
	    }
        //General case
        else if (Backbone.history.fragment === '') {
            search_pattern = $("#filtreRecherche").val();
            
            search_string = new RegExp(search_pattern, "i");
            
            results = listQuestions.filter(function (data) {
                return search_string.test(data.get("title"));
            });
            
            var listQuestionsFiltered = new lily.listQuestions();
            
            var k = 0;
            _.each(results, function () {
                listQuestionsFiltered.add(results[k]);
                k++;
            });

            new lily.listQuestionsView(listQuestionsFiltered);
        }

        /*Deuxième cas : On cherche dans la liste des questions sans réponse*/
        /*else if ($('#liste-questions-sans-reponse').children().length > 0) {

var alpha = $("#filtreRecherche").val();
var search_string = new RegExp(alpha, "i");

results = _(test_sans_reponse.filter(function (data) {
return search_string.test(data.get("title"));
}));

var listeQuestionsSansReponseFiltrees = new lily.listeQuestionsSansReponse();

var k = 0;
_.each(results.toArray(), function () {
listeQuestionsSansReponseFiltrees.add(results.toArray()[k]);

k++;
});
$('#liste-questions-sans-reponse').children().remove();
new lily.listeQuestionsSansReponseVue(listeQuestionsSansReponseFiltrees);
}	*/
    e.stopImmediatePropagation();
	}


});
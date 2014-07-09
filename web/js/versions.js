 // /*Adresse pour obtenir la liste des versions d'une question : /questions/{id}/versions/get*/
 // /*D‚finiton objet*/
 // lily.VersionsQuestion = Backbone.Model.extend({



 // });

 // /*Définition collection*/
 // lily.listeVersionsQuestion = Backbone.Collection.extend({
     // model: lily.VersionsQuestion,
     // initialize: function () {
         // this.url = '/' + identifiantQuestionComplete + '/versions/get';



     // },


 // });




 // /*D‚finition de la vue de la liste des versions*/

 // /*Cette vue est instanci‚e … la cr‚ation du panneau de modification de question ! */
 // lily.listeVersionsQuestionVue = Backbone.View.extend({
     // el: '#liste-version-question-existante',
     // initialize: function () {     
          // gl = this;
         // this.collection = new lily.listeVersionsQuestion();
         // this.collection.fetch({
             // success: function () {
                 // var i = 0;
                 // _.each(gl.collection.models[0].get('versions')[i], function () {
                     // gl.collection.add(gl.collection.models[0].get('versions')[i]);

                     // i++;
                 // });
// modelReference=gl.collection.models[0].get('question');
// gl.collection.remove(gl.collection.models[0]);
// gl.collection.models[0]=modelReference;
// var k = 0 ;
 
                 // _.each(gl.collection,function(){
				  // console.log(' k vaut '+k);
				 // if(k=='0'){
				
				   // modelEnCours = new lily.Question;
 // modelEnCours.url="/get/"+identifiantQuestionComplete;
 // modelEnCours.fetch({async:false});
 // console.log(modelEnCours.get('reponse'));

 // if(typeof(gl.collection.models[0].get('data').reponse)=='undefined'){

 // gl.collection.models[0].get('data').reponse=modelEnCours.get('reponse'); 
 // }
// /*Si on n'a pas changé la catégorie de la question, alors on récupère l'ID de la question en cours*/
  // if(typeof(gl.collection.models[0].get('data').idCat)=='undefined'){
// /*Si le modèle n'a jamais eu de catégorie alors on force l'id à NULL */
  // if(modelEnCours.get('categorie')!=null){
 // gl.collection.models[0].get('data').idCat=modelEnCours.get('categorie').id; 
 // } else {
  // gl.collection.models[0].get('data').idCat='NULL';
 // }
 
 
 
 // }
  // if(gl.collection.models[0].get('data').humeur==null){
 // gl.collection.models[0].get('data').humeur=modelEnCours.get('humeur'); 
 // }
// if(typeof(gl.collection.models[0].get('data').categorieAfficher)=='undefined'){

// gl.collection.models[0].get('data').categorieAfficher=modelEnCours.get('categorie').titre;
// gl.collection.models[0].get('data').redirection=modelEnCours.get('categorie').redirection.titre;
// }

				 // } else {
				 // if(typeof(gl.collection.models[k].get('data').reponse)=='undefined'){
				 // gl.collection.models[k].get('data').reponse=gl.collection.models[k-1].get('data').reponse;

				 // }
// if(gl.collection.models[k].get('data').humeur==null){
// gl.collection.models[k].get('data').humeur=gl.collection.models[k-1].get('data').humeur;
// }
// if(typeof(gl.collection.models[k].get('data').categorieAfficher)=='undefined'){
// gl.collection.models[k].get('data').categorieAfficher=gl.collection.models[k-1].get('data').categorieAfficher;
// }
// if(typeof(gl.collection.models[k].get('data').redirection)=='undefined'){
// gl.collection.models[k].get('data').redirection=gl.collection.models[k-1].get('data').redirection;
// }
		// if(typeof(gl.collection.models[k].get('data').idCat)=='undefined'){
// gl.collection.models[k].get('data').idCat=gl.collection.models[k-1].get('data').idCat;
// }		 
				 // } 
				 // k++;
				 // });

                 // gl.render();

             // }
         // });




     // },
     // render: function () {
         // this.collection.each(function (item) {
             // this.affichageVersionsQuestionComplet(item);
         // }, this);
     // },
     // affichageVersionsQuestionComplet: function (item) {
         // var versionQuestionVue = new lily.VersionsQuestionVue({
             // model: item
         // });
         // this.$el.append(versionQuestionVue.render().el);
     // }
 // });
 // /*D‚finition de la vue d'un objet*/
 // lily.VersionsQuestionVue = Backbone.View.extend({
     // model: lily.VersionsQuestion,
     // tagName: 'li',

     // className: 'list-group-item wrapper-sm  ',
     // template: _.template($('#templateVersions').html()),
     // render: function () {
         // this.$el.html(this.template(this.model.toJSON()));
         // return this;
     // },
     // initialize: function () {


     // },
     // events: {
         // 'click .liste-version': 'afficherVersionQuestion',
		 // 'click .come-back' : 'revenirAncienneVersion',
         
		 
     // },
	 // revenirAncienneVersion : function (){
	 // console.log('revenirAncienneVersion');

	 // var nouveauModel = new lily.Question;
	 // nouveauModel.set({titre:this.model.get('titre')});
	 // nouveauModel.set({reponse:this.model.get('data').reponse});
	 // nouveauModel.set({humeur:this.model.get('data').humeur});
	 // var idCat= this.model.get('data').idCat;
	 // var idModel = this.model.get('object_id');
	 // nouveauModel.url='/update/'+idModel+'/NULL'+'/'+idCat;
	 // Backbone.sync('update',nouveauModel,{success:function(){
	 // console.log('OK');
	 
	 // }});
	 
	 // },
     // /*Mise à jour de la question*/
     // afficherVersionQuestion: function () {

         // new lily.DetailVersionQuestionVue(this);
         // /*Instancier la liste du d‚tail du contenu*/


     // },

	 
	 



 // });

 // lily.DetailVersionQuestion = Backbone.Model.extend({


 // });
 // lily.DetailVersionQuestionVue = Backbone.View.extend({
     // model: lily.DetailVersionQuestion,
// el:'#contenant-detail-version',
     // template: _.template($('#detailVersion').html()),
     // render: function () {
	// this.$el.append(this.template(this.model.toJSON()));
        // $('#contenant-detail-version').html(this.template(this.model.toJSON()));


		// return this;
     // },

     // initialize: function (alpha) {
	// this.$el="#contenant-detail-version";
	 // /*On rajoute le titre si jamais y a pas eu de modification */
	   // var listeVersions = new lily.VersionsQuestion;
	 // listeVersions.url="/"+identifiantQuestionComplete+"/versions/get";
	 // listeVersions.fetch({async:false });

	 // /*On rajoute la réponse si y a pas eu de modification*/
	 	 // if(typeof(alpha.model.get('data').reponse)=='undefined'){

	// var k=0;
	 // _.each(listeVersions.get('versions'),function(){
	 // if(listeVersions.get('versions')[k].id<alpha.model.id){
		// if(typeof(listeVersions.get('versions')[k].data.reponse)!='undefined' ){
		// alpha.model.get('data').reponse=listeVersions.get('versions')[k].data.reponse;
		
		// }	 
	 // }
	 // k++;
	 // });
	 
	 // }
	 // /*On rajoute la catégorie au modèle si y a pas eu de modification*/
	 
	 // /*On rajoute l'humeur au modèle si y a pas eu de modification*/
	 
	 
	 
         // /*On supprime préalablement le d‚tail d'une question affich‚*/
         // $('#contenant-detail-version').children().remove();
        
// $('.panneau-detail-version').remove();
 // this.render();
// afficherArborescenceVersion(alpha);
     // },

	// /* events:{
	 // 'click .come-back':'revenirAncienneVersion',
	 'click .bouton-humeur':'revenirAncienneVersion',
	 
	 // },
	 	 // revenirAncienneVersion: function() {
	 // console.log('revenirAncienneVersion');
	 // alpha = this;
	 // console.log(alpha);
	 // },*/

     // /*Mise à jour de la question*/



 // });
 
 // function afficherArborescenceVersion (alpha) {
 // console.log('alpha vaut '+alpha);

// }




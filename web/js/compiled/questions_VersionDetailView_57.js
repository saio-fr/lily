lily.VersionDetailView = Backbone.View.extend({
	model : lily.Question,
    template: _.template($('#version-detail').html()),
	classeAttente:0,
// el = #wrapper-business-version

	render:function(){
		this.$el.html(this.template( this.model.toJSON() ));
        return this;
	
	},
	initialize:function(){
	
	$('.wrapper-actions.active').removeClass('active');
	$('#wrapper-business-version').append(this.render().el);
	this.displayArborescence();	
	$('#wrapper-tree-versions input').prop('disabled',true);
	$('#wrapper-tree-versions button').prop('disabled',true);
	versionViewTest=this;
	},
	events:{
		'click .change-version':'changeToVersion',
	},
	displayArborescence: function() {
         versionDisplay = this.model;//A supprimer
        var arborescenceToDisplay = this;
        if (versionDisplay.get('children')!== null) {
            if (versionDisplay.get('children').length == 0) {
				console.log('version simple');
                /*Case simple question*/
                var answer = new lily.Question;
                answer.set({
                    title: versionDisplay.get('data').answer
                });
				new lily.AnswerView({
                    model: answer
                });
            } else {
                /*Case question complex*/
                var precision = new lily.Question;
                precision.set({
                    title: versionDisplay.get('data').answer
                });
		
                 new lily.PrecisionView({
                    model: precision
                });

                var childrenToDisplay = this.model.get('children'); //PASSER EN LOCAL
                var k = 0;
                _.each(childrenToDisplay, function() {
                    if (childrenToDisplay[k].children.length == 0) {
					console.log('on affiche version réponse');
                        arborescenceToDisplay.displayAnswer(childrenToDisplay[k]);
                    } else {
						console.log('on affiche version précision');
                        arborescenceToDisplay.displayPrecision(childrenToDisplay[k]);

                    }
                    k++;
                });
            }
        } else {
		      var answer = new lily.Question;
                answer.set({
                    title: versionDisplay.get('data').answer
                });
				new lily.AnswerView({
                    model: answer
                });
				
				}
    },
	
	displayAnswer: function(object) {
       var  actionToDisplay = new lily.Question;
        actionToDisplay.set({
            title: object.title
        });
        actionToDisplay.set({
            id: object.id
        });
       test_action= new lily.ActionView({
            model: actionToDisplay
        });
        if (object.answer != null) {
            var answerToDisplay = new lily.Question;
            answerToDisplay.set({
                title: object.answer
            });
            new lily.AnswerView({
                model: answerToDisplay
            });
        }



    },
		
	displayPrecision: function(precision) {
        this.classeAttente++;
        var actionToDisplay = new lily.Question;
        actionToDisplay.set({
            title: precision.title
        });
        actionToDisplay.set({
            id: precision.id
        });
        var actionView = new lily.ActionView({
            model: actionToDisplay
        });
        actionView.$el.addClass('wrapper-' + JSON.stringify(this.classeAttente));
        var precisionToDisplay = new lily.Question;
        precisionToDisplay.set({
            title: precision.answer
        });
        new lily.PrecisionView({
            model: precisionToDisplay
        });
        var children = precision.children;
        var k = 0;
        _.each(children, function() {
            if (children[k].children.length == '0') {
                arborescenceToDisplay.displayAnswer(children[k]);
            } else {
                arborescenceToDisplay.displayPrecision(children[k]);
            }
            k++;
        });
        $('.wrapper-actions.active').removeClass('active');
        $('.wrapper-' + JSON.stringify(this.classeAttente)).addClass('active');
        this.classeAttente--;
    },
		saveVersion:function(item){
		var newVersion = new lily.Question;
		// newVersion.set({title:item.get('title')});
		// newVersion.set({});
		// newVersion.set({});
		
	
	},
	changeToVersion:function(){
		console.log('changeToVersion');
		/*Delete current children*/
		var listChildrenToDelete = $('#questions-enfants').children().children().children('li');
		_.each(listChildrenToDelete,function(){
			listChildrenToDelete = $('#questions-enfants').children().children().children('li'); 
			$(listChildrenToDelete[0]).addClass('toDelete');
			questionFullView.deleteElement();	 
		
		});
		/*Save new children*/
		var versionReference=this.model;
		/*save initiale model*/
		if(versionReference.get('data')==null){
			var idCategory = "NULL";
		} else {
			var idCategory = versionReference.get('data').category.id;
		}
		questionFullView.model.set({mood:versionReference.get('data').mood});
		questionFullView.model.url="/update/"+questionFullView.model.id+"/NULL/"+idCategory;
		Backbone.sync('update',questionFullView.model);
		var listNewVersions = versionReference.get('children');
		var l =0;
		var idVersionParent = questionFullView.model.id;
		_.each(listNewVersions,function(){
			questionFullView.versionDetailView.saveVersion(listNewVersions[l],idVersionParent);
			l++;
		});
		app.navigate('business',{trigger:true});
		app.postRequest.trigger('refresh');
	},
	saveVersion:function(item,idVersionParent){
		var newVersion = new lily.Question;
		newVersion.set({title:item.title});
		newVersion.set({answer:item.answer});
		newVersion.set({mood:item.mood});
		if(questionFullView.versionDetailView.model.get('data').category!=null){
			var idCategoryVersion = questionFullView.versionDetailView.model.get('data').category.id;
		} else {
			var idCategoryVersion = "NULL";	
		}
		newVersion.url="/create/"+idCategoryVersion+"/"+idVersionParent;
		newVersion.save(null,{async:false});
		var listChildren= item.children;
		var m =0;
		var idParent=newVersion.get('id');
		_.each(listChildren,function(){
			questionFullView.versionDetailView.saveVersion(listChildren[m],idParent);
			m++;
		});
		
	
	}

	});
lily.AnswerView = Backbone.View.extend({
    el: '.wrapper-answer.active',
    model: lily.Question,
    template: _.template($('#answer-question').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {
		that = this;
        $('.content-answer.active').removeClass('active');
        this.render();
        this.$el.find('textarea').wysihtml5({
            "font-styles": false,
            "emphasis": true,
            "lists": false,
            "html": false,
            "link": true,
            "image": false,
            "color": false,
        });
		$('.content-answer.active').height('100%');
		this.$el.find('.wysihtml5-toolbar').addClass('hide');
		this.$el.find('iframe').height('32px'); 
		// $(".wysihtml5-sandbox").css("resize", "vertical");
		
// /*We had event listener, only way to hear the different events in the iframe of the WYSIWYG*/
//Event : the user press a key
that.$el.find('.wysihtml5-sandbox').contents().find('body').on("keydown",function(e) {	
/*************************************************************************************
 To resize the iframe, we will make a dirty trick.
 When we hit something, we gonna calculate the length of text in the iframe.
 We choose to take the following rule : 1 line = 30caracters. 1 height : 32px;
 So to get the height : (Entire part (Length/30) + 1) * 32px
 *************************************************************************************/
	var nbLines = Math.round($(that.$el.find('textarea')[0]).val().length/35);
	var heightIframe = Math.max(62,(nbLines*32)+30);
	//we had 30px to let the place to the wysiwyg toolbar
	that.$el.find('iframe').height(heightIframe+'px');
	console.log('heightIframe');
	console.log(heightIframe);
	$('.content-answer.active').height('100%');
	/*I am ashamed to do this*/
 });
	
	
	
	
//Event : the user click on the answer fieldd
	that.$el.find('.wysihtml5-sandbox').contents().find('body').on("click",function(e) {
//We hide all the iframes


	var nbLines = Math.round($(that.$el.find('textarea')[0]).val().length/35);
	var heightIframe = Math.max(62,(nbLines*32)+30);
	//we had 30px to let the place to the wysiwyg toolbar
	that.$el.find('iframe').height(heightIframe+'px');


		e.stopImmediatePropagation();
		});
	
	that.$el.find('.wysihtml5-sandbox').contents().find('body').on("blur",function(e) {
/*Resize all the contents content-answer when we lost the focus*/
		// e.stopImmediatePropagation();
		console.log('blur');
		var new_answer = new lily.Question;
		new_answer.set({title:that.$el.find('textarea').val()});
		that.$el.find('.wysihtml5-sandbox').contents().find('body').unbind('click');
		that.$el.find('.wysihtml5-sandbox').contents().find('body').unbind('keydon');
		that.$el.find('.wysihtml5-sandbox').contents().find('body').unbind('blur');
		that.$el.empty();		
		new lily.AnswerView({model:new_answer});
});
		
		
    }, 
    events: {
    
		'click .reponse-item': 'displayToolBar',
		'keydown edit-reponse-content':'resizeTextArea',
        
    },

    displayToolBar: function (e) {	
	lll = e;
	/*we had all other iframe, and just display the div */
	$('.conteneur-textarea').addClass('hide');
	$('.reponse-name').removeClass('hide');
	that.$el.children('li').addClass('toDelete');
		var nbLines = Math.round($(that.$el.find('textarea')[0]).val().length/30);
		var heightIframe = Math.max(62,(nbLines*32)+30);	//we had 30px to let the place to the wysiwyg toolbar
		that.$el.find('iframe').height(heightIframe+'px');
		this.$el.children().addClass('toUpdate');
		$('.content-answer.active').height('100%');
		$(e.currentTarget).parent().parent().parent().addClass('toUpdate');
        $('.toDelete').removeClass('toDelete');
        this.$el.children().addClass('toDelete');
        /*Hide the text name of the answer*/
        $(e.currentTarget).children('.reponse-name').addClass('hide');
        /*Show the textarea of the wysiwyg*/
        $(e.currentTarget).children('.conteneur-textarea').removeClass('hide');
        // $(e.currentTarget).children('.conteneur-textarea').addClass('show');
		/*show the wysihtml5 toolbar*/
		this.$el.find('.wysihtml5-toolbar').removeClass('hide');
		e.stopImmediatePropagation();
	},
   

	resizeTextArea:function(e){
		alp = this;
		lp = e;
		console.log(this);
		console.log(alp);
	},


});
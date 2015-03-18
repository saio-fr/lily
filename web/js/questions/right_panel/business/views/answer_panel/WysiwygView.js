
/******************************************
Popup for the Wysiwyg editor
******************************************/
lily.WysiwygView = Backbone.View.extend({
    el: '.content-answer.active',
    template: _.template($('#wysiwyg').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'click .button-update-answer': 'updateValue',
        'click .button-cancel-answer': 'cancelWysiwyg'
    },
    updateValue: function () {
        
        console.log('updateValue');
        var answer = new lily.Question;
        answer.set({
            title: $('#answer-editor').val()
        });
        $('.content-answer.active').remove();
        new lily.AnswerView({
            model: answer
        });
    },
    cancelWysiwyg: function () {
  
        $('.popup-edition').remove();
		$('.content-answer.active').height('33px');
    }

});
/********************************************************************************
View for the lsit of 10 colored squares
********************************************************************************/
lily.ListSquaresColoredView = Backbone.View.extend({
    el: '#list-squares-colored',

    initialize: function () {
        var initial_list_colors = [{
            titre: 'color 1',
            color: 'ee5a5a'
        }, {
            titre: 'color 2',
            color: 'feae2f'
        }, {
            titre: 'color 3',
            color: 'fee8a4'
        }, {
            titre: 'color 4',
            color: 'fff32e'
        }, {
            titre: 'color 5',
            color: 'd0ff2e'
        }, {
            titre: 'color 6',
            color: '62db27'
        }, {
            titre: 'color 7',
            color: '539785'
        }, {
            titre: 'color 8',
            color: '66fff6'
        }, {
            titre: 'color 9',
            color: '21d0ce'
        }, {
            titre: 'color 10',
            color: '2184d0'
        }, {
            titre: 'color 11',
            color: '0a48a4'
        }, {
            titre: 'color 12',
            color: '1c006b'
        }, {
            titre: 'color 13',
            color: '8f00b3'
        }, {
            titre: 'color 14',
            color: 'db05d9'
        }, {
            titre: 'color 15',
            color: 'fe9df6'
        }, {
            titre: 'color 16',
            color: 'fe14ae'
        }, {
            titre: 'color 17',
            color: 'ba1c50'
        }, {
            titre: 'light-grey',
            color: 'c3c3c3'
        }, {
            titre: 'dark-grey',
            color: '696969'
        }, {
            titre: 'black 20',
            color: '000000'
        }];
       var listColors = new lily.ListSquareColored(initial_list_colors);
        this.collection = listColors;
        this.render();



    },
    render: function () {
        this.collection.each(function (item) {
            this.affichagecolorCategorie(item);
        }, this);

    },
    affichagecolorCategorie: function (item) {
        var categorieVue = new lily.squareColoredView({
            model: item
        });
        this.$el.append(categorieVue.render().el);

    }

});

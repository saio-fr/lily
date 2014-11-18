/***********************************************
Collection Categories
*************************************************/
lily.ListCategories = Backbone.Collection.extend({
    model: lily.Category,
    url: '/categories/get',
    intialize: function () {}
});
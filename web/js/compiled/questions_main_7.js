/*Main script for Questions*/
$.ajaxPrefilter(function (options) {
    /*Test if redirection or other model*/
    if (options.url !== redirections + "/rest") {
        options.url = root + options.url;
    }
});
var lily = lily || {};
$(function(){
	app = new AppRouter();
	Backbone.history.start();

});
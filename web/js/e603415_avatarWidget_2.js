$(function() {
	$('.changeAvatarInput').change(function() {
		$('#avatarContainer').css('background-image', 'url("http://erwan.saio.fr/images/avatar-content.png")');
		$('#avatarWidgetForm').submit();
	});	
});
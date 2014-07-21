window.jQuery || document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"><\/script>');

// Detect browser version 


// Detect if is Mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// API Key
var key = 'CB12A1947E48A651CD7D8C35F552F';

// Add Stylesheet
if (document.createStyleSheet){ document.createStyleSheet('http://www.saio.fr/web/customer/tem/css/lily-float.css'); }
else { $('head').append($('<link rel="stylesheet" href="http://www.saio.fr/web/customer/tem/css/lily-float.css" type="text/css" media="screen"/>')); }

// Add App container
$('body').after('<div id="lily-widget-container"><h3>Vous avez une question ?</h3></div>');
$('body').after('<div id="lilyAppContainer"></div>');

// Add iframe
var lilyApp = document.createElement('iframe');
$('#lilyAppContainer').prepend(lilyApp);

$(lilyApp).attr("id", "lilyApp");
$(lilyApp).attr("src", "http://saio.fr/web/app_dev.php/api/"+key);
$(lilyApp).attr("frameborder", "0");

$(lilyApp).load(function() {
	$('#lily-widget-container').fadeIn('fast');
})

$('#lilyAppContainer').prepend('<div id="lily-toolbar-iframe"><span class="icon-iframe-close"></span><span class="icon-iframe-fullscreen"></span></div>');

// Clicks events	
$('#lily-widget-container').click(function() {
	
	if( isMobile.any() ) {
	
		$('body').css({
	    	'overflow': 'hidden',
			'height': '100%',
			'display' : 'none'
		});
		
		var meta = $('meta[name=viewport]');
		if (meta.length == 0) {
			$('head').append('<meta name="viewport" content="width=device-width, height=device-height, minimum-scale=1.0, maximum-scale=1">');
		}
		else {
			$(meta).attr('content', 'user-scalable=yes, width=device-width, height=device-height, minimum-scale=1.0, maximum-scale=1.0');
		}
		
		$('#lilyAppContainer').css({display: 'block'});
		$('#lily-widget-container').css({display: 'none'});
		
		
	} else {
	
		$('#lilyAppContainer').fadeIn('fast');
		$('#lily-widget-container').fadeOut('fast');	
		
	}
		
});

$('#lily-toolbar-iframe .icon-iframe-close').click(function() {
	if( isMobile.any() ) {
	
		$('#lilyAppContainer').css({display: 'none'});
		$('#lily-widget-container').css({display: 'block'});
		
		var meta = $('meta[name=viewport]');
		$(meta).attr('content', 'width=device-width, initial-scale=0');
		$('body').css({
	    	'overflow': 'auto',
			'height': 'auto',
			'display' : 'auto'
		});
		
		
	} else {
	
		$('#lilyAppContainer').fadeOut('fast');
		$('#lily-widget-container').fadeIn('fast');
		
	}
	
});

if( isMobile.any() ) {
	$('#lily-toolbar-iframe .icon-iframe-fullscreen').css({display: 'none'});
}

$('#lily-toolbar-iframe .icon-iframe-fullscreen').click(function() {

	if ($('#lilyAppContainer').width() > '325') {
		$('#lilyAppContainer').animate({width: '325px', height: '100%'});
	} else {
		$('#lilyAppContainer').animate({width: '100%', height: '100%'});
	}
				
});


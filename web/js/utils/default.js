define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var Backbone = require('backbone'),
      Utils = {};

  // Used to serialize form into backbone model
  Utils.serializeObject = function (el) {    
    var a = {}, b = function (b, c) {
        var d = a[c.name];
        "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
    };
    return $.each(el.serializeArray(), b), a
  };
  
  // Used to preview avatar 
  Utils.previewAvatar = function(el,limit){
  	var files = el.files;
  	var wrap = $(el).parent();
  	var description = $('.upload-errors');
  	var allowedTypes = ['JPG','JPEG','GIF','PNG','SVG','WEBP'];
  
  	var file = files[0];
  	var imageType = /image.*/;
  
  	// detect device
  	var device = Utils.detectDevice();
  
  	if (!device.android){ // Since android doesn't handle file types right, do not do this check for phones
  		if (!file.type.match(imageType)) {
  			description.html('This is not valid Image file');
  			return false;
  		}
  	}
  
  	var img='';

  	var reader = new FileReader();
  	reader.onload = (function(aImg) {
  		return function(e) {
  
  			var format = e.target.result.split(';');
  			format = format[0].split('/');
      		format = format[1].split('+');
  			format = format[0].toUpperCase();
  
  			// We will change this for an android
  			if (device.android){
  				format = file.name.split('.');
          		format = format[format.length-1].split('+');
  				format = format[0].toUpperCase();
  			}
  
  			if (allowedTypes.indexOf(format)>=0 && e.total<(limit*1024*1024)){
					var image = wrap.find('.avatar');
					var src = e.target.result;

					// very nasty hack for android
					// This actually injects a small string with format into a temp image.
					/*if (device.android){
						src = src.split(':');
						if (src[1].substr(0,4) == 'base'){
							src = src[0] + ':image/'+format.toLowerCase()+';'+src[1];
						}
					}*/
										
					image.attr('src', src);
					description.html('');
  
  			} else {
  			    description.html('<span>Wrong format or size! Accepted formats: '+allowedTypes.join(', ')+'. Size limit is: '+limit+'MB</span>');
  			}						

  		};
  	})(img);
  	reader.readAsDataURL(file);
  }
  
  Utils.uploadAvatar = function (user, avatar) {
    /* Create a FormData instance */
    var form = new FormData();
    /* Add the file */ 
    form.append('avatarFile', avatar);
    
    var xhr = new XMLHttpRequest;
    xhr.open('POST', '/app_dev.php/lily/api/user/admin/' + user + '/avatar', true);
    xhr.send(form);
  }
  
  // Detect client's device
  Utils.detectDevice = function () {
  	var ua = navigator.userAgent;
  	var brand = {
  		apple: ua.match(/(iPhone|iPod|iPad)/),
  		blackberry: ua.match(/BlackBerry/),
  		android: ua.match(/Android/),
  		microsoft: ua.match(/Windows Phone/),
  		zune: ua.match(/ZuneWP7/)
  	}
  
  	return brand;
  }

  return Utils;
});
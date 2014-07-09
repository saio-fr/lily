$( document ).ready(function() {

  //Variables
  var menu_open = false;
  var width = $(window).width();
  var dropdown_active=false;
  var href_active_home=".multisupport";
  var href_active_lily=".satisfaction";
  var width = $(window).width();

	//Animations nav laptop
	$(window).scroll(function() {
    var height = $(window).scrollTop();
    if(height > 30 && width > 900) {
      $("nav").css({'position':'fixed'});    			
      $("nav").css({'top':'0'});
      $("nav").css({'width':'100%'});
      $("nav").css({'margin':'0 auto 0 auto'});
      $("#home").css({'margin-top':'70px'});
      $("#lily").css({'margin-top':'70px'});
      $("#ref-references").css({'margin-top':'70px'});
      $("#actus").css({'margin-top':'70px'});
      $("#presentation").css({'margin-top':'70px'});
      $("#contact").css({'margin-top':'70px'});
      $("#article").css({'margin-top':'70px'});
    }
  });

  $(window).scroll(function() {
    var height = $(window).scrollTop();
    if(height < 30 && width > 900) {
      $("nav").css({'position':''});
      $("nav").css({'top':''});
      $("nav").css({'width':''});
      $("nav").css({'margin':''});
      $("#home").css({'margin-top':'0'});
      $("#lily").css({'margin-top':'0'});
      $("#ref-references").css({'margin-top':'0'});
      $("#actus").css({'margin-top':'0'});
      $("#presentation").css({'margin-top':'0'});
      $("#contact").css({'margin-top':'0'});
      $("#article").css({'margin-top':'0'});
    }
  });

    //Animation roll-over références
    /*
    var roll_references_open=false;
    if (roll_references_open==false) {
      $("#menu_references").mouseover(function() {
        $("#roll_references").fadeIn('slow');
        $("#roll_references").animate({'margin-top':'10px'},{ duration: 400, queue: false });
        roll_references_open=true;  
      });
    }
      $(".metanav").mouseover(function() {
        if (roll_references_open==true) {
          $("#roll_references").fadeOut('slow');
          $("#roll_references").animate({'margin-top':'0'},{ duration: 400, queue: false });
          roll_references_open=false;
        }
        else {
          return true;
        }
      });

      $("#menu_produits").mouseover(function() {
        if (roll_references_open==true) {
          $("#roll_references").fadeOut('slow');
          $("#roll_references").animate({'margin-top':'0'},{ duration: 400, queue: false });
          roll_references_open=false;
        }
        else {
          return true;
        }
      });

      $("#menu_actus").mouseover(function() {
        if (roll_references_open==true) {
          $("#roll_references").fadeOut('slow');
          $("#roll_references").animate({'margin-top':'0'},{ duration: 400, queue: false });
          roll_references_open=false;
        }
        else {
          return true;
        }
      });

      $("#roll_references").mouseleave(function() {
        if (roll_references_open==true) {
          $("#roll_references").fadeOut('slow');
          $("#roll_references").animate({'margin-top':'0'},{ duration: 400, queue: false });
          roll_references_open=false;
        }
        else {
          return true;
        }
      });
*/


    //Animation roll-over menu
    $(".link_nav").find("li").mouseover(function() {
      $(this).find(".roll").css({'display':'block'});
    });

    $(".link_nav").find("li").mouseleave(function() {
      $(this).find(".roll").css({'display':'none'});
    });

    //Animation dropdown
    $("#selector").on('click', function() {
      if (dropdown_active==false) {
        $("#lang_select").css({'display':'block'});
        dropdown_active=true;
      }
      else {
        $("#lang_select").css({'display':'none'});
        dropdown_active=false;
      }
      
    });

    //Animation scroll
    $('a[href^="#"]').click(function(){  
      var the_id = $(this).attr("href");  

      $('html, body').animate({  
        scrollTop:$(the_id).offset().top  
      }, 'slow');  
      return false;  
    });

    //Animation solution
    $(href_active_home).css({'display':'inline-block'});

    $("#solution").find(".content").find("li").on('click', function(){
      var href = "."+$(this).find("a").attr('href').replace('#','')
      if (href!=href_active_home) {
        $(href_active_home).css({'display':'none'});
        $("#solution").find(".content").find("li").removeClass("active");
        $(href).css({'display':'inline-block'});
        $(this).parent("li").addClass("active");
        $(this).addClass("active");
        href_active_home=href;
      }
      else {
        return true;
      }
    });

    //Animation actions
    $(href_active_lily).css({'display':'inline-block'});

    $("#actions").find("li").on('click', function(){
      var href = $(this).find("a").attr('href').replace('#','')
      if ("."+href!=href_active_lily) {
        $(href_active_lily).css({'display':'none'});
        $("#actions").find("li").removeClass("active");
        $("."+href).css({'display':'inline-block'});
        $(".icon-"+href).addClass("active");
        $(".list-"+href).addClass("active");
        href_active_lily="."+href;
      }
      else {
        return true;
      }
    });

    //Placeholder
    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur().parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });

    //Resize global
    if(width > 1150) {
      $("footer").find(".last").removeClass("last");
      $(".footer_content").find("div:nth-child(4)").addClass("last");
      $("iframe").prependTo("#coordonnees-wrapper");
    }
    if(width < 1150 && width >= 900) {
      $("footer").find(".last").removeClass("last");
      $(".footer_content").find("div:nth-child(3)").addClass("last");
      $(".footer_content").find("div:nth-child(5)").addClass("last");
      $(".footer_content").find("#second").addClass("last");
      $(".logos").find("a:nth-child(3)").find("img").addClass("last");
      $(".logos").find("a:nth-child(6)").find("img").addClass("last");
      $("#partners").find("img:nth-child(2)").addClass("last");
      $("iframe").prependTo("#coordonnees");
    }
    if(width < 900 && width >= 740) {
      $("footer").find(".last").removeClass("last");
      $(".footer_content").find("div:nth-child(2)").addClass("last");
      $(".footer_content").find("div:nth-child(4)").addClass("last");
      $(".footer_content").find("#second").addClass("last");
      $("#partners").find("img:nth-child(2)").addClass("last");
      $(".logos").find("img").removeClass("last");
      $(".logos").find("a:nth-child(3)").find("img").addClass("last");
      $(".logos").find("a:nth-child(6)").find("img").addClass("last");
      $("iframe").prependTo("#coordonnees");
    }
    if(width < 740) {
      $("footer").find(".last").removeClass("last");
      $(".footer_content").find("div:nth-child(1)").addClass("last");
      $(".footer_content").find("div:nth-child(2)").addClass("last");
      $(".footer_content").find("div:nth-child(3)").addClass("last");
      $(".footer_content").find("div:nth-child(4)").addClass("last");
      $(".footer_content").find("div:nth-child(5)").addClass("last");
      $(".footer_content").find("#second").addClass("last");
      $(".logos").find("img").removeClass("last");
      $(".logos").find("a:nth-child(2)").find("img").addClass("last");
      $(".logos").find("a:nth-child(4)").find("img").addClass("last");
      $(".logos").find("a:nth-child(6)").find("img").addClass("last");
      $("iframe").prependTo("#coordonnees");
    }

    $(window).resize(function() {
      var width = $(window).width();
      if(width > 1150) {
        $("footer").find(".last").removeClass("last");
        $(".footer_content").find("div:nth-child(4)").addClass("last");
        $("#partners").find("img:nth-child(2)").removeClass("last");
        $("iframe").prependTo("#coordonnees-wrapper");
      }
      if(width < 1150 && width >= 900) {
        $("footer").find(".last").removeClass("last");
        $(".footer_content").find("div:nth-child(3)").addClass("last");
        $(".footer_content").find("div:nth-child(5)").addClass("last");
        $(".footer_content").find("#second").addClass("last");
        $("#partners").find("img:nth-child(2)").addClass("last");
        $("iframe").prependTo("#coordonnees");
        if (menu_open==true) {
          $("body").animate({'margin-left': '-=240px'}, 500);
          $(".menu").animate({'left': '-=240px'}, 500);
          menu_open=false;
        }
      }
      if(width < 900 && width >= 740) {
        $("footer").find(".last").removeClass("last");
        $(".footer_content").find("div:nth-child(2)").addClass("last");
        $(".footer_content").find("div:nth-child(4)").addClass("last");
        $(".footer_content").find("#second").addClass("last");
        $("#partners").find("img:nth-child(2)").addClass("last");
        $(".logos").find("img").removeClass("last");
        $(".logos").find("a:nth-child(3)").find("img").addClass("last");
        $(".logos").find("a:nth-child(6)").find("img").addClass("last");
        $("iframe").prependTo("#coordonnees");
      }
      if(width < 740) {
        $("footer").find(".last").removeClass("last");
        $(".footer_content").find("div:nth-child(1)").addClass("last");
        $(".footer_content").find("div:nth-child(2)").addClass("last");
        $(".footer_content").find("div:nth-child(3)").addClass("last");
        $(".footer_content").find("div:nth-child(4)").addClass("last");
        $(".footer_content").find("div:nth-child(5)").addClass("last");
        $(".footer_content").find("#second").addClass("last");
        $(".logos").find("img").removeClass("last");
        $(".logos").find("a:nth-child(2)").find("img").addClass("last");
        $(".logos").find("a:nth-child(4)").find("img").addClass("last");
        $(".logos").find("a:nth-child(6)").find("img").addClass("last");
        $("iframe").prependTo("#coordonnees");
      }

    });

    //Animation menu mobile
    $(".header_mobile .icon_menu").click( function() {
    	console.log(menu_open);
      if (menu_open == false) {
      
        $("body").animate({'margin-left': '+=240px'}, 100);
        $(".header_mobile").find(".menu").animate({'left': '+=240px'}, 100);
        menu_open = true;
        return;
        
      } else {
      
        $("body").animate({'margin-left': '-=240px'}, 100);
        $(".header_mobile").find(".menu").animate({'left': '-=240px'}, 100);
        menu_open = false;
        return;
        
      }
      
    });

    //Slider références

    //Initialisation
    var size_extend=false;
    var size_small=false;
    var size_tablet=false;
    var size_smartphone=false;

    if (width > 1150) {
      var count=0;
      var count4=4;
      var max_count=2;
      size_extend=true;
    }
    if (width < 1150 && width >= 900) {
      var count=0;
      var count4=3;
      var max_count=3;
      size_small=true;
    }
    if (width < 900 && width >= 740) {
      var count=0;
      var count4=2;
      var max_count=4;
      size_tablet=true;
    }
    if (width < 740) {
      var count=0;
      var count4=1;
      var max_count=5;
      size_smartphone=true;
    }

    //Au clic sur les flèches
    $(".arrow-right").on('click', function() {
      if (count<max_count) {
        $(".content-"+count).css({display: 'none'});
        $(".content-"+count4).css({display: 'inline-block'});
        count++;
        count4++;
        if (count==max_count) {
          $(".arrow-right").css({opacity: 0.4});
        }
        else {
          $(".arrow-left").css({opacity: 1});
        }
      }
      else {
        return true;
      }
    });
    $(".arrow-left").on('click', function() {
      if (0<count) {
        count--;
        count4--;
        $(".content-"+count4).css({display: 'none'});
        $(".content-"+count).css({display: 'inline-block'});
        if (count==0) {
          $(".arrow-left").css({opacity: 0.4});
        }
        else {
          $(".arrow-right").css({opacity: 1});
        }
      }
      else {
        return true;
      }
    });

    //Resize références
    $(window).resize(function() {
      var width = $(window).width();
      if(width > 1150) {
        if (size_small==true){
          $(".content-"+count4).css({display: 'inline-block'});
          count4++;
          max_count--;
          size_extend=true;
          size_small=false;
        }
        else {
          return true;
        }
      }
      if(width < 1150 && width >= 900) {
        if (size_extend==true) {
          count4--;
          max_count++;
          $(".content-"+count4).css({display: 'none'});
          size_small=true;
          size_extend=false;
        }
        if (size_tablet==true){
          $(".content-"+count4).css({display: 'inline-block'});
          count4++;
          max_count--;
          size_small=true;
          size_tablet=false;
        }
        else {
          return true;
        }
      }
      if(width < 900 && width >= 740) {
        if (size_small==true) {
          count4--;
          max_count++;
          $(".content-"+count4).css({display: 'none'});
          size_tablet=true;
          size_small=false;
        }
        if (size_smartphone==true){
          $(".content-"+count4).css({display: 'inline-block'});
          count4++;
          max_count--;
          size_tablet=true;
          size_smartphone=false;
        }
        else {
          return true;
        }
      }
      if(width < 740) {
        if (size_tablet==true) {
          count4--;
          max_count++;
          $(".content-"+count4).css({display: 'none'});
          size_smartphone=true;
          size_tablet=false;
        }
        else {
          return true;
        }
      }
    });


    //Activation newsletter
    var send_activated=true;
    $(".selector").on('click', function() {
      if (send_activated==true) {
        $(".selector").removeClass('activated');
        send_activated=false;
      }
      else {
        $(".selector").addClass('activated');
        send_activated=true;
      }
    });

    //Boutton Twitter
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

    //Boutton Facebook
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    //Boutton Google+
    (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/platform.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();

    /*

    //Alerte
    $("#ref-references").find("img").on('click', function() {
       alert(max_count+"\nsize_extend="+size_extend+"\nsize_small="+size_small+"\nsize_tablet="+size_tablet+"\nsize_smartphone="+size_smartphone);
    });

    */

});
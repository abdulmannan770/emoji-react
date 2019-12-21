/*
common.js*/
$(document).ready(function(){

	    $(window).load(function() {
        if( $(window).width() >= 768 ){
        	$('#gNavi li').hover(function(){
        		if($(this).has('ul'))
        			$(this).find('ul').stop().slideDown(200);
        	},function(){
        		if($(this).has('ul'))
        			$(this).find('ul').stop().slideUp(200);
        	});
        }else{
            
        }
    });
	$('.navbarToggle, .univToggle').on('click',function(){
		var target = $(this).data('target');
		if($(target).hasClass("on")){
			$(target).stop().slideUp(200).removeClass("on");
			$(this).removeClass("on");
		}else{
			$(target).stop().slideDown(200).addClass("on");
			$(this).addClass("on");
		}
		
	});
	$(window).resize(function (event) {
		if($('.visibleTS').css('display') == 'none') {
			var target = $('.navbarToggle').data('target');
			$(target).hide().removeClass("on");
			$('.navbarToggle').removeClass("on");
		}
	});
	if ($('#pageID').length == 1) {
		var ides = $('#pageID').val().split(',');
		for (var idx = 0; idx < ides.length; idx++) {
			var id = '#' + ides[idx];
			
			if ($(id).not('a').length == 1)
				$(id).addClass('selected');
			
		}
	}

});



jQuery(document).ready(function($) {
	/*
	 Android in case Adjust DPI
	=========================================*/
	$(window).on('resize.dpi', function () {

		//Get the designated viewport
		var BASE_PARAM = $('meta[name="viewport"]').attr('content');
	
		if (navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1 && window.orientation === 0) {
	
			var width = $(window).width();
	
			var DEFAULT_DPI = 160;
	
			var DEFAULT_WIDTH = 320;
	
			if (width !== DEFAULT_WIDTH) {
	
				var dpi = DEFAULT_WIDTH / width * DEFAULT_DPI;
	
				if (dpi >= 70 && dpi <= 400) {
					$('head').append('<meta name="viewport" content="target-densitydpi=' + dpi + ', ' + BASE_PARAM + '" />');
				}
			}
		}
	}).trigger('resize.dpi');
	
	pageScroll();
	rollover();
	common();
});

$(function() { //Erase black borders when using IE 8
	if(navigator.userAgent.indexOf("MSIE") != -1) {
		$('img').each(function() {
			if($(this).attr('src').indexOf('.png') != -1) {
				$(this).css({
					'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
					$(this).attr('src') +
					'", sizingMethod="scale");'
				});
			}
		});
	}
});

/* !isUA -------------------------------------------------------------------- */
var isUA = (function(){
	var ua = navigator.userAgent.toLowerCase();
	indexOfKey = function(key){ return (ua.indexOf(key) != -1)? true: false;}
	var o = {};
	o.ie      = function(){ return indexOfKey("msie"); }
	o.fx      = function(){ return indexOfKey("firefox"); }
	o.chrome  = function(){ return indexOfKey("chrome"); }
	o.opera   = function(){ return indexOfKey("opera"); }
	o.android = function(){ return indexOfKey("android"); }
	o.ipad    = function(){ return indexOfKey("ipad"); }
	o.ipod    = function(){ return indexOfKey("ipod"); }
	o.iphone  = function(){ return indexOfKey("iphone"); }
	return o;
})();

/* !rollover ---------------------------------------------------------------- */
var rollover = function(){
	var suffix = { normal : '_no.', over   : '_on.'}
	$('a.over, img.over, input.over').each(function(){
		var a = null;
		var img = null;

		var elem = $(this).get(0);
		if( elem.nodeName.toLowerCase() == 'a' ){
			a = $(this);
			img = $('img',this);
		}else if( elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input' ){
			img = $(this);
		}

		var src_no = img.attr('src');
		var src_on = src_no.replace(suffix.normal, suffix.over);

		if( elem.nodeName.toLowerCase() == 'a' ){
			a.bind("mouseover focus",function(){ img.attr('src',src_on); })
			 .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'img' ){
			img.bind("mouseover",function(){ img.attr('src',src_on); })
			   .bind("mouseout", function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'input' ){
			img.bind("mouseover focus",function(){ img.attr('src',src_on); })
			   .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}

		var cacheimg = document.createElement('img');
		cacheimg.src = src_on;
	});
};



// roll over
function smartRollover() {

	if(document.getElementsByTagName) {
		
		var onClassName = "on";

		var images = document.getElementsByTagName("img");

		for(var i=0; i < images.length; i++) {

			//if(images[i].getAttribute("src").match("_off."))

			//{
				var on=false;
				
				var eltClass = images[i].className.split(/\s+/);
				
				for (var j = 0; j < eltClass.length; j++) {
	
					if (eltClass[j] == onClassName)on = true;
	
				}
				
				
				if(!on){

				images[i].onmouseover = function() {

					this.setAttribute("src", this.getAttribute("src").replace("_off.", "_ov."));

				}

				images[i].onmouseout = function() {

					var parameters = window.location.hash;

					var currentTab=56;

					parameters = parameters.substr(1, parameters.length);

					paramList = parameters.split("&");

					for(var i=0; i < paramList.length; i++){

			

						var param = paramList[i].split("=");

						

						if(param[0] == "id"){

							currentTab=param[1];

							break;

						}

						

					}

					var reg = new RegExp('news_btn'+currentTab);

					

					if(!reg.test(this.getAttribute("src"))){

						

						this.setAttribute("src", this.getAttribute("src").replace("_ov.", "_off."));

						

					}
					
				}

					

				}

			//}

		}

	}

}

if(window.addEventListener) {

	window.addEventListener("load", smartRollover, false);

}

else if(window.attachEvent) {

	window.attachEvent("onload", smartRollover);

}


/* !pageScroll -------------------------------------------------------------- */
var pageScroll = function(){
	jQuery.easing.easeInOutCubic = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	}; 
	$('a.scroll, .scroll a').each(function(){
		$(this).bind("click keypress",function(e){
			e.preventDefault();
			var target  = $(this).attr('href');
			var targetY = $(target).offset().top;
			var parent  = ( isUA.opera() )? (document.compatMode == 'BackCompat') ? 'body': 'html' : 'html,body';
			$(parent).animate(
				{scrollTop: targetY },
				600
			);
			return false;
		});
	});


	var head = $("header").innerHeight() + $(".bar").innerHeight();
	var video = $(".video").innerHeight() + head;
	var features = $(".features").innerHeight() + video;
	var pricing = $(".pricing").innerHeight() + features;
	var client = $(".ourClient").innerHeight() + pricing
	var contact01 = $(".contact01").innerHeight() + client;
	$(window).scroll(function(){
		if ( $(this).scrollTop() < head )
		{
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(1) a").addClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(2) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(3) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(4) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(5) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(6) a").removeClass("color");
		}
		else if ( $(this).scrollTop() < video )
		{
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(1) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(2) a").addClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(3) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(4) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(5) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(6) a").removeClass("color");
		}
		else if ( $(this).scrollTop() < features )
		{
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(1) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(2) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(3) a").addClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(4) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(5) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(6) a").removeClass("color");
		}
		else if ( $(this).scrollTop() < pricing )
		{
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(1) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(2) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(3) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(4) a").addClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(5) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(6) a").removeClass("color");
		}
		else if ( $(this).scrollTop() < client )
		{
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(1) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(2) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(3) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(4) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(5) a").addClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(6) a").removeClass("color");
		}
		else if ( $(this).scrollTop() < contact01 )
		{
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(1) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(2) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(3) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(4) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(5) a").removeClass("color");
			$("header.sticky #header #headerIn #headerLinks #gNavi ul li:nth-child(6) a").addClass("color");
		}
	});
	$('.pageTop a').click(function(){
		$('html,body').animate({scrollTop: 0}, 'slow','swing');
		return false;
	});
	 var topBtn = $('.pageTop');
     topBtn.hide();


     
$(window).scroll(function(){
	if ($(this).scrollTop() > 50 )
	{
		topBtn.fadeIn();
		}
	else{
		topBtn.fadeOut();
		}
	});
}



/* !common --------------------------------------------------- */




	

/* !window height --------------------------------------------------- */
var wer = $( window ).height() - 4;

$(document).ready(function(){

	$(".asd").css("height",wer);
});


/* !Slider --------------------------------------------------- */
	$(function(){
		$('.bxslider').bxSlider({   
			auto:true,     
			controls:false,
			pager:false
		});
	});
	$(function(){
		$('.bxslider01').bxSlider({   
			auto:true,     
			controls:false,
			pager:false,
		});
	});
	$(function(){
		$('.bxslider02').bxSlider({  
			mode: 'fade',    
			auto:true,    
			controls:true,
			pager:false
		});
	});

	$(function(){
		$('.bxslider03').bxSlider({    
			auto:true,     
			controls:true,
			pager:false, 
			minSlides: 1,  
			maxSlides: 8,  
			moveSlides: 1, 
			slideWidth: 524  
		});
	});
/* !Marquee --------------------------------------------------- */
	$(function() {
    $('marquee').mouseover(function() {
        $(this).attr('scrollamount',0);
    }).mouseout(function() {
         $(this).attr('scrollamount',5);
    });
});

/*  !rang slider ---------------------------------------------- */

$(function() {
  var output = document.querySelectorAll('output')[0];
  
  $(document).on('input', 'input[type="range"]', function(e) {
        output.innerHTML = e.currentTarget.value;
  });
  
  $('input[type=range]').rangeslider({
    polyfill: false
  });
});





/*  !tab set------------------------------------------------------*/
$(document).ready(function() {
  $(".set > a").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".content")
        .slideUp(200);
      $(".set > a > i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    } else {
      $(".set > a > i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      $(this)
        .find("i")
        .removeClass("fa-plus")
        .addClass("fa-minus");
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $(".content").slideUp(200);
      $(this)
        .siblings(".content")
        .slideDown(200);
    }
  });
});

$(document).ready(function() {
  $(".setIn > a").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".contentIn")
        .slideUp(200);
      $(".setIn > a > i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    } else {
      $(".setIn > a > i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      $(this)
        .find("i")
        .removeClass("fa-plus")
        .addClass("fa-minus");
      $(".setIn > a").removeClass("active");
      $(this).addClass("active");
      $(".contentIn").slideUp(200);
      $(this)
        .siblings(".contentIn")
        .slideDown(200);
    }
  });
});

$(window).load(function(){
    if( $(window).width() <= 767 ){
          $("#gNavi > ul > li > a").on("click", function() {
            if ($(this).hasClass("active")) {
              $(this).removeClass("active");
              $(this)
                .siblings("#gNavi > ul > li > .pulldownmenu")
                .slideUp(200);
            } else {
              $("#gNavi > ul > li > a").removeClass("active");
              $(this).addClass("active");
              $("#gNavi > ul > li > .pulldownmenu").slideUp(200);
              $(this)
                .siblings("#gNavi > ul > li > .pulldownmenu")
                .slideDown(200);
            }
          });
    }
});

// $(document).ready(function() {
//   $(".dubaiDetails > ul > li > h2 > span > a").on("mouseover", function() {
//     if ($(this).hasClass("active")) {
//       $(this).removeClass("active");
//       $(this)
//         .siblings(".dubaiDetails > ul > li > h2 > span > .estimate")
//         .slideUp(200);
//     } else {
//       $(".dubaiDetails > ul > li > h2 > span > a").removeClass("active");
//       $(this).addClass("active");
//       $(".dubaiDetails > ul > li > h2 > span > .estimate").slideUp(200);
//       $(this)
//         .siblings(".dubaiDetails > ul > li > h2 > span > .estimate")
//         .slideDown(200);
//     }
//   });
// });

$(document).ready(function(){
	$('.dubaiDetails > ul > li > h2 > span > strong').hover(function(){
		if($(this).has('ul'))
			$(this).find('ul').stop().slideDown(200);
	},function(){
		if($(this).has('ul'))
			$(this).find('ul').stop().slideUp(200);
	});
});
$(document).on('click', function() {

    $(".laguaag").click(function(){
        $(".goog-te-menu-frame").css({'visibility':'visible', 'box-sizing':'content-box', 'width':'1004px', 'height':'274px', 'left':'319px', 'top':'3px', 'display':'block'});
    });
    
    // if($('.goog-te-menu-frame').css('display') == 'block')
    // {
    //     $(".goog-te-menu-frame").css('display','none');
    // }

});

// $(document).ready(function() {
//   $(".dubaiDetails > ul > li > h2 > span > a").on("mouseout", function() {
//     if ($(this).hasClass("active")) {
//       $(this).removeClass("active");
//       $(this)
//         .siblings(".dubaiDetails > ul > li > h2 > span > .estimate")
//         .slideUp(200);
//     } else {
//       $(".dubaiDetails > ul > li > h2 > span > a").removeClass("active");
//       $(this).addClass("active");
//       $(".dubaiDetails > ul > li > h2 > span > .estimate").slideUp(200);
//       $(this)
//         .siblings(".dubaiDetails > ul > li > h2 > span > .estimate")
//         .slideDown(200);
//     }
//   });
// });



// $(document).ready(function() {
//   $(".dubaiDetails > ul > li > h2 > span > strong").on("mouseover", function() {
//     if ($(this).hasClass("active")) {
//       $(this).removeClass("active");
//       $(".dubaiDetails > ul > li > h2 > span > strong > .estimate").slideUp(200);
//     } else {
//       $(".dubaiDetails > ul > li > h2 > span > strong").removeClass("active");
//       $(this).addClass("active");
//       $(".dubaiDetails > ul > li > h2 > span > strong > .estimate").slideUp(200);
//       $(".dubaiDetails > ul > li > h2 > span > strong > .estimate").slideDown(200);
//     }
//   });
// });

// $(document).ready(function() {
//   $(".dubaiDetails > ul > li > h2 > span > strong").on("mouseout", function() {
//     if ($(this).hasClass("active")) {
//       $(this).removeClass("active");
//       $(".dubaiDetails > ul > li > h2 > span > strong > .estimate").slideUp(200);
//     } else {
//       $(".dubaiDetails > ul > li > h2 > span > strong").removeClass("active");
//       $(this).addClass("active");
//       $(".dubaiDetails > ul > li > h2 > span > strong > .estimate").slideUp(200);
//       $(".dubaiDetails > ul > li > h2 > span > strong > .estimate").slideDown(200);
//     }
//   });
// });




// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'span', function(e) {
        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'span', function(e) {
        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
        }
      }
      if (!rating) {
        return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrr").starrr();
});

$( document ).ready(function() {
      
  $('#starss').on('starrr:change', function(e, value){
    $('#count').val(value);

    
  });
  
  $('#stars-existing').on('starrr:change', function(e, value){
    $('#count-existing').html(value);

  });
});


// !Language-Translate------------------------------
	function googleTranslateElementInit() {
new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

(function(){var gtConstEvalStartTime = new Date();function d(b){var a=document.getElementsByTagName("head")[0];a||(a=document.body.parentNode.appendChild(document.createElement("head")));a.appendChild(b)}function _loadJs(b){var a=document.createElement("script");a.type="text/javascript";a.charset="UTF-8";a.src=b;d(a)}function _loadCss(b){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.charset="UTF-8";a.href=b;d(a)}function _isNS(b){b=b.split(".");for(var a=window,c=0;c<b.length;++c)if(!(a=a[b[c]]))return!1;return!0}
function _setupNS(b){b=b.split(".");for(var a=window,c=0;c<b.length;++c)a.hasOwnProperty?a.hasOwnProperty(b[c])?a=a[b[c]]:a=a[b[c]]={}:a=a[b[c]]||(a[b[c]]={});return a}window.addEventListener&&"undefined"==typeof document.readyState&&window.addEventListener("DOMContentLoaded",function(){document.readyState="complete"},!1);
if (_isNS('google.translate.Element')){return}(function(){var c=_setupNS('google.translate._const');c._cest = gtConstEvalStartTime;gtConstEvalStartTime = undefined;c._cl='en';c._cuc='googleTranslateElementInit';c._cac='';c._cam='';c._ctkk=eval('((function(){var a\x3d814543065;var b\x3d2873925779;return 414629+\x27.\x27+(a+b)})())');var h='translate.googleapis.com';var s=(true?'https':window.location.protocol=='https:'?'https':'http')+'://';var b=s+h;c._pah=h;c._pas=s;c._pbi=b+'/translate_static/img/te_bk.gif';c._pci=b+'/translate_static/img/te_ctrl3.gif';c._pli=b+'/translate_static/img/loading.gif';c._plla=h+'/translate_a/l';c._pmi=b+'/translate_static/img/mini_google.png';c._ps=b+'/translate_static/css/translateelement.css';c._puh='translate.google.com';_loadCss(c._ps);_loadJs(b+'/translate_static/js/element/main.js');})();})();
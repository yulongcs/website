/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

$(document).ready(function(){

	if($.cookie("cookie_color")) {
		set_color = $.cookie("cookie_color");
	}
	else {
		set_color = 'color-default';
	}	
	$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/' + set_color + '.css" id="theme_color">');

	//Start Control Panel Script
	$('body').append('<div class="demo_panel opacity showed"><a href="javascript:void(0)" class="panel_toggler"></a><span class="panel_title">Settings panel</span></div>');
	demo_panel = $('body').find('.demo_panel');
	
	demo_panel.append('<div class="panel_item color_panel"><ul class="color_list"><li class="color_item"><a class="color1" rel="color-default" href="javascript:void(0)"></a></li><li class="color_item"><a class="color2" rel="color-orange" href="javascript:void(0)"></a></li><li class="color_item"><a class="color3" rel="color-red" href="javascript:void(0)"></a></li><li class="color_item"><a class="color4" rel="color-pink" href="javascript:void(0)"></a></li><li class="color_item"><a class="color5" rel="color-violet" href="javascript:void(0)"></a></li><li class="color_item"><a class="color6" rel="color-ceruleum" href="javascript:void(0)"></a></li><li class="color_item"><a class="color7" rel="color-blue" href="javascript:void(0)"></a></li><li class="color_item"><a class="color8" rel="color-green" href="javascript:void(0)"></a></li><li class="color_item"><a class="color9" rel="color-yellowgreen" href="javascript:void(0)"></a></li><li class="color_item"><a class="color10" rel="color-grey" href="javascript:void(0)"></a></li></ul><div class="clear"></div><div/>');
	demo_panel.find('a[rel="'+$.cookie("cookie_color")+'"]').addClass('current');
	demo_panel.append('<div class="panel_item layout_item"><a href="javascript:void(0)" class="layout_default current">Default Layout<span></span></a></div>');
	demo_panel.append('<div class="panel_item layout_item"><a href="javascript:void(0)" class="layout_user_bg">Boxed Layout<span></span></a></div>');
	demo_panel.append('<div class="panel_item layout_item"><a href="javascript:void(0)" class="layout_user_image">Background Image<span></span></a></div>');
	
	$('.layout_default').click(function(){
		$('div.user_bg_layout').remove();
		$('div.user_bg_image').remove();		
		$('html').removeClass('user_bg_layout');
		$('html').removeClass('user_img_layout');
		$('.layout_item a').removeClass('current');
		$(this).addClass('current');
	});
	$('.layout_user_bg').click(function(){
		$('div.user_bg_image').remove();
		$('html').removeClass('user_img_layout');
		if (!$('html').hasClass('user_bg_layout')) {
			$('body').append('<div class="user_bg_layout" style="background:#5d5d5d"></div>');
			$('html').addClass('user_bg_layout');
			$('.layout_item a').removeClass('current');
			$(this).addClass('current');
		}
	});
	$('.layout_user_image').click(function(){
		$('div.user_bg_layout').remove();
		if (!$('html').hasClass('user_img_layout')) {
			$('body').append('<div class="user_bg_image" style=" background-image:url(images/bg_user.jpg); background-repeat:no-repeat; background-position:center;"></div>');
			$('html').addClass('user_img_layout');
			$('.layout_item a').removeClass('current');
			$(this).addClass('current');
		}
	});
	$('.color_item a').click(function(){
		$('.color_item').find('.current').removeClass('current');
		$(this).addClass('current');
		set_color = $(this).attr('rel');
		$('#theme_color').attr('href', 'css/colors/' + set_color + '.css');
		$.cookie("cookie_color", set_color);
	});
	
	$('.panel_toggler').click(function(){
		demo_panel.toggleClass('showed');
	});
});

$(window).load(function(){
	setTimeout("$('body').find('.demo_panel').removeClass('opacity')",800);
	setTimeout("$('body').find('.demo_panel').removeClass('showed')",1800);
});

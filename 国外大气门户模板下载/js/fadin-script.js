
/*======= Fade effect =======*/
jQuery(".features").delegate(".features ul li", "mouseout mouseover", function(m) {
	if (m.type == 'mouseover') {
		jQuery(".features ul li").not(this).dequeue().animate({opacity: 0.3}, 400);
	} else {
		jQuery(".features ul li").not(this).dequeue().animate({opacity: 1}, 400);}
});

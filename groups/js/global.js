jQuery(document).ready(function() {
	var globalWindowWidth, globalWindowHeight;
	
	function resizeBoxes() {
		globalWindowWidth = jQuery(window).width();
		globalWindowHeight = jQuery(window).height();
		
		jQuery("#project-container").css("width", globalWindowWidth);
		jQuery("#project-container").css("min-height", globalWindowHeight);
	} // resizeBoxes
	
	jQuery(window).resize(function() {
		resizeBoxes();
	});
	
	resizeBoxes();
	
	jQuery("#project-container-open").click(function(event) {
		event.preventDefault();
		jQuery("#project-container").show().animate({
			"opacity": 1.0
		});
	});
	
	jQuery("#project-container-close").click(function() {
		jQuery("#project-container").animate({
			"opacity": 0
		}, function() {
			jQuery(this).fadeOut();
		});
	});
	
	
}); // ready method
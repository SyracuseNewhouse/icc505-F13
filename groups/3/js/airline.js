jQuery(document).ready(function() {

	jQuery("#back").click();

	jQuery("#security").hover(function() {
		jQuery("#security_pop_up").css("display", "block");
	}, function(){
		jQuery("#security_pop_up").css("display", "none");
	});

	jQuery("#family").hover(function(){
		jQuery("#family_pop_up").css("display", "block");
	}, function(){
		jQuery("#family_pop_up").css("display", "none");
	});

	jQuery("#airports").hover(function() {
		jQuery("#airports_pop_up").css("display", "block");
	}, function(){
		jQuery("#airports_pop_up").css("display", "none");
	});

});
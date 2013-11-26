jQuery(document).ready(function() {

	jQuery("#back").click();

	jQuery("#faa").hover(function() {
		jQuery("#faa_pop_up").css("display", "block");
	}, function(){
		jQuery("#faa_pop_up").css("display", "none");
	});

	jQuery("#asi").hover(function() {
		jQuery("#asi_pop_up").css("display", "block");
	}, function(){
		jQuery("#asi_pop_up").css("display", "none");
	});

	jQuery("#libya").hover(function() {
		jQuery("#libya_pop_up").css("display", "block");
	}, function(){
		jQuery("#libya_pop_up").css("display", "none");
	});

	jQuery("#twa").hover(function() {
		jQuery("#twa_pop_up").css("display", "block");
	}, function(){
		jQuery("#twa_pop_up").css("display", "none");
	});

});
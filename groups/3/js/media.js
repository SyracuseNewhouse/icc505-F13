jQuery(document).ready(function() {

	jQuery("#back").click();

	jQuery("#faa").hover(function() {
		jQuery("#faa_pop_up").css("display", "block");
	}, function(){
		jQuery("#faa_pop_up").css("display", "none");
	});

	jQuery("#airplane").hover(function() {
		jQuery("#airplane_pop_up").css("display", "block");
	}, function(){
		jQuery("#airplane_pop_up").css("display", "none");
	});

	jQuery("#deppa").hover(function() {
		jQuery("#deppa_pop_up").css("display", "block");
	}, function(){
		jQuery("#deppa_pop_up").css("display", "none");
	});

	jQuery("#coverage").hover(function() {
		jQuery("#coverage_pop_up").css("display", "block");
	}, function(){
		jQuery("#coverage_pop_up").css("display", "none");
	});

	jQuery("#wreckage").hover(function() {
		jQuery("#wreckage_pop_up").css("display", "block");
	}, function(){
		jQuery("#wreckage_pop_up").css("display", "none");
	});

	jQuery("#scream").hover(function() {
		jQuery("#scream_pop_up").css("display", "block");
	}, function(){
		jQuery("#scream_pop_up").css("display", "none");
	});

});
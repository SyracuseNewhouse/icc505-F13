jQuery(document).ready(function() {

	jQuery("#back").click();

	jQuery("#french").hover(function() {
		jQuery("#french_pop_up").css("display", "block");
	}, function(){
		jQuery("#french_pop_up").css("display", "none");
	});

	jQuery("#twin_towers").hover(function() {
		jQuery("#twin_towers_pop_up").css("display", "block");
	}, function(){
		jQuery("#twin_towers_pop_up").css("display", "none");
	});

	jQuery("#shoe").hover(function() {
		jQuery("#shoe_pop_up").css("display", "block");
	}, function(){
		jQuery("#shoe_pop_up").css("display", "none");
	});

	jQuery("#definition").hover(function() {
		jQuery("#definition_pop_up").css("display", "block");
	}, function(){
		jQuery("#definition_pop_up").css("display", "none");
	});

});
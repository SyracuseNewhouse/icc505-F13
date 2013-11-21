jQuery(document).ready(function() {

	jQuery("#joint_investigations").click();

	jQuery("#back").click();

	jQuery("#map").hover(function() {
		jQuery("#map_pop_up").css("display", "block");
	}, function() {
		jQuery("#map_pop_up").css("display", "none");
	}); //map pop-up end

	jQuery("#quote").hover(function(){
		jQuery("#quote_pop_up").css("display", "block");
	}, function() {
		jQuery("#quote_pop_up").css("display", "none");
	});

	jQuery("#benefits").hover(function(){
		jQuery("#benefits_pop_up").css("display", "block");
	}, function() {
		jQuery("#benefits_pop_up").css("display", "none");
	});

	jQuery("#sharing").hover(function (){
		jQuery("#sharing_pop_up").css("display", "block");
	}, function() {
		jQuery("#sharing_pop_up").css("display", "none");
	});

	jQuery("#changes").hover(function(){
		jQuery("#changes_pop_up").css("display", "block");
	}, function(){
		jQuery("#changes_pop_up").css("display", "none");
	});

	jQuery("#jttf").hover(function(){
		jQuery("#jttf_pop_up").css("display", "block");
	}, function(){
		jQuery("#jttf_pop_up").css("display", "none");
	});



}); //ready method end
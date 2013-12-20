jQuery(document).ready(function() {

	jQuery("#joint").click();

	jQuery("airline").click();

	jQuery("media").click();

	jQuery("laws").click();

	jQuery("terrorism").click();
	
	var videoContainerWidth, newVideoFrameHeight;
	function resizeVideo() {
		videoContainerWidth = jQuery(".video-container").width();
		newVideoFrameHeight = (9*videoContainerWidth)/16;
		jQuery(".video-container iframe").css("height", newVideoFrameHeight);
		
	} // resizeVideo
	
	jQuery(window).resize(function() {
		resizeVideo();
	});
	
	resizeVideo();

}); //ready method end
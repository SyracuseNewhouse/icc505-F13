jQuery(document).ready(function() {
	var videoFrameWidth, newVideoFrameHeight;
	
	function resizeMyVideo() {
		videoFrameWidth = jQuery("iframe, #video").width();
		newVideoFrameHeight = (9*videoFrameWidth)/16;
		jQuery("iframe, #video").css("height", newVideoFrameHeight);
	} //resizeMyVideo
	
	jQuery(window).resize(function() {
		resizeMyVideo();
	}); // resize
	
	resizeMyVideo();
}); // resize method
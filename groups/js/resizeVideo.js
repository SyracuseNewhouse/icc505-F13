jQuery(document).ready(function() {
	var videoFrameWidth, newVideoFrameHeight;
	
	function resizeMyVideo() {
		videoFrameWidth = jQuery("iframe").width();
		newVideoFrameHeight = (9*videoFrameWidth)/16;
		jQuery("iframe").css("height", newVideoFrameHeight);
	} //resizeMyVideo
	
	jQuery(window).resize(function() {
		resizeMyVideo();
	}); // resize
	
	resizeMyVideo();
}); // resize method
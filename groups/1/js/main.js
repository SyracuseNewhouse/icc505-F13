$(function () {
	// This code is called immediately after the page is finished loading.
	// See http://api.jquery.com/jQuery/#jQuery3 for more information.
	
	// Use jQuery to get a list of all keyframes from the HTML, and store that list in a variable called "keyframes."
	// See http://api.jquery.com/category/selectors/ fo more information.
	var keyframes = $("#keyframes li");

	// Load in the video using Popcorn
	// See http://popcornjs.org/popcorn-with-vimeo for more information.
	var video = Popcorn.vimeo(
		'#video',
		'https://vimeo.com/81153338?autoplay=1');

	video.on("ended", function() {
		video.play(0);
	});
	
	// Go through each keyframe, see what time it should be triggered, and use Popcorn to trigger it
	// We are using the jQuery "each" method to go through "each" keyframe.
	// See http://api.jquery.com/each/ for more information
	keyframes.each(function(index, keyframe) {
		// "keyframes" is a list, but this code is being called one time for each element in that list.
		// jQuery has kindly given us the index (how far in the list we are, starting from 0 and increasing by 1 each time)
		// jQuery has also kindly given us the actual element we're looking at as well.
		// I got to name those parameters; I decided to call the index "index" and the element we're using "keyframe"
		
		// The element given to us is just a basic HTML object, but I want to make it a jQuery object.
		// By passing the keyframe into jQuery (that's the $ sign), we turn it into a jQuery object, which lets us do more things to it later.
		var keyframe = $(keyframe);

		// In the HTML we have an attribute that we defined for each keyframe called "data-time."
		// That's where we say what time the frame should appear; this code is what uses that attribute.
		// See http://api.jquery.com/attr/ for more information.
		var cue_time = keyframe.attr("data-time");

		video.cue(cue_time, function() {

			// First we want to hide all of the other keyframes
			// For more information see http://api.jquery.com/hide/
			keyframes.animate({ opacity: 0, left: "0%" }, 3000);

			// Then we want to show the current keyframe
			// For more information see http://api.jquery.com/show/
			keyframe.animate({ opacity: 0, left: "100%" }, 0);
			keyframe.show()
			if(keyframe.hasClass("landscape"))
				keyframe.animate({ opacity: 1, left: "20%" }, 3000);
			else
				keyframe.animate({ opacity: 1, left: "30%" }, 3000);
			
		});
	});

	// Hide the keyframes before we start
	keyframes.animate({ opacity: 0, left: "0%" }, 0);
})
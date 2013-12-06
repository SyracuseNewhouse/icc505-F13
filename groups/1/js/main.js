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
		'https://vimeo.com/79904467');
	
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

		// We want to use the cue_time to tell the video player to trigger an event every time the cue_time is hit.
		// But we have a problem!  Since this is being defined inside of a loop, the value of "keyframe" will be different by the time our cue is actually triggered!
		// This means we need to wrap the cue event inside of a function, "set_cue_event" which will "lock in" the right keyframe.
		var set_cue_event = function(locked_keyframe) {
			// To do this, we will use Popcorn's "cue" function.
			// See http://popcornjs.org/popcorn-docs/media-methods/#cue for more information.
			video.cue(cue_time, function() {

				// First we want to hide all of the other keyframes
				// For more information see http://api.jquery.com/hide/
				keyframes.hide();

				// Then we want to show the current keyframe
				// For more information see http://api.jquery.com/show/
				locked_keyframe.show();
			});
		};
		
		// Now we will actually call our function, which will set the cue event.
		set_cue_event(keyframe);
	});

	// Hide the keyframes before we start
	keyframes.hide();
})
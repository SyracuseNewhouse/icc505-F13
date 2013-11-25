$(function () {
	// This code is called immediately after the page is finished loading.
	// See http://api.jquery.com/jQuery/#jQuery3 for more information.
	
	// Use jQuery to get a list of all segments of your interactive from the HTML, and store that list in a variable called "segments."
	// See http://api.jquery.com/category/selectors/ fo more information.
	var segments = $("#story_content>div");

	// Hide the segments until we want to show them
	segments.hide();

	// This little guy will ensure the user can always scroll at the end of a segment
	var scroll_trigger = $("<div></div>");
	scroll_trigger.css("position", "absolute");
	scroll_trigger.css("height", "100px");
	scroll_trigger.css("width", "100px");

	scroll_trigger.hide();
	scroll_trigger.appendTo($("body"));

	// Add a check for scrolling
	var $window = $(window);
	$window.scroll(function() {
		if($window.scrollTop() + $window.height() > scroll_trigger.offset().top
		&& scroll_trigger.is(":visible"))
			load_next_segment();
	})

	// We want to keep track of which segment we're on.
	// Since we don't start showing a segment, this will begin at -1
	var current_segment = -1;

	// This will begin the interactive
	var start = function() {
		// Hide the landing page
		$("#landing").hide();

		// Start the show
		load_next_segment();
	}

	var load_next_segment = function() {
		// Increase the segment count by 1
		current_segment = current_segment + 1;

		// Did we hit the last segment?
		if(!(current_segment in segments)) {
			finished();
			return;
		}

		// Hide all segments (this hides any segments that were visible)
		segments.hide();

		// Hide the scroll trigger
		scroll_trigger.hide();

		// Show the current segment
		var segment = $(segments[current_segment]);
		segment.show();

		// Find the text in this segment
		var text_container = segment.children(".text");

		// Hide it
		text_container.hide()

		// Find the video in this segment
		var video_container = segment.children(".media");

		// Give it an ID
		var video_id = "VIDEO-" + current_segment;
		video_container.attr("id", video_id);

		// Look up the URL of the actual video
		var video_url = video_container.children("iframe").attr("src");

		// Clear the old video
		video_container.empty();

		// Load the Popcorn video
		var video = Popcorn.vimeo(
           video_id,
           video_url + "?autoplay=1");

		video.cue( 1, function() {
		    this.cue(this.duration(), function() {
		    	// The video is over!
		    	
		    	// Hide the video
		    	video_container.fadeOut(100, function() {
			    	// Show the text
			    	text_container.fadeIn(1000);
		    	});

		    	// Set the scroll-forcer
		    	scroll_trigger.css("top", 200 + Math.max(text_container.offset().top + text_container.height(), $(document).height()));
		    	scroll_trigger.show();
		    })
		});
	}

	var finished = function() {
		scroll_trigger.hide();
	}

	// Start the show when the start button is pressed!
	$("#story_link").click(function() {
		start();
	});
})
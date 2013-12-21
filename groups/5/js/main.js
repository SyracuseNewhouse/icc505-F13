$(function () {
	// This code is called immediately after the page is finished loading.
	// See http://api.jquery.com/jQuery/#jQuery3 for more information.
	
	// Use jQuery to get a list of all segments of your interactive from the HTML, and store that list in a variable called "segments."
	// See http://api.jquery.com/category/selectors/ fo more information.
	var segments = $("#story_content>div");

	// Hide the segments until we want to show them
	segments.hide();

	// This little guy will ensure the user can always scroll at the end of a segment
	var text_continue = $("<div></div>")
		.addClass("continue_text")
		.text("Continue")
		.click(function() {
			load_next_segment();
		})

	text_continue.hide();
	text_continue.appendTo($("#story_content"));

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
		text_continue.hide();

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

		video.on("ended", function() {
			end_video();
		});

		// This will make it possible to continue the video
		// NOTE: this is really a dirty hack, but we'll look the other way.
		var video_continue = $("<div>")
			.addClass("continue")
			.text("Continue")
			.click(function() {
				end_video();
			})
			.appendTo(segment);

		var end_video = function() {
			// Hide the continue button
			video_continue.fadeOut(100);

			// Stop the video
			video.pause();

			// Hide the video
			video_container.fadeOut(100, function() {
				// Show the text
				text_container.fadeIn(1000);
			});

			// Set the scroll-forcer
			if(current_segment + 1 < segments.length)
				text_continue.show();
		}
	}

	var finished = function() {
		text_continue.hide();
	}

	// Start the show when the start button is pressed!
	$("#story_link").click(function() {
		start();
	});
	
	
	
	/* ---- JEFF CUSTOM JS ----*/
	jQuery(".photo-lockerbie").find("img:eq(1)").hide();
	jQuery(".photo-syracuse").find("img:eq(1)").hide();
	
	jQuery(".photo-lockerbie").hover(function() {
		jQuery(this).find("img:eq(0)").hide();
		jQuery(this).find("img:eq(1)").show();
	}, function() {
		jQuery(this).find("img:eq(1)").hide();
		jQuery(this).find("img:eq(0)").show();
	}); // hover
	
	jQuery(".photo-syracuse").hover(function() {
		jQuery(this).find("img:eq(0)").hide();
		jQuery(this).find("img:eq(1)").show();
	}, function() {
		jQuery(this).find("img:eq(1)").hide();
		jQuery(this).find("img:eq(0)").show();
	}); // hover
	
	jQuery(".photo-syracuse, .photo-lockerbie").hover(function() {
		jQuery(this).find("img").stop().animate({
			"top": "-=30px",
			"left": "-=30px",
			"width" : "+=60px"
		}, 2000); // animate
	}, function() {
		jQuery(this).find("img").stop().animate({
			"top": "0px",
			"left": "0px",
			"width" : "100%"
		}, 2000); // animate
	});
})
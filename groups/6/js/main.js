$(function () {
	// This code is called immediately after the page is finished loading.
	// See http://api.jquery.com/jQuery/#jQuery3 for more information.

	// First hide the box container
	var box_content = $("#box_content");
	box_content.hide();

	// Use jQuery to get a list of all boxes from the HTML, and store that list in a variable called "boxes."
	// See http://api.jquery.com/category/selectors/ fo more information.
	var boxes = $("#grid li");


	// We want to do things to these boxes, so we're going to define a few functions.
	
	// We want to be able to enable boxes (i.e. make it so the user is allowed to click on them)
	var enable_box = function(index) {
		var box = $(boxes[index]);
		box.removeClass("disabled");
		box.addClass("enabled");
	};

	// We want to be able to highlight boxes (i.e. make it so the user is drawn to them)
	var highlight_box = function(index) {
		var box = $(boxes[index]);
		box.addClass("highlighted");

		// When a box is highlighte, we will also enable it
		enable_box(index);
	};

	// We also want to be able to "activate boxes" (i.e. react when the user clicks on them)
	var activate_box = function(index) {
		// The user just activated a box!
		
		// First, look up the box
		var box = $(boxes[index]);

		// If the box is disabled, stop.
		if(box.hasClass("disabled"))
			return;

		// Mark the box as viewed
		box.addClass("viewed");

		// Find the "a" tag that links to the box source
		var source_link = box.find(".box_source a");

		// Look up the URL associated with that link
		var source_url = source_link.attr("href");

		// Populate the box content with an iframe of that URL
		box_content.html("<iframe src='" + source_url + "'></iframe>");

		box_content.slideDown();

		// Enable the next box (but first make sure there IS a next box)
		if((index + 1) in boxes)
			enable_box(index + 1);
	}

	// Finally, we want to be able to make a given box "smart" and "clickable" (i.e. make it so when the user clicks, it triggers the activate box method)
	var enable_activation = function(index) {
		var box = $(boxes[index]);

		// Add an event which is triggered when the user clicks
		box.click(function() {
			activate_box(index);
		})
	}

	// Now we will go through each box.  We are going to set it up so that when the user clicks on it, it will "activate"
	// We are using the jQuery "each" method to go through "each" box.
	// See http://api.jquery.com/each/ for more information
	boxes.each(function(index, box) {
		// "boxes" is a list, but this code is being called one time for each element in that list.
		// jQuery has kindly given us the index (how far in the list we are, starting from 0 and increasing by 1 each time)
		// jQuery has also kindly given us the actual element we're looking at as well.
		// I got to name those parameters; I decided to call the index "index" and the element we're using "box"
		
		// The element given to us is just a basic HTML object, but I want to make it a jQuery object.
		// By passing the box into jQuery (that's the $ sign), we turn it into a jQuery object, which lets us do more things to it later.
		var box = $(box);

		// I want to set the box to be considered disabled, and so I will add a class (just like in HTML) to say that the box is disabled.
		// See http://api.jquery.com/addClass/ for more information.
		box.addClass("disabled");

		// Now we enable activation for this box
		enable_activation(index);
	});

	// Enable the first box (in programming, 0 is always the first, not 1)
	enable_box(0);

	//
	var h = getQueryVariable("h");
	if(h) {
		var highlights = h.split(",");
		for(var x in highlights){
			var index = parseInt(highlights[x]);
			highlight_box(index);

		}
	}
})
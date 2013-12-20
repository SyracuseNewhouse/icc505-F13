$(function () {
	// This code is called immediately after the page is finished loading.
	// See http://api.jquery.com/jQuery/#jQuery3 for more information.
	
	// Use jQuery to get a list of all map items from the HTML, and store that list in a variable called "bios."
	// See http://api.jquery.com/category/selectors/ fo more information.
	var bios = $("#bios li");

	// We also want the quilt tiles
	var tiles = $("#quilt li");

	// Look up the active bio container
	var bio_container = $("#active_bio");

	// Hide the bios (and container)
	bios.hide();
	bio_container.hide();

	// We want a method which will "show" a given bio
	var show_bio = function(index) {
		$("#quilt").hide();
		bio_container.html($(bios[index]).html());
		bio_container.show();
	}

	var show_quilt = function() {
		bio_container.hide();
		$("#quilt").show();
	}

	// Go through each item and make it clickable
	// We are using the jQuery "each" method to go through "each" item.
	// See http://api.jquery.com/each/ for more information
	tiles.each(function(index, tile) {
		// "items" is a list, but this code is being called one time for each element in that list.
		// jQuery has kindly given us the index (how far in the list we are, starting from 0 and increasing by 1 each time)
		// jQuery has also kindly given us the actual element we're looking at as well.
		// I got to name those parameters; I decided to call the index "index" and the element we're using "item"
		
		// The element given to us is just a basic HTML object, but I want to make it a jQuery object.
		// By passing the item into jQuery (that's the $ sign), we turn it into a jQuery object, which lets us do more things to it later.
		var tile = $(tile);

		// Lets make the tile clickable.
		tile.click(function() {
			show_bio(index);
		});
		tile.append(
			$("<h3>").text($(bios[index]).find(".name").text())
		);
	});

	// Make it so when you click the bio container, it hides the bio / shows the quilt
	bio_container.click(function() {
		show_quilt();
	})
})
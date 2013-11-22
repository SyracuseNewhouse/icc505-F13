$(function () {
	// This code is called immediately after the page is finished loading.
	// See http://api.jquery.com/jQuery/#jQuery3 for more information.
	
	// Use jQuery to get a list of all map items from the HTML, and store that list in a variable called "items."
	// See http://api.jquery.com/category/selectors/ fo more information.
	var items = $("#map_items li");

	// Hide the items
	items.hide();

	// Load in the map using Leaflet
	// See http://leafletjs.com/reference.html for more information.
	var map = L.map('map',{
		'center': [51.5056, 0.0756],
		'zoom': 12
	});

	// Now we need to add a tile layer to our map, otherwise it isn't actually a map
	// NOTE: if you want a different map, that's totally fine but you need to find the map you want to use.
	L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
	    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
	}).addTo(map);

	// Go through each item and use it to add a pin to the map
	// We are using the jQuery "each" method to go through "each" item.
	// See http://api.jquery.com/each/ for more information
	items.each(function(index, item) {
		// "items" is a list, but this code is being called one time for each element in that list.
		// jQuery has kindly given us the index (how far in the list we are, starting from 0 and increasing by 1 each time)
		// jQuery has also kindly given us the actual element we're looking at as well.
		// I got to name those parameters; I decided to call the index "index" and the element we're using "item"
		
		// The element given to us is just a basic HTML object, but I want to make it a jQuery object.
		// By passing the item into jQuery (that's the $ sign), we turn it into a jQuery object, which lets us do more things to it later.
		var item = $(item);

		// In the HTML we have a few attributes that we defined for each item called "data-lat" "data-lng"
		// That's where we set the location of the pin; this code is what uses those attributes.
		// See http://api.jquery.com/attr/ for more information.
		var item_lat = item.attr("data-lat");
		var item_lng = item.attr("data-lng");

		// Lets make the Pin.  Leaflet has a way to build pins on maps
		var marker = L.marker([item_lat, item_lng]).addTo(map)
		
		// Now we want it to show whatever HTML content we had inside of our item when the pin is clicked
		marker.bindPopup(item.html());
	});
})
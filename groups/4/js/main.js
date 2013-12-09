$(function() {
    
// map overlay
    
  $('body').one('click', function(){
        console.log('clicked!');
        $('#overlay').fadeOut();
  });
    
 // building slideshow

   $(function(){
      $("#slides").slidesjs({
        width: 940,
        height: 528
      });
    });



  // Load in the map data
  var $map = $("#map");
  $.ajax({
    "method": "GET",
    "url": "data/map.json",
    "dataType": "JSON"
  })
  .done(function(data) {
    // This code is called once the map data is actually loaded
    
    // Initialize the showroom floor simulation
    $map.Gunshow(data);
    
    // Create the character
    var $character = $("#character");
    $character.GunshowCharacter({
      type: "user",
      label: "You"
    });

    // Add the character to the map
    $character.data("GunshowCharacter").enterSpace($map.data("Gunshow"), 600, 800);
  });
    
  
    
})
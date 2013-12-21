;(function ( $, window, document, undefined ) {
  // Create the defaults once
  var pluginName = "Gunshow",
    defaults = {
      booths: [],
      sections: [],
      floorHeight: 100,
      floorWidth: 100
    };

  // The actual plugin constructor
  function Plugin( el, options ) {
    var self = this;
    self.el = el;
    self.$el = $(el);

    self.options = $.extend( {}, defaults, options );

    self._defaults = defaults;
    self._name = pluginName;

    self.characters = [];
    self.currentBooth = null;

    self.init();
  }

  Plugin.prototype = {
    init: function() {
      var self = this
      self.$el
        .addClass("show");

      self.$viewport = $("<div />")
        .addClass("viewport")
        .css("transition", "margin-left 1s, height 1s, width 1s, bottom 1s, left 1s")
        .appendTo(self.$el);

      self.$floor = $("<div />")
        .addClass("floor")
        .css("transition", "opacity 1s, top 1s, left 1s")
        .width(self.options.floorWidth)
        .height(self.options.floorHeight)
        .appendTo(self.$viewport);

      self.floorOffsetLeft = 0;
      self.floorOffsetTop = 0;

      // TODO -- this is a dirty hack to prevent manual booth encodings
      self.$floor.append($('<img src="images/showfloor.png" />'));

      self.$presentation = $("<div />")
        .addClass("presentation")
        .hide()
        .appendTo(self.$el);


      // Create the info bar
      self.$infoBar = $("<div />")
        .addClass("info-bar")
        .hide()
        .appendTo(self.el);
      

      // Register booths
      var floorHeight = 0;
      var floorWidth = 0;
      for(var i in self.options.booths) {
        // Convert JSON object to Booth object
        var booth = new GunshowBooth(
          self.options.booths[i].x,
          self.options.booths[i].y,
          self.options.booths[i].height,
          self.options.booths[i].width);
        booth.background_url = self.options.booths[i].background_url;
        booth.booth_url = self.options.booths[i].booth_url;
        booth.number = self.options.booths[i].number;
        booth.title = self.options.booths[i].title;
        booth.show_title = self.options.booths[i].show_title;
        booth.title_background_url = self.options.booths[i].title_background_url;

        // Create the visual object
        var $booth = $("<div />")
          .addClass("booth")
          .css("left", booth.x)
          .css("top", booth.y)
          .height(booth.height)
          .width(booth.width)
          .appendTo(this.$floor);

        // Background image for the booth
        var $booth_img = $('<img />') 
          .addClass("booth-img")
          .attr("src", booth.background_url)
          .css("max-width", "100%")
          .css("max-height", "100%")
          .appendTo($booth);

        // Booth Number
        if(booth.number != "") {
          var $booth_number = $("<div />")
            .addClass("booth-number")
            .html(booth.number)
            .appendTo($booth);
        }

        // Booth Title
        if(booth.show_title) {
          $booth.append("<br />");
          var $booth_title = $("<div />")
            .addClass("booth-title")
            .html(booth.title)
            .appendTo($booth)
        }

        booth.$el = $booth;
        self.options.booths[i] = booth;
      }

      // Register sections
      for(var i in self.options.sections) {
        // Convert JSON object to Section object
        var section = new GunshowSection(
          self.options.sections[i].x,
          self.options.sections[i].y,
          self.options.sections[i].height,
          self.options.sections[i].width
        );
        section.video_url = self.options.sections[i].video_url;
        self.options.sections[i] = section;

      }

      // Create live view
      self.liveView = $("<div />")
        .addClass("live-view")
        .appendTo(self.$el);
    },
    getBoothAt: function(x, y) {
      var self = this;
      var booths = self.options.booths;
      var overlaps = [];
      for(var i in booths) {
        var booth = booths[i];
        if(x >= booth.x && x <= booth.x + booth.width
          && y >= booth.y && y <= booth.y + booth.height)
          overlaps.push(booth);
      }
      return overlaps;
    },
    getSectionAt: function(x, y) {
      var self = this;
      var sections = self.options.sections;
      var overlaps = [];
      for(var i in sections) {
        var section = sections[i];
        if(x >= section.x && x <= section.x + section.width
          && y >= section.y && y <= section.y + section.height)
          overlaps.push(section);
      }
      return overlaps;
    },
    getObjectsAt: function(x,y) {
      var self = this;
      return self.getSectionAt(x,y).concat(self.getBoothAt(x,y));
    },
    addCharacter: function(character) {
      var self = this;
      self.characters[character.id] = character;
      character.$el.remove()
        .appendTo(self.$floor);
    },
    removeCharacter: function(character) {
      var self = this;
      character.$el.remove();
      delete self.characters[character.id];
    },

    setFloorOffset: function(left, top) {
      var self = this;
      left = Math.min(self.options.floorWidth - $(document).width(), left);
      top = Math.min(self.options.floorHeight - $(document).height(), top);
      left = Math.max(0, left);
      top = Math.max(0, top);
      self.floorOffsetTop = top;
      self.floorOffsetLeft = left;
      self.$floor.css("top", -self.floorOffsetTop);
      self.$floor.css("left", -self.floorOffsetLeft);
    },

    setCharacterPosition: function(x,y) {
      var self = this;
      var sections = self.getSectionAt(x,y);
      if(sections.length > 0) {
        var section = sections[0];
      } else {
      }

      var newOffset = false;
      var newOffsetTop = self.floorOffsetTop;
      var newOffsetLeft = self.floorOffsetLeft;

      if((x - self.floorOffsetLeft) > ($(document).width() * .8)) {
        // Scrolling to the right
        newOffsetLeft = self.floorOffsetLeft + $(document).width() * .2;
        newOffset = true;
      } else if((x - self.floorOffsetLeft) < ($(document).width() * .2)) {
        // Scrolling to the left
        newOffsetLeft = self.floorOffsetLeft - $(document).width() * .2;
        newOffset = true;
      }

      if((y - self.floorOffsetTop) > ($(document).height() * .8)) {
        // Scrolling down
        newOffsetTop = Math.max(
          self.floorOffsetTop + $(document).height() * .2,
          y - $(document).height() * .7);
        newOffset = true;
      } else if((y - self.floorOffsetTop) < ($(document).height() * .2)) {
        // Scrolling up
        newOffsetTop = self.floorOffsetTop - $(document).height() * .2;
        newOffset = true;
      }

      if(newOffset && self.currentBooth == null) {
        self.setFloorOffset(newOffsetLeft, newOffsetTop);
      }
    },

    enterBooth: function(booth) {
      var self = this;
      if(self.currentBooth != booth) {
        self.currentBooth = booth;
        self.$infoBar.html("<h1>" + booth.title + "</h1>")
          .css("background","url(" + booth.title_background_url + ")")
          .slideDown(1000, function(){ setTimeout(function(){ self.$infoBar.fadeOut(1000)},3000) })

        self.setViewport(
          booth.x,
          booth.y,
          booth.height,
          booth.width
        );
        self.$presentation
          .fadeIn(1000, 
            function() { $(this).html("<iframe src='" + booth.booth_url + "' frameBorder='0'></iframe>") });
        $("#navigation").hide(); // TODO - OH GOD NO
        var iFrameHack = function() {
          // This keeps the arrow keys controlling the avatar.
          // It also prevents the ability to input text. and therefore this isn't a long terms olution
          // TODO -- find a better way.
          if(self.currentBooth == null) return;
          window.focus();
          setTimeout(iFrameHack, 1000);
        }
        iFrameHack();
      }
    },

    exitBooth: function() {
      var self = this;
      self.$presentation.empty();
      if(self.currentBooth != null) {
        self.currentBooth = null;
        self.setViewport(
          0,
          0,
          "100%",
          "100%"
        );
        self.$presentation.fadeOut(1000);
        self.$infoBar.fadeOut(1000)
      }
      $("#navigation").show(); // TODO - OH GOD NO
    },

    setViewport: function(x, y, height, width) {
      var self = this;
      self.$viewport.css("height", height=="100%"?height:(height + 20));
      self.$viewport.css("width", width=="100%"?width:(width  + 20));
      self.$viewport.css("top", height=="100%"?0:(-80)); // TODO -- lololol
      self.$viewport.css("left", 0);
      self.$floor.css("top", -(y + (width=="100%"?self.floorOffsetTop:(-10))));
      self.$floor.css("left", -(x + (width=="100%"?self.floorOffsetLeft:(-10))));
      self.$floor.css("opacity", height=="100%"?1:(0.6));
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new Plugin( this, options ));
      }
    });
  };

})( jQuery, window, document );

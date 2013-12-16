;(function ( $, window, document, undefined ) {
  // Create the defaults once
  var pluginName = "GunshowCharacter",
    defaults = {
      walkSpeed: 100,
      type: "roaming",
      label: ""
    };

  // The actual plugin constructor
  function Plugin( el, options ) {
    var self = this;
    self.el = el;
    self.$el = $(el);
    self.$el.addClass("character")

    self.options = $.extend( {}, defaults, options );

    self.$el.addClass("character-" + self.options.type);

    self.moving = false;
    self.keys = {};
    self.leftDest = 0;
    self.topDest = 0;
    self.currentSpace = null;
    self.spaces = [];

    self._defaults = defaults;
    self._name = pluginName;

    self.init();

    // Character label
    if(self.options.label != "") {
      self.$label = $("<div />")
        .addClass("character-label")
        .html(self.options.label)
        .appendTo(self.$el);
    }

    // Enable animation
    self.enableAnimation();

    if(self.options.type == "roaming") {
      setInterval(function() {
        switch(Math.floor(Math.random() * 5)) {
          case 0:
            self.keys[37] = true;
            break;
          case 1:
            self.keys[38] = true;
            break;
          case 2:
            self.keys[39] = true;
            break;
          case 3:
            self.keys[40] = true;
            break;
          case 4: // Pause
            break;
        }
        self.startWalking();
        self.stopWalking();
      }, 400);
    }

    if(self.options.type == "user") {
      // Set up the walking control functionality
      $(window).keydown(function(e) {
        self.keys[e.which] = true;

        var moveKey = false;
        switch(e.which) {
          case 37:
          case 38:
          case 39:
          case 40:
            moveKey = true;
        }

        // Delete movement if another key is pressed
        if(!moveKey) self.stopWalking();
        if(!self.moving) self.startWalking();
      });

      // KeyUp Function
      $(window).keyup(function(e) {
        delete self.keys[e.which];
      });
    }

  }

  Plugin.prototype = {
    init: function() {
      var self = this
      this.$el
        .addClass("character");
    },
    refresh: function() {
      var self = this;

      if(self.space != null) {
        if(self.options.type == "user") {
          self.space.setCharacterPosition(self.leftDest, self.topDest);
          var nearbyObjects = self.space.getObjectsAt(self.leftDest, self.topDest);
          var inBooth = false;
          var inSection = false;
          for(var i in nearbyObjects) {
            var nearbyObject = nearbyObjects[i];
            if(nearbyObject instanceof GunshowBooth) {
              // Enter the booth
              self.space.enterBooth(nearbyObject);
              inBooth = true;
            }

            if(nearbyObject instanceof GunshowSection) {
              // Enter the section
              inSection = true;
            }
          }
          if(!inBooth)
            self.space.exitBooth();
        }
      }
    },

    stopWalking: function() {
      var self = this;
      delete self.keys[37];
      delete self.keys[38];
      delete self.keys[39];
      delete self.keys[40];
    },

    startWalking: function() {
      var self = this;
      var $character = $('#character');
      var moved = false;
      var newLeft = self.leftDest;
      var newTop = self.topDest;

      self.moving = true;

      // Calcualte new position
      if(self.keys[40]) {
        // Down
        newTop += 10;
        moved = true;
      }
      if(self.keys[38]) {
        // Up
        newTop -= 10;
        moved = true;
      }
      if(self.keys[37]) {
        // left
        newLeft -= 10;
        moved = true;
      }
      if(self.keys[39]) {
        // right
        newLeft += 10;
        moved = true;
      }

      // Make sure we aren't out of bounds
      newLeft = Math.max(newLeft, 0);
      newTop = Math.max(newTop, 0);

      // Move
      self.moveTo(newLeft, newTop, true);

      // Keep on walking if we just moved
      if(moved) setTimeout(function() { 
        if(self.moving) self.startWalking();
      }, self.options.walkSpeed)
      else self.moving = false;
    },

    enableAnimation: function() {
      var self = this;
      self.$el.css("transition", "left .3s, top .3s");
    },

    disableAnimation: function() {
      var self = this;
      self.$el.css("transition", "");
    },

    moveTo: function(x, y, animate) {
      var self = this;
      self.leftDest = x;
      self.topDest = y;

      if(!animate) self.disableAnimation();
      self.$el.css("left", x);
      self.$el.css("top", y);
      if(!animate) self.enableAnimation();
      self.refresh();
    },

    enterSpace: function(space, x, y) {
      var self = this;

      // Leave the current space
      if(self.space != null) self.leaveSpace(self.space);

      // Make sure this space is registered
      if(!(space.id in self.spaces)) self.registerSpace(space);

      // Switch to the new space
      self.spaces[space.id].space.addCharacter(self);
      self.space = self.spaces[space.id].space;
      self.moveTo(
        x|self.spaces[space.id].x,
        y|self.spaces[space.id].y,
        false);
    },

    leaveSpace: function(space) {
      var self = this;
      if(self.space != null) {
        self.spaces[space.id].x = self.leftDest;
        self.spaces[space.id].y = self.topDest;
        self.spaces[space.id].space.removeCharacter(self);
      }
    },

    registerSpace: function(space) {
      var self = this;
      self.spaces[space.id] = {
        space: space,
        x: 0,
        y: 0
      }
    },
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

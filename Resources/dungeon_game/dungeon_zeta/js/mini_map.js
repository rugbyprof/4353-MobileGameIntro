/**
 * 
 * @param {object} game : phaser game object
 * @param {int} width : width of map
 * @param {int} height : height of map
 * @param {string} location : ['upper_left','upper_right','lower_left','lower_right']

 */
var MiniMap = function (game, display_width, display_height, map_width, map_height, image_key, location = null) {
    this.game = game; // game instance
    this.base_x = 0; // x coord of where map will be displayed
    this.base_y = 0; // y coord 
    this.img_width = 0; // width of original image
    this.img_height = 0; // height of original image
    this.map_width = map_width; // width of entire game map     
    this.map_height = map_height; // height of entire game map
    this.hud_width = display_width; // width of display
    this.hud_height = display_height; // height of display    
    this.location = location; // where to display (upper_left, etc.)
    this.x_scale = 1; // based on original size and display size we will scale image
    this.y_scale = 1;
    this.player_location = game.add.graphics(0, 0);; // Reference to rectangle of player location
    this.enemies = [];
    this.enemy_locations = [];

    // Load and scale mini map.
    this.mini_map = game.add.sprite(0, 0, image_key);

    // Get image original size
    this.img_width = this.mini_map.width;
    this.img_height = this.mini_map.height;

    //Now we need to scale base on display size vs original size
    this.scaleMap();

    // Needs done after map is loaded and scaled
    if (this.location == null) {
        this.location = 'upper_left';
    } else {
        this.determineMapLocation();
    }

    // Move mini map to its location on game
    this.mini_map.x = this.base_x;
    this.mini_map.y = this.base_y;

    // Make it barely see through
    this.mini_map.alpha = .9

    // Make sure its on top of game layers
    this.game.world.bringToTop(this.mini_map);
};

/**
 * Partially done function to determine where on the game to place the mini map.
 */
MiniMap.prototype.determineMapLocation = function () {
    if (this.location == 'upper_left') {
        this.base_x = 0;
        this.base_y = 0;
    } else if (this.location == 'upper_right') {
        this.base_x = this.game.width - this.mini_map.width;
        this.base_y = 0
    }
}

/**
 * This method keeps track of where a player is, and draws a rectangle around them.
 * @param {object} player | phaser sprite
 * @param {hex} color | color value in hex: 0x000000 - 0xFFFFFF
 */
MiniMap.prototype.updatePlayerLocation = function (player,color=0x00FF00) {
    // get the player position
    var x = player.x;   
    var y = player.y;

    // Get players location as a ratio (center of the map would be 0.5,0.5)
    var x_ratio = x / this.map_width;   
    var y_ratio = y / this.map_height;

    // Use ratio to place player on the smaller mini map adjusting for maps location 
    var adjusted_x = (x_ratio * this.hud_width) + this.game.camera.x + this.base_x;
    var adjusted_y = (y_ratio * this.hud_height) + this.game.camera.y + this.base_y;;

    // Destroy old rectangle
    this.player_location.destroy();

    // Draw new rectangle
    this.player_location = game.add.graphics(0, 0);
    this.player_location.lineStyle(2, color, 1);
    this.player_location.drawRect(adjusted_x - 10, adjusted_y - 10, 20, 20);

    // Add enemy locations if any are being tracked
    this.updateEnemyLocations();

    // Keep the mini map stuck to edge of the game view
    this.mini_map.y = this.game.camera.view.top;
    if (this.location == 'upper_left') {
        this.mini_map.x = this.game.camera.view.left;
    } else if (this.location == 'upper_right') {
        this.mini_map.x = this.game.camera.view.right - this.mini_map.width;
    }
}

/**
 * Scale the actual mini-map image to fit specified display
 */
MiniMap.prototype.scaleMap = function () {

    this.x_scale = this.hud_width / this.img_width;
    this.y_scale = this.hud_height / this.img_height;

    this.mini_map.scale.setTo(this.x_scale, this.y_scale);
}

/**
 * Add enemy to mini map to be tracked.
 * @param {object} enemy | phaser sprite
 */
MiniMap.prototype.trackEnemy = function (enemy) {
    this.enemies.push(enemy);
    this.enemy_locations.push(game.add.graphics(0, 0));
}

/**
 * Redraw enemy locations
 */
MiniMap.prototype.updateEnemyLocations = function () {
    
    for (i = 0; i < this.enemies.length; i++) {
        // Same technique as in update player method.
        var x = this.enemies[i].x;
        var y = this.enemies[i].y;
        var x_ratio = x / this.map_width;
        var y_ratio = y / this.map_height;
        var adjusted_x = (x_ratio * this.hud_width) + this.game.camera.x + this.base_x;
        var adjusted_y = (y_ratio * this.hud_height) + this.game.camera.y + this.base_y;

        this.enemy_locations[i].destroy();

        //This is a hack. Enemy needs removed from array
        if(!this.enemies[i].inWorld){
            continue;
        }

        this.enemy_locations[i] = game.add.graphics(0, 0);
        this.enemy_locations[i].lineStyle(2, 0xFF0000, 1);
        this.enemy_locations[i].drawRect(adjusted_x - 1, adjusted_y - 1, 3, 3);

    }
}
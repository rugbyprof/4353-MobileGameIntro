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

MiniMap.prototype.updatePlayerLocation = function (player) {
    var x = player.x; 
    var y = player.y; 
    var x_ratio = x / this.map_width;
    var y_ratio = y / this.map_height;
    var adjusted_x = (x_ratio * this.hud_width) + this.game.camera.x + this.base_x;
    var adjusted_y = (y_ratio * this.hud_height) + this.game.camera.y+ this.base_y;;

    this.player_location.destroy();

    this.player_location = game.add.graphics(0, 0);
    this.player_location.lineStyle(2, 0x00FF00, 1);
    this.player_location.drawRect(adjusted_x-10, adjusted_y-10, 20, 20);

    this.mini_map.y = this.game.camera.view.top;
    if(this.location == 'upper_left'){
        this.mini_map.x = this.game.camera.view.left;
    }else if(this.location == 'upper_right'){
        this.mini_map.x = this.game.camera.view.right - this.mini_map.width;
    }
}

MiniMap.prototype.scaleMap = function () {

    this.x_scale = this.hud_width / this.img_width;
    this.y_scale = this.hud_height / this.img_height;

    console.log(this.x_scale, this.y_scale);

    this.mini_map.scale.setTo(this.x_scale, this.y_scale);
}
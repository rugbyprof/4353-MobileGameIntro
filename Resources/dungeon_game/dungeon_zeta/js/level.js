/**
 * 
 * @param {object} game | phaser game object
 * @param {string} map_key | cache name
 * @param {string} map_path | path to json for tilemap
 * @param {string} mini_map_path | path to mini map image
 */
var Level = function (game, map_key,map_path,mini_map_path,collision_index) {
    this.game = game;
    this.map_key = map_key;
    this.map_path = map_path;
    this.mini_map_path = mini_map_path;
    this.mini_map_key = this.map_key+'_mini';
    this.map_collision_index = collision_index;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// PRELOAD ////////////////////////////////////////////////////////////////////////////////////////
Level.prototype.preload = function () {

    this.portalOverFlag = false;
    this.transport = false;

    this.mapjson = this.game.global.levels[this.map_key];

    this.mh = new MapHelper(game, this.map_key, this.map_path,this.map_collision_index);

    this.mh.preload();

    game.load.image(this.mini_map_key, this.mini_map_path);
}


///////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE /////////////////////////////////////////////////////////////////////////////////////////
Level.prototype.create = function () {

    this.player = new Player(game, game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.mh.create();

    
    this.mh.addCollisionLayer('layer_collision');

    this.mh.resizeWorld('layer_0_floor');

    this.hud = new Hud(game, 100, 200);
    this.hud.addTitle();
    this.hud.trackValue(this.player.alias, "health");
    this.hud.trackValue(this.player.alias, "coins", true);

    this.mini_map = new MiniMap(game, 200, 200, 4096, 4096, this.mini_map_key, 'upper_right');

    game.camera.follow(this.player.alias);

    this.portal = game.add.sprite(game.camera.width / 2 + 100, game.camera.height / 2 + 100, 'red_portal');
    this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 60, true);
    this.portal.animations.play('rotate');
    // set the anchor for sprite to middle of the view
    this.portal.anchor.setTo(0.5);

    // turn physics on for everyone
    game.physics.enable([this.player.alias, this.portal], Phaser.Physics.ARCADE);


    // Makes sure player sprite is in front of the map.
    this.player.bringToFront();

    // Spawn 7 ghosts when level loads
    this.ghosts = new Ghosts(game, 7, this.player.x, this.player.y);

    // Track the ghosts on the mini map
    for (i = 0; i < this.ghosts.ghosts.length; i++) {
        this.mini_map.trackEnemy(this.ghosts.ghosts[i]);
    }

    console.log(this.player.alias)

}

///////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE /////////////////////////////////////////////////////////////////////////////////////////
Level.prototype.update = function () {

    // keeps hud in upper left of the screen 
    this.hud.displayHud()

    // keeps map updated in top right of the screen
    this.mini_map.updatePlayerLocation(this.player.alias);

    // lets you control your player
    this.player.move();

    this.ghosts.moveGhosts(this.player.alias);

    // checks if player intersects with a portal
    // hard coded destination. Needs improved
    if (this.player.intersectsWith(this.portal)) {
        this.player.transportPlayer(1568, 1760);
    }

    // Necessary to make sure we always check player colliding with objects
    game.physics.arcade.collide(this.player.alias, this.mh.collisionLayer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// RENDER /////////////////////////////////////////////////////////////////////////////////////////
Level.prototype.render = function () {
    //game.debug.bodyInfo(this.player, 16, 24);
    // Instructions:
    //game.debug.text("And here is our new level!", game.width / 2, game.height - 10);
}
/**
 * 
 * @param {object} game - phaser game object
 * @param {string} map_key - key for map
 * @param {string} asset_path - path to map json file
 */
var MapHelper = function (game,map_key,asset_path,collision_index) {
    this.game = game;
    this.map_key = map_key;
    this.asset_path = asset_path;
    this.mapjson = this.game.global.levels[map_key];
    this.layers = {};
    this.collisionLayerName = ""
    this.collision_index = collision_index;
}

/**
 * Read the map json file and preload any images needed
 */
MapHelper.prototype.preload = function(){
    this.game.load.tilemap(this.map_key, this.asset_path , null, Phaser.Tilemap.TILED_JSON);

    for (i = 0; i < this.mapjson.tilesets.length; i++) {
        this.game.load.image(this.mapjson.tilesets[i].name, this.mapjson.tilesets[i].image.replace("..", "assets"));
    }
}

/**
 * Read the map json file and add the tilemap and all its images to our game map
 */
MapHelper.prototype.create = function(){
    this.map = this.game.add.tilemap(this.map_key);

    for (i = 0; i < this.mapjson.tilesets.length; i++) {
        this.map.addTilesetImage(this.mapjson.tilesets[i].name, this.mapjson.tilesets[i].name);
    }

    for (i = 0; i < this.mapjson.layers.length; i++) {
        keyname = "layer_"+this.mapjson.layers[i].name;
        this.layers[keyname] = this.map.createLayer(this.mapjson.layers[i].name);
    }

    return this.map;
}

/**
 * 
 * @param {string} key - name of collision layer
 * @param {int} tileIndex - index of tile to collide with
 */
MapHelper.prototype.addCollisionLayer = function(key,tileIndex=-1){
    this.collisionLayerName = key;
    console.log("index:",this.collision_index)
    if(tileIndex >= 0){
        this.collision_index = tileIndex;
    }
    console.log("index:",this.collision_index)
    this.map.setCollision(this.collision_index, true, this.layers[key]);
    this.game.physics.arcade.enable(this.layers[key]);
    this.layers[key].alpha = 0;
    this.collisionLayer = this.layers[key];
}

/**
 * 
 * @param {float} alpha - value to set collision visibility to (0-1)
 */
MapHelper.prototype.visibleCollisionLayer = function(alpha){
    this.layers[this.collisionLayerName].alpha = alpha;
}

/**
 * 
 * @param {string} key - resize game world to this layer.
 */
MapHelper.prototype.resizeWorld = function(key){
    this.layers[key].resizeWorld();
}

/**
 * 
 * @param {string}layer: cache key for layer
 * @param {object}player: phaser sprite object
 */
MapHelper.prototype.getTileProperties = function(key,player){
    console.log(this.layers[key]);
    var x = this.layers[key].getTileX(player.x);
    var y = this.layers[key].getTileY(player.y);
    console.log(x,y)

    return  this.map.getTile(x, y, this.layers[key]);

}


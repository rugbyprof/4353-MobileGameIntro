/**
 * 
 * @param {object} game - phaser game object
 * @param {string} map_key - key for map
 * @param {string} asset_path - path to map json file
 */
var MapHelper = function (game,map_key,asset_path) {
    this.game = game;
    this.map_key = map_key;
    this.asset_path = asset_path;
    this.mapjson = this.game.global.levels['level_02'];
    this.layers = {};
    this.collisionLayerName = ""
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
 */
MapHelper.prototype.addCollisionLayer = function(key){
    this.collisionLayerName = key;
    this.map.setCollision(1, true, this.layers[key]);
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

var level_03 = {

	preload: function () {
		console.log("level_03");
		// Load tile map
		game.load.tilemap('level_03', 'assets/maps/forest_e.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground','assets/tileset/ground/ground.png');
		game.load.image('pool','assets/tileset/ground/water/pool.png');
		game.load.image('earth_dark','assets/tileset/ground/ridge/earth_dark.png');
		game.load.image('grass_edges','assets/tileset/ground/grass_edges.png');
		game.load.image('earth_edges','assets/tileset/ground/earth_edges.png');
		game.load.image('grass_corners','assets/tileset/ground/grass_corners.png');
		game.load.image('daisy_blue','assets/tileset/plant/flower/daisy_blue.png');
		game.load.image('daisy_yellow','assets/tileset/plant/flower/daisy_yellow.png');
		game.load.image('bushes','assets/tileset/plant/bush/bushes.png');
		game.load.image('daisy_red','assets/tileset/plant/flower/daisy_red.png');
		game.load.image('daisy_white','assets/tileset/plant/flower/daisy_white.png');
		game.load.image('collision','assets/tileset/logic/collision.png');
		game.load.image('tree_green','assets/tileset/plant/tree/tree_green.png');
		game.load.image('castle','assets/tileset/building/castle.png');
		game.load.image('tent','assets/tileset/object/tent.png');
		game.load.image('sheepfood','assets/tileset/logic/item/sheepfood.png');
		game.load.image('fairy','assets/tileset/logic/creature/fairy.png');
		game.load.image('resources','assets/tileset/logic/item/resources.png');
		game.load.image('portal','assets/tileset/logic/portal.png');
		game.load.image('green_paving','assets/tileset/ground/green_paving.png');
		game.load.image('protection','assets/tileset/logic/protection.png');
	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_03');
		this.map.addTilesetImage('ground', 'ground');
		this.map.addTilesetImage('pool', 'pool');
		this.map.addTilesetImage('earth_dark', 'earth_dark');
		this.map.addTilesetImage('grass_edges', 'grass_edges');
		this.map.addTilesetImage('earth_edges', 'earth_edges');
		this.map.addTilesetImage('grass_corners', 'grass_corners');
		this.map.addTilesetImage('daisy_blue', 'daisy_blue');
		this.map.addTilesetImage('daisy_yellow', 'daisy_yellow');
		this.map.addTilesetImage('bushes', 'bushes');
		this.map.addTilesetImage('daisy_red', 'daisy_red');
		this.map.addTilesetImage('daisy_white', 'daisy_white');
		this.map.addTilesetImage('collision', 'collision');
		this.map.addTilesetImage('tree_green', 'tree_green');
		this.map.addTilesetImage('castle', 'castle');
		this.map.addTilesetImage('tent', 'tent');
		this.map.addTilesetImage('sheepfood', 'sheepfood');
		this.map.addTilesetImage('fairy', 'fairy');
		this.map.addTilesetImage('resources', 'resources');
		this.map.addTilesetImage('portal', 'portal');
		this.map.addTilesetImage('green_paving', 'green_paving');
		this.map.addTilesetImage('protection', 'protection');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			roof_layer_add: this.map.createLayer('4_roof_add'),
			collision_layer: this.map.createLayer('collision')
		};

		this.layers.collision_layer.alpha = .5;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(322, true, this.layers.collision_layer);

		this.layers.ground_layer.resizeWorld();

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		game.global.health = 100;

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.play('idle_left');

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 1728;
		this.player.y = 1024;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.player.scale.setTo(1.75);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		game.addPauseButton(game);
	},

	update: function () {

		if (this.leftKey.isDown) {
			this.player.body.velocity.x = -150;
			this.player.animations.play('walk_left');
			this.prevDir = 'left'
		}
		if (this.rightKey.isDown) {
			this.player.body.velocity.x = 150;
			this.player.animations.play('walk_right');
			this.prevDir = 'right'
		}
		if (this.upKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('walk_left');
			} else {
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = -150;
		}

		if (this.downKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('walk_left');
			} else {
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = 150;
		}

		// Used for debug info while player is moving.
		if (this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown) {
			console.log(this.player.x, this.player.y)
		}

		if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('idle_left');
			} else {
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}

		this.getTileProperties(this.layers.collision_layer,this.player);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);

	},


	/**
	 * function to be taylored to handle player level / stage change 
	 * Question: should this be cut and paste in very level file?
	 * 			 can we make this global somehow?
	 */
	checkPlayerTransport: function (player) {
		if (player.x < 1411) {
			game.global.current_level = 'level_03';
			game.state.start(game.global.current_level);
		} else if (player.x > game.width) {
			// go somewhere
		} else if (player.y < game.height) {
			// go somewhere
		} else if (player.y > game.height) {
			// go somewhere
		}
	},

	getTileProperties: function (layer, player) {

		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		if (tile) {
			console.log(x, y);
			console.log(tile);
		}

	},

	render: function () {
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("Go all the way left to exit this level...", game.width / 2, game.height - 10);
	}
}
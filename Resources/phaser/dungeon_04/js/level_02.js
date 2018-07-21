var level_01 = {

	preload: function () {

		// Load tile map
		game.load.tilemap('level_01', 'assets/maps/tunnel.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground', 'assets/tileset/ground/brown.png');
		game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png');
		game.load.image('flames', 'assets/tileset/furniture/light/flames.png');
		game.load.image('amazon', 'assets/tileset/logic/creature/amazon.png');
		game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
		game.load.image('huge_animal', 'assets/tileset/item/corpse/huge_animal.png');
		game.load.image('rocks_2', 'assets/tileset/ground/rock/rocks_2.png');
		game.load.image('pink_crystal', 'assets/tileset/ground/rock/pink_crystal.png');
		game.load.image('green_crystal', 'assets/tileset/ground/rock/green_crystal.png');
		game.load.image('huge_animal2', 'assets/tileset/logic/creature/huge_animal.png');
		game.load.image('animal', 'assets/tileset/logic/creature/animal.png');
		game.load.image('undead', 'assets/tileset/logic/creature/undead.png');
		game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
		game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png');
		game.load.image('collision', 'assets/tileset/logic/collision.png');
	},
	create: function () {
		console.log("level_01.js");

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.map = game.add.tilemap('level_01');
		this.map.addTilesetImage('ground', 'ground');
		this.map.addTilesetImage('logic/collision', 'collision');
		this.map.addTilesetImage('steel lamp', 'iron_lamp');
		this.map.addTilesetImage('flames', 'flames');
		this.map.addTilesetImage('amazoness', 'amazon');
		this.map.addTilesetImage('corpse', 'skull_dark');
		this.map.addTilesetImage('corpse 2', 'huge_animal');
		this.map.addTilesetImage('rocks', 'rocks_2');
		this.map.addTilesetImage('crystal', 'pink_crystal');
		this.map.addTilesetImage('crystal 2', 'green_crystal');
		this.map.addTilesetImage('huge animals', 'huge_animal2');
		this.map.addTilesetImage('animals', 'animal');
		this.map.addTilesetImage('undead', 'undead');
		this.map.addTilesetImage('elements', 'elemental');
		this.map.addTilesetImage('wall/int_rock', 'int_rock');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			collision_layer: this.map.createLayer('collision')
		};

		this.layers.collision_layer.alpha = 0

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(1, true, this.layers.collision_layer);
		this.map.setTileIndexCallback(45, this.hitWall, this);

		//this.mySetCollision();

		this.layers.ground_layer.resizeWorld();

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');
		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.play('idle_left');


		// turn physics on for player
		game.physics.arcade.enable(this.player);

		this.player.enableBody = true;

		// set the anchor for sprite to middle of the view
		//this.player.anchor.setTo(0.5);

		// tell camera to follow sprite now
		game.camera.follow(this.player);

		// set starting location for player
		this.player.x = 1728;
		this.player.y = 1024;

		console.log(this.player.body);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.pauseAndUnpause(game)
	},

	update: function () {


		if (this.leftKey.isDown) {
			this.player.body.velocity.x = -200;
		}
		if (this.rightKey.isDown) {
			this.player.body.velocity.x = 200;
		}
		if (this.upKey.isDown) {
			this.player.body.velocity.y = -200;
		}
		if (this.downKey.isDown) {
			this.player.body.velocity.y = 200;
		}

		if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown) {
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}

		if (this.spaceBar.isDown) {
			var x = this.layers.collision_layer.getTileX(this.player.x);
			var y = this.layers.collision_layer.getTileY(this.player.y);

			console.log(x, y);

			var tile = this.map.getTile(x, y, this.layers.collision_layer);
			console.log(tile);
			// for(i=0;i<512;i++){
			// 	for(j=0;j<128;j++){
			// 		if(this.map.layers[4].data[i][j].index == -1){
			// 			console.log(this.map.layers[4].data[i][j]);
			// 		}
			// 	}
			// }

		}

		game.physics.arcade.collide(this.player, this.layers.collision_layer);
	},
	hitWall: function(tile){
		console.log("hit wall");
		console.log(tile);
	},

	/**
	 * Tap on touchscreen or click with mouse
	 */
	onDown: function (pointer) {
		//console.log(pointer);

	},

	/**
	 * This method lets a user pause the game by pushing the pause button in
	 * the top right of the screen. 
	 */
	pauseAndUnpause: function (game) {
		var pause_button = game.add.sprite(game.width - 40, 40, 'pause');
		pause_button.anchor.setTo(.5, .5);
		pause_button.inputEnabled = true;
		// pause:
		pause_button.events.onInputUp.add(
			function () {
				if (!game.paused) {
					game.paused = true;
				}
				pause_watermark = game.add.sprite(game.width / 2, game.height / 2, 'pause');
				pause_watermark.anchor.setTo(.5, .5);
				pause_watermark.alpha = .1;
			}, this)
		// Unpause:
		game.input.onDown.add(
			function () {
				if (game.paused) {
					game.paused = false;
					pause_watermark.destroy();
				}
			}, self)
	},

	// mySetCollision: function () {

	// 	for (var i = 0; i < this.map.height; i++) {
	// 		for (var j = 0; j < this.map.width; j++) {
	// 			//tile = this.map.getTile(x, y, this.layers.collision_layer);
	// 			this.map.layers[4].data[i][j].collideLeft = true;
	// 			this.map.layers[4].data[i][j].collideRight = true;
	// 			this.map.layers[4].data[i][j].collideDown = true;
	// 			this.map.layers[4].data[i][j].collideUp = true;
	// 		}
	// 	}
	// },

	render: function(){
		game.debug.bodyInfo(this.player, 16, 24);
	}
}
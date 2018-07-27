var level_02 = {
	// PRELOAD ////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////
	preload: function () {
		console.log("level_02.js");
		// Load tile map
		game.load.tilemap('level_02', 'assets/maps/cave.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground', 'assets/tileset/ground/brown.png');
		game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png');
		game.load.image('flames', 'assets/tileset/furniture/light/flames.png');
		game.load.image('amazon', 'assets/tileset/logic/creature/amazon.png');
		game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
		game.load.image('huge_animal_corpse', 'assets/tileset/item/corpse/huge_animal.png');
		game.load.image('pink_crystal', 'assets/tileset/ground/rock/pink_crystal.png');
		game.load.image('green_crystal', 'assets/tileset/ground/rock/green_crystal.png');
		game.load.image('animal', 'assets/tileset/logic/creature/animal.png');
		game.load.image('undead', 'assets/tileset/logic/creature/undead.png');
		game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
		game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png');
		game.load.image('collision', 'assets/tileset/logic/collision.png');
		game.load.image('blackened_column', 'assets/tileset/item/statue/blackened_column.png');
		game.load.image('floor_stain', 'assets/tileset/item/blood/floor_stain.png');
		game.load.image('nsew_stains', 'assets/tileset/item/blood/nsew_stains.png');
		game.load.image('broken_green_column', 'assets/tileset/item/statue/broken_green_column.png');
		game.load.image('skeleton', 'assets/tileset/item/corpse/skeleton.png');
		game.load.image('giant_human', 'assets/tileset/logic/creature/giant_human.png');
		game.load.image('mutant', 'assets/tileset/logic/creature/mutant.png');
		game.load.image('dark_stairs', 'assets/tileset/building/stairs/dark_stairs.png');
		game.load.image('floor_tiles', 'assets/tileset/ground/indoor/floor_tiles.png');
		game.load.image('mushroom3', 'assets/tileset/plant/mushroom3.png');
		game.load.image('portal', 'assets/tileset/logic/portal.png');
		game.load.image('purple_crystal', 'assets/tileset/ground/rock/purple_crystal.png');
		game.load.image('rocks', 'assets/tileset/ground/rock/rocks.png');
		game.load.image('rocks_2', 'assets/tileset/ground/rock/rocks_2.png');
		game.load.image('skull_pale', 'assets/tileset/item/corpse/skull_pale.png');
		game.load.image('stairs', 'assets/tileset/building/stairs/stairs.png');
		game.load.image('star_shaped_plants', 'assets/tileset/plant/star_shaped_plants.png');
	},

	// CREATE /////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_02');
		this.map.addTilesetImage('ground/brown', 'ground');
		this.map.addTilesetImage('collision', 'collision');
		this.map.addTilesetImage('corpse/huge_animal', 'huge_animal_corpse');
		this.map.addTilesetImage('wall/int_rock', 'int_rock');
		this.map.addTilesetImage('floor_tiles', 'floor_tiles');
		this.map.addTilesetImage('blackened_column', 'blackened_column');
		this.map.addTilesetImage('blood/floor_stain', 'floor_stain');
		this.map.addTilesetImage('blood/nsew_stains', 'nsew_stains');
		this.map.addTilesetImage('broken_green_column', 'broken_green_column');
		this.map.addTilesetImage('corpse/skeleton', 'skeleton');
		this.map.addTilesetImage('creature/giant_human', 'giant_human');
		this.map.addTilesetImage('creature/mutant', 'mutant');
		this.map.addTilesetImage('dark_stairs', 'dark_stairs');
		this.map.addTilesetImage('mushroom3', 'mushroom3');
		this.map.addTilesetImage('portal', 'portal');
		this.map.addTilesetImage('purple_crystal', 'purple_crystal');
		this.map.addTilesetImage('rocks', 'rocks');
		this.map.addTilesetImage('rock/rocks_2', 'rocks_2');
		this.map.addTilesetImage('skull_pale', 'skull_pale');
		this.map.addTilesetImage('stairs', 'stairs');
		this.map.addTilesetImage('star_shaped_plants', 'star_shaped_plants');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			roof_add_layer: this.map.createLayer('4_roof_add'),
			objects: this.map.createLayer('objects'),
			collision_layer: this.map.createLayer('collision')
		};


		this.layers.collision_layer.alpha = 0

		game.physics.arcade.enable(this.layers.collision_layer);
		game.physics.arcade.enable(this.layers.object_layer);

		this.map.setCollision(1, true, this.layers.collision_layer);
		//this.map.setTileIndexCallback(45, this.hitWall, this);

		this.layers.ground_layer.resizeWorld();

		// Dungeon 3 sprite stuff below
		/////////////////////////////////////////////////

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		this.portal = game.add.sprite(0, 0, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 60, true);
		this.portal.animations.play('rotate');
		this.portal.alpha = 0;

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		// Adding enemy (using same sprite as knight)
		var ex = game.width * Math.random();
		var ey = game.width * Math.random();
		if (Math.floor(Math.random() * 100) % 2 == 1) {
			ex = 0;
		} else {
			ey = 0;
		}
		this.enemy = game.add.sprite(ex, ey, 'knight_atlas');

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.play('idle_left');

		// Add walking and idle animations for the enemy.
		this.enemy.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.enemy.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.enemy.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.enemy.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.enemy.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, true);
		this.enemy.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.enemy.animations.play('idle_left');


		// Ghost sprites animations
		// this.red_ghost = game.add.sprite(game.camera.width / 2 + 100, game.camera.height / 2, 'ghosts');
		// this.red_ghost.scale.setTo(.5);
		// this.red_ghost.animations.add('red_ghost', [0, 1], 20, true);
		// this.red_ghost.animations.play('red_ghost');

		//game.physics.arcade.enable(this.red_ghost);

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		//this.player.x = 1728;
		//this.player.y = 1024;

		// turn physics on for enemy
		game.physics.arcade.enable(this.enemy);

		this.enemy.body.collideWorldBounds = true;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.portal.anchor.setTo(0.5);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//this.addPauseButton(game);

		this.ghosts = this.spawnGhosts(7,game.width/2,game.height/2);
		console.log(this.ghosts);
	},
	// UPDATE /////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////
	update: function () {
		if (this.leftKey.isDown) {
			this.player.body.velocity.x = -200;
			this.player.animations.play('walk_left');
			this.prevDir = 'left'
		}
		if (this.rightKey.isDown) {
			this.player.body.velocity.x = 200;
			this.player.animations.play('walk_right');
			this.prevDir = 'right'
		}
		if (this.upKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('walk_left');
			} else {
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = -200;
		}

		if (this.downKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('walk_left');
			} else {
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = 200;
		}

		if (this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown) {

			this.getTileProperties(this.layers.object_layer, this.player);

			// If player steps on a tile with index 14, show a portal
			if(this.checkTileSteppedOn(this.layers.object_layer, this.player,14)){
				this.showPortal(544,544);
			}
		}

		//
		if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('idle_left');
			} else {
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}

		// Did player overlap with portal
		if (this.isOverlapped(this.player, this.portal)) {
			this.transportPlayer(this.portal.x, this.portal.y, 1568, 1760);
		}

		//this.moveTowardPlayer(this.red_ghost, 100);
		this.moveGhosts(this.ghosts,100);


		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);
		game.physics.arcade.collide(this.player, this.layers.object_layer);
	},

	// HELPER FUNCTIONS ///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * This method prints out tile properties given:
	 * @param: layer (phaser layer name)
	 * @param: player (phaser sprite)
	 * 
	 * I use this method to get the ID of the tiles that I want to
	 * use collision detection for. 
	 */
	getTileProperties: function (layer, player) {
		// Get the x,y for the tile your on
		// the tile x,y != player x,y
		// tilex = floor(player.x / tilewidth) (something like that)
		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		// Get tile info from map
		var tile = this.map.getTile(x, y, layer);

		// if tile != null print it out
		if (tile) {
			console.log(x, y);
			console.log(tile);
		}

	},

	/**
	 * This method returns true or false depending on which tile was stepped on.
	 * Similar to function 'getTileProperties' but expects a tile index.
	 * @param: layer (phaser layer name)
	 * @param: player (phaser sprite)
	 * @param: index (index of tile stepped on)
	 * @returns: boolean
	 */
	checkTileSteppedOn: function (layer, player, index) {
		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		if (tile) {
			if (tile.index == index) {
				return true;
			}

		}
		return false;
	},

	/**
	 * This method shows a magic portal at x,y
	 * @param: x - int coord
	 * @param: y - int coord
	 */
	showPortal: function (x,y) {
		this.portal.alpha = 1;
		this.portal.x = x;
		this.portal.y = y;
	},

	/**
	 * Checks to see if two sprites are overlapped
	 * @param: spriteA - phaser sprite
	 * @param: spriteB - phaser sprite
	 * @returs: boolean true = sprites intersect
	 */
	isOverlapped: function (spriteA, spriteB) {

		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();

		return Phaser.Rectangle.intersects(boundsA, boundsB);

	},

	/**
	 * Transports a player from x1,y1, to x2,y2 with some fancy tweens
	 * @param: x1 - int x coord from
	 * @param: y1 - int y coord from
	 * @param: x2 - int x coord to
	 * @param: y2 - int x coord to
	 */
	transportPlayer: function (x1, y1, x2, y2) {
		movePlayer = game.add.tween(this.player).to({
			x: x1,
			y: y1
		}, 500, Phaser.Easing.Linear.None, true);
		fade = game.add.tween(this.player).to({
			alpha: 0
		}, 750, "Linear", true);
		scale = game.add.tween(this.player.scale).to({
			x: .2,
			y: .2
		}, 1000, Phaser.Easing.Linear.None, true);

		game.time.events.add(Phaser.Timer.SECOND * 1, function () {
			movePlayer.stop();
			scale.stop();
			fade.stop();
		}, this);
		game.time.events.add(Phaser.Timer.SECOND * 1.1, this.movePlayer, this, this.player,x2, y2);
	},

	/**
	 * Resets the players location
	 * @param: sprite -  phaser sprite
	 * @param: x - int coord
	 * @param: y - int coord
	 */
	movePlayer: function (sprite,x, y) {
		sprite.reset(x, y);
		sprite.alpha = 1;
		sprite.scale.setTo(1);
	},

	/**
	 * Very basic move monster towards player function.
	 * @param: enemy - phaser sprite
	 * @param: speed - int how fast you want to move
	 */
	moveTowardPlayer: function (enemy, speed) {
		// get differences in x and y locations between enemy and player
		var xdiff = Math.abs(this.player.x - enemy.x);
		var ydiff = Math.abs(this.player.y - enemy.y);

		// Arbitrary buffer
		var buffer = 5;

		// If the enemy is within buffer distance, set velocity to 
		// zero so we don't get the jerky left / right behavior
		if (xdiff < buffer) {
			enemy.body.velocity.x = 0;
		} else {
			// Change velocity to keep moving toward player
			if (this.player.x < enemy.x) {
				enemy.body.velocity.x = -speed;
			} else {
				enemy.body.velocity.x = speed;
			}
		}
		// If the enemy is within buffer distance, set velocity to 
		// zero so we don't get the jerky up / down behavior		
		if (ydiff < buffer) {
			enemy.body.velocity.y = 0;
		} else {
			// Change velocity to keep moving toward player
			if (this.player.y < enemy.y) {
				enemy.body.velocity.y = -speed;
			} else {
				enemy.body.velocity.y = speed;
			}
		}
	},
	
	/**
	 * This uses the 'movePlayer' method, but adds the logic to change
	 * the ghosts animation so that the eyes are looking at you.
	 * @param: i - int ghost index
	 * @param: ghost - phaser sprite
	 */
	moveGhostTowardPlayer: function (i, ghost) {
		// get differences in x and y locations between enemy and player
		var xdiff = Math.abs(this.player.x - ghost.x);
		var ydiff = Math.abs(this.player.y - ghost.y);

		// Frame to play
		var key = 0;

		// if x difference is greater than y, we will change eyes left to right
		if (xdiff > ydiff) {
			// set left right value
			if (this.player.x < ghost.x) {
				key = 2;
			} else {
				key = 3;
			}
		// change eyes up and down if y values differe more
		} else {
			// set up down value
			if (this.player.y < ghost.y) {
				key = 0;
			} else {
				key = 1;
			}
		}

		// we add (i*4) to get to the correct color on sprite sheet
		// then mod by 16
		// We could do (i % 4) * 4 as well to get correct color and frame.
		key += (i * 4) % 16 ;

		// each ghosts speed is stored "in" the ghost
		this.moveTowardPlayer(ghost, ghost.data['speed']);
		ghost.animations.play(key);
	},

	/**
	 * This function loops through the array of "ghosts" and
	 * calls the moveGhostTowardPlayer function with the correct
	 * ghost index, sprite, and its speed.
	 * @param: ghosts - array of sprites
	 */
	moveGhosts: function (ghosts) {
		for (i = 0; i < ghosts.length; i++) {
			this.moveGhostTowardPlayer(i, ghosts[i]);
		}
	},

	/**
	 * Generates an array of "ghosts". Could be any sprite.
	 * @param: n - number of ghosts
	 * @param: x - x coord for a spawn location
	 * @param: y - y coord 
	 * @returns: array of ghost sprites
	 */
	spawnGhosts: function (n, x, y) {
		var ghosts = []

		for (i = 0; i < n; i++) {
			// create the ghost
			var g = this.spawnGhost(x,y);

			// choose proper frame to alternate colors
			var anim = (i*4) % 16;

			// play animation
			g.animations.play(anim);
			// put necessary values in the data object in the ghost
			g.data['id'] = i;
			g.data['speed'] = 100 + getRandomInt(-75,75);

			// push ghost on to the array
			ghosts.push(g);

		}
		// return array of ghosts
		return ghosts;
	},

	/**
	 * This method spawns one ghost at some random location near x,y
	 * @param: x - int x coord
	 * @param: y - int y coord
	 * @returns: ghost sprite
	 */
	spawnGhost: function (x,y) {
		var anims = {
			0: [0, 1], 		// red up
			1: [2, 3], 		// red down
			2: [4, 5], 		// red left
			3: [6, 7], 		// red right
			4: [8, 9],		// pink up
			5: [10, 11],	// pink down
			6: [12, 13],	// pink left
			7: [14, 15],	// pink right
			8: [16, 17],	// blue up
			9: [18, 19],	// blue down
			10: [20, 21],	// blue left
			11: [22, 23],	// blue right
			12: [24, 25],	// orange up
			13: [26, 27],	// orange down
			14: [28, 29],	// orange left
			15: [30, 31]	// orange right
		}

		// randomish location
		var x = x + getRandomInt(x-100,x+150);
		var y = y + getRandomInt(y-150,y+100);

		// add sprite to game
		var ghost = game.add.sprite(x, y, 'ghosts');
		game.physics.arcade.enable(ghost);
		ghost.scale.setTo(.4);

		// add ALL the above animations to every ghost sprite
		// (we only play the correct color for each ghost)
		for (var key in anims) {
			ghost.animations.add(key, anims[key], 20, true);
		}

		// return ghost
		return ghost;

	},

	render: function () {

		//game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		//game.debug.text("And here is our new level!", game.width / 2, game.height - 10);
	}
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}
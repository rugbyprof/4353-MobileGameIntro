var level_02 = {

	preload: function () {
		console.log("level_02.js");

		this.portalOverFlag = false;
		this.transport = false;

		//game.load.tilemap('level_02', 'assets/maps/cave_less.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		// game.load.image('ground', 'assets/tileset/ground/brown.png');
		// game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png');
		// game.load.image('flames', 'assets/tileset/furniture/light/flames.png');
		// game.load.image('amazon', 'assets/tileset/logic/creature/amazon.png');
		// game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
		// game.load.image('huge_animal_corpse', 'assets/tileset/item/corpse/huge_animal.png');

		// game.load.image('pink_crystal', 'assets/tileset/ground/rock/pink_crystal.png');
		// game.load.image('green_crystal', 'assets/tileset/ground/rock/green_crystal.png');
		// game.load.image('animal', 'assets/tileset/logic/creature/animal.png');
		// game.load.image('undead', 'assets/tileset/logic/creature/undead.png');
		// game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
		// game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png');
		// game.load.image('collision', 'assets/tileset/logic/collision.png');
		// game.load.image('blackened_column', 'assets/tileset/item/statue/blackened_column.png');
		// game.load.image('floor_stain', 'assets/tileset/item/blood/floor_stain.png');
		// game.load.image('nsew_stains', 'assets/tileset/item/blood/nsew_stains.png');
		// game.load.image('broken_green_column', 'assets/tileset/item/statue/broken_green_column.png');
		// game.load.image('skeleton', 'assets/tileset/item/corpse/skeleton.png');
		// game.load.image('giant_human', 'assets/tileset/logic/creature/giant_human.png');
		// //game.load.image('huge_animal_creature', 'assets/tileset/logic/creature/huge_animal.png');
		// game.load.image('mutant', 'assets/tileset/logic/creature/mutant.png');
		// game.load.image('dark_stairs', 'assets/tileset/building/stairs/dark_stairs.png');
		// game.load.image('floor_tiles', 'assets/tileset/ground/indoor/floor_tiles.png');
		// game.load.image('mushroom3', 'assets/tileset/plant/mushroom3.png');
		// game.load.image('portal', 'assets/tileset/logic/portal.png');
		// game.load.image('purple_crystal', 'assets/tileset/ground/rock/purple_crystal.png');
		// game.load.image('rocks', 'assets/tileset/ground/rock/rocks.png');
		// game.load.image('rocks_2', 'assets/tileset/ground/rock/rocks_2.png');
		// game.load.image('skull_pale', 'assets/tileset/item/corpse/skull_pale.png');
		// game.load.image('stairs', 'assets/tileset/building/stairs/stairs.png');
		// game.load.image('star_shaped_plants', 'assets/tileset/plant/star_shaped_plants.png');
	},
	create: function () {


		this.player = new Player(game,game.camera.width/2,game.camera.height/2,'knight_atlas');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		// this.map = game.add.tilemap('level_02');
		// this.map.addTilesetImage('ground/brown', 'ground');
		// this.map.addTilesetImage('collision', 'collision');
		// this.map.addTilesetImage('corpse/huge_animal', 'huge_animal_corpse');
		// this.map.addTilesetImage('wall/int_rock', 'int_rock');
		// this.map.addTilesetImage('floor_tiles', 'floor_tiles');
		// this.map.addTilesetImage('blackened_column', 'blackened_column');
		// this.map.addTilesetImage('blood/floor_stain', 'floor_stain');
		// this.map.addTilesetImage('blood/nsew_stains', 'nsew_stains');
		// this.map.addTilesetImage('broken_green_column', 'broken_green_column');
		// this.map.addTilesetImage('corpse/skeleton', 'skeleton');
		// this.map.addTilesetImage('creature/giant_human', 'giant_human');
		// this.map.addTilesetImage('creature/mutant', 'mutant');
		// this.map.addTilesetImage('dark_stairs', 'dark_stairs');
		// this.map.addTilesetImage('mushroom3', 'mushroom3');
		// this.map.addTilesetImage('portal', 'portal');
		// this.map.addTilesetImage('purple_crystal', 'purple_crystal');
		// this.map.addTilesetImage('rocks', 'rocks');
		// this.map.addTilesetImage('rock/rocks_2', 'rocks_2');
		// this.map.addTilesetImage('skull_pale', 'skull_pale');
		// this.map.addTilesetImage('stairs', 'stairs');
		// this.map.addTilesetImage('star_shaped_plants', 'star_shaped_plants');

		// this.layers = {
		// 	ground_layer: this.map.createLayer('0_floor'),
		// 	terrain_layer: this.map.createLayer('1_terrain'),
		// 	object_layer: this.map.createLayer('2_object'),
		// 	roof_layer: this.map.createLayer('3_roof'),
		// 	roof_add_layer: this.map.createLayer('4_roof_add'),
		// 	objects: this.map.createLayer('objects'),
		// 	collision_layer: this.map.createLayer('collision')
		// };

		//Hack
		//game.knight.load('layers',this.layers);
		//game.knight.load('map',this.map);

		//this.layers.collision_layer.alpha = 0;

		//game.physics.arcade.enable(this.layers.collision_layer);

		//this.map.setCollision(1, true, this.layers.collision_layer);
		//this.map.setTileIndexCallback(45, this.hitWall, this);

		//this.layers.ground_layer.resizeWorld();

		// Dungeon 3 sprite stuff below
		/////////////////////////////////////////////////

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		this.portal = game.add.sprite(game.camera.width / 2 + 100, game.camera.height / 2 + 100, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 60, true);
		this.portal.animations.play('rotate');

		// Adding the knight atlas that contains all the animations
		// this.player = game.add.sprite(game.camera.width / 2-100, game.camera.height / 2-100, 'knight_atlas');



		// this.smoke = game.add.sprite(0, 0, 'portal_smoke');
		// this.smoke.animations.add('smoking');
		
		game.camera.follow(this.player.alias);


		// turn physics on for everyone
		game.physics.enable([this.player.alias, this.portal], Phaser.Physics.ARCADE);

		// this.enemy.body.collideWorldBounds = true;

		// set the anchor for sprite to middle of the view
		//this.player.anchor.setTo(0.5);
		this.portal.anchor.setTo(0.5);


		//this.addPauseButton(game);

		this.player.bringToFront();

		console.log(this.player.alias.x,this.player.alias.y);

		
	},

	update: function () {
		// if (this.leftKey.isDown) {
		// 	this.player.body.velocity.x = -200;
		// 	this.player.animations.play('walk_left');
		// 	this.prevDir = 'left'
		// }
		// if (this.rightKey.isDown) {
		// 	this.player.body.velocity.x = 200;
		// 	this.player.animations.play('walk_right');
		// 	this.prevDir = 'right'
		// }
		// if (this.upKey.isDown) {
		// 	if (this.prevDir == 'left') {
		// 		this.player.animations.play('walk_left');
		// 	} else {
		// 		this.player.animations.play('walk_right');
		// 	}
		// 	this.player.body.velocity.y = -200;
		// }

		// if (this.downKey.isDown) {
		// 	if (this.prevDir == 'left') {
		// 		this.player.animations.play('walk_left');
		// 	} else {
		// 		this.player.animations.play('walk_right');
		// 	}
		// 	this.player.body.velocity.y = 200;
		// }

		// if (this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown) {

		// 	this.getTileProperties(this.layers.ground_layer, this.player);
		// }

		// if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown) {
		// 	if (this.prevDir == 'left') {
		// 		this.player.animations.play('idle_left');
		// 	} else {
		// 		this.player.animations.play('idle_right');
		// 	}
		// 	this.player.body.velocity.x = 0;
		// 	this.player.body.velocity.y = 0;
		// }

		// if (this.spaceBar.isDown) {
		// 	this.chasePlayer = true;
		// }
		// if (this.chasePlayer) {
		// 	this.moveTowardPlayer(this.enemy, 200);
		// 	this.checkAttack(this.player, this.enemy);
		// }

		this.player.move();

		if(this.player.intersectsWith(this.portal)){
			this.player.transportPlayer(1568,1760);
		}

		// Necessary to make sure we always check player colliding with objects
		//game.physics.arcade.collide(this.player.alias, this.layers.collision_layer);


		//game.physics.arcade.overlap(this.player, this.portal, this.transportPlayer);

		// if(!this.portalOverFlag && this.checkOverlap(game.knight.sprite,this.portal)){
		// 	this.portalOverFlag = true;
		// 	game.knight.transportPlayer(this.portal.x,this.portal.y,1568,1760);
		// }

	},

	/**
	 * Very basic move monster towards player function.
	 * Some options to make it better would be to:
	 *  - Parameterize it so you can pass in values to adjust behaviors
	 *  - Add animations to make gameplay look better
	 *  - Add some random behaviors (like swap direction based on random choices)
	 */
	moveTowardPlayer: function (enemy, speed) {
		if (this.player.x < enemy.x) {
			enemy.body.velocity.x = -speed;
		} else {
			enemy.body.velocity.x = speed;
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -speed;
		} else {
			enemy.body.velocity.y = speed;
		}
	},

	/**
	 * basic check for attack (not good)
	 */
	checkAttack: function (player, enemy) {
		// Get how close players are together 
		var xClose = Math.abs(player.x - enemy.x);
		var yClose = Math.abs(player.y - enemy.y);

		//console.log(xClose-yClose);
		// Based on my arbitrary value of 5, I run an attack animation
		// More precision, and direction of attack need added.
		if (Math.abs(xClose - yClose) < 5) {
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			if (player.x < enemy.x) {
				enemy.animations.play('attack_left');
			} else {
				enemy.animations.play('attack_right');
			}
		}
	},
	getTileProperties: function (layer, player) {

		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		// console.log(tile);
		// console.log(tile.index);
	},







	render: function () {
		//game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("And here is our new level!", game.width / 2, game.height - 10);
	}
}
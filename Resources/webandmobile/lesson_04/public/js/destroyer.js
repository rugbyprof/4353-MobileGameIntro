var destroyer = {
	init: function(){
		game.stage.disableVisibilityChange = true;
	},

	create: function () {
		console.log("destroyer.js");
		console.log(game.others);

		Client.sendNewPlayerRequest();

		this.player = new Ufo(game);
		this.pid = null;

		// erase the others?
		if(game.others != 'object'){
			game.others = {};
		}

		w = game.width // Game width and height for convenience
		h = game.height
		frame_counter = 0 // variable to help with the creation of obstacles

		//used for points right now
		this.item_destroyed = false;

		//  The scrolling starfield background
		this.starfield = game.add.tileSprite(0, 0, w, h, 'starfield');

		this.earth = game.add.sprite(0, 0, 'earth');

		this.earth.animations.add('spin', 0, 48);
		this.earth.animations.play('spin', 10, true);

		// Score sound
		this.sound.score = game.add.audio('score')
		this.sound.score.volume = .4

		// Death sound
		this.sound.kill = game.add.audio('kill')

		// Music
		this.music = game.add.audio('music')
		this.music.play('', 0, 0.5, true)

		this.physics.startSystem(Phaser.Physics.ARCADE)

		// Obstacles (little icons of food)
		this.obstacles = game.add.group()

		//  An explosion pool that gets attached to each icon
		this.explosions = game.add.group();
		this.explosions.createMultiple(10, 'kaboom');
		this.explosions.forEach(this.setupObstacles, this);

		// Player
		//calls the create method of the ufo object
		this.player.create(randomInt(game.width / 4, game.width / 2), randomInt(100, game.height / 2), 0.75, 0.75);


		// Score label
		this.bmpText = game.add.bitmapText(game.width / 2, 100, 'fontUsed', '', 150);
		this.bmpText.anchor.setTo(.5, .5)
		this.bmpText.scale.setTo(.3, .3)

		///// Tracking keyboard inputs /////////////

		// Fire the ufo big laser when the 'X' key is pressed
		laserFire = this.input.keyboard.addKey(Phaser.Keyboard.X);
		laserFire.onDown.add(this.player.startLaser, this.player);

		// Assigns arrow keys for movement
		this.player.assignMovementKeys(38, 40, 37, 39);

		// Assigns W,S,A,D keys for movement
		this.player.assignMovementKeys(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D);
		this.player.assignFireKeys(Phaser.KeyCode.SPACEBAR);

		this.pauseAndUnpause(game)

	},

	update: function () {

		//if (game.num_other_players > 0) {

		// Place score on game screen
		this.bmpText.text = game.globals.score

		// Move background to look like space is moving
		this.starfield.tilePosition.y -= 2;

		// Check for overlap between game ship and obstacles
		game.physics.arcade.overlap(this.player.ship, this.obstacles, this.killPlayer, null, this)

		// Check for overlap between bullets and obstacles
		game.physics.arcade.overlap(this.player.bullets, this.obstacles, this.destroyItem, null, this);

		if (this.item_destroyed) {
			// Check to see if we score any points
			// needs changed since we added bullets
			game.globals.score += this.scorePoint();
			this.item_destroyed = false;
		}

		spawn_rate = 100 - game.globals.score; // how fast to add new obstacles to screen (smaller value = more obstacles)
		obstacle_speed = game.globals.score * 1.5 + 200; // how fast should each obstacle move

		// Spawn rate continuously shrinks so stop it at 5
		if (spawn_rate < 5) {
			spawn_rate = 5;
		}

		// Spawn obstacles
		if (frame_counter % spawn_rate == 0) {
			//console.log(spawn_rate);
			//console.log(obstacle_speed);
			this.spawnObstacle(game.rnd.integerInRange(32, game.width - 32), game.height, speed = obstacle_speed, 0.5, 0.5)
		}

		this.player.move();
		if (this.player.hasMoved()) {
			Client.sendPlayerPosition({
				pid: this.pid,
				x: this.player.ship.x,
				y: this.player.ship.y,
				angle: this.player.ship.angle
			});
		}
		

		frame_counter++;
		//}
	},

	render: function(){
		
	},

	/**
	 * Spawn New Player if its not the local player
	 */
	spawnNewPlayer: function (player) {
		console.log("Destroyer: spawnNewPlayer")
		console.log(player);
		if(typeof game.others != 'object'){
			game.others = {};
		}
		if (typeof player == 'object') {
			this.pid = player.pid;
			game.others[player.pid] = new Ufo(game);
			game.others[player.pid].create(player.x, player.y, 0.75, 0.75);
		}
		console.log(game.others);
	},

	moveOtherPlayers: function(player){
		console.log("destroyer: moveOtherPlayers");
		console.log(game.others);
		if(typeof game.others == 'object'){
			if(typeof game.others[player.pid] == 'object'){
				game.others[player.pid].ship.x = player.x
				game.others[player.pid].ship.y = player.y;
				game.others[player.pid].ship.angle = player.angle;
			}
		}
	},

	checkPlayerCount: function(count){
		console.log(count);
		console.log(game.others.length);
		if(game.others.length != count){
			Client.sendPlayerRefresh();
		}
	},

	/**
	 * spawn a new obstacle
	 * 
	 * @param x : x coord
	 * @param y : y coord
	 * @param speed : speed to move across game board
	 */
	spawnObstacle: function (x, y, speed, x_scale, y_scale) {
		// randomly choose an icon from an array of icon names
		var choice = game.rnd.integerInRange(0, game.globals.obstacle_icons.length - 1);
		var name = game.globals.obstacle_icons[choice];

		//create the obstacle with its randomly chosen name
		var obstacle = this.obstacles.create(x, y, 'icon-' + name)
		game.debug.body(obstacle);

		game.physics.enable(obstacle, Phaser.Physics.ARCADE)

		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.scale.setTo(x_scale, y_scale)
		obstacle.body.setSize(obstacle.width + 20, obstacle.height - 20);
		obstacle.body.velocity.y = -speed

		obstacle.checkWorldBounds = true;

		// Kill obstacle/enemy if vertically out of bounds
		obstacle.events.onOutOfBounds.add(this.killObstacle, this);

		obstacle.outOfBoundsKill = true;
	},

	/**
	 * removes an obstacle from its group
	 */
	killObstacle: function (obstacle) {
		this.obstacles.remove(obstacle);
	},

	/**
	 * Adds an explosion animation to each obstacle when created
	 */
	setupObstacles: function (obstacle) {
		obstacle.anchor.x = 0.5;
		obstacle.anchor.y = 0.5;
		obstacle.animations.add('kaboom');
	},

	/**
	 * Determines score. Needs changed
	 */
	scorePoint: function () {
		// silly but wanted a function in case points started
		// to change based on logic.
		return 1;
	},

	/**
	 * Kills player. Things commented out for debugging.
	 */
	killPlayer: function (player) {
		//issues with this
		//game.plugins.screenShake.shake(20);
		this.sound.kill.play('', 0, 0.5, false)
		//player.kill();
		//game.state.start('gameOver');
	},
	/**
	 * Source: https://phaser.io/examples/v2/games/invaders
	 * 
	 * Collision handler for a bullet and obstacle
	 */
	destroyItem: function (bullet, obstacle) {
		bullet.kill();
		obstacle.kill();
		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(obstacle.body.x, obstacle.body.y);
		explosion.play('kaboom', 30, false, true);
		this.item_destroyed = true;
	},

	/**
	 * Tap on touchscreen or click with mouse
	 * not used for this game
	 */
	onDown: function (pointer) {
		//console.log(pointer);
	},

	/**
	 * This method lets a user pause the game by pushing the pause button in
	 * the top right of the screen. 
	 */
	pauseAndUnpause: function (game) {
		var pause_button = game.add.sprite(game.width - 40, 40, 'pause')
		pause_button.anchor.setTo(.5, .5)
		pause_button.inputEnabled = true
		// pause:
		pause_button.events.onInputUp.add(
			function () {
				if (!game.paused) {
					game.paused = true
				}
				pause_watermark = game.add.sprite(game.width / 2, game.height / 2, 'pause')
				pause_watermark.anchor.setTo(.5, .5)
				pause_watermark.alpha = .1
			}, this)
		// Unpause:
		game.input.onDown.add(
			function () {
				if (game.paused) {
					game.paused = false
					pause_watermark.destroy()
				}
			}, self)
	}
}
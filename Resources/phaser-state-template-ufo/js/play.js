var play = {
	create: function () {
		console.log("play.js");

	
		w = game.width		// Game width and height for convenience
		h = game.height
		leftRate = 0		// how fast to move left when pressing left arrow key
		rightRate = 0		// how fast to move right when pressing left arrow key
		frame_counter = 0	// variable to help with the creation of obstacles

		//  The scrolling starfield background
		this.starfield = game.add.tileSprite(0, 0, w, h, 'starfield');


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
		game.ufo.create();	//calls the create method of the ufo object


		// Score label
		this.bmpText = game.add.bitmapText(game.width / 2, 100, 'fontUsed', '', 150);
		this.bmpText.anchor.setTo(.5, .5)
		this.bmpText.scale.setTo(.3, .3)

		///// Tracking keyboard inputs /////////////

		// Fire the ufo big laser when the 'X' key is pressed
		laserFire = this.input.keyboard.addKey(Phaser.Keyboard.X);
		laserFire.onDown.add(game.ufo.startLaser,game.ufo);

		// Support for mouse click and touchscreen input
		game.input.onDown.add(this.onDown, this)

		// Another way to get input from keyboard (arrow keys)
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		// Adding a reference to the space bar
		this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		this.pauseAndUnpause(game)
	},

	update: function () {
		// Place score on game screen
		this.bmpText.text = game.global.score

		// Move background to look like space is moving
		this.starfield.tilePosition.y -= 2;

		// Check for overlap between game ship and obstacles
		game.physics.arcade.overlap(game.ufo.ship, this.obstacles, this.killPlayer, null, this)

		// Check for overlap between bullets and obstacles
		game.physics.arcade.overlap(game.ufo.bullets, this.obstacles, this.destroyItem, null, this);

		
		spawn_rate = 100-game.global.score;				// how fast to add new obstacles to screen (smaller value = more obstacles)
		obstacle_speed = game.global.score * 1.5 + 200; // how fast should each obstacle move

		// Spawn rate continuously shrinks so stop it at 5
		if(spawn_rate < 5){
			spawn_rate = 5;
		}

		// Spawn enemies
		if (frame_counter % spawn_rate == 0) {
			//console.log(spawn_rate);
			//console.log(obstacle_speed);
			this.spawnObstacle(game.rnd.integerInRange(32,game.width-32), game.height, speed = obstacle_speed)
		}


	    //////// Interacting with screen ///////////////
		if (game.input.activePointer.isDown) {
			game.ufo.shipMove();
		}else{
			game.ufo.shipStill();
		}

		// The down arrow was pressed
		if (this.downKey.isDown) {
			//game.ufo.startLaser();
			game.ufo.fireBolt();
		}

		// The left array is pressed 
		if (this.leftKey.isDown){
			leftRate++;  // increase left rate as long as key is pressed
			game.ufo.shipMove(-1,leftRate);
		}else{
			leftRate=0; // key released
		}

		// The right arrow is pressed
		if (this.rightKey.isDown){
			rightRate++; // increase right rate as long as key is pressed
			game.ufo.shipMove(1,rightRate);
		}else{
			rightRate=0; // key released
		}

		// Fire button was attached to space bar above
		if (this.fireButton.isDown)
		{
			game.ufo.fireBullets();
		}


		// Check to see if we score any points
		// needs changed since we added bullets
		game.global.score += this.scorePoint();

		// Was used to get to next level.
		// if (game.global.score >= 10) {
		// 	game.global.level++;
		// 	game.state.start('mainMenu');
		// }

		frame_counter++;
	},
	
    /**
	 * spawn a new obstacle
	 * 
	 * @param x : x coord
	 * @param y : y coord
	 * @param speed : speed to move across game board
	 */
	spawnObstacle: function (x, y, speed) {
		// randomly choose an icon from an array of icon names
		var choice = game.rnd.integerInRange(0, game.global.obstacle_icons.length-1);
		var name = game.global.obstacle_icons[choice];

		//create the obstacle with its randomly chosen name
		var obstacle = this.obstacles.create(x, y, 'icon-'+name)

		game.physics.enable(obstacle, Phaser.Physics.ARCADE)

		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.scale.setTo(.75, .75)
		obstacle.body.setSize(obstacle.width-5, obstacle.height-20);
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
		
		var point = 0;
		var obstacles = this.obstacles.children;

		//console.log(obstacles)

		for (var i = 0; i < obstacles.length; i++) {
			if (obstacles[i].visible) {
				// console.log("vis: ")
				// console.log(obstacles[i].y,this.player.y);
				let py = game.ufo.ship.y;
				let oy = obstacles[i].y;

				//if player is below obstacle and within 5 pixels
				if (py > oy && Math.abs(py - oy) < 5) {
					point++;
					this.sound.score.play('', 0, 0.5, false)
				}
			}
		}
		return point;
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
	destroyItem: function(bullet, obstacle){
		bullet.kill();
		obstacle.kill();
		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(obstacle.body.x, obstacle.body.y);
		explosion.play('kaboom', 30, false, true);
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
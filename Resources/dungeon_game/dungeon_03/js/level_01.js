var level_01 = {

	preload: function () {

	},
	create: function () {
		console.log("level_01.js");

		this.chasePlayer = false;

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.prevDir = '';	// holds sprites previous direction (left , right) so
							// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		// Adding enemy (using same sprite as knight)
		var ex = game.width * Math.random();
		var ey = game.width * Math.random();
		if(Math.floor(Math.random() * 100) % 2 == 1){
			ex = 0;
		}else{
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
		this.enemy.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false);
		this.enemy.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, false);
		this.enemy.animations.play('idle_left');
		

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// turn physics on for enemy
		game.physics.arcade.enable(this.enemy);

		this.enemy.body.collideWorldBounds=true;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.addPauseButton(game);
	},

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
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = -200;
		}

		if (this.downKey.isDown) {
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = 200;
		}

		if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown) {
			if(this.prevDir == 'left'){
				this.player.animations.play('idle_left');
			}else{
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}

		if (this.spaceBar.isDown) {
			this.chasePlayer = true;
		}
		if(this.chasePlayer){
			this.moveTowardPlayer(this.enemy,200);
			this.checkAttack(this.player,this.enemy);
		}


	},

	/**
	 * Very basic move monster towards player function.
	 * Some options to make it better would be to:
	 *  - Parameterize it so you can pass in values to adjust behaviors
	 *  - Add animations to make gameplay look better
	 *  - Add some random behaviors (like swap direction based on random choices)
	 */
	moveTowardPlayer: function(enemy,speed){
		if(this.player.x < enemy.x){
			enemy.body.velocity.x = -speed;
		}else{
			enemy.body.velocity.x = speed;
		}
		if(this.player.y < enemy.y){
			enemy.body.velocity.y = -speed;
		}else{
			enemy.body.velocity.y = speed;
		}
	},

	/**
	 * basic check for attack (not good)
	 */
	checkAttack: function(player,enemy){
		// Get how close players are together 
		var xClose = Math.abs(player.x - enemy.x);
		var yClose = Math.abs(player.y - enemy.y);

		console.log(xClose-yClose);
		// Based on my arbitrary value of 5, I run an attack animation
		// More precision, and direction of attack need added.
		if(Math.abs(xClose-yClose) < 5){
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			if(player.x < enemy.x){
				enemy.animations.play('attack_left');
			}else{
				enemy.animations.play('attack_right');
			}
		}
	},

	render: function(){
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text( "Press space bar to chase player.", game.width/2, game.height-10 );
	}
}
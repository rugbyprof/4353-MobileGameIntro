var level_01 = {

	preload: function () {
		console.log(game);
		game.players['lplayer'] = new Player(game);
		game.players['rplayer'] = new Player(game);

		game.load.spritesheet('smoke', 'assets/images/smoke_particle.png', 13, 13);
	},
	create: function () {
		console.log("level_01.js");

		game.physics.startSystem(Phaser.Physics.ARCADE);

		/////////////////////////////////
		var emitter = game.add.emitter(game.players['lplayer'].x, game.players['lplayer'].y);
		console.log(game.players['lplayer'].sprite);

		emitter.width = game.players['lplayer'].width;
		// emitter.angle = 30; // uncomment to set an angle for the rain.
	
		emitter.makeParticles('smoke');
	
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
	
		emitter.setYSpeed(-100, -200);
		emitter.setXSpeed(-5, 5);
	
		emitter.minRotation = 0;
		emitter.maxRotation = 0;
	
		emitter.start(false, 500, 5, 0);
		/////////////////////////////////

		game.players['lplayer'].create(0, game.camera.height / 2,'knight_atlas');
		game.players['rplayer'].create(game.camera.width, game.camera.height / 2,'knight_atlas');

		game.players['lplayer'].assignKeys(Phaser.Keyboard.X,Phaser.Keyboard.S,Phaser.Keyboard.F);
		game.players['rplayer'].assignKeys(Phaser.Keyboard.DOWN,Phaser.Keyboard.UP,Phaser.Keyboard.LEFT);

		game.addPauseButton(game);
	},

	update: function () {

		game.players['lplayer'].move();
		game.players['rplayer'].move();

		game.players['lplayer'].checkFire(game.players['rplayer'].sprite.x,game.players['rplayer'].sprite.y);
		game.players['rplayer'].checkFire(game.players['lplayer'].sprite.x,game.players['lplayer'].sprite.y);

		this.game.physics.arcade.collide(game.players['lplayer'].sprite, game.players['rplayer'].fire_ball, this.callback);
		this.game.physics.arcade.collide(game.players['rplayer'].sprite, game.players['lplayer'].fire_ball, this.callback);
	},


	distance: function (x1, y1, x2, y2) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);

	},

	callback: function(player,fireball){
		player.health--;
		console.log(player.health);
		console.log(fireball);
		if(fireball.name.includes("right")){
			game.players['lplayer'].scoreHit();
		}else{
			game.players['rplayer'].scoreHit();
		}

		fireball.kill();
	},

	render: function(){
		//game.debug.bodyInfo(this.fire_ball, 16, 24);
		// Instructions:
		game.debug.text( "Left Player: S=up,X=down,F=fire.                          Right Player:Larrow=Fire,Uarrow=up,Darrow=down. ", 
		20, game.height-10 );
	}
}
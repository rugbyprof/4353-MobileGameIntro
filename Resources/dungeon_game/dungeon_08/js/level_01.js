var level_01 = {

	preload: function () {
		console.log(game);
		game.players['lplayer'] = new Player(game);
		game.players['rplayer'] = new Player(game);
	},
	create: function () {
		console.log("level_01.js");


		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.prevDir = '';	// holds sprites previous direction (left , right) so
							// we can face the correct direction when using the 'idle' animation

		game.players['lplayer'].create(0, game.camera.height / 2,'knight_atlas');
		game.players['rplayer'].create(game.camera.width, game.camera.height / 2,'knight_atlas');

		game.players['lplayer'].assignKeys(Phaser.Keyboard.X,Phaser.Keyboard.S,Phaser.Keyboard.F);
		game.players['rplayer'].assignKeys(Phaser.Keyboard.DOWN,Phaser.Keyboard.UP,Phaser.Keyboard.LEFT);

		this.v = game.input.keyboard.addKey(Phaser.Keyboard.V);

		game.players['rplayer'].load('rand',Math.random());
		game.players['lplayer'].load('rand',Math.random());

		game.addPauseButton(game);
	},

	update: function () {

		game.players['lplayer'].move();
		game.players['rplayer'].move();

		game.players['lplayer'].checkFire(game.players['rplayer'].sprite.x,game.players['rplayer'].sprite.y);
		game.players['rplayer'].checkFire(game.players['lplayer'].sprite.x,game.players['lplayer'].sprite.y);

		if(this.v.isDown){
			console.log(game.players['lplayer'].sprite.x,game.players['lplayer'].sprite.y);
			console.log(game.players['rplayer'].sprite.x,game.players['rplayer'].sprite.y);
			console.log(game.players['lplayer']);
			console.log(game.players['rplayer']);
		}

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
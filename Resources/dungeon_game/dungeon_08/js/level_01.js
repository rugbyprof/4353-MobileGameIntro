var level_01 = {

	preload: function () {
		console.log(game);
		game.players['player'] = new Player(game);
		game.players['enemy'] = new Player(game);
	},
	create: function () {
		console.log("level_01.js");


		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.prevDir = '';	// holds sprites previous direction (left , right) so
							// we can face the correct direction when using the 'idle' animation


		game.players['player'].create(0, game.camera.height / 2,'knight_atlas');
		game.players['enemy'].create(game.camera.width, game.camera.height / 2,'knight_atlas');

		game.players['player'].assignKeys(Phaser.Keyboard.X,Phaser.Keyboard.S,Phaser.Keyboard.F);
		game.players['enemy'].assignKeys(Phaser.Keyboard.DOWN,Phaser.Keyboard.UP,Phaser.Keyboard.SPACE);


		game.addPauseButton(game);
	},

	update: function () {

		game.players['player'].move();
		game.players['enemy'].move();

		game.players['player'].checkFire(game.players['enemy'].x,game.players['enemy'].y);

	},


	distance: function (x1, y1, x2, y2) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);

	},

	render: function(){
		//game.debug.bodyInfo(this.fire_ball, 16, 24);
		// Instructions:
		game.debug.text( "Press F to fire the fireball.", game.width/2, game.height-10 );
	}
}
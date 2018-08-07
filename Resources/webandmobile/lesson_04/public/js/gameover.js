var gameOver = {

	create: function () {
		console.log("gameover.js");
		game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = game.add.image(0, 0, 'bg')

		var w = game.width
		var h = game.height

		// Title
		var logo = game.add.bitmapText(w / 2, -100, 'fontUsed', '', 75)
		logo.text = GAMETITLE
		logo.anchor.setTo(0.5, 0.5)
		game.add.tween(logo).to({
			y: h / 2 - 80
		}, 1000, Phaser.Easing.Bounce.Out).start()

		if (game.globals.score > game.globals.best_score) {
			var message = game.add.bitmapText(w / 2, -100, 'fontUsed', '', 30)
			message.text = 'New record!!! \nYou scored: ' + game.globals.score + '\nTap to try again'
			message.anchor.setTo(0.5, 0.5)
			game.add.tween(message).to({
				y: h / 2 - 20
			}, 1000, Phaser.Easing.Bounce.Out).start()
		} else {
			var message = game.add.bitmapText(w / 2, -100, 'fontUsed', '', 30)
			message.text = 'Game Over \nYou scored: ' + game.globals.score + '\nBest: ' + game.globals.best_score + '\nTap to try again'
			message.anchor.setTo(0.5, 0.5)
			game.add.tween(message).to({
				y: h / 2 - 20
			}, 1000, Phaser.Easing.Bounce.Out).start()
		}

		if (game.globals.score > game.globals.best_score) {
			game.globals.best_score = game.globals.score
		}

		game.input.onDown.add(this.listener, this)
	},

	listener: function () {
		game.sound.stopAll();
		game.globals.score = 0;
		BG_COLOR = COLORS_PASTEL[Math.floor(Math.random() * (COLORS_PASTEL.length - 1))]
		game.state.start('play')
	}

}
var GameOver = {

	create: function () {
		console.log("GameOver.js");
		
		var w = game.width
		var h = game.height

		this.background = game.add.tileSprite(0, 0, w, h, 'gameOver');

		// Title
		var logo = game.add.bitmapText(w / 2, -100, 'mainFont', '', 75)
		logo.text = game.global.title;
		logo.anchor.setTo(0.5, 0.5)
		game.add.tween(logo).to({
			y: h / 2 - 80
		}, 1000, Phaser.Easing.Bounce.Out).start()

		if (game.global.score > game.global.best_score) {
			var message = game.add.bitmapText(w / 2, -100, 'mainFont', '', 30)
			message.text = 'New record!!! \nYou scored: ' + game.global.score + '\nTap to try again'
			message.anchor.setTo(0.5, 0.5)
			game.add.tween(message).to({
				y: h / 2 - 20
			}, 1000, Phaser.Easing.Bounce.Out).start()
		} else {
			var message = game.add.bitmapText(w / 2, -100, 'mainFont', '', 30)
			message.text = 'Game Over \nYou scored: ' + game.global.score + '\nBest: ' + game.global.best_score + '\nTap to try again'
			message.anchor.setTo(0.5, 0.5)
			game.add.tween(message).to({
				y: h / 2 - 20
			}, 1000, Phaser.Easing.Bounce.Out).start()
		}

		if (game.global.score > game.global.best_score) {
			game.global.best_score = game.global.score
		}

		game.input.onDown.add(this.listener, this)
	},

	listener: function () {
		game.sound.stopAll();
		game.global.score = 0;
		game.state.start('mainMenu')
	}

}
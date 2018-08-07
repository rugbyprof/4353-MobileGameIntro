var mainMenu = {

	create: function () {
		console.log("mainmenu.js");
		// BG COLOR
		game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = game.add.image(0, 0, 'bg')

		var w = game.width
		var h = game.height

		// Title
		var logo = game.add.bitmapText(w / 2, -100, 'fontUsed', '', 75)
		logo.text = game.global.game_title;
		logo.anchor.setTo(0.5, 0.5)
		game.add.tween(logo).to({
			y: h / 2 - 80
		}, 1000, Phaser.Easing.Bounce.Out).start()

		// Help
		var label = game.add.bitmapText(w / 2, h - 100, 'fontUsed', '', 40);
		label.text = 'Level ' + game.global.level;
		label.anchor.setTo(0.5, 0.5)
		label.alpha = 0
		game.add.tween(label).delay(500).to({
			alpha: 1
		}, 1000).start()
		game.add.tween(label).to({
			y: h - 120
		}, 500).to({
			y: h - 100
		}, 500).loop().start()

		// touch input
		game.input.onDown.add(this.listener)
	},
	listener: function () {
		if(game.global.score < 3){
			game.state.start('play')
		}else if(game.global.score >= 3){
			game.state.start('play2')
		}
	}
}
var gameOver = function(){}

gameOver.prototype = {
	
	create:function(){
		console.log("gameover.js");
		this.game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = this.game.add.image(0,0,'bg')

		var w = this.game.width
		var h = this.game.height

		// Title
		var logo = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 75)
		logo.text = GAMETITLE
		logo.anchor.setTo(0.5, 0.5)
		this.game.add.tween(logo).to({ y: h/2-80 }, 1000, Phaser.Easing.Bounce.Out).start()
		
		if(this.game.global.score>this.game.global.best_score)
		{
			var message = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 30)
			message.text = 'New record!!! \nYou scored: ' + this.game.global.score + '\nTap to try again'
			message.anchor.setTo(0.5, 0.5)
			this.game.add.tween(message).to({ y: h/2-20 }, 1000, Phaser.Easing.Bounce.Out).start()
		}
		else
		{
			var message = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 30)
			message.text = 'Game Over \nYou scored: ' + this.game.global.score + '\nBest: ' + this.game.global.best_score + '\nTap to try again'
			message.anchor.setTo(0.5, 0.5)
			this.game.add.tween(message).to({ y: h/2-20 }, 1000, Phaser.Easing.Bounce.Out).start()
		}

		if(this.game.global.score>this.game.global.best_score)
		{
			this.game.global.best_score = this.game.global.score
		}

		this.game.input.onDown.add(listener, this)
		console.log(this);
		function listener(game)
		{
			this.game.sound.stopAll();
			this.game.global.score = 0;
			BG_COLOR = COLORS_PASTEL[Math.floor(Math.random()*(COLORS_PASTEL.length-1))]
			this.game.state.start('play')
		}
	}
}
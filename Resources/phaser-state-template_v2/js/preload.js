var preload = {
	preload:function(){
		console.log("preload.js");
		game.stage.backgroundColor = BG_COLOR

		var loading_border = this.add.image(game.width/2,game.height/2,'loading_border')
		loading_border.anchor.setTo(.5,.5)
		var loading = this.add.sprite(game.width/2,game.height/2,'loading')
		loading.anchor.setTo(.5,.5)
		this.load.setPreloadSprite(loading)
		
		// game entities/world
		//this.load.image('player', 'images/player_x1.png')
		game.load.image('player', 'images/parachute.png')
		game.load.image('obstacle', 'images/platform_thin_x7.png')
		game.load.image('pause', 'images/pause.png')
		game.load.image('bg', 'images/cream.png')

		//https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
		//https://www.leshylabs.com/apps/sstool/
		//https://phaser.io/examples/v2/animation/animation-events
		game.load.atlas('ufoAtlas', 'images/ufo-sheet_2.png', 'images/ufo-atlas_2.json');

		// audio
		game.load.audio('bg_spin', 'sounds/spin_bg_music.mp3')
		game.load.audio('bg_edm', 'sounds/edm_bg_music.mp3')
		game.load.audio('score', 'sounds/score.wav')
		game.load.audio('kill', 'sounds/Ouch.ogg')
		game.load.audio('music', 'sounds/abstractionRapidAcrobatics.wav')

		// font
		game.load.bitmapFont('fontUsed', 'font/ganonwhite/font.png', 'font/ganonwhite/font.xml');

	},
	
	create:function(){
		
		game.state.start('mainMenu')
	}
}
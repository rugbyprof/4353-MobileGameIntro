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
		this.load.image('player', 'images/parachute.png')
		this.load.image('obstacle', 'images/platform_thin_x7.png')
		this.load.image('pause', 'images/pause.png')
		this.load.image('bg', 'images/cream.png')

		// audio
		this.load.audio('bg_spin', 'sounds/spin_bg_music.mp3')
		this.load.audio('bg_edm', 'sounds/edm_bg_music.mp3')
		this.load.audio('score', 'sounds/score.wav')
		this.load.audio('kill', 'sounds/kill.ogg')
		this.load.audio('music', 'sounds/abstractionRapidAcrobatics.wav')

		// font
		game.load.bitmapFont('fontUsed', 'font/ganonwhite/font.png', 'font/ganonwhite/font.xml');

	},
	
	create:function(){
		
		game.state.start('mainMenu')
	}
}
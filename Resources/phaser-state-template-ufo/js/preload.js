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
		//this.load.image('player', 'assets/player_x1.png')
		game.load.image('player', 'assets/parachute.png')
		game.load.image('obstacle', 'assets/platform_thin_x7.png')
		game.load.image('pause', 'assets/pause.png')
		game.load.image('bg', 'assets/cream.png')

		// Load all my new obstacles
		for(i=0;i<game.global.obstacle_icons.length;i++){
			name = game.global.obstacle_icons[i];
			game.load.image('icon-'+name, 'assets/icon-'+name+'.png');
		}

		//https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
		//https://www.leshylabs.com/apps/sstool/
		//https://phaser.io/examples/v2/animation/animation-events
		//game.load.atlas('ufoAtlas', 'assets/ufo-sheet_2.png', 'assets/ufo-atlas_2.json');

		game.ufo.preLoad('ufoAtlas', 'assets/ufo-sheet_2.png', 'assets/ufo-atlas_2.json');

		game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
		game.load.image('starfield', 'assets/starfield.png');

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
/**
 * preload: prepares game by loading assets
 */
var PreLoad = {
	preload:function(){
		console.log("preLoad.js");
		game.stage.backgroundColor = game.global.backgroundColor;

		// Preload loading bar resources
		var loading_border = this.add.image(game.width/2,game.height/2,'loading_border')
		loading_border.anchor.setTo(.5,.5)
		var loading = this.add.sprite(game.width/2,game.height/2,'loading')
		loading.anchor.setTo(.5,.5)
		this.load.setPreloadSprite(loading)
		
		// load images here: 
		//////////////////////////////////////////////////////
		game.load.image('pause', 'assets/images/pause.png');			
		game.load.image('splash', 'assets/images/flame_thrower2.png');
		game.load.image('gameOver', 'assets/images/game_over_800.png');

		// load atlas or sprites here: 
		//////////////////////////////////////////////////////
		//game.ufo.preLoad('atlasKey', 'path/to/atlas.png', 'path/to/atlas.json');
		//game.load.spritesheet('spritesheetKey', 'path/to/sheet.png', frame_width, frame_height);
		game.load.atlas('knight_atlas', 'assets/sprites/knight_atlas.png', 'assets/sprites/knight_atlas.json');
		game.load.atlas('fire_ball', 'assets/sprites/fire_ball.png', 'assets/sprites/fire_ball.json');
		game.load.spritesheet('death_fire', 'assets/sprites/death_fire.png', 80, 80);
		game.load.spritesheet('smoke', 'assets/images/smoke_particle.png', 31, 31);

		// load audio here: 
		//////////////////////////////////////////////////////
		//game.load.audio('audiokey1', 'path/to/sounds/one.mp3')
		//game.load.audio('audiokey2', 'path/to/sounds/two.ogg')
		//game.load.audio('audiokey3', 'path/to/sounds/three.wav')

		// load fonts
		//////////////////////////////////////////////////////
		game.load.bitmapFont('mainFont', 'assets/fonts/ganonwhite/font.png', 'assets/fonts/ganonwhite/font.xml');

	},
    
    /**
     * create method calls the mainMenu state.
     */
	create:function(){
		//game.state.start('MainMenu');
		game.state.start("FlameGame");
	}
}
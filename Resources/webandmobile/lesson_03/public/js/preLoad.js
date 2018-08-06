/**
 * preload: prepares game by loading assets
 */
var preLoad = {
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
		game.load.image('splash', 'assets/images/splash_screen.png');
		game.load.image('gameOver', 'assets/images/game_over_800.png');

		// load atlas or sprites here: 
		//////////////////////////////////////////////////////
		//game.ufo.preLoad('atlasKey', 'path/to/atlas.png', 'path/to/atlas.json');
		//game.load.spritesheet('spritesheetKey', 'path/to/sheet.png', frame_width, frame_height);
		game.load.atlas('knight_atlas', 'assets/sprites/knight_atlas.png', 'assets/sprites/knight_atlas.json');
		game.load.atlas('red_portal', 'assets/sprites/red_portal.png', 'assets/sprites/red_portal.json');
		game.load.spritesheet('portal_smoke', 'assets/sprites/smoke.png', 128, 128);
		game.load.spritesheet('ghosts', 'assets/sprites/pacman_ghosts.png', 116, 116);

		// load audio here: 
		//game.load.audio('audiokey1', 'path/to/sounds/one.mp3')
		//game.load.audio('audiokey2', 'path/to/sounds/two.ogg')
		//game.load.audio('audiokey3', 'path/to/sounds/three.wav')

		// load fonts
		//////////////////////////////////////////////////////
		game.load.bitmapFont('mainFont', 'assets/fonts/ganonwhite/font.png', 'assets/fonts/ganonwhite/font.xml');

		//Pre load all the json map info for each level
		this.getMap("assets/maps/level_01.json","level_01",this.saveMap)
		this.getMap("assets/maps/level_02.json","level_02",this.saveMap)
		this.getMap("assets/maps/level_03.json","level_03",this.saveMap)
	},
    
    /**
     * create method calls the mainMenu state.
     */
	create:function(){
		game.state.start('mainMenu')
	},

	/**
	 * @param{string} url : path to the json we want to read in
	 * @param{function} callback : callback function to handle to retreived json
	 */
	getMap: function (url, level,callback) // How can I use this callback?
	{
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				callback(level,request.responseText); // Another callback here
			}
		};
		request.open('GET', url);
		request.send();
	},
	/**
	 * @param{string}level: name of the game level used as a key in the global object
	 * @param{json}data: the map json 
	 */
	saveMap: function(level,data){
		this.game.global.levels[level] = JSON.parse(data);
	}
}
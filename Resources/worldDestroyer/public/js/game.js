var config = {
	game_title: "Destroyer Of Worlds and Stuff",
	bg_color: '#000000',
	maxWidth: 1000,
	maxHeight: 750,
	minWidth: 500,
	minHeight: 166,
	score: 0,
	best_score: 0,
	obstacle_id: 0,
	obstacle_icons: ['beer', 'chicken', 'hotdog', 'icecream', 'pizza', 'poop'],
	level: 1,
	ufoFactory: []
}

var game = new Phaser.Game(config.max_width, config.max_height, Phaser.Canvas, "game");

game.multi = {
	others: {},
	count: 0,
	pid: null
}

game.globals = config;


game.state.add("boot", boot);
game.state.add("preload", preload);
game.state.add("mainMenu", mainMenu);
game.state.add("gameOver", gameOver);
game.state.add("destroyer", destroyer);
game.state.start("boot");



function random(n) {
	return Math.floor(Math.random() * (n + 1))
}

function randomInt(min = 0, max = 9007199254740992) {
	return Math.floor(max * Math.random()) + min;
}


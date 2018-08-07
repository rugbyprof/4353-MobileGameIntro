var config = {
	game_title: "Ufo Scroller",
	bg_color: '#000000',
	maxWidth: 1000,
	maxHeight: 750,
	minWidth: 500,
	minHeight: 166,
	score: 0,
	best_score: 0,
	obstacle_id: 0,
	obstacle_icons: ['beer', 'chicken', 'hotdog', 'icecream', 'pizza', 'poop'],
	level: 1
}

var game = new Phaser.Game(config.max_width, config.max_height, Phaser.Canvas, "game");


game.players = [];

game.players.push(new Ufo(game));

game.globals = config;

game.state.add("boot", boot);
game.state.add("preload", preload);
game.state.add("mainMenu", mainMenu);
game.state.add("play", play);
game.state.add("gameOver", gameOver);
game.state.start("boot");


function random(n) {
	return Math.floor(Math.random() * (n + 1))
}
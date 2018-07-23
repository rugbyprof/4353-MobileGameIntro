var game = new Phaser.Game(750, 422, Phaser.Canvas, "game");


game.global = {
    title: "Scary Dungeon",
	score: 0,
	best_score: 0,
    level:1,
    backgroundColor:"#000000",
    current_level: "level_01"
}

game.state.add("boot", boot);
game.state.add("preLoad", preLoad);
game.state.add("mainMenu", mainMenu);
game.state.add("gameOver", gameOver);
game.state.start("boot");
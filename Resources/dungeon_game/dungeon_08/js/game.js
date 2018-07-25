var game = new Phaser.Game(1024, 768, Phaser.Canvas, "game");


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
game.state.add("level_01", level_01);
game.state.add("gameOver", gameOver);
game.state.start("boot");

game.players = {};

/**
 * This method lets a user pause the game by pushing the pause button in
 * the top right of the screen. 
 */
game.addPauseButton = function (game) {
    var pause_button = game.add.sprite(game.width - 40, 40, 'pause');
    pause_button.anchor.setTo(.5, .5);
    pause_button.inputEnabled = true;
    // pause:
    pause_button.events.onInputUp.add(
        function () {
            if (!game.paused) {
                game.paused = true;
            }
            pause_watermark = game.add.sprite(game.width / 2, game.height / 2, 'pause');
            pause_watermark.anchor.setTo(.5, .5);
            pause_watermark.alpha = .5;
        }, this)
    // Unpause:
    game.input.onDown.add(
        function () {
            if (game.paused) {
                game.paused = false;
                pause_watermark.destroy();
            }
        }, self)
}
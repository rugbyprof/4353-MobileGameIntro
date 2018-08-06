var game = new Phaser.Game(1024, 768, Phaser.Arcade, "game");

game.global = {
    otherPlayers:{},

}

game.state.add("SpaceGame", SpaceGame);
game.state.start("SpaceGame");


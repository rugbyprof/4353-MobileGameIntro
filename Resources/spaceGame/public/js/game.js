var game = new Phaser.Game(1024, 768, Phaser.Arcade, "game");

game.state.add("SpaceGame", SpaceGame);
game.state.add("ShowMenu", ShowMenu);
game.state.start("ShowMenu");


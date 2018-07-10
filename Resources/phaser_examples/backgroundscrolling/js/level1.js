Game.Level1 = function(game){}; 
// variables 
var background; 

Game.Level1.prototype = {
    create:function (game) {
    // reference to the background png
    background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");
    }, 
    // Update funtion, desires to be called 60 time a second. 
    update: function () {
        background.tilePosition.x -= 4;
    }
}

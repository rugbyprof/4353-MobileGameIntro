var Game = {};

Game.Boot = function(game) {

}; 

Game.Boot.prototype = {
    preload:function() {
        this.load.image("preloaderBar", "assets/preloader.png");
    },

    create:function() {
        this.state.start("Preloader");
    }
}
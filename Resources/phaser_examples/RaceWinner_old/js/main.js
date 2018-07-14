var game = new Phaser.Game(800, 768, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var background;
var parray = [];
var winner = 0;

function preload() {

    game.load.spritesheet('game_player', 'assets/players2.png', 64, 110);

    //non players
    game.load.image("background", "assets/road.png");
    
}

function create() {

    winner = prompt("Pick the winner:", "winner");
    //then you can save it via local storage


    background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");

    // create an array of sprites to race each other
    for(var i=0;i<5;i++){
        parray.push(game.add.sprite(100, i*110+110, 'game_player'));
        let frames = [];
        parray[i].animations.add('game_run',[0+14*i,1+14*i,2+14*i,3+14*i,4+14*i,5+14*i,6+14*i]);
        parray[i].animations.play('game_run', 20, true);
    }
    game.input.onDown.add(changePlayer, this);

}

function update(){
    background.tilePosition.x -= 17;
    for(var i=0;i<parray.length;i++){
        let r = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
        if(r % 2 == 0){
            parray[i].x += 3;
        }else{
            parray[i].x -= 1;
        }
    }
    
}


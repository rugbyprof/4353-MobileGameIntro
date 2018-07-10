var game = new Phaser.Game(800, 768, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var runner;
var gamer;
var background;

function preload() {

    game.load.spritesheet('runner', 'assets/runner.png', 108, 140);
    game.load.spritesheet('game_player', 'assets/players2.png', 64, 110);
    game.load.spritesheet('cloud', 'assets/clouds.png', 240,240);
    game.load.image("background", "assets/road.png");
    

}

function create() {

    background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");
    runner = game.add.sprite(100, 300, 'runner');
    game_player = game.add.sprite(100, 200, 'game_player');
    
    cloud = game.add.sprite(0, 0, 'cloud');
    cloud.visible = false;

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'hero' sprite sheet
    runner.animations.add('running',[0,1,2,3,4,5,6,7]);
    game_player.animations.add('game_run',[0,1,2,3,4,5,6]);
    

    //  Play the animation: play('name of animation',FPS,loop=true/false)
    runner.animations.play('running', 20, true);
    game_player.animations.play('game_run', 20, true);

    game.input.onDown.add(changePlayer, this);

    var player = prompt("Please enter your name", "name");
}


function changePlayer() {
    cloud.visible = true;
    cloud.animations.add('lightning',[0,1,2,3,4,5,6,7,8,9,10,0])
    game_player.animations.add('game_run',[14,15,16,17,18,19,20]);
    game_player.animations.play('game_run', 20, true);
    cloud.x = game.input.x-120;
    cloud.y = game.input.y;
    cloud.animations.play('lightning', 20, false,false);
    

}

function update(){
    background.tilePosition.x -= 4;
}


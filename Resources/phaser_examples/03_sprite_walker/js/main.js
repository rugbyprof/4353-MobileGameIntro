var game = new Phaser.Game(1200, 768, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, init:init,update: update });

var runner;
var gamer;
var background;
var birds = [];
var birdCount = -1;
var runners = [];
var boosts = [];
var winner = false;
var runSlow = false;
var time = 0;
var flying_bird = false;

var phaserKeys;

var finish_line_x;
var finish_line;

//https://albert-gonzalez.github.io/easytimer.js/
var timer = new Timer();

function preload() {
    game.load.spritesheet('game_player', 'assets/players2.png', 64, 110);
    game.load.image("background", "assets/road2.png");
    game.load.image("finish_line", "assets/finish_line.png");
    game.load.image("boost", "assets/boost_icon.png");
    game.load.spritesheet('bird','assets/bird-sprite-reverse.png',200,162);
}


function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}

function create() {

    background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");

    

    finish_line_x = window.innerWidth;

    //start timer obtained from easytimer.js
    timer.start({precision: 'secondTenths'});
    // Add AFTER background, or time will be hidden
    timeText = game.add.text(16, 16, "00:00:00", { fontSize: '32px', fill: '#000' });

    for(var i=0;i<5;i++){
        runners.push(game.add.sprite(100, i*110+110, 'game_player'));
        game.physics.enable(runners[i], Phaser.Physics.ARCADE);
        runners[i].scale.setTo(.6+i/10, .6+i/10);

        boosts.push(game.add.sprite(25, i*110+110+50, 'boost'));
        boosts[i].scale.setTo(.3, .3);
        boosts[i].tint = Math.random() * 0xffffff;

        runners[i].animations.add('run_fast',[0+14*i,1+14*i,2+14*i,3+14*i,4+14*i,5+14*i,6+14*i]);
        runners[i].animations.add('run_slow',[0+14*i,1+14*i,2+14*i,3+14*i,4+14*i,5+14*i,6+14*i]);
        runners[i].animations.add('winner',[10+14*i,11+14*i,12+14*i]);
        runners[i].animations.play('run_fast', 20, true);
    }

    //game.input.onDown.add(changePlayer, this);

    gameTimer();
}


function update(){
    if(!runSlow){
        background.tilePosition.x -= 5;
    }else{
        if(!winner){
            background.tilePosition.x-=2;
            finish_line.x-=2;
            for(var i=0;i<runners.length;i++){
                game.physics.arcade.overlap(runners[i], finish_line, collisionHandler, null, this);
            }
        }
    }
    for(var i=0;i<runners.length;i++){
        let r = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99

        if(!runSlow){
            if(r % 2 == 0){
                runners[i].x += 3;
            }else{
                runners[i].x -= 1;
            }
        }else{
            if(r % 2 == 0){
                runners[i].x += 3;
            }else{
                runners[i].x += 1;
            }            
        }
    }
    if(!runSlow){
        checkRunSlowMo();
    }
    if(!winner){
        updateClock();
    }

	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// If the key was just pressed, fire a laser
		if (key.justDown) {
			fireBird();
		}
	}
    if(birds.length > 0){
        for(var i=0;i<birds.length;i++){
            birds[i].x -= 5;
        }
    }
}

function fireBird(){
    console.log("fire bird!!");
    birds.push(game.add.sprite(1200, game.rnd.frac() * window.innerHeight, 'bird'));
    birdCount++;
    birds[birdCount].scale.setTo(.3, .3);
    birds[birdCount].animations.add('fly',[0,1,2,3,4]);
    birds[birdCount].animations.play('fly',20,true);
}

function collisionHandler(obj){
    console.log(obj);

    if(winner === false){
        winner = true;
        obj.animations.play('winner', 10, true);
    }

}

function updateClock(){
    timeText.setText(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
}

function checkRunSlowMo(){
    for(var i=0;i<runners.length;i++){
        if(runners[i].x > 600){
            runSlow = true;
        }
    }
    if(runSlow){
        for(var i=0;i<runners.length;i++){
            runners[i].animations.play('run_slow', 5, true);
        }
        finish_line = game.add.sprite(1200,100 , 'finish_line')
        game.physics.enable(finish_line, Phaser.Physics.ARCADE);
    }
}

//example game timer (not used)
//outputs: mm:ss (no tenths of a second)
function gameTimer() {
    time += 1;

    m = Math.floor(time / 60);

    if(m > 0){
        time -= m * 60;
    }

    s = time;

    timeText.setText(padTime(m)+":"+padTime(s));
    var t = setTimeout(gameTimer, 1000);
}
function padTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


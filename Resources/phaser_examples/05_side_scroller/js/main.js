var SPEED = 180;
var GRAVITY = 18;
var JET = 420;
var SPAWN_RATE = .83;
var OPENING = 200;

var state = {
    preload: function() {
        this.load.spritesheet("player",'http://games.jessefreeman.com/wp-content/public/workshop/phaser/assets/player.png', 48, 48);
        this.load.image("background", "http://fc03.deviantart.net/fs46/f/2009/174/a/3/Mario_Clouds_Desktop_by_sadistmoi.jpg");
        this.load.audio("flap", "http://games.jessefreeman.com/wp-content/public/workshop/phaser/assets/jet.wav");
        this.load.audio("score", "http://games.jessefreeman.com/wp-content/public/workshop/phaser/assets/score.wav");
        this.load.audio("hurt", "http://games.jessefreeman.com/wp-content/public/workshop/phaser/assets/hurt.wav");
    },
    create: function() {
        this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
        this.walls = this.add.group();
        this.invs = this.add.group();

        this.player = this.add.sprite(0, 0, 'player');
        this.player.animations.add('fly', [0, 1, 2], 10, true);
        this.player.body.gravity.y = GRAVITY;

        this.scoreText = this.add.text(
            this.world.width / 2,
            this.world.height / 5,
            "",
            {
                size: '32px',
                fill: '#fff',
                align: 'center'
            }
        );
        this.scoreText.anchor.setTo(0.5, 0.5);

        this.flapSnd = this.add.audio('flap');
        this.scoreSnd = this.add.audio('score');
        this.hurtSnd = this.add.audio('hurt');

        this.input.onDown.add(this.jet, this);

        this.reset();
    },
    update: function() {
        if (this.gameStarted) {

            if(this.player.body.velocity.y > -20){
                this.player.frame = 3;
            }else {
                this.player.animations.play('fly');
            }

            if (!this.gameOver) {
                this.physics.overlap(this.player, this.walls, this.setGameOver, null, this);
                if (!this.gameOver && this.player.body.bottom >= this.world.bounds.bottom) {
                    this.setGameOver();
                }
                this.physics.overlap(this.player, this.invs, this.addScore, null, this);
            }
            this.walls.forEachAlive(function(wall) {
                if (wall.x + wall.width < game.world.bounds.left) {
                    wall.kill();
                }
            });
            this.wallTimer.update();
        } else {
            this.player.y = (this.world.height / 2) + 8 * Math.cos(this.time.now / 200);
        }

        if (!this.gameOver) {
            this.background.tilePosition.x -= this.time.physicsElapsed * SPEED / 2;
        }
    },
    start: function() {
        this.player.body.allowGravity = true;
        this.player.body.collideWorldBounds = true;

        this.wallTimer = new Phaser.Timer(this);
        this.wallTimer.onEvent.add(this.spawnWalls, this);
        this.wallTimer.start();
        this.wallTimer.add(2);

        this.scoreText.setText("SCORE\n"+this.score);

        this.gameStarted = true;
    },
    reset: function() {
        this.gameStarted = false;
        this.gameOver = false;
        this.score = 0;
        this.scoreText.setText("TOUCH TO\nSTART GAME");
        this.player.body.allowGravity = false;
        this.player.reset(this.world.width / 4, this.world.height / 2);
        this.player.animations.play('fly');
        this.walls.removeAll();
        this.invs.removeAll();
    },
    jet: function() {
        if (!this.gameStarted) {
            this.start();
        }
        if (!this.gameOver) {
            this.player.body.velocity.y = -JET;
            this.flapSnd.play();
        }else if(this.time.now > this.timeOver + 400){
            this.reset();
        }
    },
    spawnWall: function(wallY, flipped) {
        var wall = this.walls.create(
            game.width,
            wallY + (flipped ? -OPENING : OPENING) / 2,
            'wall'
        );
        wall.body.allowGravity = false;

        wall.scale.y = flipped ? -1 : 1;
        wall.body.offset.y = flipped ? -wall.body.height : 0;

        wall.body.velocity.x = -SPEED;

        return wall;
    },
    spawnWalls: function() {
        this.wallTimer.stop();

        var wallY = this.rnd.integerInRange(game.height * .3, game.height * .7);
        var botwall = this.spawnWall(wallY);
        var topwall = this.spawnWall(wallY, true);

        var inv = this.invs.create(topwall.x + topwall.width, 0);
        inv.width = 2;
        inv.height = this.world.height;
        inv.body.allowGravity = false;
        inv.body.velocity.x = -SPEED;

        this.wallTimer.start();
        this.wallTimer.add(1 / SPAWN_RATE);
    },
    addScore: function(_, inv) {
        this.invs.remove(inv);
        this.score += 1;
        this.scoreText.setText("SCORE\n" + this.score);
        this.scoreSnd.play();
    },
    setGameOver: function() {
        this.timeOver = game.time.now;
        this.gameOver = true;

        this.walls.forEachAlive(function(wall) {
            wall.body.velocity.x = 0;
        });

        this.invs.forEach(function(inv) {
            inv.body.velocity.x = 0;
        });

        this.wallTimer.stop();
        this.scoreText.setText("FINAL SCORE\n" + this.score +"\n\nTOUCH TO\nTRY AGAIN");
        this.hurtSnd.play();
    }
};

var game = new Phaser.Game(
    320,
    568,
    Phaser.CANVAS,
    document.querySelector('#screen'),
    state
);

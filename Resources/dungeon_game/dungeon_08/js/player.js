function Player(game_copy) {
    var game = game_copy;

    this.load = function (key, value) {
        this[key] = value;
    };

    this.preload = function () {
        game.load.atlas('knight_atlas', 'assets/sprites/knight_atlas.png', 'assets/sprites/knight_atlas.json');
    };

    this.create = function (x, y, atlas) {
        this.x = x;
        this.y = y;
        this.bulletTime = 0;
        this.dead = false;

        // Adding the knight atlas that contains all the animations
        this.sprite = game.add.sprite(this.x, this.y, atlas);

        this.deathFire = game.add.sprite(0,0,'death_fire');
        this.deathFire.animations.add('fry');
        this.deathFire.alpha = 0;
        this.deathFire.anchor.setTo(0.5);

        this.sprite.health = 10;

        // Add walking and idle animations. Different aninmations are needed based on direction of movement.
        this.sprite.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
        this.sprite.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
        this.sprite.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
        this.sprite.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
        this.sprite.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 20, true);
        this.die = this.sprite.animations.add('die', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, false);

        if (this.sprite.x > game.width / 2) {
            console.log("right");
            this.prevDir = 'left';
            this.side = 'right';
        } else {
            console.log("left");
            this.prevDir = 'right';
            this.side = 'left';
        }

        this.sprite.anchor.setTo(0.5);

        game.physics.arcade.enable(this.sprite);

        // tell camera to follow sprite now that we're on a map
        // and can move out of bounds
        //game.camera.follow(this.sprite);

        this.sprite.body.collideWorldBounds = true;

        this.fire_ball = game.add.group();
        this.fire_ball.enableBody = true;
        this.fire_ball.physicsBodyType = Phaser.Physics.ARCADE;


        

        for (var i = 0; i < 5; i++) {
            var f = this.fire_ball.create(0, 0, 'fire_ball');
            f.name = 'fire_ball-' + this.side + '-' + i;
            f.exists = false;
            f.visible = false;
            f.checkWorldBounds = true;
            f.events.onOutOfBounds.add(this.resetFireBall, this);
            f.animations.add('fire', Phaser.Animation.generateFrameNames('fire_ball', 0, 9), 50, false);
        }

        if (this.prevDir == 'left') {
            this.barxoffset = 0;
            //  This adjusts the collision body size to be a 100x50 box.
            //  50, 25 is the X and Y offset of the newly sized box.
            this.sprite.body.setSize(60, 60, 0, 0);
        } else {
            this.barxoffset = 0;
            this.sprite.body.setSize(60, 60, 0, 0);
        }

        this.baryoffset = 35;

        this.barConfig = {
            width: 50,
            height: 4,
            x: (this.sprite.x + this.barxoffset),
            y: (this.sprite.y + this.baryoffset),
            bg: {
                color: '#FF0000'
            },
            bar: {
                color: '#00FF00'
            },
            animationDuration: 200,
            flipped: false
        };
        this.myHealthBar = new HealthBar(game, this.barConfig);

        this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    };

    this.assignKeys = function (downKey, upKey, fireKey) {
        this.downKey = game.input.keyboard.addKey(downKey);
        this.upKey = game.input.keyboard.addKey(upKey);
        this.fireKey = game.input.keyboard.addKey(fireKey);
    }

    this.move = function () {
        if (!this.dead) {

            if(this.spaceBar.isDown){
                console.log("jump")
                this.sprite.animations.play('jump_right');
            }
            if (this.upKey.isDown) {
                if (this.prevDir == 'left') {
                    this.sprite.animations.play('walk_left');
                } else {
                    this.sprite.animations.play('walk_right');
                }
                this.sprite.body.velocity.y = -200;
            }

            if (this.downKey.isDown) {
                if (this.prevDir == 'left') {
                    this.sprite.animations.play('walk_left');
                } else {
                    this.sprite.animations.play('walk_right');
                }
                this.sprite.body.velocity.y = 200;
            }

            if (!this.upKey.isDown && !this.downKey.isDown) {
                if (this.prevDir == 'left') {
                    this.sprite.animations.play('idle_left');

                } else {
                    this.sprite.animations.play('idle_right');

                }
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = 0;
            }
            this.myHealthBar.setPosition(this.sprite.x + this.barxoffset, this.sprite.y - this.baryoffset);
        }else{
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
    };

    this.checkFire = function (x, y) {
        if (this.fireKey.justPressed()) {
            console.log("fire!!")
            this.fireWeapon(x, y);
        }
    };

    this.fireWeapon = function (x, y) {

        var angle = Math.atan2(y - this.sprite.y, x - this.sprite.x) * 180 / Math.PI;

        var xSpeed = 500 * Math.cos(angle * (Math.PI / 180));
        var ySpeed = 500 * Math.sin(angle * (Math.PI / 180));

        // if (game.time.now > this.bulletTime)
        // {
        ball = this.fire_ball.getFirstExists(false);

        if (ball) {
            ball.reset(this.sprite.x + 6, this.sprite.y - 8);
            ball.angle = angle;
            ball.body.velocity.setTo(xSpeed, ySpeed);
            this.bulletTime = game.time.now + 150;
            ball.animations.play('fire');
        }
        //}
    };

    this.scoreHit = function () {
        console.log("score hit")
        this.myHealthBar.setPercent((this.sprite.health / 10) * 100);
        if ((this.sprite.health / 10 * 100) <= 0) {
            this.sprite.play('die');
            this.die.onComplete.add(function(){
                this.deathFire.animations.play('fry', 30, true);
            }, this);
            this.deathFire.alpha = 1;
            this.deathFire.x = this.sprite.x;
            this.deathFire.y = this.sprite.y-10;
            this.dead = true;
        }
    }

    this.resetFireBall = function (fireBall) {
        fireBall.kill();
    }

    this.isOverlapped = function (sprite) {

        var boundsA = this.sprite.getBounds();
        var boundsB = sprite.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    };
};
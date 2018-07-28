function Player(game_copy) {
    var game = game_copy;

    this.load = function (key, value) {
        this[key] = value;
    };

    this.preload = function () {
        game.load.atlas('knight_atlas', 'assets/sprites/knight_atlas.png', 'assets/sprites/knight_atlas.json');
        game.load.spritesheet('smoke', 'assets/images/smoke_particle.png', 13, 13);
    };

    this.createPlayer = function (x, y, atlas) {
        this.x = x;
        this.y = y;
        this.bulletTime = 0;
        this.dead = false;
        this.busy = false;

        this.emitter = null;

        // Adding the knight atlas that contains all the animations
        this.sprite = game.add.sprite(this.x, this.y, atlas);

        this.deathFire = game.add.sprite(0, 0, 'death_fire');
        this.deathFire.animations.add('fry');
        this.deathFire.alpha = 0;
        this.deathFire.anchor.setTo(0.5);

        this.sprite.health = 10;

        // Add walking and idle animations. Different aninmations are needed based on direction of movement.
        this.walk_left = this.sprite.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
        this.walk_right = this.sprite.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
        this.idle_left = this.sprite.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
        this.idle_right = this.sprite.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
        this.jump_right = this.sprite.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 60, false);
        this.jump_left = this.sprite.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 60, false);
        this.attack_right = this.sprite.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, false);
        this.attack_left = this.sprite.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false);
        this.die = this.sprite.animations.add('die', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, false);
        this.sprite.data['direction'] = 'idle_left';
        this.sprite.anchor.setTo(0.5);
        game.physics.arcade.enable(this.sprite);

        // tell camera to follow sprite now that we're on a map
        // and can move out of bounds
        game.camera.follow(this.sprite);
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

        this.baryoffset = -35;

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

        this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);



        /////////////////////////////////
        this.emitter = game.add.emitter(this.sprite.x + this.sprite.width / 2, this.sprite.y, 1);

        this.emitter.width = this.sprite.width / 2;
        // emitter.angle = 30; // uncomment to set an angle for the rain.

        this.emitter.makeParticles('smoke');

        this.emitter.minParticleScale = 0.1;
        this.emitter.maxParticleScale = 0.5;

        this.emitter.setYSpeed(-100, -200);
        this.emitter.setXSpeed(-5, 5);

        this.emitter.minRotation = 0;
        this.emitter.maxRotation = 0;

        //explode, lifespan, frequency,quantity
        this.emitter.start(false, 1, 100000, 1);
        /////////////////////////////////

    };

    this.move = function () {
        if (!this.dead) {

            var xv = 0;
            var yv = 0;

            //Check for attack keys
            if (this.attack.justPressed()) {
                this.player_busy = true;
                game.world.bringToTop(this.sword);
                if (this.player.data['direction'].includes("left")) {
                    this.player.animations.play('attack_left');
                } else {
                    this.player.animations.play('attack_right');
                }
                this.player.animations.currentAnim.onComplete.add(function () {
                    this.player_busy = false;
                }, this);
            }

            if (this.leftKey.isDown) {
                xv = -200;
            }

            if (this.rightKey.isDown) {
                xv = 200
            }

            if (this.upKey.isDown) {
                yv = -200;
            }

            if (this.downKey.isDown) {
                yv = 200;
            }

            this.sprite.body.velocity.x = xv;
            this.sprite.body.velocity.y = yv;

            if (xv == 0 && yv == 0) {
                if (this.player.data['direction'].includes("left")) {
                    this.player.data['direction'] = 'idle_left';
                } else {
                    this.player.data['direction'] = 'idle_right';
                }
            }

            if (xv < 0) {
                this.player.data['direction'] = 'walk_left';
            } else if (xv > 0) {
                this.player.data['direction'] = 'walk_right';
            }

            if (yv != 0) {
                if (this.player.data['direction'].includes("left")) {
                    this.player.data['direction'] = 'walk_left';
                } else {
                    this.player.data['direction'] = 'walk_right';
                }
            }

            this.player.animations.play(this.player.data['direction']);

            this.myHealthBar.setPosition(this.sprite.x + this.barxoffset, this.sprite.y - this.baryoffset);
            this.emitter.emitX = this.sprite.x;
            this.emitter.emitY = this.sprite.y;
        } else {
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



    this.jump = function (direction) {
        this.busy = true;
        this.sprite.y -= 20;
        this.playAnimation(direction, this.notBusy);
        game.time.events.add(Phaser.Timer.SECOND * .2, function () {
            this.sprite.y += 20;
        }, this);
    }

    this.playAnimation = function (animation, callback) {
        this.sprite.animations.play(animation);

        this.sprite.animations.currentAnim.onComplete.add(function () {
            callback(this);
        }, this);

    };

    this.notBusy = function () {
        console.log("notBusy");
        this.busy = false;
    };

    this.scoreHit = function () {
        console.log("score hit")
        smoke = 100 - ((this.sprite.health / 10) * 100);
        this.myHealthBar.setPercent((this.sprite.health / 10) * 100);

        //this.emitter.start(false, 500, 5, 0);
        if ((this.sprite.health / 10 * 100) <= 0) {
            this.sprite.play('die');
            this.die.onComplete.add(function () {
                this.deathFire.animations.play('fry', 30, true);
            }, this);
            this.deathFire.alpha = 1;
            this.deathFire.x = this.sprite.x;
            this.deathFire.y = this.sprite.y - 10;
            this.dead = true;
        }
        if (this.sprite.health == 10) {
            frequency = 100000;
            duration = 0;
        } else {
            frequency = this.sprite.health * 15;
            duration = (10 - this.sprite.health) * 100;
        }
        console.log(frequency, duration);
        //this.addSmoke(this.emitter,frequency,duration)
        this.emitter.flow(200, 100, 1, -1, true);
    };

    this.resetFireBall = function (fireBall) {
        fireBall.kill();
    }

    this.isOverlapped = function (sprite) {

        var boundsA = this.sprite.getBounds();
        var boundsB = sprite.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    };

    this.addSmoke = function (emitter, frequency, duration) {
        // console.log(typeof(emitter))
        // if(typeof (emitter) === 'object'){
        //     console.log("destroying emitter")
        //     if(!emitter == null){
        //         emitter.destroy();
        //     }
        // }
        // // x coord , y coord, optional max num of items
        // emitter = game.add.emitter(this.sprite.x, this.sprite.y-20,1000);

        // console.log(this.sprite.x);

        // emitter.width = this.sprite.width / 4;
        // // this.emitter.angle = 30; // uncomment to set an angle for the rain.

        // emitter.makeParticles('smoke');

        // emitter.minParticleScale = 0.1;
        // emitter.maxParticleScale = 0.5;

        // emitter.setYSpeed(-100, -200);
        // emitter.setXSpeed(-5, 5);

        // emitter.minRotation = 0;
        // emitter.maxRotation = 0;

        //emitter.start(false, duration, frequency, 0);
        //emitter.makeParticles('smoke');


    }
};
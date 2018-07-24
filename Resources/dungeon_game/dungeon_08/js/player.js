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
        // Adding the knight atlas that contains all the animations
        this.sprite = game.add.sprite(this.x, this.y, atlas);

        // Add walking and idle animations. Different aninmations are needed based on direction of movement.
        this.sprite.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
        this.sprite.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
        this.sprite.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
        this.sprite.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
        this.sprite.animations.play('idle_left');

        this.sprite.anchor.setTo(0.5);

        game.physics.arcade.enable(this.sprite);

        // tell camera to follow sprite now that we're on a map
        // and can move out of bounds
        //game.camera.follow(this.sprite);

        this.sprite.body.collideWorldBounds = true;

		this.fire_ball = game.add.sprite(this.sprite.x, this.sprite.y, 'fire_ball');
		this.fire_ball.animations.add('fire', Phaser.Animation.generateFrameNames('fire_ball', 0, 9), 5, false);
		game.physics.arcade.enable(this.fire_ball);
		this.fire_ball.scale.setTo(1, 1);
		this.fire_ball.anchor.setTo(0.5, 0.5);
		this.fire_ball.body.allowGravity = true;

    };

    this.assignKeys = function (downKey, upKey, fireKey) {

        this.downKey = game.input.keyboard.addKey(downKey);
        this.upKey = game.input.keyboard.addKey(upKey);
        this.fireKey = game.input.keyboard.addKey(fireKey);
    }

    this.move = function () {
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
    };

    this.checkFire = function (x,y) {
        if (this.fireKey.justPressed(1)) {
            this.fireWeapon(x,y);
        }
    };

    this.fireWeapon = function (x,y) {

        var angle = Math.atan2(y - this.sprite.y, x - this.sprite.x) * 180 / Math.PI;

        var xSpeed = 500 * Math.cos(angle * (Math.PI / 180));
        var ySpeed = 500 * Math.sin(angle * (Math.PI / 180));

        this.fire_ball.angle = angle;
        this.fire_ball.body.velocity.setTo(xSpeed, ySpeed);

        this.fire_ball.animations.play('fire');
    };



    this.isOverlapped = function (sprite) {

        var boundsA = this.sprite.getBounds();
        var boundsB = sprite.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    };
};
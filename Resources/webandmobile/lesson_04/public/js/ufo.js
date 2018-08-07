

function Ufo(game_copy) {
    var game = game_copy;
    this.laserSprites = {};
    this.laserAnimations = {};
    this.atlasName;
    this.ship;
    this.xDirection = 0;
    this.yDirection = 0;
    this.xRate = 0;
    this.yRate = 0;
    this.lastXdirection = 0;
    this.lastYdirection = 0;
    this.xScale = 0;
    this.yScale = 0;
    this.moveUpKeys = [];
    this.moveDownKeys = [];
    this.moveLeftKeys = [];
    this.moveRightKeys = [];
    this.fireKeys = [];

    this.preLoad = function (atlas_name, sprite_sheet, atlas_json) {
        this.atlasName = atlas_name;
        //https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
        //https://www.leshylabs.com/apps/sstool/
        //https://phaser.io/examples/v2/animation/animation-events
        game.load.atlas(this.atlasName, sprite_sheet, atlas_json);

        game.load.image('bullet', 'assets/laserBlue02.png')
    };

    /**
     * 
     * @param {int} x | where to place the ship on x axis
     * @param {int} y | where to place the ship on y axis
     * @param {*} x_scale | scale factor for ship
     * @param {*} y_scale | scale factor for ship
     */
    this.create = function (x, y, x_scale, y_scale) {
        this.xScale = x_scale;
        this.yScale = y_scale;
        this.ship = game.add.sprite(x, y, this.atlasName);
        this.ship.animations.add('hover', Phaser.Animation.generateFrameNames('Hover', 1, 12), 20, true);
        this.ship.animations.play('hover');

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.enableBody = true;
        this.ship.body.collideWorldBounds = false;
        this.ship.scale.setTo(this.xScale, this.yScale);
        this.ship.anchor.setTo(.5, .5);
        this.ship.body.setSize(this.ship.width - 10, this.ship.height);


        this.laserSprites['laser'] = game.add.sprite(0, 0, this.atlasName);
        this.laserSprites['buildUp'] = game.add.sprite(0, 0, this.atlasName);
        this.laserSprites['blast'] = game.add.sprite(0, 0, this.atlasName);
        this.laserSprites['bolt'] = game.add.sprite(0, 0, this.atlasName);

        this.laserSprites.laser.alpha = 0;
        this.laserSprites.buildUp.alpha = 0;
        this.laserSprites.blast.alpha = 0;
        this.laserSprites.bolt.alpha = 0;

        this.laserSprites.laser.scale.setTo(this.xScale, this.yScale);
        this.laserSprites.buildUp.scale.setTo(this.xScale, this.yScale);
        this.laserSprites.blast.scale.setTo(this.xScale, this.yScale);
        this.laserSprites.bolt.scale.setTo(this.xScale, this.yScale);

        this.laserAnimations['laser'] = this.laserSprites.laser.animations.add('laser', Phaser.Animation.generateFrameNames('Laser', 1, 9), 30, false);
        this.laserAnimations['buildUp'] = this.laserSprites.buildUp.animations.add('buildUp', Phaser.Animation.generateFrameNames('BuildUp', 1, 4), 10, false);
        this.laserAnimations['blast'] = this.laserSprites.blast.animations.add('blast', Phaser.Animation.generateFrameNames('Blast', 1, 3), 20, false);
        this.laserAnimations['bolt'] = this.laserSprites.bolt.animations.add('bolt', Phaser.Animation.generateFrameNames('Bolt', 1, 4), 20, false);

        // order the animations
        this.laserAnimations.buildUp.onComplete.add(this.fireLaser, this);
        this.laserAnimations.laser.onComplete.add(this.laserStopped, this);

        //https://www.codecaptain.io/blog/game-development/shooting-bullets-using-phaser-groups/518
        this.bullets = game.add.group();
        // To move the sprites later on, we have to enable the body
        this.bullets.enableBody = true;
        // We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.bullets.createMultiple(10, 'bullet');
        this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullets);
        this.bullets.callAll('anchor.setTo', 'anchor', 0.5, 1);
        this.bullets.callAll('scale.setTo', 'scale', 0.3, 0.3);
        this.bullets.callAll('body.setSize', 'body', 5, 5);
        this.bullets.setAll('checkWorldBounds', true);
    };

    /**
     * Assign keys to move the ufo. Can be called multiple times to assign multiple keys to do same things.
     * @param {int} up | phaser key value
     * @param {int} down | phaser key value
     * @param {int} left | phaser key value
     * @param {int} right | phaser key value 
     * 
     * Examples: 
     * 	    Phaser.Keyboard.UP = 38
     * 	    Phaser.Keyboard.DOWN = 40
     * 	    Phaser.Keyboard.LEFT = 37
     * 	    Phaser.Keyboard.RIGHT = 39
     *  Letters are simply thier ascii values:
     * 	    Phaser.Keyboard.W = 87
     * 	    Phaser.Keyboard.S = 83
     * 	    Phaser.Keyboard.A = 65
     * 	    Phaser.Keyboard.D = 68
     */
    this.assignMovementKeys = function(up,down,left,right){
        this.moveUpKeys.push(game.input.keyboard.addKey(up));
        this.moveDownKeys.push(game.input.keyboard.addKey(down));
        this.moveLeftKeys.push(game.input.keyboard.addKey(left));
        this.moveRightKeys.push(game.input.keyboard.addKey(right));
    };

    this.assignFireKeys = function(key){
        this.fireKeys.push(game.input.keyboard.addKey(key));
    };

    this.move = function(){
    	    //////// Interacting with screen ///////////////
		if (game.input.activePointer.isDown) {
			this._move();
		}else{
			this._zeroAngle();
		}

        left = this._goLeft();
        right = this._goRight();
        up = this._goUp();
        down = this._goDown();

		// The left array is pressed 
		if (left){
            console.log("go left")
			if(this.lastXdirection != this.xDirection){
				this.xRate=0;
			}
			this.xRate++;  // increase left rate as long as key is pressed
			this.xDirection = -1;
		}else if(!right){
			this.xRate=0; // key released
		}

		// The right arrow is pressed
		if (right){
			if(this.lastXdirection != this.xDirection){
				this.xRate=0;
			}
			this.xRate++; // increase right rate as long as key is pressed
			this.xDirection = 1;
		}else if(!left){
			this.xRate=0; // key released
		}
		
		// The up arrow is pressed
		if (up){
			if(this.lastYdirection != this.yDirection){
				this.yRate=0;
			}
			this.yRate++; // increase right rate as long as key is pressed
			this.yDirection = -1;
		}else if(!down){
			this.yRate=0; // key released
		}

		// The down arrow is pressed
		if (down){
			if(this.lastYdirection != this.yDirection){
				this.yRate=0;
			}
			this.yRate++; // increase right rate as long as key is pressed
			this.yDirection = 1;
		}else if(!up){
			this.yRate=0; // key released
		}



		// Fire button was attached to space bar above
		if (this._fireBullets())
		{
			this.fireBullets();
		}

		this.lastxdir = this.xdir;
		this.lastydir = this.ydir;

		this._move(this.xdir,this.xrate,this.ydir,this.yrate);

		this._wrap();
    }

    /**
     * Go left if one of the left keys is being pressed
     * @returns {boolean}
     */
    this._goLeft = function(){
        for(i=0;i<this.moveLeftKeys.length;i++){
            if(this.moveLeftKeys[i].isDown){
                return true;
            }
        }
        return false;
    }

    /**
     * Go right if one of the right keys is being pressed
     * @returns {boolean}
     */
    this._goRight = function(){
        for(let i=0;i<this.moveRightKeys.length;i++){
            if(this.moveRightKeys[i].isDown){
                return true;
            }
        }
        return false;
    }

    /**
     * Go up if one of the up keys is being pressed
     * @returns {boolean}
     */    
    this._goUp = function(){
        for(let i=0;i<this.moveUpKeys.length;i++){
            if(this.moveUpKeys[i].isDown){
                return true;
            }
        }
        return false;
    }

    /**
     * Go down if one of the down keys is being pressed
     * @returns {boolean}
     */
    this._goDown = function(){
        for(let i=0;i<this.moveDownKeys.length;i++){
            if(this.moveDownKeys[i].isDown){
                return true;
            }
        }
        return false;
    }


    /**
     * Fire bullets if one of the down keys is being pressed
     * @returns {boolean}
     */
    this._fireBullets = function(){
        for(let i=0;i<this.fireKeys;i++){
            if(this.fireKeys[i].isDown){
                return true;
            }
        }
        return false;
    }

    /**
     * 
     * @param {int} xd | x direction [-1 = left, 1 = right]
     * @param {int} xr | x rate = int value. Higher = faster
     * @param {int} yd | y direction [-1 up , 1 = down]
     * @param {int} yr | y rate = same as aboves rate
     */
    this._move = function (xd = 0, xr = 0, yd = 0, yr = 0) {

        var angle = 0;
        if (xd == 0 && xr == 0 && yd == 0 && yr == 0 && game.input.activePointer.leftButton.isDown) {
            ratex = this.movexSpeed(game.input.x, game.width);
            ratey = this.movexSpeed(game.input.y, game.height);
        } else {
            ratex = Math.floor(xr / 4) * xd;
            ratey = Math.floor(yr / 4) * yd;
        }

        angle = this.moveAngle(ratex, 3);


        this.ship.x += ratex;
        this.ship.y += ratey;
        this.ship.angle = angle;
    };

    this._zeroAngle = function () {
        this.ship.angle = 0;
    };

    this.moveAngle = function (rate, factor) {
        return rate * factor;
    };

    this.movexSpeed = function (x, width, skill = 2) {
        return this.calcSpeed(x, width, skill);
    };

    this.moveySpeed = function (y, height, skill = 2) {
        return this.calcSpeed(y, height, skill);
    };

    this.calcSpeed = function (n, size, skill = 2) {
        var ratio = 0;

        if (n < size / 2) {
            ratio = n / (size / 2);
            ratio *= 10;
            ratio = Math.ceil(ratio);
            ratio /= 2;
            rate = (5 - ratio) * -1;
        } else {
            ratio = n / size;
            ratio *= 10;
            ratio = Math.ceil(ratio);
            ratio /= 2;
            rate = ratio;
        }
        //console.log(rate * skill);
        return rate * skill;
    };

    this.startLaser = function () {
        this.laserSprites.buildUp.alpha = 1;
        this.laserSprites.buildUp.x = this.ship.x - 13;
        this.laserSprites.buildUp.y = this.ship.y + 10;
        this.laserAnimations.buildUp.play('buildUp');
    };

    this.fireLaser = function () {
        this.laserSprites.buildUp.alpha = 0;
        this.laserSprites.laser.alpha = 1;
        this.laserSprites.laser.x = this.ship.x - 5;
        this.laserSprites.laser.y = this.ship.y + 10;
        this.laserAnimations.laser.play('laser');
    };

    this.laserStopped = function (laser) {
        laser.alpha = 0;
    };


    this.fireBolt = function () {
        this.laserSprites.buildUp.alpha = 0;
        this.laserSprites.bolt.alpha = 1;
        this.laserSprites.bolt.x = this.ship.x - 5;
        this.laserSprites.bolt.y = this.ship.y;
        this.laserAnimations.bolt.play('bolt');
        //needs callback to make disappear
    };


    this.fireBullets = function () {
        // Get the first laser that's inactive, by passing 'false' as a parameter
        var bullet = this.bullets.getFirstExists(false);
        if (bullet) {
            // If we have a laser, set it to the starting position
            bullet.reset(this.ship.x, this.ship.y + 20);
            // Give it a velocity of -500 so it starts shooting
            bullet.body.velocity.y = 1000;
        }

    }

    this.resetBullets = function (bullet) {
        // Destroy the laser
        bullet.kill();
    }

    this.dump = function () {
        console.log(this.ship);
    };

    this._wrap = function () {
        if (this.ship.x < 0) {
            this.ship.x = game.width - 1;
        }
        if (this.ship.x > game.width) {
            this.ship.x = 1;
        }
        if (this.ship.y < 0) {
            this.ship.y = game.height - 1;
        }
        if (this.ship.y > game.height) {
            this.ship.y = 1;
        }
    }

}
function Ufo(game_copy) {
    var game = game_copy;
    this.laserSprites = {};
    this.laserAnimations = {};
    this.atlasName;
    this.ship;

    this.preLoad = function (atlas_name, sprite_sheet, atlas_json) {
        this.atlasName = atlas_name;
        //https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
        //https://www.leshylabs.com/apps/sstool/
        //https://phaser.io/examples/v2/animation/animation-events
        game.load.atlas(this.atlasName, sprite_sheet, atlas_json);

        game.load.image('bullet', 'assets/laserBlue02.png')
    };

    this.create = function () {
        this.ship = game.add.sprite(game.width / 2, 250, this.atlasName);
        this.ship.animations.add('hover', Phaser.Animation.generateFrameNames('Hover', 1, 12), 20, true);
        this.ship.animations.play('hover');

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.enableBody = true;
        this.ship.body.collideWorldBounds = true;
        this.ship.scale.setTo(1, 1);
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

        this.laserSprites.laser.scale.setTo(1, 1);
        this.laserSprites.buildUp.scale.setTo(1, 1);
        this.laserSprites.blast.scale.setTo(1, 1);
        this.laserSprites.bolt.scale.setTo(1, 1);

        this.laserAnimations['laser'] = this.laserSprites.laser.animations.add('laser', Phaser.Animation.generateFrameNames('Laser', 1, 9), 30, false);
        this.laserAnimations['buildUp'] = this.laserSprites.buildUp.animations.add('buildUp', Phaser.Animation.generateFrameNames('BuildUp', 1, 4), 10, false);
        this.laserAnimations['blast'] = this.laserSprites.blast.animations.add('blast', Phaser.Animation.generateFrameNames('Blast', 1, 3), 20, false);
        this.laserAnimations['bolt'] = this.laserSprites.bolt.animations.add('bolt', Phaser.Animation.generateFrameNames('Bolt', 1, 4), 20, false);

        this.laserAnimations.buildUp.onComplete.add(this.fireLaser,this);
        this.laserAnimations.laser.onComplete.add(this.laserStopped,this);

        //https://www.codecaptain.io/blog/game-development/shooting-bullets-using-phaser-groups/518
        this.bullets = game.add.group();
    	// To move the sprites later on, we have to enable the body
        this.bullets.enableBody = true;
	    // We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.bullets.createMultiple(1, 'bullet');
        this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullets);
        this.bullets.callAll('anchor.setTo', 'anchor', 0.5, 1);
        this.bullets.callAll('scale.setTo', 'scale', 0.3, 0.3);
        this.bullets.callAll('body.setSize', 'body', 4, 4);
        this.bullets.setAll('checkWorldBounds', true);
    };

    /**
     * 
     * @param {int} direction : [0=figure it out, 1 = right , -1 = left]
     * @param {int} rate   : [some multiplier to move ship faster]
     */
    this.shipMove = function (direction=0,rate=0) {
        //console.log(game.input.x);
        var angle = 0;
        if(direction == 0 && rate==0){
            rate = this.moveSpeed(game.input.x, game.width);
        }else{
            rate = Math.floor(rate / 3) * direction;
        }
        
        angle = this.moveAngle(rate, 3); 
        

        this.ship.x += rate;
        this.ship.angle = angle;
    };


    this.shipStill = function () {
        this.ship.angle = 0;
    };

    this.moveAngle = function (rate, factor) {
        return rate * factor;
    };

    this.moveSpeed = function (x, width, skill = 2) {
        var ratio = 0;

        if (x < width / 2) {
            ratio = x / (width / 2);
            ratio *= 10;
            ratio = Math.ceil(ratio);
            ratio /= 2;
            rate = (5 - ratio) * -1;
        } else {
            ratio = x / width;
            ratio *= 10;
            ratio = Math.ceil(ratio);
            ratio /= 2;
            rate = ratio;
        }
        //console.log(rate * skill);
        return rate * skill;
    };

    this.startLaser = function(){
		this.laserSprites.buildUp.alpha  = 1;
		this.laserSprites.buildUp.x = this.ship.x-13;
		this.laserSprites.buildUp.y = this.ship.y+10;
		this.laserAnimations.buildUp.play('buildUp');
    };
    
	this.fireLaser = function(){
		this.laserSprites.buildUp.alpha = 0;
		this.laserSprites.laser.alpha  = 1;
		this.laserSprites.laser.x = this.ship.x-5;
		this.laserSprites.laser.y = this.ship.y+10;
		this.laserAnimations.laser.play('laser');
	};
    
    this.laserStopped = function(laser){
		laser.alpha = 0;
    };
    

	this.fireBolt = function(){
		this.laserSprites.buildUp.alpha = 0;
		this.laserSprites.bolt.alpha  = 1;
		this.laserSprites.bolt.x = this.ship.x-5;
		this.laserSprites.bolt.y = this.ship.y;
        this.laserAnimations.bolt.play('bolt');
        //needs callback to make disappear
    };


    this.fireBullets = function() {
        // Get the first laser that's inactive, by passing 'false' as a parameter
        var bullet = this.bullets.getFirstExists(false);
        if (bullet) {
            // If we have a laser, set it to the starting position
            bullet.reset(this.ship.x, this.ship.y + 20);
            // Give it a velocity of -500 so it starts shooting
            bullet.body.velocity.y = 1000;
        }
     
    }

    this.resetBullets = function(bullet) {
        // Destroy the laser
        bullet.kill();
    }

    this.dump = function () {
        console.log(this.ship);
    };

}
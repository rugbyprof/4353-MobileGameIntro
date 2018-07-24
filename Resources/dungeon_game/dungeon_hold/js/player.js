function Player(game_copy){
    var game = game_copy;

    this.load = function(key,value){
        this[key] = value;
    };

    this.preload = function(){
		game.load.atlas('knight_atlas', 'assets/sprites/knight_atlas.png', 'assets/sprites/knight_atlas.json');
    };

    this.create =  function(x,y){
        this.x = x;
        this.y = y;
		// Adding the knight atlas that contains all the animations
        this.sprite = game.add.sprite(this.x, this.y, 'knight_atlas');
        
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
		game.camera.follow(this.sprite);
        
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };

    this.move = function(){
		if (this.leftKey.isDown) {
			this.sprite.body.velocity.x = -200;
			this.sprite.animations.play('walk_left');
			this.prevDir = 'left'
		}
		if (this.rightKey.isDown) {
			this.sprite.body.velocity.x = 200;
			this.sprite.animations.play('walk_right');
			this.prevDir = 'right'
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

		if (this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown) {
			this.getTileProperties();
		}

		if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown) {
			if (this.prevDir == 'left') {
				this.sprite.animations.play('idle_left');
			} else {
				this.sprite.animations.play('idle_right');
			}
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = 0;
		}
    };

    this.getTileProperties = function () {
		var x = this.layers.ground_layer.getTileX(this.sprite.x);
		var y = this.layers.ground_layer.getTileY(this.sprite.y);

		var tile = this.map.getTile(x, y, this.layers.ground_layer);

    };
    
	this.scalePlayer = function(){

		scale = game.add.tween(this.sprite.scale).to({
			x: .2,
			y: .2
		}, 1000, Phaser.Easing.Linear.None, true);
	};

	this.fadePlayer = function(){
		fade = game.add.tween(this.sprite).to({
			alpha: 0
		}, 750, "Linear", true);
	};

	this.tweenMovePlayer = function(x,y){
		
		var px = x;
		var py = y;
		movePlayer = game.add.tween(this.sprite).to({
			x: px,
			y: py
		}, 500, Phaser.Easing.Linear.None,true);
    };
    
    this.movePlayer = function(x1,y1){
        game.knight.create(x1,y1);

    };

	this.transportPlayer = function (x1,y1,x2,y2) {
        this.tweenMovePlayer(x1,y1);
        this.fadePlayer();
        this.scalePlayer();
        setTimeout(this.movePlayer, 1000,x2,y2);

    };
    
    this.isOverlapped = function(sprite) {

		var boundsA = this.sprite.getBounds();
		var boundsB = sprite.getBounds();
	
		return Phaser.Rectangle.intersects(boundsA, boundsB);
	
	};
};
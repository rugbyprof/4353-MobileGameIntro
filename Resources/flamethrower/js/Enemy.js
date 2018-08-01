function Enemy(game_copy){
    var game = game_copy;

    this.load = function(key,value){
        this[key] = value;
    };

    this.preload = function(){
		game.load.atlas('knight_atlas', 'assets/sprites/knight_atlas.png', 'assets/sprites/knight_atlas.json');
    };

    this.create =  function(x,y,atlas){
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
        
        this.sprite.body.collideWorldBounds=true;
    };

    this.assignKeys = function(downKey,upKey,fireKey){

        this.downKey = game.input.keyboard.addKey(downKey);
        this.upKey = game.input.keyboard.addKey(upKey);
        this.fireKey = game.input.keyboard.addKey(fireKey);
    }

    this.move = function(){

    };

	this.fireWeapon = function(obj){
		
		obj.weapon.body.x = obj.player.x;
		obj.weapon.body.y = obj.player.y;

		var angle = Math.atan2(obj.enemy.y - obj.player.y, obj.enemy.x - obj.player.x) * 180 / Math.PI;

		var xSpeed = obj.speed * Math.cos(angle * (Math.PI / 180));
		var ySpeed = obj.speed * Math.sin(angle * (Math.PI / 180));

		obj.weapon.angle = angle;
		obj.weapon.body.velocity.setTo(xSpeed,ySpeed);

		obj.weapon.animations.play('fire');
	};

    
   
    this.isOverlapped = function(sprite) {

		var boundsA = this.sprite.getBounds();
		var boundsB = sprite.getBounds();
	
		return Phaser.Rectangle.intersects(boundsA, boundsB);
	
	};
};
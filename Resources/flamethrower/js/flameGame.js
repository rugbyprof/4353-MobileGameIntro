var FlameGame = {

	init: function(){
		game.stage.disableVisibilityChange = true;
	},

	preload: function () {
		console.log("FlameGame.js")
		console.log(game);
		this.playerMap = {};
		this.playerId = null;

	},
	create: function () {
		this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.attack = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

		game.physics.startSystem(Phaser.Physics.ARCADE);

		var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		testKey.onDown.add(Client.sendTest, this);

		Client.askNewPlayer();

		game.addPauseButton(game);
	},

	update: function () {
		if(this.playerId != null){
			var p = this.playerMap[this.playerId];
			velocity = this.checkMove();
			p.changeVelocity(velocity.x,velocity.y);
			//console.log(this.playerMap[this.playerId]);
			//Client.sendClick(this.playerMap[this.playerId].alias.x,this.playerMap[this.playerId].alias.y);
			Client.sendVelocity(p.alias.body.velocity.x,p.alias.body.velocity.y);
		}

	},

	checkMove: function(){
		x = 0;
		y = 0;
        if (this.leftKey.isDown) {
            x = -200;
        }

        if (this.rightKey.isDown) {
            x = 200
        }

        if (this.upKey.isDown) {
            y = -200;
        }

        if (this.downKey.isDown) {
            y = 200;
		}
		return {x:x,y:y};
	},

	getCoordinates: function(){
		
	},

	addNewPlayer: function(id,x,y){
		this.playerId = id;
		this.playerMap[id] = new Player(game,x,y,'knight_atlas',id);
		console.log(this.playerMap);
	},

	movePlayer: function(id,x,y){
		//console.log({id:id,x:x,y:y})
		this.playerMap[id].changeVelocity(x,y);
	},


	distance: function (x1, y1, x2, y2) {

		var dx = x1 - x2;
		var dy = y1 - y2;

		return Math.sqrt(dx * dx + dy * dy);

	},

	removePlayer: function(id){
		this.playerMap[id].alias.destroy();
		delete this.playerMap[id];
	}

}
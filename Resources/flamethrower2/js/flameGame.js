var FlameGame = {

	init: function(){
		game.stage.disableVisibilityChange = true;
	},

	preload: function () {
		console.log("FlameGame.js")
		this.playerMap = {};
		this.playerId = null;

	},
	create: function () {
		this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		//this.downKey.onDown.add(this.checkMove, this);
		this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		//this.upKey.onDown.add(this.checkMove, this);
		this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		//this.leftKey.onDown.add(this.checkMove, this);
		this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		//this.rightKey.onDown.add(this.checkMove, this);
		this.attack = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

		this.click = this.game.input.activePointer.leftButton
		this.click.onDown.add(Client.sendTarget, game.input.mousePointer );

		game.physics.startSystem(Phaser.Physics.ARCADE);

		var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		testKey.onDown.add(Client.sendTest, this);

		Client.askNewPlayer();

		game.addPauseButton(game);
	},

	update: function () {
		this.checkMove();
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
		Client.sendVelocity(x,y);
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

	fireWeapon: function(data){
		console.log(data)
		this.playerMap[data.id].sendFireBall(data.target.x,data.target.y);
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
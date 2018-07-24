### Chrome Mobile Mode

  


### Adding movement

#### play.js move function
```js
    console.log(this.game.input.x);
    if(this.game.input.x < this.game.width/2){
        this.player.x--;
    }else{
        this.player.x++;
    }
```

### Adding movement speed function

Could use an array of values to fine tune your speeds left and right.

```js
	// Move player
	move: function () {
		if (this.game.input.activePointer.isDown) {
			//console.log(this.game.input.x);
			let rate = this.moveSpeed(this.game.input.x,this.game.width);
			let angle= this.moveAngle(rate,3);
			//console.log("rate: " + rate);
			this.player.x += rate;
			this.player.angle = angle;
		} else {
			this.player.angle = 0;
		}
	},
	moveAngle: function(rate,factor){
		
			return rate * factor;
	},

	moveSpeed: function(x,width,skill=2){
		var ratio = 0;

		if(x < width/2){
			ratio = x/(width/2);
			ratio *=10;
			ratio = Math.ceil(ratio);
			ratio /=2;
			rate = (5 - ratio) * -1;
		}else{
			ratio = x/width;
			ratio *=10;
			ratio = Math.ceil(ratio);
			ratio /=2;
			rate = ratio;
		}
		console.log(rate*skill);
		return rate*skill;
	},
```

### Scoring Points

```js
	scorePoint: function () {
		//console.log(this.obstacles)
		var point = 0;
		var obstacles = this.obstacles.children;

		for(var i=0;i<obstacles.length;i++){
			if(obstacles[i].visible){
				// console.log("vis: ")
				// console.log(obstacles[i].y,this.player.y);
				let py = this.player.y;
				let oy = obstacles[i].y;
				let ox = obstacles[i].x;

				//if player is below obstacle and within 5 pixels and choose only one of the pair
				if(py > oy && Math.abs(py-oy) < 5 && ox < this.game.width/2){
					point++;
					this.sound.score.play('', 0, 0.5, false)
				}
			}
		}
		return point;
	},
```

look into killing obstacles.

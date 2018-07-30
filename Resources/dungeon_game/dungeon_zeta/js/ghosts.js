/**
 * 
 * @param {object} game - phaser game object
 * @param {int} n - number of ghosts to create
 * @param {int} x - general x coord to spawn around
 * @param {int} y - general y coord to spawn around
 */
var Ghosts = function (game, n, x , y) {
    this.game = game;
    this.num_ghosts = n;
    this.x_coord = x;
    this.y_coord = y;
    this.ghosts = [];
    this.anims = {
        0: [0, 1], // red up
        1: [2, 3], // red down
        2: [4, 5], // red left
        3: [6, 7], // red right
        4: [8, 9], // pink up
        5: [10, 11], // pink down
        6: [12, 13], // pink left
        7: [14, 15], // pink right
        8: [16, 17], // blue up
        9: [18, 19], // blue down
        10: [20, 21], // blue left
        11: [22, 23], // blue right
        12: [24, 25], // orange up
        13: [26, 27], // orange down
        14: [28, 29], // orange left
        15: [30, 31] // orange right
    };

    this.spawnGhosts(n,x,y);
}

/**
 * This function loops through the array of "ghosts" and
 * calls the moveGhostTowardPlayer function with the correct
 * ghost index, sprite, and its speed.
 * @param: ghosts - array of sprites
 */
Ghosts.prototype.moveGhosts = function (player) {
    this.player = player;
    for (i = 0; i < this.ghosts.length; i++) {
        this.moveGhostTowardPlayer(this.ghosts[i]);
    }
}

/**
 * This uses the 'movePlayer' method, but adds the logic to change
 * the ghosts animation so that the eyes are looking at you.
 * @param: i - int ghost index
 * @param: ghost - phaser sprite
 */
Ghosts.prototype.moveGhostTowardPlayer = function (ghost) {
    console.log(ghost);
    console.log(this.player);
    // get differences in x and y locations between enemy and player
    var xdiff = Math.abs(this.player.x - ghost.x);
    var ydiff = Math.abs(this.player.y - ghost.y);

    // Frame to play
    var key = 0;

    // if x difference is greater than y, we will change eyes left to right
    if (xdiff > ydiff) {
        // set left right value
        if (this.player.x < ghost.x) {
            key = 2;
        } else {
            key = 3;
        }
        // change eyes up and down if y values differe more
    } else {
        // set up down value
        if (this.player.y < ghost.y) {
            key = 0;
        } else {
            key = 1;
        }
    }

    // we add (i*4) to get to the correct color on sprite sheet
    // then mod by 16
    // We could do (i % 4) * 4 as well to get correct color and frame.
    key += (i * 4) % 16;

    // each ghosts speed is stored "in" the ghost
    this.moveTowardPlayer(ghost, ghost.data['speed']);
    ghost.animations.play(key);
}

/**
 * Very basic move monster towards player function.
 * @param: enemy - phaser sprite
 * @param: speed - int how fast you want to move
 */
Ghosts.prototype.moveTowardPlayer = function (enemy, speed) {
    // get differences in x and y locations between enemy and player
    var xdiff = Math.abs(this.player.x - enemy.x);
    var ydiff = Math.abs(this.player.y - enemy.y);

    // Arbitrary buffer
    var buffer = 5;

    // If the enemy is within buffer distance, set velocity to 
    // zero so we don't get the jerky left / right behavior
    if (xdiff < buffer) {
        enemy.body.velocity.x = 0;
    } else {
        // Change velocity to keep moving toward player
        if (this.player.x < enemy.x) {
            enemy.body.velocity.x = -speed;
        } else {
            enemy.body.velocity.x = speed;
        }
    }
    // If the enemy is within buffer distance, set velocity to 
    // zero so we don't get the jerky up / down behavior		
    if (ydiff < buffer) {
        enemy.body.velocity.y = 0;
    } else {
        // Change velocity to keep moving toward player
        if (this.player.y < enemy.y) {
            enemy.body.velocity.y = -speed;
        } else {
            enemy.body.velocity.y = speed;
        }
    }
}



/**
 * Generates an array of "ghosts". Could be any sprite.
 * @param: n - number of ghosts
 * @param: x - x coord for a spawn location
 * @param: y - y coord 
 * @returns: array of ghost sprites
 */
Ghosts.prototype.spawnGhosts = function (n, x, y) {


    for (i = 0; i < n; i++) {
        // create the ghost
        var g = this.spawnGhost(x, y, i);

        // choose proper frame to alternate colors
        var anim = (i * 4) % 16;

        // play animation
        g.animations.play(anim);
        // put necessary values in the data object in the ghost
        g.data['id'] = i;
        g.data['speed'] = 100 + getRandomInt(-75, 75);

        // push ghost on to the array
        this.ghosts.push(g);

    }
    // return array of ghosts

}

/**
 * This method spawns one ghost at some random location near x,y
 * @param: x - int x coord
 * @param: y - int y coord
 * @returns: ghost sprite
 */
Ghosts.prototype.spawnGhost = function (x, y){


    // randomish location
    var x = x + getRandomInt(x - 100, x + 150);
    var y = y + getRandomInt(y - 150, y + 100);

    // add sprite to game
    var ghost = this.game.add.sprite(x, y, 'ghosts');
    this.game.physics.arcade.enable(ghost);
    ghost.scale.setTo(.4);

    // add ALL the above animations to every ghost sprite
    // (we only play the correct color for each ghost)
    for (var key in this.anims) {
        ghost.animations.add(key, this.anims[key], 20, true);
    }

    // return ghost
    return ghost;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
	return Math.random() * (max - min) + min;
}
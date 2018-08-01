var player_animations = [{
        'key': 'walk_left',
        'atlas_key': 'Walk_left',
        'start_frame': 0,
        'end_frame': 8,
        'rate': 20,
        'loop': true
    },
    {
        'key': 'walk_right',
        'atlas_key': 'Walk_right',
        'start_frame': 0,
        'end_frame': 8,
        'rate': 20,
        'loop': true
    },
    {
        'key': 'idle_left',
        'atlas_key': 'Idle_left',
        'start_frame': 0,
        'end_frame': 9,
        'rate': 20,
        'loop': true
    },
    {
        'key': 'idle_right',
        'atlas_key': 'Idle_right',
        'start_frame': 0,
        'end_frame': 9,
        'rate': 20,
        'loop': true
    },
    {
        'key': 'jump_right',
        'atlas_key': 'Jump_right',
        'start_frame': 0,
        'end_frame': 9,
        'rate': 20,
        'loop': false
    },
    {
        'key': 'jump_left',
        'atlas_key': 'Jump_left',
        'start_frame': 0,
        'end_frame': 9,
        'rate': 20,
        'loop': false
    },
    {
        'key': 'attack_right',
        'atlas_key': 'Attack_right',
        'start_frame': 0,
        'end_frame': 9,
        'rate': 20,
        'loop': false
    },
    {
        'key': 'attack_left',
        'atlas_key': 'Attack_left',
        'start_frame': 0,
        'end_frame': 9,
        'rate': 20,
        'loop': false
    },
    {
        'key': 'die',
        'atlas_key': 'Dead',
        'start_frame': 1,
        'end_frame': 10,
        'rate': 20,
        'loop': false
    }
];

/**
 * 
 * @param {object} game : phaser game object
 * @param {int} x : x coord of player
 * @param {int} y : y coord of player
 * @param {string} atlas : string key name for atlas to build character sprite
 */
var Player = function (game, x, y, atlas, id) {
    this.game = game;
    this.registerKeys();

    this.game.load.atlas('knight_atlas', 'assets/sprites/knight_atlas.png', 'assets/sprites/knight_atlas.json');
    this.game.load.spritesheet('smoke', 'assets/images/smoke_particle.png', 13, 12);
    this.game.load.atlas('fire_ball', 'assets/sprites/fire_ball.png', 'assets/sprites/fire_ball.json');
    this.game.load.spritesheet('death_fire', 'assets/sprites/death_fire.png', 80, 80);

    this.createPlayer(x, y, atlas);
    this.healthBarConfig = this.createHealthBar();
    this.createHealthBar();
    this.frames = 0; // temp
    this.id = id;
};

/**
 * Just registers which keys will be used for player sprite
 */
Player.prototype.registerKeys = function () {
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.attack = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
}

/**
 * Initializes a player 
 * @param {int} x : x coord
 * @param {int} y : y coord
 * @param {string} atlas : name of atlas for sprite
 */
Player.prototype.createPlayer = function (x, y, atlas) {
    this.playerDead = false;
    this.playerAnimations = {};
    this.playerBusy = false;

    this.player = this.game.add.sprite(x, y, atlas);
    this.alias = this.player;
    this.game.physics.arcade.enable(this.player);

    for (i = 0; i < player_animations.length; i++) {
        this.registerAnimation(player_animations[i], this.player);
    }

    this.player.data['direction'] = 'idle_left';
    this.player.data['max_health'] = 100;
    this.player.data['coins'] = Math.floor(Math.random() * 100);
    this.player.health = 100;
    this.player.anchor.setTo(0.5);
    this.player.body.collideWorldBounds = true;

    // shrink body for better collision detection
    this.player.body.width = this.player.body.width * .8
    this.player.body.height = this.player.body.height * .8

}

/**
 * This function adds animations to a game sprite
 * @param {object} anim 
 * @param {object} sprite 
 */
Player.prototype.registerAnimation = function (anim, sprite) {
    key = anim.key; // key for phaser cache
    atlas_key = anim.atlas_key; // atlas key in json file
    start = anim.start_frame; // start frame number
    end = anim.end_frame; // end frame number
    frame_rate = anim.rate; // frame rate
    loop = anim.loop; // repeate animation or play once
    this.playerAnimations[anim.key] = sprite.animations.add(key, Phaser.Animation.generateFrameNames(atlas_key, start, end), frame_rate, loop);
    if (anim.key.includes("attack")) {
        console.log("adding callback")
        this.playerAnimations[anim.key].onComplete.add(this.setNotBusy, this);
        console.log(this.playerAnimations[anim.key])
    }
}

Player.prototype.changeVelocity = function (xv, yv) {

    this.renderHealthBar();
    this.checkForDeath();
    this.player.body.velocity.x = xv;
    this.player.body.velocity.y = yv;

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

    if (!this.playerBusy) {
        this.player.animations.play(this.player.data['direction']);
    }
}

Player.prototype.attack = function(){
    //Check for attack keys
    if (this.attack.justPressed()) {
        this.playerBusy = true;
        if (this.player.data['direction'].includes("left")) {
            this.player.animations.play('attack_left');
        } else {
            this.player.animations.play('attack_right');
        }
    }
}


/**
 * Brings player to front of game. Makes sure it is visible.
 */
Player.prototype.bringToFront = function () {
    this.game.world.bringToTop(this.player);

}

/**
 * 
 */
Player.prototype.checkForDeath = function () {
    if (!this.playerDead && this.player.health <= 0) {
        this.playerDead = true;
        this.player.animations.play('die');
    }
}

/**
 * 
 */
Player.prototype.createHealthBar = function () {
    return {
        x: this.player.x,
        y: this.player.y,
        xoffset: -20,
        yoffset: 30,
        width: 50,
        height: 5,
        percent: 100
    };
}

/**
 * 
 */
Player.prototype.initFireBallWeapon = function (max_fireballs, animation_name, sprite_key) {
    this.fire_ball = this.game.add.group();
    this.fire_ball.enableBody = true;
    this.fire_ball.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < max_fireballs; i++) {
        var f = this.fire_ball.create(0, 0, sprite_key);
        f.name = 'fire_ball-' + this.side + '-' + i;
        f.exists = false;
        f.visible = false;
        f.checkWorldBounds = true;
        f.events.onOutOfBounds.add(this.resetFireBall, this);
        f.animations.add(animation_name, Phaser.Animation.generateFrameNames(sprite_key, 0, 9), 50, false);
    }
}

Player.prototype.sendFireBall = function (x, y) {

    var angle = Math.atan2(y - this.sprite.y, x - this.sprite.x) * 180 / Math.PI;

    var xSpeed = 500 * Math.cos(angle * (Math.PI / 180));
    var ySpeed = 500 * Math.sin(angle * (Math.PI / 180));

    ball = this.fire_ball.getFirstExists(false);

    if (ball) {
        ball.reset(this.sprite.x + 6, this.sprite.y - 8);
        ball.angle = angle;
        ball.body.velocity.setTo(xSpeed, ySpeed);
        this.bulletTime = game.time.now + 150;
        ball.animations.play('fire');
    }
};

/**
 * Draw healthbar as configured
 */
Player.prototype.renderHealthBar = function () {
    var width = this.healthBarConfig.width;
    var height = this.healthBarConfig.height;
    var xoff = this.healthBarConfig.xoffset;
    var yoff = this.healthBarConfig.yoffset;

    var hurt_ratio = 1 - (this.player.health / this.player.data['max_health']);

    if (typeof (this.healthbar) === 'object') {
        this.healthbar.destroy()
    }
    this.healthbar = game.add.graphics(this.player.x, this.player.y);

    if (hurt_ratio < 1) {
        //Draw green bar
        this.healthbar.lineStyle(2, 0x000000, 1);
        this.healthbar.beginFill(0x00FF00, 1);
        this.healthbar.drawRect(0 + xoff, 0 + yoff, width, height);
        this.healthbar.endFill();

        //Draw red bar
        this.healthbar.beginFill(0xFF0000, 1);
        this.healthbar.drawRect(0 + xoff, 0 + yoff, width * hurt_ratio, height);
        this.healthbar.endFill();
    } else {
        //Draw full red bar (this is only so bar will update position with player)
        this.healthbar.lineStyle(2, 0x000000, 1);
        this.healthbar.beginFill(0xFF0000, 1);
        this.healthbar.drawRect(0 + xoff, 0 + yoff, width, height);
        this.healthbar.endFill();
    }


}


/**
 * 
 * @param {int} x | x coord
 * @param {int} y | y coord
 */
Player.prototype.transportPlayer = function (x, y) {
    this.player.x = x;
    this.player.y = y;
}

/**
 * 
 * @param {object} sprite | phaser sprite object 
 */
Player.prototype.intersectsWith = function (sprite) {

    var boundsA = this.player.getBounds();
    var boundsB = sprite.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

};

Player.prototype.alias = function () {
    return this.player;
}

Player.prototype.setNotBusy = function () {
    console.log("set not busy")
    this.playerBusy = false;
}
var SpaceGame = {
    createFunctionRan: false,
    preloadFunctionRan: false,
    init: function () {
        game.stage.disableVisibilityChange = true;
    },

    gameReady: function () {
        return this.preloadFunctionRan && this.createFunctionRan;
    },

    preload: function () {
        console.log("preload")
        game.load.image('ship', 'assets/spaceShips_001-1.png');
        game.load.image('otherPlayer', 'assets/enemyBlack5-1.png');
        game.load.image('star', 'assets/star_gold.png');
    },

    create: function () {
        console.log("create");
        this.createRan = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.global.otherPlayers = {};

        this.cursors = game.input.keyboard.createCursorKeys();

        this.blueScoreText = game.add.text(16, 16, '', {
            fontSize: '32px',
            fill: '#0000FF'
        });
        this.redScoreText = game.add.text(584, 16, '', {
            fontSize: '32px',
            fill: '#FF0000'
        });

    },

    addPlayer: function (playerInfo) {
        console.log("addPlayer");
        if (!this.gameReady()) {
            this.preload();
            this.create();
        }
        this.ship = game.add.sprite(playerInfo.x, playerInfo.y, 'ship');
        game.physics.arcade.enable(this.ship);
        this.ship.anchor.setTo(0.5, 0.5);
        //this.ship.angle = 90;
        //this.ship.width = 53;
        //this.ship.width = 40;
        if (playerInfo.team === 'blue') {
            this.ship.tint = 0x0000ff;
        } else {
            this.ship.tint = 0xff0000;
        }
        this.ship.body.drag.set(50);
        // self.ship.setAngularDrag(100);
        this.ship.body.maxVelocity.set(300);
    },

    addOtherPlayers: function (playerInfo) {
        console.log("addOtherPlayers");
        if (typeof playerInfo == 'object' && typeof game.global.otherPlayers == 'object') {
            var otherPlayer = game.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer');
            game.physics.arcade.enable(otherPlayer);
            otherPlayer.anchor.setTo(0.5, 0.5)
            //otherPlayer.width = 53;
            //otherPlayer.width = 40;
            if (playerInfo.team === 'blue') {
                otherPlayer.tint = 0x0000ff;
            } else {
                otherPlayer.tint = 0xff0000;
            }
            otherPlayer.body.drag.set(50);
            // self.ship.setAngularDrag(100);
            otherPlayer.body.maxVelocity.set(300);
            otherPlayer.playerId = playerInfo.playerId;
            game.global.otherPlayers[playerInfo.playerId] = otherPlayer;
            console.log("added player:")
            console.log(game.global.otherPlayers);
        }
    },

    update: function () {
        if (this.ship) {
            if (this.cursors.up.isDown) {
                game.physics.arcade.accelerationFromRotation(this.ship.rotation, 300, this.ship.body.acceleration);
            } else {
                this.ship.body.acceleration.set(0);
            }

            if (this.cursors.left.isDown) {
                this.ship.body.angularVelocity = -300;
            } else if (this.cursors.right.isDown) {
                this.ship.body.angularVelocity = 300;
            } else {
                this.ship.body.angularVelocity = 0;
            }

            screenWrap(this.ship);

            // emit player movement
            var x = this.ship.x;
            var y = this.ship.y;
            var r = this.ship.rotation;

            if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
                Client.socket.emit('playerMovement', {
                    x: x,
                    y: y,
                    rotation: r
                });
            }
            // save old position data
            this.ship.oldPosition = {
                x: x,
                y: y,
                rotation: r
            };
            if (checkOverlap(this.star, this.ship)) {
                Client.socket.emit('starCollected');
            }
        }
    },
    removePlayer: function (playerId) {

        game.global.otherPlayers[playerId].destroy();

    },

    movePlayers: function (playerInfo) {
        console.log(playerInfo);
        console.log(game.global.otherPlayers);
        if (!(playerInfo.playerId in game.global.otherPlayers)) {
            console.log("requesting lost player...")
            Client.socket.emit('requestPlayerInfo', playerInfo.playerId);
            return;
        }
        game.global.otherPlayers[playerInfo.playerId].rotation = playerInfo.rotation;
        game.global.otherPlayers[playerInfo.playerId].x = playerInfo.x;
        game.global.otherPlayers[playerInfo.playerId].y = playerInfo.y;

    },
    updateScores: function (scores) {
        this.blueScoreText.setText('Blue: ' + scores.blue);
        this.redScoreText.setText('Red: ' + scores.red);
    },
    updateStarLocation: function (starLocation) {
        if (this.star) this.star.destroy();
        this.star = game.add.sprite(starLocation.x, starLocation.y, 'star');


    }
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function screenWrap(sprite) {

    if (sprite.x < 0) {
        sprite.x = game.width;
    } else if (sprite.x > game.width) {
        sprite.x = 0;
    }

    if (sprite.y < 0) {
        sprite.y = game.height;
    } else if (sprite.y > game.height) {
        sprite.y = 0;
    }

}


## What is a State?

A logical organization of code.

A state in Phaser is a part of a game, like a menu scene, a play scene, a game over scene, etc. And each one of them has its own functions and variables.

It means that if you have a `this.player` variable in one state, you won’t be able to change it in another state. The only 2 things that are shared between states are the preloaded assets (so once a sprite is loaded you can use it everywhere) and global variables.
 

### Examples: 

- A preloader
- A main menu
- A level selection screen
- An intro sequence or story screen • A game level
- The game over sequence
- A high score screen
- An in-game weapon or items shop • A Boss Fight


### Important

- Only one active state
- States don’t have Display properties (just code organization)

###Predefined Methods

The predefined / reserved methods are:

- init
- preload 
- loadUpdate
- loadRender
- create
- update
- preRender 
- render
- resize 
- paused 
- resumed 
- pauseUpdate 
- shutdown

> **Important:** A State is only considered valid if it has at least one of these methods: preload, create, update or render. Without one of these Phaser will not even load it into the State Manager.

### Predefined Properties
As well as reserved method names there are also 19 predefined properties on a state. These are:

![](https://d3vv6lp55qjaqc.cloudfront.net/items/3C1H093l1P17161D2f2F/Screen%20Shot%202018-07-12%20at%2010.06.55%20AM.png?X-CloudApp-Visitor-Id=1094421)

### The State Flow

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1u1L1K1X1C2S1B1e3W46/Screen%20Shot%202018-07-12%20at%2010.08.11%20AM.png?X-CloudApp-Visitor-Id=1094421)

### Phase 1 - init
- When the State Manager starts a new state it begins by calling the init method. 
- It waits for this method to complete before moving on to phase 2.


### Phase 2 - preload + loop
- Once init is complete it then calls preload. During the preload process Phaser enters a loop. 
- In this loop it calls loadUpdate followed by loadRender on a continuous looping basis until the loader has finished all of its operations.

### Phase 3 - create + update loop
- When the loader is finished (or not used) it calls create. 
- This method is called just once. As soon as create has been called it will then enter the update loop.
- While in this loop it cycles through update, preRender and render in that exact order. Here it remains until either told to change to another state, the game is paused or the game instance is destroyed.
It’s important to note that update is never called until create has finished.

### Phase 4 - shutdown
- Should the State Manager be told to switch to another state then Phaser will stop the update loop and then call shutdown.
- Within shutdown you can clear-up any resources you were using.
- After shutdown has been called it then swaps to the new state, calls its init method and thus starts the flow all over again inside of the new state.


### init
The init method is the first thing to be called in your state. It’s called just once when the state starts. It’s called before preload, create or anything else, hence its name, a short-form of ‘initialization’.


### Passing params between states

index.html
```html
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>A Guide to the Phaser State Manager</title>
        <script src="../../lib/phaser.min.js" type="text/javascript"></script>
        <script src="StateA.js" type="text/javascript"></script>
        <script src="StateB.js" type="text/javascript"></script>
    </head>
    <body>

        <script type="text/javascript">

        var game = new Phaser.Game(800, 600);

        game.state.add('StateA', MyGame.StateA);
        game.state.add('StateB', MyGame.StateB);

        game.state.start('StateA');

        </script>

    </body>
</html>
```

StateA.js

```js
var MyGame = {};

MyGame.StateA = function (game) {

};

MyGame.StateA.prototype = {

    preload: function () {

        this.load.image('background', '../assets/wave.jpg');
        this.load.image('phaser', '../assets/phaser.png');
        this.load.image('asuna1', '../assets/asuna_sao_by_vali233.png');
        this.load.image('asuna2', '../assets/fairy_dance_asuna_by_vali233.png');

    },

    create: function () {

        var pic = this.rnd.between(1, 2);

        this.state.start('StateB', true, false, pic);

    }

};
```

StateB.js

```js
MyGame.StateB = function (game) {

    this.key;
    this.sprite;

};

MyGame.StateB.prototype = {

    init: function (pic) {

        this.key = 'asuna' + pic;

    },

    create: function () {

        this.add.sprite(0, 0, 'background');

        this.add.text(16, 16, "State Example: init", { font: "16px Arial", fill: "#ffffff" });
        this.add.sprite(640, 553, 'phaser');

        this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, this.key);
        this.sprite.anchor.set(0.5);

    }

};
```

### Passing multiple parameters
You can pass as many parameters as you like to the init method. 

```js
this.state.start('StateB', true, false, 
    "Atari",
    { x: 32, y: 64 },
    game.rnd.between(100, 200)
);
```

When StateB starts its init method will receive the following: 

```js
init: function (a, b, c) {
    // a = the string "Atari"
    // b = the object { x: 32, y: 64 }
    // c = a random number between 100 and 200
}
```

### preload

```js
preload: function () {
    this.load.image('background', '../assets/wave.jpg'); 
    this.load.image('phaser', '../assets/phaser.png'); 
    this.load.json('shopData', '../assets/shop_items.json');
}
```

- Does not immediately load items
- Places items on a queue
- If queue is not empty, load items in queue and call `create`

If you want to change state immediately after all the assets have loaded then you should do so inside the create method like so:

```js
preload: function () {
    this.load.image('background', '../assets/wave.jpg');
    this.load.image('phaser', '../assets/phaser.png'); },
create: function () { 
    this.state.start('StateB');
}
```

### Waiting for Audio to load

- Audio needs to be downloaded AND decoded
- Could be slow based on mobile device

```js
preload: function () {
    this.load.audio('explosion', 'assets/audio/explosion.mp3'); 
    this.load.audio('sword', 'assets/audio/sword.mp3'); 
    this.load.audio('blaster', 'assets/audio/blaster.mp3');
},
create: function () {
    var explosion = game.add.audio('explosion'); 
    var sword = game.add.audio('sword');
    var blaster = game.add.audio('blaster');
    this.sound.setDecodedCallback(
        [ explosion, sword, blaster ], 
        this.start, this
    ); },
start: function () { 
    this.state.start('StateB');
}
```

- The start method will be called as soon as all of the audio files are decoded and ready for use. The audio files could be decoded in any order and we have no control over that.

- Although decoding is a non-blocking async process it’s also a real CPU killer on mobile devices, so try to manage it carefully. Be sure not to be running any intensive animations or tweens at the same time as decoding audio.



### loadUpdate

- Called right before `update` to ensure things are loaded (if it's defined).
- If we had to worry about items being loaded, then a lot of our code would look like:

```js
update: function () {
    if (this.sprite) {
        this.sprite.rotation += 0.1; 
    }
}
```

[Loading Spinner](./state-manager/03 - loadUpdate/index.html)


>In JavaScript `this` always refers to the “owner” of the function we're executing, or rather, to the object that a function is a method of.
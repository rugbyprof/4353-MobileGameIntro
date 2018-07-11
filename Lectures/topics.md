### Discussion Topics

- New code organization
- [Sounds](https://phaser.io/examples/v2/audio/sound-complete)
- [Image Editing](https://pixlr.com/editor/)


- Sprite walking 
    - loading different sprites
    - editing sprites with image editor
    - scrolling game background (see below)


- Scrolling game background:

```
var background;
var bg_speed = 4;

function preload() {

    game.load.image("background", "assets/road.png");
    
}
function create() {

    background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");
}

function update(){
    background.tilePosition.x -= bg_speed;
}
```

- Grabbing location of cursor:
```
sprite.x = game.input.x;

sprite.y = game.input.y;

//Or if you want the mouse specifically:

sprite.x = game.input.mousePointer.x;

sprite.y = game.input.mousePointer.y;
```

- Adjusting sprite size to make collisions look better:

```
player.body.setSize(player.width, player.height-8);
```

- Getting some user input (extremely basic):
```
var players = prompt("How many players:", "players");
//then you can save it via local storage

localStorage.setItem("numPlayers", players);

//if you want to use it later

localStorage.getItem("numPlayers");
```
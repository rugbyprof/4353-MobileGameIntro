## dungeon_02

### Purpose

- Add a player sprite with multiple animations into an empty game world.

- This code extends `dungeon_01`
- It adds a game level which just has a single sprite that walks around showing debug info.
- Files added to:
    - **preLoad** : added all the sprite info
    - **level_01**: entire file added implementing walking knight

### Necessary Fixes
    - If walking left or right, if the up or down arrow is pressed the knight will correctly start moving at an angle, however when the up or down arrow is released (while still holding the left or right keys) he will not stop moving at an angle. 

### Necessary Additions
    - The addition of these animations:
    - Run   (shift key)
    - Die
    - Attack (left mouse)
    - Jump (space bar)
    - Jump Attack (shift left mouse)

### Phaser Keys and Actions
    - https://phaser.io/docs/2.6.1/Phaser.KeyCode.html
    - https://phaser.io/examples/v2/input/keyboard-justpressed
    - https://phaser.io/examples/v2/input/down-duration


### Controlling Length of KeyDown event

```js
var flipFlop;

function update() {
    if (cursor.up.isDown){
        if (!flipFlop) {
            player.body.velocity.y = -200;
            player.animations.stop('move');
            flipFlop = true;
        }
    }

    if (cursor.up.isUp) {
        flipFlop = false;
    }
}
```
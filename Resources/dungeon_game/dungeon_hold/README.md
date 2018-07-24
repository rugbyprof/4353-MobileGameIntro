## dungeon_07

### Purpose

- Show how to have a game sprite "attack" a user based on a tile event. 

- This code adds on to `dungeon_06`
- Files added to:
    - **level_01**: 
    - **level_02**:
### Necessary Fixes
    - Some anomolies with specific tiles. Has to do with collision layer and removal of the object layer which was causing phaser to crash. Will discuss more in class.

### Necessary Additions
    - Add additional map levels to be transported to.  

### Passing parameters between states:

#### Method 1

```js
// In game.js simply add key:value pairs the global game object
game.global = {
    title: "Scary Dungeon",
	score: 0,
	best_score: 0,
    level:1,
    backgroundColor:"#000000",
    current_level: "level_01",
    lives:3
}

// in any state there after just reference global object

game.add.bitmapText(200, 100, game.global.lives, 64);
```

#### Method 2
```js
/**
 * @param1: key value of level
 * @param2: clearWorld, 
 * @param3: clearCache, 
 * @paramX: custom param 1 , 2 ,3 ...
 */
game.state.start('level_03', true, false, customParam1, customParam2);

// Must implement the 'init' function in the new state to use param passing
var level_03 = { 
    init: function(customParam1, customParam2) {   
        this.points = customParam1;
        this.damage = customParam2;
    }
};

```
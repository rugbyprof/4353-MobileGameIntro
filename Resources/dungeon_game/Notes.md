## Notes

### Tiled 

    - https://www.mapeditor.org/download.html

### Creating the Animation

- Atlas Creation
- Assigning moves
- Adding behavior logic based on arrow keys
- Facing correct direction


### Detecting Tiles

```js
	getTileProperties: function (layer, player) {

		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		console.log(tile);

	}
```
### Chasing Player

- Chase player using portions of players speed. Start faster than player, then as monster nears player adjust monster speed to be slightly slower than player. 

### Attacking Player

- Weapons Class
    - https://github.com/photonstorm/phaser-ce/blob/v2.11.0/src/plugins/weapon/WeaponPlugin.js#L117
